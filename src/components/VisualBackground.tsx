import { useEffect, useRef } from "react";

interface VisualBackgroundProps {
  activeBrandColor?: string;
  scrollVelocity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
}

// Convert hex to rgb components
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace("#", "");
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split("").map((c) => c + c).join("");
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return { r: 59, g: 130, b: 246 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export default function VisualBackground({
  activeBrandColor = "#3B82F6",
  scrollVelocity = 0,
}: VisualBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Keep live references to avoid re-triggering the useEffect loop on every frame/event
  const mouseRef = useRef<{ x: number; y: number; isInside: boolean }>({
    x: -1000,
    y: -1000,
    isInside: false,
  });

  const scrollVelocityRef = useRef(scrollVelocity);
  scrollVelocityRef.current = scrollVelocity;

  const targetColorRgbRef = useRef(hexToRgb(activeBrandColor));
  useEffect(() => {
    targetColorRgbRef.current = hexToRgb(activeBrandColor);
  }, [activeBrandColor]);

  // Mouse move listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isInside = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.isInside = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Main stable 60fps canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize particles once
    const particleCount = Math.min(50, Math.floor(width / 32));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1.0,
        baseAlpha: Math.random() * 0.35 + 0.15,
      });
    }

    // Smoothly interpolated values
    let currentColor = { ...targetColorRgbRef.current };
    let smoothVelocity = 0;
    let gridOffsetY = 0;

    const render = () => {
      // Smooth color transition (LERP)
      const targetRgb = targetColorRgbRef.current;
      currentColor.r += (targetRgb.r - currentColor.r) * 0.05;
      currentColor.g += (targetRgb.g - currentColor.g) * 0.05;
      currentColor.b += (targetRgb.b - currentColor.b) * 0.05;

      const r = Math.round(currentColor.r);
      const g = Math.round(currentColor.g);
      const b = Math.round(currentColor.b);

      // Smooth scroll velocity damping to eliminate abrupt jumps
      const rawVelocity = scrollVelocityRef.current || 0;
      smoothVelocity += (rawVelocity - smoothVelocity) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // 1. Soft atmospheric background ambient wash directly on canvas
      const ambientGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.35,
        width * 0.65
      );
      ambientGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.09)`);
      ambientGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.03)`);
      ambientGrad.addColorStop(1, "transparent");
      ctx.fillStyle = ambientGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle architectural grid with gentle mouse parallax (perfectly smooth, zero jitter)
      const mouse = mouseRef.current;
      const mouseParallaxX = mouse.isInside ? ((mouse.x / width) - 0.5) * 12 : 0;
      const mouseParallaxY = mouse.isInside ? ((mouse.y / height) - 0.5) * 12 : 0;

      const gridSize = 80;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 1;
      ctx.beginPath();

      for (let x = 0; x < width + gridSize; x += gridSize) {
        ctx.moveTo(x + mouseParallaxX, 0);
        ctx.lineTo(x + mouseParallaxX, height);
      }
      for (let y = 0; y < height + gridSize; y += gridSize) {
        ctx.moveTo(0, y + mouseParallaxY);
        ctx.lineTo(width, y + mouseParallaxY);
      }
      ctx.stroke();

      // 3. Interactive Mouse Spotlight
      if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
        const spotGrad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          260
        );
        spotGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.12)`);
        spotGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.04)`);
        spotGrad.addColorStop(1, "transparent");
        ctx.fillStyle = spotGrad;
        ctx.fillRect(0, 0, width, height);
      }

      // 4. Update and draw particles smoothly
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Smooth continuous drift without sudden snapping
        p.x += p.vx;
        p.y += p.vy;

        // Gentle mouse interaction (spring repulsion)
        if (mouse.isInside && mouse.x > 0 && mouse.y > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140 && dist > 1) {
            const force = (1 - dist / 140) * 0.9;
            p.x -= (dx / dist) * force;
            p.y -= (dy / dist) * force;
          }
        }

        // Screen wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.baseAlpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.08;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Run ONCE on mount; state is read through stable refs

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top subtle vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07090E]/60 via-transparent to-[#07090E]/80 pointer-events-none" />

      {/* 60fps stable canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-80"
      />
    </div>
  );
}
