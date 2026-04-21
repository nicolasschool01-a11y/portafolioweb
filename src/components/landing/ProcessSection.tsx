"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  FileText,
  Handshake,
  Rocket,
  ArrowRight,
  CircleDot,
  ChevronRight,
  GitBranch,
  Clock,
} from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MessageSquare,
    title: "Compartís tu idea",
    description:
      "Contame tu proyecto sin jerga técnica, solo tu visión y objetivos.",
    color: "emerald",
    gradient: "from-emerald-400 to-teal-400",
    glowColor: "shadow-emerald-500/30",
    ringColor: "ring-emerald-500/20",
    bgTint: "bg-emerald-500/10",
    textColor: "text-emerald-400",
    dotColor: "bg-emerald-400",
    lineColor: "from-emerald-400 to-cyan-400",
    duration: "5 min",
    entryDelay: 0,
  },
  {
    number: 2,
    icon: Search,
    title: "Analizo requerimientos",
    description:
      "Investigo tu mercado, competencia y necesidades a fondo.",
    color: "cyan",
    gradient: "from-cyan-400 to-sky-400",
    glowColor: "shadow-cyan-500/30",
    ringColor: "ring-cyan-500/20",
    bgTint: "bg-cyan-500/10",
    textColor: "text-cyan-400",
    dotColor: "bg-cyan-400",
    lineColor: "from-cyan-400 to-violet-400",
    duration: "24 hs",
    entryDelay: 0.15,
  },
  {
    number: 3,
    icon: FileText,
    title: "Propuesta detallada",
    description:
      "Te presento un plan claro con timeline, costo y alcance.",
    color: "violet",
    gradient: "from-violet-400 to-purple-400",
    glowColor: "shadow-violet-500/30",
    ringColor: "ring-violet-500/20",
    bgTint: "bg-violet-500/10",
    textColor: "text-violet-400",
    dotColor: "bg-violet-400",
    lineColor: "from-violet-400 to-amber-400",
    duration: "2-3 días",
    entryDelay: 0.3,
  },
  {
    number: 4,
    icon: Handshake,
    title: "Ajustamos juntos",
    description:
      "Revisamos cada detalle para que todo quede perfecto.",
    color: "amber",
    gradient: "from-amber-400 to-orange-400",
    glowColor: "shadow-amber-500/30",
    ringColor: "ring-amber-500/20",
    bgTint: "bg-amber-500/10",
    textColor: "text-amber-400",
    dotColor: "bg-amber-400",
    lineColor: "from-amber-400 to-rose-400",
    duration: "1 día",
    entryDelay: 0.45,
  },
  {
    number: 5,
    icon: Rocket,
    title: "¡Arrancamos!",
    description: "Damos inicio al desarrollo y creamos tu MVP.",
    color: "rose",
    gradient: "from-rose-400 to-pink-400",
    glowColor: "shadow-rose-500/30",
    ringColor: "ring-rose-500/20",
    bgTint: "bg-rose-500/10",
    textColor: "text-rose-400",
    dotColor: "bg-rose-400",
    lineColor: "from-rose-400 to-pink-400",
    duration: "15 días",
    entryDelay: 0.6,
  },
];

export function ProcessSection() {
  const ref = useRef(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activePhase, setActivePhase] = useState(0);

  // Track which phase is most in viewport for progress indicator
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const stepEls = el.querySelectorAll('[data-step]');
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIdx = 0;
      let closestDist = Infinity;
      stepEls.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });
      setActivePhase(closestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isInView]);

  return (
    <section id="proceso" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
      <div className="absolute inset-0 dot-bg opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          ref={ref}
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <GitBranch className="w-3.5 h-3.5" />
            Proceso de Cotización
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Así transformamos tu idea en{" "}
            <span className="gradient-text">software real</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Un proceso claro, transparente y diseñado para resultados.
            Cada paso conectado como un roadmap de desarrollo.
          </p>
        </motion.div>

        {/* ============ DESKTOP: Horizontal Roadmap ============ */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* === MAIN ROADMAP LINE === */}
            <div className="absolute top-[52px] left-[6%] right-[6%] z-0">
              {/* Base gradient line (wide, subtle) */}
              <motion.div
                className="h-[6px] rounded-full opacity-20"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 via-violet-500 via-amber-500 to-rose-500 blur-[2px]" />
              </motion.div>

              {/* Inner bright line (narrow, sharp) */}
              <motion.div
                className="absolute top-[1px] left-0 right-0 h-[4px] rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-emerald-500/60 via-cyan-500/60 via-violet-500/60 via-amber-500/60 to-rose-500/60" />
              </motion.div>

              {/* Animated traveling pulse light */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-24 h-[6px] rounded-full"
                initial={{ left: "0%" }}
                animate={isInView ? { left: ["0%", "100%"] } : {}}
                transition={{
                  duration: 3,
                  delay: 2.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              >
                <div className="w-full h-full rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-[1px]" />
              </motion.div>

              {/* Animated traveling dot (node-to-node) */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                initial={{ left: "0%" }}
                animate={isInView ? { left: ["0%", "100%"] } : {}}
                transition={{
                  duration: 3,
                  delay: 2.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />

              {/* === SEGMENT CONNECTORS between nodes === */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`seg-${i}`}
                  className="absolute top-[1px] h-[4px]"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.25,
                    ease: "easeOut",
                  }}
                  style={{
                    transformOrigin: "left",
                    left: `${(i / 4) * 100}%`,
                    right: `${((3 - i) / 4) * 100}%`,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full bg-gradient-to-r ${steps[i].lineColor} opacity-50`}
                  />
                </motion.div>
              ))}

              {/* === CHEVRON ARROWS on segments === */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={`chevron-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 1.2 + i * 0.25,
                    ease: "easeOut",
                  }}
                  style={{
                    left: `${((i + 0.5) / 4) * 100 + 3}%`,
                  }}
                >
                  <div className="relative">
                    <ChevronRight
                      className={`w-4 h-4 text-white/30`}
                    />
                    {/* Glow behind chevron */}
                    <div className="absolute inset-0 blur-[4px] bg-white/20 rounded-full" />
                  </div>
                </motion.div>
              ))}

              {/* === MILESTONE DOTS at node positions === */}
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={`milestone-${i}`}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.7 + i * 0.2,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  style={{
                    left: `${(i / 4) * 100}%`,
                  }}
                >
                  <div className="w-3 h-3 rounded-full bg-white/40 border border-white/20" />
                </motion.div>
              ))}
            </div>

            {/* Step nodes */}
            <div className="relative z-10 flex justify-between items-start">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    data-step={step.number}
                    className="flex flex-col items-center w-[18%]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: step.entryDelay,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  >
                    {/* Node icon on the line — floating animation */}
                    <motion.div
                      className={`relative w-[56px] h-[56px] rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.glowColor} mb-5 ring-4 ring-[oklch(0.14_0.005_270)]`}
                      animate={isInView ? { y: [0, -5, 0] } : {}}
                      transition={{
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: step.entryDelay + index * 0.2 },
                      }}
                      whileHover={{
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        transition: { duration: 0.4 },
                      }}
                    >
                      <Icon className="w-5 h-5 text-white" />
                      {/* Pulse ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0`}
                        animate={
                          isInView
                            ? {
                                scale: [1, 1.5],
                                opacity: [0.3, 0],
                              }
                            : {}
                        }
                        transition={{
                          duration: 2,
                          delay: step.entryDelay + 1,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: "easeOut",
                        }}
                      />
                    </motion.div>

                    {/* Step number pill */}
                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${step.bgTint} text-[11px] font-bold ${step.textColor} mb-3`}
                    >
                      <CircleDot className="w-3 h-3" />
                      PASO {step.number}
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm mb-2 text-center">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-muted-foreground text-center leading-relaxed max-w-[160px]">
                      {step.description}
                    </p>

                    {/* Duration badge — visible on hover */}
                    <motion.div
                      className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: step.entryDelay + 0.5 }}
                    >
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium ${step.bgTint} ${step.textColor}`}>
                        <Clock className="w-2.5 h-2.5" />
                        {step.duration}
                      </span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

            {/* Phase progress indicator — shows current visible step */}
            <motion.div
              className="mt-8 mx-auto max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1.8 }}
            >
              <div className="flex items-center gap-2">
                {steps.map((step, i) => (
                  <div key={step.number} className="flex-1 flex flex-col items-center gap-1.5">
                    <div className="w-full flex items-center gap-1">
                      {i > 0 && <div className="flex-1 h-px bg-white/[0.06]" />}
                    </div>
                    <motion.div
                      className="flex items-center justify-center"
                      animate={{
                        scale: activePhase === i ? 1.4 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div
                        className={`w-2 h-2 rounded-full transition-all duration-500 ${
                          i <= activePhase
                            ? `${step.dotColor}`
                            : "bg-white/15"
                        }`}
                        style={i <= activePhase ? { boxShadow: `0 0 8px currentColor` } : undefined}
                      />
                    </motion.div>
                    <span className={`text-[9px] font-medium transition-colors duration-300 ${i <= activePhase ? step.textColor : "text-muted-foreground/30"}`}>
                      {step.number}/5
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* ============ MOBILE: Vertical Roadmap ============ */}
        <div className="lg:hidden">
          <div className="relative max-w-sm mx-auto">
            {/* Vertical connecting line - thick multi-color gradient */}
            <motion.div
              className="absolute left-[26px] top-0 bottom-0 w-[5px] z-0 rounded-full"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            >
              {/* Outer glow line */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-emerald-500/30 via-cyan-500/30 via-violet-500/30 via-amber-500/30 to-rose-500/30 blur-[2px]" />
              {/* Inner bright line */}
              <div className="absolute inset-[1px] rounded-full bg-gradient-to-b from-emerald-500/60 via-cyan-500/60 via-violet-500/60 via-amber-500/60 to-rose-500/60" />
              {/* Traveling light */}
              <motion.div
                className="absolute left-1/2 -translate-x-1/2 w-3 h-16 rounded-full bg-gradient-to-b from-transparent via-white/50 to-transparent"
                animate={{ top: ["0%", "90%"] }}
                transition={{
                  duration: 3,
                  delay: 2.5,
                  repeat: Infinity,
                  repeatDelay: 5,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            {/* Segment chevrons between steps */}
            <div className="absolute left-[22px] top-0 bottom-0 z-10 flex flex-col items-center">
              {steps.map((step, index) => (
                <motion.div
                  key={`mobile-chevron-${index}`}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: step.entryDelay + 0.5 }}
                  className="mt-[calc(52px+5rem+0.5rem)] mb-0 last:mb-0"
                >
                  <ChevronRight className="w-3 h-3 text-white/20 rotate-90" />
                </motion.div>
              ))}
            </div>

            {/* Steps */}
            <div className="relative z-10 flex flex-col gap-0">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.number}
                    data-step={step.number}
                    className="relative flex gap-5 py-5"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: step.entryDelay,
                      ease: "easeOut",
                    }}
                  >
                    {/* Node on the line — floating animation */}
                    <div className="relative flex-shrink-0">
                      <motion.div
                        className={`w-[56px] h-[56px] rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg ${step.glowColor} ring-4 ring-[oklch(0.14_0.005_270)]`}
                        animate={isInView ? { y: [0, -4, 0] } : {}}
                        transition={{
                          y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: step.entryDelay + index * 0.2 },
                        }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {/* Content card */}
                    <div className="flex-1 pt-1 pb-2">
                      <div
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${step.bgTint} text-[11px] font-bold ${step.textColor} mb-2`}
                      >
                        <CircleDot className="w-3 h-3" />
                        PASO {step.number}
                      </div>
                      <h3 className="font-semibold text-sm mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                      {/* Duration badge */}
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium mt-2 ${step.bgTint} ${step.textColor}`}>
                        <Clock className="w-2.5 h-2.5" />
                        {step.duration}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom process summary */}
        <motion.div
          className="mt-14 sm:mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/[0.06] bg-white/[0.02] text-sm text-muted-foreground">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </motion.div>
            <span>
              De la idea al producto en menos de{" "}
              <strong className="text-foreground">15 días</strong>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
