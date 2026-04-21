"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll, StaggerContainer, StaggerItem, useScrollReveal } from "./Animations";
import { Code2, Layout, Settings, Smartphone, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Smartphone,
    title: "Aplicaciones a medida",
    description:
      "Apps web y móviles adaptadas exactamente a tu negocio. Desde e-commerce hasta plataformas SaaS, construyo soluciones que escalan.",
    gradient: "from-emerald-500 to-teal-500",
    shadowColor: "shadow-emerald-500/20",
    glowColor: "hover:shadow-emerald-500/10",
    features: ["Web & Mobile", "SaaS", "E-commerce"],
    stat: { value: "12+", label: "Apps entregadas" },
    borderColor: "hover:border-emerald-500/30",
  },
  {
    icon: Settings,
    title: "Sistemas internos",
    description:
      "Automatización, gestión, dashboards y CRMs personalizados. Conectá tus procesos y eliminá tareas repetitivas.",
    gradient: "from-violet-500 to-purple-500",
    shadowColor: "shadow-violet-500/20",
    glowColor: "hover:shadow-violet-500/10",
    features: ["CRM", "Dashboards", "Automatización"],
    stat: { value: "847", label: "Automatizaciones" },
    borderColor: "hover:border-violet-500/30",
  },
  {
    icon: Layout,
    title: "Webs de alto impacto",
    description:
      "Diseño moderno con foco en conversión. Landing pages, sitios corporativos y plataformas que generan resultados.",
    gradient: "from-amber-500 to-orange-500",
    shadowColor: "shadow-amber-500/20",
    glowColor: "hover:shadow-amber-500/10",
    features: ["Landing pages", "Corporativas", "Conversión"],
    stat: { value: "50+", label: "Sitios publicados" },
    borderColor: "hover:border-amber-500/30",
  },
  {
    icon: Code2,
    title: "Automatización con IA",
    description:
      "Integraciones inteligentes, chatbots, procesamiento de datos y flujos automatizados que ahorran tiempo y dinero.",
    gradient: "from-cyan-500 to-blue-500",
    shadowColor: "shadow-cyan-500/20",
    glowColor: "hover:shadow-cyan-500/10",
    features: ["Chatbots", "Integraciones", "Data pipelines"],
    stat: { value: "30+", label: "Bots desplegados" },
    borderColor: "hover:border-cyan-500/30",
  },
];

function ServiceCard({ service }: { service: typeof services[number] }) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
      className={`group relative h-full p-6 rounded-2xl bg-card/50 border border-white/[0.06] overflow-hidden transition-all duration-500 ${service.borderColor} hover:shadow-2xl ${service.glowColor} cursor-default card-shine spotlight hover:gradient-border-animated`}
    >
      {/* Animated gradient left border */}
      <motion.div
        className="absolute top-0 left-0 w-[3px] h-full rounded-l-2xl"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          background: `linear-gradient(to bottom, var(--tw-gradient-from) 0%, var(--tw-gradient-to) 100%)`,
          backgroundSize: "100% 200%",
          animation: isVisible ? "gradient-shift 3s ease-in-out infinite" : "none",
        }}
      >
        <div className={`absolute inset-0 bg-gradient-to-b ${service.gradient}`} />
      </motion.div>

      {/* Hover gradient overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500`} />

      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

      {/* Corner glow on hover */}
      <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${service.gradient} rounded-full opacity-0 group-hover:opacity-[0.08] blur-[60px] transition-opacity duration-700`} />

      {/* Bottom corner glow */}
      <div className={`absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr ${service.gradient} rounded-full opacity-0 group-hover:opacity-[0.05] blur-[60px] transition-opacity duration-700`} />

      <div className="relative z-10">
        {/* Icon + stat badge */}
        <div className="flex items-start justify-between mb-5">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg ${service.shadowColor} group-hover:scale-110 group-hover:rotate-[5deg] transition-all duration-300`}
          >
            <service.icon className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.04] text-[10px] text-muted-foreground/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="font-bold text-foreground">{service.stat.value}</span> {service.stat.label}
          </div>
        </div>

        {/* Title & description */}
        <h3 className="text-lg font-semibold mb-2.5 group-hover:text-white transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {service.description}
        </p>

        {/* Feature tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {service.features.map((feature) => (
            <motion.span
              key={feature}
              whileHover={{ scale: 1.05 }}
              className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-muted-foreground/70 border border-white/[0.04] group-hover:border-white/[0.12] group-hover:text-foreground/80 group-hover:bg-white/[0.06] transition-all duration-300"
            >
              {feature}
            </motion.span>
          ))}
        </div>

        {/* Arrow indicator */}
        <div className="flex items-center gap-1 text-xs text-muted-foreground/40 group-hover:text-emerald-400 transition-colors duration-300">
          <span>Ver más</span>
          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
}

export function ServicesSection() {
  return (
    <section id="servicios" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            🚀 Servicios
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Todo lo que necesitás para{" "}
            <span className="gradient-text">llevar tu negocio al siguiente nivel</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Soluciones de software completas, diseñadas para crecer con tu empresa.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5" staggerDelay={0.12}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <ServiceCard service={service} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Ver todos los servicios link */}
        <AnimateOnScroll delay={0.4} className="text-center mt-12">
          <button
            onClick={() => document.querySelector("#tech-stack")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 text-sm text-emerald-400/80 hover:text-emerald-400 transition-colors duration-200 group/link"
          >
            <span>Ver todos los servicios</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
          </button>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
