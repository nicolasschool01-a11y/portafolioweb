"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./Animations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, UtensilsCrossed, Building2, Stethoscope, GraduationCap, Wallet, ShoppingCart } from "lucide-react";

const industries = [
  {
    title: "App para Restaurantes",
    desc: "Pedidos, delivery, reservas y gestión de menú digital.",
    emoji: "🍽️",
    icon: UtensilsCrossed,
    keywords: ["e-commerce", "delivery", "reservas"],
    color: "from-orange-500 to-red-500",
    hoverOutcome: "+45% eficiencia operativa",
  },
  {
    title: "CRM para Inmobiliarias",
    desc: "Gestión de propiedades, clientes y pipeline de ventas.",
    emoji: "🏠",
    icon: Building2,
    keywords: ["CRM", "pipeline", "propiedades"],
    color: "from-emerald-500 to-teal-500",
    hoverOutcome: "+60% cierre de ventas",
  },
  {
    title: "Sistema para Clínicas",
    desc: "Turnos, historial médico y gestión de pacientes.",
    emoji: "🏥",
    icon: Stethoscope,
    keywords: ["turnos", "pacientes", "salud"],
    color: "from-cyan-500 to-blue-500",
    hoverOutcome: "-70% errores manuales",
  },
  {
    title: "Plataforma Educativa",
    desc: "Cursos online, evaluaciones y seguimiento de alumnos.",
    emoji: "📚",
    icon: GraduationCap,
    keywords: ["e-learning", "cursos", "alumnos"],
    color: "from-violet-500 to-purple-500",
    hoverOutcome: "+200% alumnos activos",
  },
  {
    title: "Dashboard Financiero",
    desc: "Reportes, análisis y control de gastos automatizado.",
    emoji: "💰",
    icon: Wallet,
    keywords: ["finanzas", "reportes", "analytics"],
    color: "from-amber-500 to-yellow-500",
    hoverOutcome: "3x ROI en 6 meses",
  },
  {
    title: "Gestión de E-commerce",
    desc: "Inventario, pedidos y automatización de ventas.",
    emoji: "🛒",
    icon: ShoppingCart,
    keywords: ["tienda online", "inventario", "ventas"],
    color: "from-rose-500 to-pink-500",
    hoverOutcome: "+35% conversión online",
  },
];

function IndustryCounter() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    let frame: number;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / 1500, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 6));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isInView]);

  return (
    <motion.span
      ref={ref}
      className="gradient-text font-bold text-lg"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.4 }}
    >
      industrias
    </motion.span>
  );
}

export function SEOSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.015] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            🎯 Soluciones por industria
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Software para{" "}
            <span className="gradient-text">tu industria</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Soluciones específicas diseñadas para los desafíos de cada sector.
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="gradient-text font-bold text-lg">6+</span>
            <IndustryCounter />
          </div>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5" staggerDelay={0.08}>
          {industries.map((industry, index) => (
            <StaggerItem key={industry.title}>
              <motion.div
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className="group card-shine relative p-5 sm:p-6 rounded-2xl border border-white/[0.06] bg-card/50 hover:border-white/[0.12] transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Hover gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300`}
                />

                {/* Top accent line */}
                <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${industry.color} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />

                {/* Corner glow */}
                <div className={`absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-br ${industry.color} rounded-full opacity-0 group-hover:opacity-[0.06] blur-[60px] transition-opacity duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.span
                      className="text-3xl block"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {industry.emoji}
                    </motion.span>
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-8 h-8 rounded-lg bg-gradient-to-br ${industry.color} flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity duration-300`}
                    >
                      <industry.icon className="w-4 h-4 text-white" />
                    </motion.div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-white transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {industry.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {industry.keywords.map((kw) => (
                      <Badge
                        key={kw}
                        variant="outline"
                        className="text-[11px] border-white/10 text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-colors"
                      >
                        {kw}
                      </Badge>
                    ))}
                  </div>
                  <motion.span className="absolute bottom-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{industry.hoverOutcome}</motion.span>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll delay={0.3}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-muted-foreground mb-4">
              ¿No encontrás tu industria? Igual puedo ayudarte.
            </p>
            <Button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              variant="outline"
              className="relative overflow-hidden border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/50 rounded-xl group shimmer-sweep"
            >
              Contame tu caso
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
            </Button>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
