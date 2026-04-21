"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./Animations";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Users,
  Zap,
  Award,
  Camera,
  Cpu,
  Globe,
  Database,
  Shield,
  DollarSign,
  ArrowRight,
  Sparkles,
  Clock,
  BarChart3,
  ExternalLink,
  Trophy,
} from "lucide-react";

function ScreenshotParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <motion.div ref={ref} style={{ y }} className="relative h-full">
      {children}
    </motion.div>
  );
}

export function SocialProofSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 dot-bg opacity-20" />

      {/* Gradient orbs */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll>
          <div className="text-center mb-16 sm:mb-20">
            {/* Caso de éxito badge with trophy */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold mb-5 tracking-wide uppercase">
              <Trophy className="w-3.5 h-3.5" />
              Caso de éxito
            </div>
            <Badge
              variant="outline"
              className="mb-6 px-5 py-2 text-xs font-medium border-emerald-500/30 bg-emerald-500/5 text-emerald-400 tracking-wide uppercase"
            >
              <Sparkles className="w-3 h-3 mr-1.5" />
              Proyecto Destacado
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Resultados reales,{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                no promesas
              </span>
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
              BrandiShot: una plataforma SaaS que democratiza la fotografía gastronómica
              profesional con Inteligencia Artificial, transformando fotos de celular en
              imágenes publicitarias de alta gama en menos de 60 segundos.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Main Case Study Card */}
        <AnimateOnScroll delay={0.15}>
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-card/60 backdrop-blur-sm shadow-2xl shadow-emerald-500/5">
            {/* On mobile: image on top, content below. On desktop: side by side */}
            <div className="flex flex-col lg:flex-row lg:items-stretch">

              {/* Project Screenshot - Full-fit container with parallax */}
              <div className="relative w-full lg:w-[45%] shrink-0">
                <div className="relative bg-[#0c0c14] overflow-hidden rounded-none lg:rounded-l-2xl h-full aspect-[9/16] lg:aspect-auto min-h-[550px] lg:min-h-full">
                    <ScreenshotParallax>
                      <img
                        src="https://res.cloudinary.com/dvbkp3ml7/image/upload/v1776779603/INCRUSTA_LA_FOTO_202604211053_hzsykv.jpg"
                        alt="BrandiShot - Plataforma de Transformación de Menús con IA"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                    </ScreenshotParallax>

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/50 via-transparent to-[#0c0c14]/30 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[oklch(0.14_0.005_270)/40] pointer-events-none" />

                  {/* Floating badge with pulsing ring */}
                  <div className="absolute top-4 left-4 relative">
                    <div className="absolute inset-0 rounded-full bg-emerald-500/10 animate-pulse-ring pointer-events-none" />
                    <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-medium text-white/90">En producción</span>
                    </div>
                  </div>

                  {/* External link badge */}
                  <a
                    href="https://brandishot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 flex items-center gap-2 px-3 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/80 transition-all group z-10"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="text-xs font-medium">Ver en vivo</span>
                  </a>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center">
                {/* Brand Header */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">BrandiShot</h3>
                    <p className="text-xs text-muted-foreground">
                      Transformación de Menús con IA y SEO Programático
                    </p>
                  </div>
                </div>

                {/* Core Description */}
                <div className="mt-5 mb-6 lg:mb-8">
                  <p className="text-muted-foreground leading-relaxed text-sm mb-3">
                    Plataforma SaaS que resuelve el{" "}
                    <span className="text-white font-medium">
                      &ldquo;cuello de botella&rdquo; visual
                    </span>{" "}
                    de la industria gastronómica. Convierte fotos básicas de celular en
                    fotografías publicitarias de alta gama en{" "}
                    <span className="text-emerald-400 font-semibold">menos de 60 segundos</span>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed text-sm hidden sm:block">
                    El motor analiza composición, iluminación y texturas, regenerando el
                    entorno con un acabado de{" "}
                    <span className="text-emerald-400 font-semibold">
                      &ldquo;foto de estudio de $50,000 USD&rdquo;
                    </span>
                    .
                  </p>
                </div>

                {/* Impact Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {
                      icon: Clock,
                      label: "Transformación",
                      value: "<60s",
                      accent: "from-emerald-500 to-teal-500",
                    },
                    {
                      icon: TrendingUp,
                      label: "Más clics delivery",
                      value: "+40%",
                      accent: "from-orange-500 to-amber-500",
                    },
                    {
                      icon: Globe,
                      label: "Páginas SEO",
                      value: "+300K",
                      accent: "from-blue-500 to-cyan-500",
                    },
                    {
                      icon: DollarSign,
                      label: "Ahorro",
                      value: "~$500",
                      accent: "from-violet-500 to-purple-500",
                    },
                  ].map((metric) => (
                    <motion.div
                      key={metric.label}
                      whileHover={{ y: -3, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group relative p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/5"
                    >
                      <div className={`absolute inset-x-0 top-0 h-[2px] rounded-t-xl bg-gradient-to-r ${metric.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-br ${metric.accent} flex items-center justify-center mb-2 opacity-80`}
                      >
                        <metric.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <div className="text-base sm:text-lg font-bold tracking-tight">
                        {metric.value}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-muted-foreground leading-tight">
                        {metric.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Tech Stack Section */}
        <AnimateOnScroll delay={0.25}>
          <div className="mt-12 rounded-2xl border border-white/[0.06] bg-card/40 backdrop-blur-sm p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base sm:text-lg font-bold">Stack Tecnológico & Arquitectura</h3>
            </div>

            <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4" staggerDelay={0.08}>
              {[
                {
                  icon: Globe,
                  name: "Next.js 14+",
                  desc: "App Router, TypeScript, UX premium",
                  glowColor: "hover:shadow-black/30 hover:shadow-sky-500/10",
                },
                {
                  icon: Cpu,
                  name: "Google Gemini 3 Pro",
                  desc: "Generación de imágenes y NLP",
                  glowColor: "hover:shadow-black/30 hover:shadow-blue-500/10",
                },
                {
                  icon: Database,
                  name: "Supabase",
                  desc: "PostgreSQL para miles de usuarios",
                  glowColor: "hover:shadow-black/30 hover:shadow-emerald-500/10",
                },
                {
                  icon: Shield,
                  name: "Clerk",
                  desc: "Autenticación segura sin fricción",
                  glowColor: "hover:shadow-black/30 hover:shadow-violet-500/10",
                },
                {
                  icon: BarChart3,
                  name: "SEO Programático",
                  desc: "300K+ páginas ISR en Vercel",
                  glowColor: "hover:shadow-black/30 hover:shadow-cyan-500/10",
                },
                {
                  icon: DollarSign,
                  name: "Lemon Squeezy",
                  desc: "Monetización global automatizada",
                  glowColor: "hover:shadow-black/30 hover:shadow-amber-500/10",
                },
                {
                  icon: Zap,
                  name: "Vercel",
                  desc: "Infraestructura Cloud & Edge Deployment",
                  glowColor: "hover:shadow-black/30 hover:shadow-white/10",
                },
                {
                  icon: Zap,
                  name: "Bots (Telegram/Cron)",
                  desc: "Soporte y tickets automatizados",
                  glowColor: "hover:shadow-black/30 hover:shadow-rose-500/10",
                },
              ].map((tech) => (
                <StaggerItem key={tech.name}>
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`group p-3 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-300 shadow-lg relative overflow-hidden shimmer-sweep ${tech.glowColor}`}
                  >
                    <div className="flex items-start gap-2.5 relative z-10">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 group-hover:rotate-12 transition-all duration-500">
                        <tech.icon className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs sm:text-sm font-semibold mb-0.5 truncate group-hover:text-emerald-400 transition-colors">{tech.name}</h4>
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {tech.desc}
                        </p>
                      </div>
                    </div>
                    {/* Inner highlight */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </AnimateOnScroll>

        {/* Key Achievements */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-10 sm:mt-12 grid sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Key Achievements Grid */}
            {[
              {
                icon: Globe,
                title: "Escalabilidad Masiva",
                desc: "Arquitectura de sitemaps para cientos de miles de URLs sin exceder límites de cómputo.",
              },
              {
                icon: Zap,
                title: "Generación en Tiempo Real",
                desc: "Funciones serverless para XML masivos y procesado de imágenes en segundos.",
              },
              {
                icon: Award,
                title: "Automatización Total",
                desc: "Bots integrados (Telegram/Cron) para soporte y gestión de tickets.",
              },
            ].map((achievement) => (
              <motion.div
                key={achievement.title}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/[0.08] hover:border-emerald-500/30 transition-all duration-500 relative overflow-hidden shimmer-sweep shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 group-hover:rotate-6 transition-all duration-500">
                    <achievement.icon className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold mb-2 group-hover:text-emerald-400 transition-colors">{achievement.title}</h4>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed">
                    {achievement.desc}
                  </p>
                </div>
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </AnimateOnScroll>

        {/* CTA: Ver BrandiShot en vivo */}
        <AnimateOnScroll delay={0.4}>
          <div className="mt-10 sm:mt-12 flex justify-center">
            <a
              href="https://brandishot.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/40 hover:from-emerald-500/15 hover:to-teal-500/15 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="text-sm font-semibold">Ver BrandiShot en vivo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </AnimateOnScroll>

        {/* Trust Indicators */}
        <AnimateOnScroll delay={0.35}>
          <div className="mt-12 sm:mt-14 flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-10 text-muted-foreground">
            {[
              "Desarrollo en tiempo récord",
              "IA como motor principal",
              "SEO Programático a gran escala",
              "MVP funcional en días",
              "Soporte continuo 24/7",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                <span className="text-xs sm:text-sm">{item}</span>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
