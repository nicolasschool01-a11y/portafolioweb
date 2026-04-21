"use client";

import { AnimateOnScroll } from "./Animations";
import { Badge } from "@/components/ui/badge";
import {
  Monitor,
  Smartphone,
  Database,
  ArrowUpRight,
  Layers,
  Sparkles,
  Clock,
  TrendingUp,
  Users,
  Zap,
  BarChart3,
  Star,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  icon: React.ElementType;
  color: string;
  gradientBorder: string;
  outcome: string;
  stats: { icon: React.ElementType; label: string; value: string }[];
}

const projects: Project[] = [
  {
    title: "Plataforma SaaS Enterprise",
    category: "Plataforma SaaS",
    description:
      "Plataforma de gestión empresarial con dashboards en tiempo real, automatización de workflows y análisis predictivo con IA.",
    longDescription:
      "Sistema completo de gestión diseñado para escalar. Incluye módulos de analytics avanzado, automatización de procesos críticos y panel de control en tiempo real con reportes personalizados.",
    image: "/project-saas.png",
    tags: ["Next.js", "TypeScript", "Prisma", "IA", "Dashboard"],
    icon: Monitor,
    color: "from-emerald-500 to-teal-500",
    gradientBorder: "from-emerald-500/30 via-teal-500/15 to-emerald-500/30",
    outcome: "+2.4K usuarios activos",
    stats: [
      { icon: Users, label: "Usuarios activos", value: "+2.4K" },
      { icon: Clock, label: "Uptime", value: "99.9%" },
      { icon: Zap, label: "Automatizaciones", value: "847/mes" },
    ],
  },
  {
    title: "App Móvil Multiplataforma",
    category: "Aplicación Móvil",
    description:
      "App nativa con experiencia fluida, notificaciones push, geolocalización y sincronización offline-first.",
    longDescription:
      "Aplicación móvil de alto rendimiento con arquitectura offline-first, integración de servicios de ubicación en tiempo real y experiencia de usuario premium con diseño intuitivo.",
    image: "/project-mobile.png",
    tags: ["React Native", "Node.js", "Firebase", "Maps API"],
    icon: Smartphone,
    color: "from-violet-500 to-purple-500",
    gradientBorder: "from-violet-500/30 via-purple-500/15 to-violet-500/30",
    outcome: "+10K descargas",
    stats: [
      { icon: TrendingUp, label: "Descargas", value: "+10K" },
      { icon: Star, label: "Rating", value: "4.8/5" },
      { icon: Clock, label: "Retención", value: "78%" },
    ],
  },
  {
    title: "CRM con Analytics Avanzado",
    category: "Sistema Web",
    description:
      "CRM con scoring de leads automatizado, funnel de conversión visual y reportes en tiempo real con exportación inteligente.",
    longDescription:
      "Sistema de gestión de relaciones con clientes que incluye scoring predictivo con IA, automatización de ventas y visualización de datos avanzada con dashboards personalizables.",
    image: "/project-crm.png",
    tags: ["Next.js", "PostgreSQL", "Charts", "API REST"],
    icon: Database,
    color: "from-amber-500 to-orange-500",
    gradientBorder: "from-amber-500/30 via-orange-500/15 to-amber-500/30",
    outcome: "+65% conversión",
    stats: [
      { icon: BarChart3, label: "Conversión", value: "+65%" },
      { icon: Users, label: "Leads/mes", value: "+1.2K" },
      { icon: Clock, label: "Tiempo cierre", value: "-40%" },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

export function PortfolioSection() {
  return (
    <section id="proyectos" className="relative py-24 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 dot-bg opacity-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <Layers className="w-3.5 h-3.5" />
            Portafolio
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Proyectos que{" "}
            <span className="gradient-text">generan impacto</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Soluciones a medida que transforman ideas en productos reales.
            Cada proyecto es una historia de crecimiento.
          </p>
        </AnimateOnScroll>

        {/* Projects Grid — 3 cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                custom={index}
                className="group relative h-full"
              >
                {/* Animated gradient border wrapper */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[1px]">
                  <div className={`w-full h-full bg-gradient-to-br ${project.gradientBorder} rounded-2xl`} />
                </div>

                <div
                  className="relative h-full rounded-2xl border border-white/[0.06] bg-card/40 hover:border-white/[0.12] transition-all duration-500 overflow-hidden card-shine card-border-glow"
                >
                  {/* Image container */}
                  <div className="relative h-52 sm:h-60 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.14_0.005_270)] via-[oklch(0.14_0.005_270)/30] to-transparent" />
                    {/* Hover gradient overlay that shifts on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.15] transition-opacity duration-700 pointer-events-none`} />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-black/50 backdrop-blur-md border-white/10 text-white text-[11px] font-medium"
                      >
                        {project.category}
                      </Badge>
                    </div>

                    {/* Outcome badge — always visible with enhanced styling */}
                    <div className="absolute top-4 right-4">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        <Badge className="bg-emerald-500/20 backdrop-blur-md border-emerald-500/20 text-emerald-300 text-[11px] font-medium flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          {project.outcome}
                        </Badge>
                      </motion.div>
                    </div>

                    {/* Hover overlay with eye icon */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-100 scale-75"
                      >
                        <Eye className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>

                    {/* "Ver detalles" link — slides up on hover */}
                    <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                      <div className="px-4 pb-4 flex justify-center">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-medium hover:bg-white/15 transition-colors duration-200">
                          Ver detalles
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Title row with icon */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[15px]">
                            {project.title}
                          </h3>
                          <p className="text-[11px] text-muted-foreground">
                            {project.category}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-emerald-400 transition-all duration-300 -translate-y-1 group-hover:translate-y-0" />
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-y border-white/[0.04]">
                      {project.stats.map((stat) => {
                        const StatIcon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="flex flex-col items-center gap-1"
                          >
                            <StatIcon className="w-3.5 h-3.5 text-muted-foreground/60" />
                            <span className="text-xs font-bold text-foreground">
                              {stat.value}
                            </span>
                            <span className="text-[9px] text-muted-foreground/50 text-center leading-tight">
                              {stat.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Long description — visible on hover */}
                    <div className="overflow-hidden max-h-0 group-hover:max-h-[80px] transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 mb-4">
                      <p className="text-xs text-muted-foreground/80 leading-relaxed border-t border-white/[0.06] pt-3">
                        {project.longDescription}
                      </p>
                    </div>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-[11px] rounded-md bg-white/[0.04] text-muted-foreground/70 border border-white/[0.04] group-hover:border-white/[0.08] transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover gradient overlay */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA hint */}
        <AnimateOnScroll className="mt-12 text-center">
          <p className="text-sm text-muted-foreground/60">
            Imágenes de referencia generadas con IA · Próximamente se reemplazarán con casos de desarrollo reales
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
