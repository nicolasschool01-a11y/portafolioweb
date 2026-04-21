"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./Animations";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  Maximize2,
  Clock,
  DollarSign,
  Sparkles,
  ClipboardList,
  AlertTriangle,
  Hourglass,
  Ban,
  Zap,
  CheckCircle2,
  Rocket,
  Infinity,
  ArrowRight,
} from "lucide-react";

function useAnimatedCounter(target: number, duration: number, isActive: boolean, suffix = "") {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isActive) return;
    const startTime = performance.now();
    let frame: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isActive, target, duration]);
  return `${count}${suffix}`;
}

const benefits = [
  {
    icon: Cpu,
    title: "Automatizar tareas repetitivas",
    description: "Eliminá horas de trabajo manual. Un sistema a medida ejecuta procesos por vos, sin errores.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: TrendingUp,
    title: "Vender más sin aumentar costos",
    description: "Escalemos tu operación con software que trabaja 24/7, sin contratar más personal.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: ShieldCheck,
    title: "Control total de tu operación",
    description: "Toda tu información, reglas y flujos en un solo lugar. Sin depender de plataformas de terceros.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Maximize2,
    title: "Escalar sin limitaciones",
    description: "Herramientas genéricas te frenan. Software propio crece exactamente como tu negocio lo necesita.",
    color: "from-amber-500 to-orange-500",
  },
];

const stats = [
  { icon: Clock, value: 40, suffix: "%", label: "menos tiempo en operaciones" },
  { icon: DollarSign, value: 3, suffix: "x", label: "ROI promedio en 6 meses" },
  { icon: Sparkles, value: 24, suffix: "hs", label: "tiempo de respuesta promedio" },
];

const beforeItems = [
  { icon: ClipboardList, label: "Proceso manual" },
  { icon: Hourglass, label: "Horas de trabajo" },
  { icon: AlertTriangle, label: "Errores frecuentes" },
  { icon: Ban, label: "Escalado limitado" },
];

const afterItems = [
  { icon: Zap, label: "Automatizado" },
  { icon: CheckCircle2, label: "Rápido y seguro" },
  { icon: ShieldCheck, label: "Sin errores" },
  { icon: Infinity, label: "Ilimitado" },
];

function AnimatedStat({ stat, index }: { stat: typeof stats[number]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const display = useAnimatedCounter(stat.value, 2000, isInView, stat.suffix);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 + index * 0.15 }}
      className="flex items-center gap-4"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center shrink-0">
        <stat.icon className="w-5 h-5 text-emerald-400" />
      </div>
      <div>
        <div className="text-2xl sm:text-3xl font-bold gradient-text">{display}</div>
        <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
      </div>
    </motion.div>
  );
}

export function EducationSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.015] to-transparent" />

      {/* Static gradient orbs */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-emerald-500/[0.07] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 right-[5%] w-80 h-80 bg-teal-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-violet-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

      {/* Animated floating orbs */}
      <div className="absolute top-[15%] left-[5%] w-4 h-4 rounded-full bg-emerald-500/20 blur-sm animate-orb pointer-events-none" />
      <div className="absolute top-[60%] right-[8%] w-3 h-3 rounded-full bg-teal-500/25 blur-sm animate-orb-reverse pointer-events-none" />
      <div className="absolute bottom-[25%] left-[15%] w-3.5 h-3.5 rounded-full bg-cyan-500/20 blur-sm animate-orb pointer-events-none" style={{ animationDelay: '-5s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            🧪 Por qué software a medida
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            La mayoría de los negocios{" "}
            <span className="gradient-text">pierde oportunidades</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Un software a medida no es un gasto — es una inversión que transforma cómo operás y crecés.
          </p>
        </AnimateOnScroll>

        {/* Before vs After comparison */}
        <AnimateOnScroll delay={0.1}>
          <div className="relative mb-16 max-w-3xl mx-auto">
            {/* Before/After labels — only visible on desktop */}
            <div className="hidden sm:flex items-center justify-between px-1 mb-3 sm:mb-4">
              <span className="text-[11px] uppercase tracking-widest font-semibold text-red-400/60">
                Antes
              </span>
              <div />
              <span className="text-[11px] uppercase tracking-widest font-semibold text-emerald-400/70">
                Después
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 relative">
              {/* Mobile label: Antes */}
              <span className="sm:hidden text-[11px] uppercase tracking-widest font-semibold text-red-400/60 mb-1">
                Antes
              </span>
              {/* Sin Software */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-red-500/15 hover:border-red-500/25 transition-all duration-300"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-red-500/30 to-transparent" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/15 flex items-center justify-center">
                    <Ban className="w-4 h-4 text-red-400" />
                  </div>
                  <h4 className="font-semibold text-red-400 text-sm">Sin software</h4>
                </div>
                <ul className="space-y-3">
                  {beforeItems.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-red-400/60 shrink-0" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Mobile label: Después */}
              <span className="sm:hidden text-[11px] uppercase tracking-widest font-semibold text-emerald-400/70 mt-2 mb-1">
                Después
              </span>
              {/* Con NicoPrompt — slightly larger on desktop */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative p-5 sm:p-6 md:p-7 lg:p-8 md:scale-[1.03] rounded-2xl bg-emerald-500/[0.03] border border-emerald-500/15 hover:border-emerald-500/25 transition-all duration-300 shadow-lg shadow-emerald-500/[0.05]"
              >
                <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-emerald-500/40 to-transparent" />
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                    <Rocket className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h4 className="font-semibold text-emerald-400 text-sm">Con NicoPrompt</h4>
                </div>
                <ul className="space-y-3">
                  {afterItems.map((item) => (
                    <li key={item.label} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-emerald-400 shrink-0" />
                      {item.label}
                    </li>
                  ))}
                </ul>
              </motion.div>


              {/* Animated VS badge — centred between cards on desktop */}
              <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 20 }}
                  className="vs-badge"
                >
                  <span className="text-[10px] font-extrabold tracking-widest text-white">VS</span>
                </motion.div>
              </div>

              {/* Transformation arrow — visible only on desktop, below cards */}
              <div className="hidden sm:flex items-center justify-center absolute -bottom-7 left-0 right-0 z-10 pointer-events-none">
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                  className="flex items-center gap-2 text-emerald-500/40"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest font-medium">Transformación</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Key stat callout */}
        <AnimateOnScroll delay={0.2}>
          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative flex items-center gap-3 p-4 sm:p-5 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.04] overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/15 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  La mayoría de clientes recupera su inversión en menos de 3 meses
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Resultados medibles desde la primera semana de implementación
                </p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid lg:grid-cols-3 gap-6 mb-12 relative">
          {/* Glowing accent line separator between benefits and stats (visible on lg) */}
          <div className="hidden lg:block absolute top-8 bottom-8 left-[66.5%] z-20 pointer-events-none">
            <div className="w-px h-full bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-emerald-500/40 blur-sm glow-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 glow-pulse" />
          </div>

          {/* Benefits grid with staggered scale animations */}
          <StaggerContainer
            className="lg:col-span-2 grid sm:grid-cols-2 gap-5 sm:gap-6"
            staggerDelay={0.12}
          >
            {benefits.map((benefit) => (
              <StaggerItem key={benefit.title}>
                <motion.div
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                  className="group relative h-full p-6 rounded-2xl bg-card/50 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 cursor-default card-shine overflow-hidden"
                >
                  {/* Top accent line */}
                  <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${benefit.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-full`} />

                  {/* Hover glow border matching section colors */}
                  <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-[0.08] blur-sm transition-opacity duration-500 pointer-events-none -z-10`} />

                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    {/* Lifetime access badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-[10px] text-emerald-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Infinity className="w-3 h-3" />
                      <span>Acceso vitalicio</span>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-white transition-colors">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Stats sidebar */}
          <AnimateOnScroll direction="right" delay={0.3}>
            <div className="h-full flex flex-col justify-center rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.06] to-teal-500/[0.03] p-6 sm:p-8 relative overflow-hidden">
              {/* Decorative corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-tr-2xl pointer-events-none" />

              <h3 className="text-lg sm:text-xl font-bold mb-6 gradient-text relative z-10">
                Datos que hablan por sí solos
              </h3>
              <div className="space-y-5 relative z-10">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="cursor-default rounded-lg"
                  >
                    <AnimatedStat stat={stat} index={index} />
                  </motion.div>
                ))}
              </div>

              {/* Testimonial with animated border-glow */}
              <div className="mt-8 p-4 rounded-xl bg-white/5 border border-emerald-500/15 relative overflow-hidden animated-testimonial-border">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-emerald-500/60 to-transparent" />
                <p className="text-sm text-muted-foreground italic pl-3">
                  &quot;Después de implementar el sistema a medida, redujimos un 60% el tiempo de procesamiento
                  de pedidos y aumentamos nuestras ventas online en un 40%.&quot;
                </p>
                <p className="text-xs text-emerald-400 mt-2 font-medium pl-3">
                  — Cliente de NicoPrompt, restaurante cadena
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      {/* Animated testimonial border-glow & VS badge styles */}
      <style jsx global>{`
        .animated-testimonial-border {
          animation: testimonial-glow 3s ease-in-out infinite;
        }
        @keyframes testimonial-glow {
          0%, 100% { box-shadow: 0 0 8px rgba(16, 185, 129, 0.05), inset 0 0 8px rgba(16, 185, 129, 0.02); border-color: rgba(16, 185, 129, 0.15); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.12), inset 0 0 12px rgba(16, 185, 129, 0.04); border-color: rgba(16, 185, 129, 0.3); }
        }

        /* VS badge */
        .vs-badge {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.15));
          border: 1.5px solid rgba(16, 185, 129, 0.35);
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.15), 0 0 24px rgba(16, 185, 129, 0.08);
          animation: vs-glow 2.5s ease-in-out infinite;
          backdrop-filter: blur(8px);
        }
        @keyframes vs-glow {
          0%, 100% { box-shadow: 0 0 12px rgba(16, 185, 129, 0.15), 0 0 24px rgba(16, 185, 129, 0.08); border-color: rgba(16, 185, 129, 0.35); }
          50% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.35), 0 0 40px rgba(16, 185, 129, 0.15); border-color: rgba(16, 185, 129, 0.6); }
        }
      `}</style>
    </section>
  );
}
