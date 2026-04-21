"use client";

import { motion, useInView } from "framer-motion";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./Animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRef, useState, useEffect } from "react";
import {
  Smartphone,
  Cpu,
  Layers,
  Clock,
  Code2,
  Headset,
  ArrowRight,
  ShieldCheck,
  Zap,
  Banknote,
} from "lucide-react";

const hoverGlowColors = [
  "hover:shadow-emerald-500/20 hover:shadow-lg",
  "hover:shadow-violet-500/20 hover:shadow-lg",
  "hover:shadow-cyan-500/20 hover:shadow-lg",
  "hover:shadow-amber-500/20 hover:shadow-lg",
  "hover:shadow-rose-500/20 hover:shadow-lg",
  "hover:shadow-teal-500/20 hover:shadow-lg",
];

const pricingFactors = [
  {
    icon: Smartphone,
    title: "Tipo de proyecto",
    description: "App móvil, web app, SaaS, automatización, e-commerce, landing page — cada formato tiene su propia complejidad.",
    gradient: "from-emerald-500 to-teal-500",
    glowColor: "bg-emerald-500/[0.06]",
  },
  {
    icon: Cpu,
    title: "Complejidad técnica",
    description: "Integraciones con APIs externas, inteligencia artificial, autenticación avanzada, tiempo real, microservicios.",
    gradient: "from-violet-500 to-purple-500",
    glowColor: "bg-violet-500/[0.06]",
  },
  {
    icon: Layers,
    title: "Alcance funcional",
    description: "Cantidad de features, módulos, pantallas, roles de usuario y flujos de negocio que necesita tu producto.",
    gradient: "from-cyan-500 to-sky-500",
    glowColor: "bg-cyan-500/[0.06]",
  },
  {
    icon: Clock,
    title: "Plazo de entrega",
    description: "Un timeline ajustado puede requerir más recursos. Se trabaja en base a la urgencia y prioridad del proyecto.",
    gradient: "from-amber-500 to-orange-500",
    glowColor: "bg-amber-500/[0.06]",
  },
  {
    icon: Code2,
    title: "Stack tecnológico",
    description: "Las tecnologías específicas que necesites influyen en el desarrollo. Trabajo con Next.js, React Native, IA y más.",
    gradient: "from-rose-500 to-pink-500",
    glowColor: "bg-rose-500/[0.06]",
  },
  {
    icon: Headset,
    title: "Soporte post-lanzamiento",
    description: "Meses de mantenimiento, corrección de bugs, nuevas features y soporte técnico continuo después del deploy.",
    gradient: "from-teal-500 to-emerald-600",
    glowColor: "bg-teal-500/[0.06]",
  },
];

const trustBadges = [
  {
    icon: ShieldCheck,
    label: "Sin costos ocultos",
  },
  {
    icon: Zap,
    label: "Propuesta en 24hs",
  },
  {
    icon: Banknote,
    label: "Pago por milestones",
  },
];

export function PricingPreview() {
  const counterRef = useRef(null);
  const counterInView = useInView(counterRef, { once: true });
  const [factorCount, setFactorCount] = useState(0);

  useEffect(() => {
    if (!counterInView) return;
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setFactorCount(Math.round(eased * 6));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [counterInView]);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.015] to-transparent" />
      <div className="absolute top-20 left-1/4 w-[350px] h-[350px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-32 right-1/4 w-[280px] h-[280px] bg-violet-500/[0.03] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── Header ─── */}
        <AnimateOnScroll className="text-center mb-16 sm:mb-20">
          <Badge
            variant="outline"
            className="mb-5 px-4 py-1.5 text-xs border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
          >
            💰 Inversión
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Inversión adaptada{" "}
            <span className="gradient-text">a tu proyecto</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Cada proyecto es único. El precio depende del tipo de solución, la complejidad técnica,
            el alcance funcional, los plazos y el stack. Sin sorpresas — siempre con transparencia.
          </p>
          {/* Animated factor counter */}
          <div ref={counterRef} className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="text-2xl font-bold gradient-text-emerald">{factorCount}</span>
            <span className="text-sm text-muted-foreground">factores que definen tu inversión</span>
          </div>
        </AnimateOnScroll>

        {/* ─── Pricing Factors Grid ─── */}
        <StaggerContainer
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6 mb-20 sm:mb-24"
          staggerDelay={0.1}
        >
          {pricingFactors.map((factor, idx) => (
            <StaggerItem key={factor.title}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`relative h-full rounded-2xl border border-white/[0.06] bg-card/50 p-6 sm:p-7 flex flex-col transition-all duration-500 hover:border-white/[0.12] group cursor-default overflow-hidden shimmer-sweep ${hoverGlowColors[idx] || ""}`}
              >
                {/* Corner glow on hover */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 ${factor.glowColor} rounded-full opacity-0 group-hover:opacity-100 blur-[60px] transition-opacity duration-700`} />

                {/* Top accent line on hover */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${factor.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl bg-gradient-to-br ${factor.gradient} flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <factor.icon className="w-5 h-5 text-white" />
                </div>

                {/* Text */}
                <h3 className="font-semibold text-base mb-2 group-hover:text-white transition-colors duration-300">
                  {factor.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 group-hover:text-foreground/70 transition-colors duration-300">
                  {factor.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ─── Trust Badges ─── */}
        <AnimateOnScroll delay={0.15} className="mb-14 sm:mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
              >
                <badge.icon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-muted-foreground font-medium">{badge.label}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* ─── CTA ─── */}
        <AnimateOnScroll delay={0.2}>
          <div className="text-center">
            <Button
              onClick={() => scrollTo("#contacto")}
              size="lg"
              className="relative h-13 px-8 text-base font-semibold rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/30 hover:shadow-2xl transition-all duration-300 group/btn overflow-hidden"
            >
              <div className="absolute inset-0 animate-shimmer pointer-events-none" />
              Solicitar cotización gratuita
              <ArrowRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform relative z-10" />
            </Button>
            <p className="text-xs text-muted-foreground/50 mt-4 max-w-md mx-auto">
              Respondo en menos de 24 horas. Sin compromisos ni costos ocultos.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
