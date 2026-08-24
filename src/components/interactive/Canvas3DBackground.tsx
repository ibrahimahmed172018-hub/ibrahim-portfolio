"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  glowColor: string;
  pulsePhase: number;
}

interface Signal {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  color: string;
}

interface MatrixGlyph {
  x: number;
  y: number;
  char: string;
  vy: number;
  alpha: number;
  size: number;
}

export function Canvas3DBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cyber Palette
    const palette = [
      { color: "59, 130, 246", glow: "#3b82f6" }, // Electric Blue
      { color: "139, 92, 246", glow: "#8b5cf6" }, // Neon Violet
      { color: "6, 182, 212", glow: "#06b6d4" },  // Cyber Cyan
      { color: "99, 102, 241", glow: "#6366f1" }  // Indigo Pulse
    ];

    // 1. Generate Neural Nodes
    const nodeCount = Math.min(Math.floor(width / 26), 55);
    const nodes: Node[] = Array.from({ length: nodeCount }, (_, i) => {
      const p = palette[i % palette.length];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        radius: 2 + Math.random() * 2.5,
        color: p.color,
        glowColor: p.glow,
        pulsePhase: Math.random() * Math.PI * 2
      };
    });

    // 2. Active Synaptic Signal Packets
    const signals: Signal[] = [];
    const maxSignals = 18;

    const spawnSignal = () => {
      if (signals.length >= maxSignals || nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      // Find nearest neighbor
      let nearestIdx = -1;
      let minDistance = 160;

      for (let j = 0; j < nodes.length; j++) {
        if (j === fromIdx) continue;
        const dist = Math.hypot(nodes[fromIdx].x - nodes[j].x, nodes[fromIdx].y - nodes[j].y);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = j;
        }
      }

      if (nearestIdx !== -1) {
        signals.push({
          fromIdx,
          toIdx: nearestIdx,
          progress: 0,
          speed: 0.015 + Math.random() * 0.02,
          color: nodes[fromIdx].glowColor
        });
      }
    };

    // 3. Floating Math / AI Matrix Glyphs
    const glyphChars = ["0", "1", "λ", "∫", "f(x)", "∂L", "w·x", "ReLU", "θ", "∇", "Σ", "AI"];
    const glyphs: MatrixGlyph[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: glyphChars[Math.floor(Math.random() * glyphChars.length)],
      vy: -0.25 - Math.random() * 0.4,
      alpha: 0.15 + Math.random() * 0.25,
      size: 10 + Math.random() * 4
    }));

    // Mouse Tracking
    let mouseX = width / 2;
    let mouseY = height / 2;
    let isInteracting = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      isInteracting = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isInteracting = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let time = 0;
    let lastTime = performance.now();

    const render = (now: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const delta = now - lastTime;
      if (delta < 15) return; // 60 FPS throttling
      lastTime = now;

      time += 1;
      ctx.clearRect(0, 0, width, height);

      const isDark = document.documentElement.classList.contains("dark");

      // Periodic Signal Spawning
      if (time % 12 === 0) {
        spawnSignal();
      }

      // --- A. Draw Floating AI Matrix Glyphs ---
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      glyphs.forEach((g) => {
        g.y += g.vy;
        if (g.y < -20) {
          g.y = height + 20;
          g.x = Math.random() * width;
        }

        ctx.font = `600 ${g.size}px monospace`;
        ctx.fillStyle = isDark
          ? `rgba(96, 165, 250, ${g.alpha * 0.6})`
          : `rgba(37, 99, 235, ${g.alpha * 0.45})`;
        ctx.fillText(g.char, g.x, g.y);
      });

      // --- B. Update & Draw Neural Nodes & Synaptic Connections ---
      const maxConnDist = 160;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        // Magnetic mouse reaction
        if (isInteracting) {
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 220 && dist > 1) {
            const force = (1 - dist / 220) * 0.75;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          }
        }

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 10 || n.x > width - 10) n.vx *= -1;
        if (n.y < 10 || n.y > height - 10) n.vy *= -1;

        // Draw Synaptic Connection Lines
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);

          if (dist < maxConnDist) {
            const lineAlpha = (1 - dist / maxConnDist) * (isDark ? 0.35 : 0.22);

            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);

            const gradient = ctx.createLinearGradient(n.x, n.y, n2.x, n2.y);
            gradient.addColorStop(0, `rgba(${n.color}, ${lineAlpha})`);
            gradient.addColorStop(1, `rgba(${n2.color}, ${lineAlpha})`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = (1 - dist / maxConnDist) * 1.5;
            ctx.stroke();
          }
        }
      }

      // --- C. Draw Active Synapse Signal Packets ---
      for (let k = signals.length - 1; k >= 0; k--) {
        const s = signals[k];
        s.progress += s.speed;

        const from = nodes[s.fromIdx];
        const to = nodes[s.toIdx];

        if (!from || !to || s.progress >= 1) {
          signals.splice(k, 1);
          continue;
        }

        const currX = from.x + (to.x - from.x) * s.progress;
        const currY = from.y + (to.y - from.y) * s.progress;

        ctx.save();
        ctx.shadowBlur = 12;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(currX, currY, 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#ffffff" : s.color;
        ctx.fill();
        ctx.restore();
      }

      // --- D. Draw Node Bodies & Glowing Halos ---
      nodes.forEach((n) => {
        n.pulsePhase += 0.04;
        const pulse = 1 + Math.sin(n.pulsePhase) * 0.25;

        ctx.save();
        // Halo Glow
        ctx.shadowBlur = isDark ? 16 : 8;
        ctx.shadowColor = n.glowColor;

        // Core Node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(${n.color}, 0.9)` : `rgba(${n.color}, 0.8)`;
        ctx.fill();

        // White Center Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, Math.max(1, (n.radius * pulse) / 2.2), 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        ctx.restore();
      });
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden select-none">
      {/* Background Neural Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Cyber Grid Pattern Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f61a_1px,transparent_1px)] [background-size:32px_32px] opacity-40 dark:opacity-60" />

      {/* Ambient Moving AI Lighting Spheres */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 dark:bg-blue-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-violet-600/15 dark:bg-violet-600/20 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-3/4 left-1/3 w-[450px] h-[450px] bg-cyan-600/10 dark:bg-cyan-600/15 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
}
