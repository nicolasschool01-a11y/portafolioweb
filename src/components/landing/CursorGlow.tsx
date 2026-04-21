"use client";

import { useEffect, useRef, useCallback } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const posRef = useRef({ x: -400, y: -400 });
  const enabledRef = useRef(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enabledRef.current) return;

    posRef.current = { x: e.clientX, y: e.clientY };

    // Fade in
    if (glowRef.current) {
      glowRef.current.style.opacity = "1";
    }

    // Reset fade-out timer
    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
    }
    fadeTimerRef.current = setTimeout(() => {
      if (glowRef.current) {
        glowRef.current.style.opacity = "0";
      }
    }, 1500);

    // Throttle with rAF for ~60fps
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(() => {
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${posRef.current.x - 200}px, ${posRef.current.y - 200}px)`;
      }
    });
  }, []);

  useEffect(() => {
    // Only enable on hover-capable devices and respect reduced-motion
    const hoverMedia = window.matchMedia("(hover: hover)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (!hoverMedia.matches || reducedMotion.matches) return;

    enabledRef.current = true;
    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      enabledRef.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, [handleMouseMove]);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-50 pointer-events-none"
      style={{
        width: 400,
        height: 400,
        opacity: 0,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(16,185,129,0.08) 0%, rgba(20,184,166,0.03) 40%, transparent 70%)",
        transition: "opacity 0.6s ease-out",
        willChange: "transform",
      }}
    />
  );
}
