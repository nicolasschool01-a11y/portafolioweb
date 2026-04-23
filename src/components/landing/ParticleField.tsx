"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  targetOpacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  color: string;
}

const COLORS = [
  "rgba(16, 185, 129,",  // emerald-500
  "rgba(20, 184, 166,",  // teal-500
  "rgba(139, 92, 246,",  // violet-500
  "rgba(6, 182, 212,",   // cyan-500
  "rgba(255, 255, 255,", // white
];

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Create particles
    // Create particles - significantly fewer on mobile for performance
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile 
      ? Math.min(Math.floor((width * height) / 25000), 40)
      : Math.min(Math.floor((width * height) / 10000), 80);
    particlesRef.current = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const colorIdx = Math.random() < 0.5 ? 0 : Math.random() < 0.5 ? 1 : Math.floor(Math.random() * COLORS.length);
      particlesRef.current.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.8 + 0.4,
        opacity: 0,
        targetOpacity: Math.random() * 0.5 + 0.15,
        pulseSpeed: Math.random() * 0.008 + 0.003,
        pulsePhase: Math.random() * Math.PI * 2,
        color: COLORS[colorIdx],
      });
    }

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener("mousemove", handleMouse);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    let isIntersecting = true;
    const observer = new IntersectionObserver((entries) => {
      isIntersecting = entries[0].isIntersecting;
    });
    observer.observe(canvas.parentElement || canvas);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (!isIntersecting) return; // SKIP HEAVY COMPUTATION ON MOBILE WHEN NOT VISIBLE
      time += 1;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Pulse opacity (gentle fade in/out)
        const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase);
        const fadeTarget = p.targetOpacity * (0.6 + 0.4 * ((pulse + 1) / 2));
        const currentOpacity = Math.max(0.02, Math.min(0.65, fadeTarget));

        // Move slowly
        p.x += p.vx;
        p.y += p.vy;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.8;
          p.vx += (dx / dist) * force * 0.1;
          p.vy += (dy / dist) * force * 0.1;
          // Increase opacity near mouse
          p.targetOpacity = Math.min(0.8, p.targetOpacity + 0.01);
        } else {
          p.targetOpacity = Math.max(0.1, p.targetOpacity - 0.005);
        }

        // Damping
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Wrap around
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle with glow
        const r = Math.max(0.1, p.radius);
        
        // Outer glow
        if (r > 1) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
          ctx.fillStyle = p.color + (currentOpacity * 0.15).toFixed(3) + ")";
          ctx.fill();
        }

        // Core
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${currentOpacity})`;
        ctx.fill();
      }

      // Draw connections between nearby particles (emerald/20)
      // On mobile, we skip connections if the CPU is likely struggling or just show fewer
      const skipConnections = isMobile && time % 2 === 0;
      
      if (!skipConnections) {
        ctx.lineWidth = 0.5;
        const maxDistSq = 100 * 100;

        for (let i = 0; i < particles.length; i++) {
          const a = particles[i];
          // Optimization: only check a limited number of particles ahead
          const limit = isMobile ? Math.min(i + 15, particles.length) : particles.length;
          
          for (let j = i + 1; j < limit; j++) {
            const b = particles[j];
            const ddx = a.x - b.x;
            const ddy = a.y - b.y;
            const distSq = ddx * ddx + ddy * ddy;

            if (distSq < maxDistSq) {
              const dist = Math.sqrt(distSq);
              const lineOpacity = (1 - dist / 100) * 0.15;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(16, 185, 129, ${lineOpacity})`;
              ctx.stroke();
            }
          }
        }
      }

      // Loop is called at the top of the function to prevent death on early return
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-auto"
      style={{ opacity: 0.7 }}
      aria-hidden="true"
    />
  );
}
