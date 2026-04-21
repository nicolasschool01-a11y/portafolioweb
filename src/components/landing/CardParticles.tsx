"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export function CardParticles({ isHovered, color = "rgba(16, 185, 129, 0.2)" }: { isHovered: boolean; color?: string }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generar un set fijo de partículas al montar
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden origin-center">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}%`, y: `${p.y}%`, opacity: 0.1 }}
          animate={
            isHovered
              ? {
                  x: [`${p.x}%`, `${Math.max(0, Math.min(100, p.x + (Math.random() * 20 - 10)))}%`],
                  y: [`${p.y}%`, `${Math.max(0, Math.min(100, p.y + (Math.random() * 20 - 10)))}%`],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.5, 1],
                }
              : {
                  y: [`${p.y}%`, `${p.y - 5}%`, `${p.y}%`],
                  opacity: 0.15,
                  scale: 1,
                }
          }
          transition={{
            duration: isHovered ? 1.5 : p.duration,
            repeat: Infinity,
            delay: isHovered ? 0 : p.delay,
            ease: "easeInOut",
          }}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            backgroundColor: color,
            boxShadow: isHovered ? `0 0 8px ${color}` : "none",
          }}
        />
      ))}
    </div>
  );
}
