import { GoogleGenAI, Type } from "@google/genai";
import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { MASTER_DISTROS, Distro } from "./src/data/distroCatalog.ts";
import { EXTENDED_DISTROS } from "./src/data/extendedDistros.ts";
import { generateProceduralDistros } from "./src/data/proceduralDistroGenerator.ts";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const ALL_CURATED_DISTROS: Distro[] = [...MASTER_DISTROS, ...EXTENDED_DISTROS];

// Simple seeded pseudo-random number generator for reproducible or randomized shuffles
function seededShuffle<T>(array: T[], seedNumber: number): T[] {
  const shuffled = [...array];
  let m = shuffled.length;
  let s = Math.abs(seedNumber) || 1234567;
  
  // Knuth / Fisher-Yates with LCG
  while (m) {
    s = (s * 9301 + 49297) % 233280;
    const rnd = s / 233280;
    const i = Math.floor(rnd * m--);
    const t = shuffled[m];
    shuffled[m] = shuffled[i];
    shuffled[i] = t;
  }
  return shuffled;
}

const DISTRO_GEMINI_SCHEMA = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: { type: Type.STRING },
      slug: { type: Type.STRING },
      tagline: { type: Type.STRING },
      description: { type: Type.STRING },
      history: { type: Type.STRING },
      family: { type: Type.STRING },
      releaseModel: { type: Type.STRING },
      brandColor: { type: Type.STRING },
      accentColor: { type: Type.STRING },
      specs: {
        type: Type.OBJECT,
        properties: {
          kernel: { type: Type.STRING },
          packageManager: { type: Type.STRING },
          initSystem: { type: Type.STRING },
          desktopEnvironment: { type: Type.STRING },
          displayServer: { type: Type.STRING },
          defaultFilesystem: { type: Type.STRING },
        }
      },
      systemRequirements: {
        type: Type.OBJECT,
        properties: {
          min: {
            type: Type.OBJECT,
            properties: {
              cpu: { type: Type.STRING },
              ram: { type: Type.STRING },
              hdd: { type: Type.STRING },
            }
          },
          recommended: {
            type: Type.OBJECT,
            properties: {
              cpu: { type: Type.STRING },
              ram: { type: Type.STRING },
              hdd: { type: Type.STRING },
              gpu: { type: Type.STRING },
            }
          }
        }
      },
      logoUrl: { type: Type.STRING },
      screenshotUrl: { type: Type.STRING },
      reviews: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            quote: { type: Type.STRING },
            source: { type: Type.STRING },
            author: { type: Type.STRING },
            year: { type: Type.STRING },
          }
        }
      },
      keyFeatures: {
        type: Type.ARRAY,
        items: { type: Type.STRING }
      },
      cliSnippet: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING },
          command: { type: Type.STRING }
        }
      },
      releaseDate: { type: Type.STRING },
      website: { type: Type.STRING },
      downloadUrl: { type: Type.STRING }
    },
    required: ["name", "slug", "tagline", "description", "history", "family", "specs", "systemRequirements", "logoUrl", "screenshotUrl"]
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.post("/api/distros", async (req, res) => {
    const { 
      excludeList = [], 
      seed = Date.now(), 
      category = 'All', 
      limit = 5 
    } = req.body;

    const excludedSet = new Set<string>(
      Array.isArray(excludeList) ? excludeList.map(item => String(item).toLowerCase().trim()) : []
    );

    const parsedSeed = typeof seed === 'number' ? seed : parseInt(String(seed), 10) || 42;

    // 1. Filter curated distros according to category and exclude list
    let candidateDistros = ALL_CURATED_DISTROS;
    if (category && category !== 'All') {
      candidateDistros = candidateDistros.filter(d => 
        d.family.toLowerCase() === category.toLowerCase() ||
        d.specs.desktopEnvironment.toLowerCase().includes(category.toLowerCase()) ||
        d.tagline.toLowerCase().includes(category.toLowerCase()) ||
        d.description.toLowerCase().includes(category.toLowerCase())
      );
    }

    // Shuffle according to the session seed
    const shuffledCatalog = seededShuffle(candidateDistros, parsedSeed);
    
    // Find unexhausted distros
    const availableFromCatalog = shuffledCatalog.filter(d => 
      !excludedSet.has(d.slug.toLowerCase()) && !excludedSet.has(d.name.toLowerCase())
    );

    // If we have enough from catalog, serve immediately
    if (availableFromCatalog.length >= limit) {
      return res.json(availableFromCatalog.slice(0, limit));
    }

    // If we have some from catalog, take them
    const results: Distro[] = [...availableFromCatalog];
    results.forEach(d => {
      excludedSet.add(d.slug.toLowerCase());
      excludedSet.add(d.name.toLowerCase());
    });

    const needed = limit - results.length;

    // Try Gemini if configured and not previously failed
    let geminiSucceeded = false;
    if (process.env.GEMINI_API_KEY && needed > 0) {
      try {
        const prompt = `Provide detailed factual information for ${needed} rare, interesting, or specialized Linux distributions.
Do NOT include any of the following distros: ${Array.from(excludedSet).slice(-40).join(", ")}.
For each distro, provide accurate history, specifications, system requirements, a reliable public URL for their official logo or Wikimedia svg/png, reliable public screenshot url, real quoted review snippets with source, key features, and terminal command. Ensure facts and URLs are grounded.`;

        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: DISTRO_GEMINI_SCHEMA,
          },
        });

        if (response.text) {
          const generated = JSON.parse(response.text) as Distro[];
          for (const item of generated) {
            if (!excludedSet.has(item.slug.toLowerCase()) && !excludedSet.has(item.name.toLowerCase())) {
              results.push({
                ...item,
                brandColor: item.brandColor || "#3B82F6",
                accentColor: item.accentColor || "#1E40AF",
                cliSnippet: item.cliSnippet || {
                  label: "Inspect system info",
                  command: "fastfetch || neofetch"
                }
              });
              excludedSet.add(item.slug.toLowerCase());
              excludedSet.add(item.name.toLowerCase());
            }
          }
          if (results.length >= limit) {
            geminiSucceeded = true;
          }
        }
      } catch (err: any) {
        console.warn("Gemini generation skipped or rate limited (429), proceeding with procedural archive extension:", err?.message || err);
      }
    }

    // If Gemini was rate limited or didn't supply enough, use the procedural infinite generator
    if (results.length < limit) {
      const remainingNeeded = limit - results.length;
      const procedural = generateProceduralDistros(remainingNeeded, excludedSet, parsedSeed + results.length);
      results.push(...procedural);
    }

    return res.json(results);
  });

  // Safe Image Proxy to bypass CORS / hotlinking blocks and Wikimedia 403s
  app.get("/api/proxy-image", async (req, res) => {
    const rawUrl = req.query.url as string;
    if (!rawUrl) {
      return res.status(400).send("Missing url parameter");
    }

    try {
      const response = await fetch(rawUrl, {
        headers: {
          "User-Agent": "DistroInfiniteBot/1.0 (https://ais-build; mailto:admin@distroinfinite.org) Mozilla/5.0",
          "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        },
        redirect: 'follow',
      });

      if (!response.ok) {
        return res.status(response.status).send(`Failed upstream image fetch: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type") || "image/png";
      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=604800, stale-while-revalidate=86400");
      res.setHeader("Access-Control-Allow-Origin", "*");

      const arrayBuffer = await response.arrayBuffer();
      res.send(Buffer.from(arrayBuffer));
    } catch (err: any) {
      console.warn("Proxy image error for URL:", rawUrl, err?.message);
      res.status(502).send("Error proxying image");
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
