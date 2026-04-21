"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { AnimateOnScroll } from "./Animations";
import { Bolt, Clock, Target, RefreshCw, Zap, TrendingUp } from "lucide-react";

function AnimatedBar({ target, delay, color, shimmer = false }: { target: string; delay: number; color: string; shimmer?: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      <div className="h-3.5 rounded-full bg-white/5 overflow-hidden relative">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: target } : { width: 0 }}
          transition={{ duration: 2, delay, ease: [0.25, 0.1, 0.25, 1] }}
          className={`h-full rounded-full ${color}`}
        />
        {shimmer && isInView && (
          <motion.div
            className="absolute inset-0 rounded-full"
            initial={{ left: "-40%" }}
            animate={{ left: "140%" }}
            transition={{ duration: 1.5, delay: delay + 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
            style={{
              background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 30%) 50%, transparent 100%)",
              width: "40%",
            }}
          />
        )}
      </div>
    </div>
  );
}

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3 px-3 py-2 rounded-lg bg-card border border-white/10 shadow-xl shadow-black/30 z-30 w-56 pointer-events-none"
          >
            <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
            <div className="absolute right-full top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-card border-l border-b border-white/10" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DifferentialSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Background orbs */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text */}
          <AnimateOnScroll direction="left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
              <Zap className="w-3 h-3" />
              Diferencial
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 leading-[1.15]">
              No trabajo como una{" "}
              <span className="gradient-text">agencia tradicional</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-10">
              Construyo versiones funcionales en tiempo récord para que puedas validar,
              vender y mejorar sin perder meses ni miles de dólares.
            </p>

            <div className="space-y-5">
              {[
                {
                  icon: Bolt,
                  title: "IA como motor",
                  desc: "Uso inteligencia artificial para acelerar cada etapa del desarrollo.",
                  color: "text-emerald-400",
                  bg: "bg-emerald-500/10 border-emerald-500/15 hover:bg-emerald-500/20 hover:border-emerald-500/25",
                  tooltip: "GPT-4, Claude, Gemini y herramientas propietarias de automatización para cada fase del proyecto.",
                },
                {
                  icon: Clock,
                  title: "Días, no meses",
                  desc: "MVPs funcionales listos en tiempo récord para que valides rápido.",
                  color: "text-cyan-400",
                  bg: "bg-cyan-500/10 border-cyan-500/15 hover:bg-cyan-500/20 hover:border-cyan-500/25",
                  tooltip: "Flujos de trabajo optimizados con IA que reducen hasta un 80% el tiempo de desarrollo.",
                },
                {
                  icon: Target,
                  title: "Enfoque en resultados",
                  desc: "Cada línea de código está orientada a generar valor para tu negocio.",
                  color: "text-violet-400",
                  bg: "bg-violet-500/10 border-violet-500/15 hover:bg-violet-500/20 hover:border-violet-500/25",
                  tooltip: "KPIs definidos desde el día 1: conversión, retención, engagement y ROI medible.",
                },
                {
                  icon: RefreshCw,
                  title: "Iteración continua",
                  desc: "Lanzamos, medimos, mejoramos. Sin esperar ciclos largos de desarrollo.",
                  color: "text-amber-400",
                  bg: "bg-amber-500/10 border-amber-500/15 hover:bg-amber-500/20 hover:border-amber-500/25",
                  tooltip: "Deploy continuo, métricas en tiempo real y feedback loops semanales con el cliente.",
                },
              ].map((item, i) => (
                <Tooltip key={item.title} text={item.tooltip}>
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="flex gap-4 group cursor-default"
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${item.bg} border flex items-center justify-center transition-all duration-300`}>
                    <item.icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-0.5 text-sm group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
                </Tooltip>
              ))}
            </div>
          </AnimateOnScroll>

          {/* Visual */}
          <AnimateOnScroll direction="right" delay={0.2}>
            <div className="relative">
              {/* NicoPrompt emerald pulse glow background */}
              <motion.div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at center, oklch(0.72 0.19 163 / 0.06) 0%, transparent 70%)",
                }}
                animate={{
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main card */}
              <div className="relative rounded-2xl border border-white/[0.06] bg-card/50 backdrop-blur-sm p-7 sm:p-8 animated-gradient-border">
                <div className="space-y-7">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="font-semibold">NicoPrompt vs Agencia tradicional</h3>
                  </div>

                  {/* Comparison bars with VS circle and gradient line */}
                  <div className="relative">
                    <div>
                      <div className="flex justify-between text-sm mb-2.5">
                        <span className="text-muted-foreground">Agencia tradicional</span>
                        <span className="text-red-400/80 text-xs font-medium">3-6 meses</span>
                      </div>
                      <AnimatedBar
                        target="100%"
                        delay={0.3}
                        color="bg-gradient-to-r from-red-500/30 to-red-500/10"
                      />
                    </div>

                    {/* Horizontal animated gradient connector line (desktop) */}
                    <div className="hidden lg:block relative h-6 my-1">
                      <motion.div
                        className="absolute left-0 right-0 top-1/2 h-px"
                        style={{
                          background: "linear-gradient(90deg, oklch(0.65 0.2 25 / 0.3), oklch(0.72 0.19 163 / 0.4) 50%, oklch(0.72 0.19 163 / 0.3))",
                        }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                      />

                      {/* Animated VS circle (desktop) */}
                      <motion.div
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/[0.08] bg-card/80 backdrop-blur-sm flex items-center justify-center z-10"
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                          delay: 0.7,
                        }}
                      >
                        <motion.span
                          className="text-[11px] font-bold gradient-text"
                          animate={{
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          VS
                        </motion.span>
                        {/* Subtle ring glow */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            boxShadow: "0 0 12px oklch(0.72 0.19 163 / 0.2), 0 0 4px oklch(0.72 0.19 163 / 0.1)",
                          }}
                          animate={{
                            opacity: [0.3, 0.7, 0.3],
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      </motion.div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2.5">
                        <span className="text-foreground font-medium">NicoPrompt + IA</span>
                        <span className="text-emerald-400 text-xs font-bold">5-15 días</span>
                      </div>
                      <AnimatedBar
                        target="22%"
                        delay={0.6}
                        color="bg-gradient-to-r from-emerald-500 to-teal-500 shadow-sm shadow-emerald-500/30"
                        shimmer
                      />
                    </div>
                  </div>

                  {/* Savings callout */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 oklch(0.72 0.19 163 / 0%)",
                        "0 0 20px 0 oklch(0.72 0.19 163 / 8%)",
                        "0 0 0 0 oklch(0.72 0.19 163 / 0%)",
                      ],
                    }}
                    transition={{
                      opacity: { delay: 0.8, duration: 0.4 },
                      scale: { delay: 0.8, duration: 0.4 },
                      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/[0.06] to-teal-500/[0.04] border border-emerald-500/10"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm font-semibold gradient-text">Ahorro estimado</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Hasta <span className="text-emerald-400 font-bold">$70,000 USD</span> vs. una agencia tradicional, con entrega en una fracción del tiempo.
                    </p>
                  </motion.div>

                  {/* Stats grid */}
                  <div className="border-t border-white/5 pt-6">
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Costo típico agencia", value: "$15K - $80K", highlight: false },
                        { label: "Con NicoPrompt", value: "Desde $2K", highlight: true },
                        { label: "Código propio", value: "100%", highlight: false },
                        { label: "Velocidad", value: "5x más rápido", highlight: true },
                      ].map((item, idx) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 1.0 + idx * 0.1 }}
                          className={`p-3.5 rounded-xl transition-colors ${
                            item.highlight
                              ? "bg-emerald-500/[0.06] border border-emerald-500/10"
                              : "bg-white/[0.03]"
                          }`}
                        >
                          <div className="text-[11px] text-muted-foreground mb-1">{item.label}</div>
                          <div
                            className={`font-bold text-sm ${
                              item.highlight ? "gradient-text" : "text-foreground"
                            }`}
                          >
                            {item.value}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl blur-xl -z-10" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
