"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, AlertTriangle } from "lucide-react";
import { AnimatePresence } from "framer-motion";

const TOTAL_SLOTS = 5;
const USED_SLOTS = 3;
const AVAILABLE_SLOTS = TOTAL_SLOTS - USED_SLOTS;
const USAGE_PERCENTAGE = (USED_SLOTS / TOTAL_SLOTS) * 100;

function useAnimatedCounter(target: number, duration: number = 1500, isActive: boolean) {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(startValue + (target - startValue) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [isActive, target, duration]);

  return count;
}

export function ProjectSlotsWidget() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const animatedSlotCount = useAnimatedCounter(AVAILABLE_SLOTS, 1200, isInView);

  useEffect(() => {
    if (isInView) {
      // Delay to let the bar animate in
      const timer = setTimeout(() => {
        setAnimatedWidth(USAGE_PERCENTAGE);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative mx-auto max-w-3xl px-4"
    >
      <div className="relative rounded-2xl border border-orange-500/15 bg-gradient-to-r from-orange-500/[0.06] via-amber-500/[0.04] to-orange-500/[0.06] p-5 sm:p-6 overflow-hidden">
        {/* Animated gradient background accents */}
        <div className="absolute -top-12 -left-12 w-36 h-36 bg-orange-500/10 rounded-full blur-[60px] pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-amber-500/10 rounded-full blur-[50px] pointer-events-none" />

        {/* Content - horizontal on desktop, vertical on mobile */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left: Info */}
          <div className="flex items-start gap-3 flex-1">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/20"
            >
              <Users className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                Slots disponibles para nuevos proyectos
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Asegurá tu lugar antes de que se completen
              </p>
            </div>
          </div>

          {/* Right: Slot counter with pulsing urgency animation */}
          <div className="flex items-center gap-2 flex-shrink-0 relative">
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                boxShadow: [
                  "0 0 0 0 rgba(251,146,60,0.2)",
                  "0 0 12px 2px rgba(251,146,60,0.3)",
                  "0 0 0 0 rgba(251,146,60,0.2)",
                ],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500/15 border border-orange-500/25 cursor-default"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-sm font-bold text-orange-400 tabular-nums">
                {animatedSlotCount}
              </span>
              <span className="text-xs text-orange-400/80">de {TOTAL_SLOTS}</span>

              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-card/95 backdrop-blur-sm border border-white/10 text-[11px] text-foreground whitespace-nowrap shadow-lg z-20"
                  >
                    Disponibilidad limitada
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card/95 border-b border-r border-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Progress bar with pulsing urgency */}
        <div className="relative z-10 mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-muted-foreground/60 font-medium">
              Capacidad utilizada
            </span>
            <span className="text-[11px] text-orange-400/80 font-semibold">
              {Math.round(animatedWidth)}%
            </span>
          </div>
          <div className="relative h-2.5 rounded-full bg-white/[0.06] overflow-hidden">
            {/* Background track */}
            <div className="absolute inset-0 rounded-full" />
            {/* Animated fill bar with pulsing urgency */}
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-orange-500 to-amber-500"
              initial={{ width: "0%" }}
              animate={{
                width: `${animatedWidth}%`,
              }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Shimmer effect on the bar */}
              <motion.div
                className="absolute inset-0 -translate-x-full"
                animate={{ translateX: ["-100%", "200%"] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              >
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              </motion.div>

              {/* Pulsing urgency glow on the bar */}
              <motion.div
                className="absolute inset-y-0 right-0 w-8 rounded-full"
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  x: [-8, 0, -8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ background: "linear-gradient(to left, rgba(251,146,60,0.4), transparent)" }}
              />
            </motion.div>

            {/* Pulse glow at the end of the bar */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,0.5)]"
              initial={{ left: "0%" }}
              animate={{ left: `${animatedWidth}%` }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full bg-orange-400/40"
                animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>

          {/* Slot indicators */}
          <div className="flex items-center gap-1.5 mt-2.5">
            {Array.from({ length: TOTAL_SLOTS }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 300, damping: 20 }}
                className={`flex-1 h-1.5 rounded-full transition-colors duration-500 ${
                  i < USED_SLOTS
                    ? "bg-orange-500/60"
                    : "bg-white/[0.08]"
                }`}
              />
            ))}
            <span className="ml-2 text-[10px] text-muted-foreground/50">
              {AVAILABLE_SLOTS} libres
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
