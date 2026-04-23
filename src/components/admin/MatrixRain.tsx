"use client";

import { useEffect, useRef } from "react";

interface MatrixRainProps {
  color?: string; // Hex color for the character rain
  density?: number; // How many characters fall roughly
  speed?: number; // Speed of falling
}

export function MatrixRain({ color = "#10b981", density = 0.5, speed = 1 }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // A matrix alphabet
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~あいうえおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもやゆよらりるれろわゐゑをん";
    const fontSize = 16;
    let columns = Math.max(1, Math.floor(width / fontSize));
    
    // An array of drops - one per column
    let drops = Array.from({ length: columns }).map(() => (Math.random() * -100));

    const draw = () => {
      // Black BG for the canvas to show trail
      ctx.fillStyle = "rgba(2, 2, 2, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = fontSize + "px monospace";

      // Draw loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Skip drawing based on density
        if (Math.random() > density) continue;

        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move the drop
        drops[i] += speed * 0.5;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    // Handle Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      columns = Math.max(1, Math.floor(width / fontSize));
      drops = Array.from({ length: columns }).map(() => (Math.random() * -100));
    };

    window.addEventListener("resize", handleResize);

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, density, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-0 opacity-50 mix-blend-screen pointer-events-none"
      style={{ filter: 'blur(0.5px)' }} // Slight blur to feel more authentic
    />
  );
}
