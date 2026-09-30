# DistroInfinite

DistroInfinite is an infinite-scroll Linux distribution chronicle built with React, Vite, TypeScript, and Express. It blends a curated distro catalog with optional Gemini-powered enrichment and a procedural fallback generator so the feed never runs out.

## Features

- Infinite distro stream with lazy loading
- Search and category-style filtering
- Randomized session ordering via seeded shuffling
- Hybrid data pipeline:
  - Curated distro datasets
  - Optional Gemini generation for rare/specialized distros
  - Procedural fallback generation for continuity
- Screenshot lightbox and immersive visual background
- Image proxy endpoint to reduce CORS/hotlinking issues

## Tech Stack

- **Frontend:** React 19, Vite, TypeScript
- **Backend:** Express (single server entry in `server.ts`)
- **Styling/UI:** Tailwind CSS, Lucide icons, Motion
- **AI (optional):** Google Gemini via `@google/genai`

## Prerequisites

- Node.js 20+ (recommended)
- npm

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure environment variables:

   ```bash
   cp .env.example .env
   ```

   Then set:
   - `GEMINI_API_KEY` (optional but recommended for AI-enriched distro generation)
   - `APP_URL` (optional for local development)

3. Start development server:

   ```bash
   npm run dev
   ```

4. Open:

   ```text
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` — run Express + Vite in development mode
- `npm run build` — build frontend and bundle the Node server
- `npm run start` — start the production server from `dist/server.cjs`
- `npm run lint` — run TypeScript type-checking (`tsc --noEmit`)

## API Endpoints

- `POST /api/distros` — returns a batch of distro objects
- `GET /api/proxy-image?url=...` — proxies image URLs for better browser compatibility

## License

This project includes source files with Apache-2.0 SPDX headers.
