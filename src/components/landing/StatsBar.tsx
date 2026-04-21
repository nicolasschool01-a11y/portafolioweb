"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

function useAnimatedCounter(target: number, duration: number = 2000, isActive: boolean) {
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

interface StatItemProps {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
}

function StatItem({ value, suffix, prefix = "", label }: StatItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });
  const count = useAnimatedCounter(value, 2000, isInView);
  const isComplete = count === value && isInView;

  return (
    <div ref={ref} className="text-center group relative overflow-hidden rounded-xl py-4 px-2 card-glass shimmer-sweep">
      {/* Subtle glow behind number */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: [0, 0.3, 0.15] } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)" }}
      />

      {/* Gradient shine sweep on view */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? {
          opacity: [0, 0.4, 0],
          x: ["-100%", "200%"],
        } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent skew-x-12" />
      </motion.div>

      <motion.div
        className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-1.5 inline-flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      >
        {prefix}{count}
        {/* "+" suffix that fades in after counting finishes */}
        <motion.span
          initial={{ opacity: 0, width: 0 }}
          animate={isComplete ? { opacity: 1, width: "auto" } : { opacity: 0, width: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="overflow-hidden inline-block text-glow"
        >
          {suffix}
        </motion.span>
        {/* Sparkle icon on count completion */}
        <motion.span
          className="inline-flex items-center"
          initial={{ opacity: 0, scale: 0, rotate: -90 }}
          animate={isComplete ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0, rotate: -90 }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 15 }}
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
        </motion.span>
      </motion.div>
      <motion.p
        className="text-xs sm:text-sm text-muted-foreground"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {label}
      </motion.p>
    </div>
  );
}

const stats = [
  { value: 50, suffix: "+", label: "Proyectos entregados" },
  { value: 5, suffix: "x", label: "Más rápido que agencias" },
  { value: 98, suffix: "%", label: "Clientes satisfechos" },
  { value: 24, suffix: "hs", label: "Tiempo de respuesta promedio" },
];

export function StatsBar() {
  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
      <div className="absolute inset-0 grid-bg opacity-15" />

      {/* Decorative dots */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-emerald-400/30" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-emerald-400/30" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Gradient line separator above */}
        <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent mb-16 sm:mb-20" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {stats.map((stat) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          ))}
        </div>

        {/* Currently Building — Live Status */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-500/[0.06] border border-emerald-500/15">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-xs sm:text-sm text-emerald-400 font-medium">3 proyectos en desarrollo</span>
          </div>
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-xs sm:text-sm text-muted-foreground">Slots disponibles: <span className="text-foreground font-semibold">2</span></span>
          </div>
        </motion.div>

        {/* Gradient line separator below */}
        <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent mt-16 sm:mt-20" />
      </div>
    </section>
  );
}
