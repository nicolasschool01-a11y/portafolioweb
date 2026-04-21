"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Play,
  Sparkles,
  Smartphone,
  Code2,
  Bot,
  BarChart3,
  Zap,
  Activity,
  CheckCircle2,
  TrendingUp,
  Globe,
  Layers,
  Shield,
  Cpu,
  Timer,
  Rocket,
  ThumbsUp,
  Clock,
  Headphones,
} from "lucide-react";
import { ParticleField } from "./ParticleField";

const dashboardStats = [
  { label: "Proyectos Activos", value: 12, change: "+3", icon: Code2, color: "text-emerald-400", bgColor: "bg-emerald-500/10", borderColor: "border-emerald-500/20" },
  { label: "Automatizaciones", value: 847, change: "+124", icon: Bot, color: "text-violet-400", bgColor: "bg-violet-500/10", borderColor: "border-violet-500/20" },
  { label: "Uptime", value: 99.9, change: "↑", icon: Activity, color: "text-cyan-400", bgColor: "bg-cyan-500/10", borderColor: "border-cyan-500/20", suffix: "%", isFloat: true },
];

const recentActivity = [
  { text: "App FoodExpress deployada", time: "hace 2h", status: "success", icon: RocketIcon },
  { text: "CRM PropManager actualizado", time: "hace 5h", status: "success", icon: CheckCircle2 },
  { text: "Bot de soporte activado", time: "hace 1d", status: "success", icon: Bot },
];

const chartPoints = [20, 35, 28, 45, 42, 55, 48, 62, 58, 75, 70, 85, 80, 92];
const chartLabels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul"];

const serviceBenefits = [
  { icon: Smartphone, label: "Apps Nativas", desc: "iOS & Android", color: "text-emerald-400" },
  { icon: Bot, label: "IA & Chatbots", desc: "Automatización", color: "text-violet-400" },
  { icon: BarChart3, label: "Dashboards", desc: "Analytics Live", color: "text-cyan-400" },
  { icon: Zap, label: "APIs", desc: "Integraciones", color: "text-amber-400" },
  { icon: Globe, label: "Web Apps", desc: "Full-Stack", color: "text-rose-400" },
  { icon: Shield, label: "Seguridad", desc: "Auth & Data", color: "text-teal-400" },
];

function RocketIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

// Animated counter hook
function useAnimatedCounter(target: number, isInView: boolean, duration = 2000, isFloat = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      start = eased * target;
      setCount(start);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, target, duration]);

  if (isFloat) return count.toFixed(1);
  return Math.round(count).toLocaleString();
}

function DashboardStatCard({
  stat,
  index,
  isInView,
}: {
  stat: typeof dashboardStats[number];
  index: number;
  isInView: boolean;
}) {
  const countVal = useAnimatedCounter(
    stat.value,
    isInView,
    stat.isFloat ? 1500 : 2000,
    stat.isFloat
   );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.2 + index * 0.12 }}
      className={`rounded-xl ${stat.bgColor} border ${stat.borderColor} p-3 sm:p-4 hover:border-white/[0.15] transition-all duration-300 group cursor-default`}
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-lg ${stat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <stat.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${stat.color}`} />
        </div>
        <span className="text-[10px] sm:text-xs text-muted-foreground/70 truncate">{stat.label}</span>
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="text-lg sm:text-2xl font-bold tracking-tight">
          {countVal}
          {stat.suffix && isInView && <span className="text-sm">{stat.suffix}</span>}
        </span>
        <span className={`text-[10px] sm:text-xs ${stat.color} font-medium`}>{stat.change}</span>
      </div>
    </motion.div>
  );
}

const trustIndicators = [
  { icon: Rocket, value: 50, suffix: "+", label: "Proyectos entregados", color: "text-emerald-400" },
  { icon: ThumbsUp, value: 98, suffix: "%", label: "Clientes satisfechos", color: "text-teal-400" },
  { icon: Clock, value: 15, prefix: "~", suffix: " días", label: "Promedio de entrega", color: "text-cyan-400" },
  { icon: Headphones, value: 24, suffix: "/7", label: "Soporte post-entrega", color: "text-violet-400" },
];

function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3"
    >
      {trustIndicators.map((item, i) => (
        <TrustIndicatorCard key={item.label} item={item} index={i} isInView={isInView} />
      ))}
    </motion.div>
  );
}

function TrustIndicatorCard({
  item,
  index,
  isInView,
}: {
  item: (typeof trustIndicators)[number];
  index: number;
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const startTime = performance.now();
    const duration = 2000;

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased * item.value);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, item.value]);

  const displayValue = `${item.prefix ?? ""}${Math.round(count)}${item.suffix ?? ""}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4, delay: 0.15 + index * 0.1 }}
      className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm py-4 px-3 hover:border-white/[0.1] hover:bg-white/[0.05] transition-all duration-300 shimmer-sweep"
    >
      <div className="shrink-0 w-9 h-9 rounded-lg bg-white/[0.05] border border-white/[0.06] flex items-center justify-center group-hover:shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-shadow duration-300">
        <item.icon className={`w-4 h-4 ${item.color}`} />
      </div>
      <div className="min-w-0">
        <div className="text-lg sm:text-xl font-bold tracking-tight leading-tight">
          {displayValue}
        </div>
        <div className="text-[11px] sm:text-xs text-muted-foreground/60 leading-tight mt-0.5">
          {item.label}
        </div>
      </div>
    </motion.div>
  );
}

export function HeroSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const maxVal = Math.max(...chartPoints);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const dashboardInView = useInView(dashboardRef, { once: true, margin: "-100px" });

  // Typing effect for subheadline
  const [typedText, setTypedText] = useState("");
  const fullText = "Desarrollo aplicaciones, sistemas y webs a medida usando inteligencia artificial para lanzar MVPs rápidos, funcionales y listos para escalar.";
  const typingStarted = useRef(false);

  useEffect(() => {
    if (typingStarted.current) return;
    const timer = setTimeout(() => {
      typingStarted.current = true;
      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setTypedText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 18);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="hero" className="gradient-mesh-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient mesh blobs */}
      <div className="mesh-blob-1" />
      <div className="mesh-blob-2" />
      <div className="mesh-blob-3" />
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg" />
      <ParticleField />

      {/* Animated gradient orbs - Optimized blur/size for performance */}
      <div className="absolute top-20 left-10 w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] bg-emerald-500/15 rounded-full blur-[80px] sm:blur-[140px] animate-orb pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] bg-teal-500/10 rounded-full blur-[70px] sm:blur-[120px] animate-orb-reverse pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-violet-500/5 rounded-full blur-[100px] sm:blur-[180px] animate-orb pointer-events-none" />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,oklch(0.1_0.005_270_0.8)_70%)]" />

      {/* Subtle radial emerald glow behind dashboard area */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* NicoPrompt gradient logo text */}
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-xs sm:text-sm font-bold tracking-wider uppercase mb-4 gradient-text-animated"
            >
              NicoPrompt
            </motion.span>
            <Badge
              variant="outline"
              className="mb-8 px-4 py-2 text-xs sm:text-sm border-white/[0.08] backdrop-blur-sm bg-emerald-500/[0.06] text-emerald-400 hover:bg-emerald-500/10 transition-colors relative pulse-ring"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Potenciado por Inteligencia Artificial
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-8"
          >
            Convertí tu idea en una{" "}
            <span className="gradient-text-animated">app real</span>{" "}
            en días, no meses
          </motion.h1>

          {/* Subheadline with typing effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-[1.7] min-h-[3.4rem]"
          >
            <span className="text-foreground/70">{typedText}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-0.5 h-5 bg-emerald-400 ml-1 align-middle"
            />
          </motion.div>

          {/* Floating availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] backdrop-blur-sm border border-white/[0.08] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 live-dot" />
              </span>
              <span className="text-xs sm:text-sm text-emerald-400/90 font-medium">
                Disponible para nuevos proyectos
              </span>
            </motion.div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button
              onClick={() => scrollTo("#contacto")}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-6 text-base font-semibold group"
            >
              Crear mi proyecto
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              onClick={() => scrollTo("#proceso")}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-white/[0.12] bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.2] rounded-xl px-8 py-6 text-base group backdrop-blur-sm text-foreground/90 hover:text-foreground"
            >
              <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform text-emerald-400" />
              Ver cómo funciona
            </Button>
          </motion.div>
        </div>

        {/* Custom Dashboard Mockup */}
        <motion.div
          ref={dashboardRef}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-5xl mx-auto mt-16 sm:mt-20"
        >
          {/* Glow behind the mockup — subtle emerald radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.06)_0%,transparent_70%)] rounded-3xl blur-2xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent rounded-3xl blur-3xl" />
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl blur-2xl" />

          {/* Main dashboard card */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-emerald-500/10 bg-[#0a0a14]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#080810]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-white/[0.04] text-[11px] text-muted-foreground/60 font-mono">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  app.nicoprompt.com/dashboard
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="hidden sm:block w-3.5 h-3.5 text-muted-foreground/40" />
                <Cpu className="w-3.5 h-3.5 text-muted-foreground/40" />
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="p-4 sm:p-6 lg:p-8">
              {/* Top row: Stats */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {dashboardStats.map((stat, i) => (
                  <DashboardStatCard
                    key={stat.label}
                    stat={stat}
                    index={i}
                    isInView={dashboardInView}
                  />
                ))}
              </div>

              {/* Main content: Chart + Activity */}
              <div className="grid lg:grid-cols-[1fr_280px] gap-4 sm:gap-6">
                {/* Chart area */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={dashboardInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 sm:p-6"
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold">Proyectos entregados</h3>
                      <p className="text-[10px] sm:text-xs text-muted-foreground/60">Últimos 12 meses</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <TrendingUp className="w-3 h-3" />
                        <span className="text-[10px] sm:text-xs font-medium">+67%</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-violet-500/10 text-violet-400">
                        <Timer className="w-3 h-3" />
                        <span className="text-[10px] sm:text-xs font-medium">Live</span>
                        <div className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* SVG Chart */}
                  <div className="relative h-32 sm:h-44">
                    <svg
                      viewBox="0 0 600 160"
                      className="w-full h-full"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="50%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Grid lines */}
                      {[0, 1, 2, 3].map((i) => (
                        <line
                          key={i}
                          x1="0"
                          y1={i * 40}
                          x2="600"
                          y2={i * 40}
                          stroke="rgba(255,255,255,0.03)"
                          strokeWidth="1"
                        />
                      ))}

                      {/* Area fill */}
                      <motion.path
                        d={`M 0 ${160 - (chartPoints[0] / maxVal) * 140 - 10} ${chartPoints
                          .map((p, i) => `L ${(i / (chartPoints.length - 1)) * 600} ${160 - (p / maxVal) * 140 - 10}`)
                          .join(" ")} L 600 160 L 0 160 Z`}
                        fill="url(#chartGradient)"
                        initial={{ opacity: 0 }}
                        animate={dashboardInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.7 }}
                      />

                      {/* Line with glow */}
                      <motion.path
                        d={`M 0 ${160 - (chartPoints[0] / maxVal) * 140 - 10} ${chartPoints
                          .map((p, i) => `L ${(i / (chartPoints.length - 1)) * 600} ${160 - (p / maxVal) * 140 - 10}`)
                          .join(" ")} `}
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0 }}
                        animate={dashboardInView ? { pathLength: 1 } : {}}
                        transition={{ duration: 1.8, delay: 0.7, ease: "easeOut" }}
                      />

                      {/* Data points - show last 3 */}
                      {chartPoints.slice(-3).map((p, i) => {
                        const idx = chartPoints.length - 3 + i;
                        const cx = (idx / (chartPoints.length - 1)) * 600;
                        const cy = 160 - (p / maxVal) * 140 - 10;
                        return (
                          <motion.circle
                            key={idx}
                            cx={cx}
                            cy={cy}
                            r="0"
                            fill="#10b981"
                            stroke="#0a0a14"
                            strokeWidth="2"
                            initial={{ r: 0 }}
                            animate={dashboardInView ? { r: i === 2 ? 5 : 3 } : {}}
                            transition={{ duration: 0.3, delay: 1.5 + i * 0.15 }}
                            className="hidden sm:block"
                          />
                        );
                      })}

                      {/* Pulsing indicator on last point */}
                      {dashboardInView && (
                        <>
                          <circle
                            cx={(13 / (chartPoints.length - 1)) * 600}
                            cy={160 - (chartPoints[13] / maxVal) * 140 - 10}
                            r="5"
                            fill="#10b981"
                            stroke="#0a0a14"
                            strokeWidth="2"
                            className="hidden sm:block"
                          />
                          <circle
                            cx={(13 / (chartPoints.length - 1)) * 600}
                            cy={160 - (chartPoints[13] / maxVal) * 140 - 10}
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="1"
                            opacity="0"
                            className="hidden sm:block"
                          >
                            <animate attributeName="r" from="5" to="15" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                    </svg>

                    {/* X-axis labels */}
                    <div className="flex justify-between mt-2 px-1">
                      {chartLabels.map((label) => (
                        <span key={label} className="text-[9px] sm:text-[10px] text-muted-foreground/40">
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Activity feed (hidden on small mobile) */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={dashboardInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="hidden sm:flex flex-col rounded-xl bg-white/[0.02] border border-white/[0.05] p-4 sm:p-5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
                      Actividad reciente
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[10px] text-emerald-400/70">Live</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    {recentActivity.map((activity, i) => (
                      <motion.div
                        key={activity.text}
                        initial={{ opacity: 0, x: 10 }}
                        animate={dashboardInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.3, delay: 1.0 + i * 0.15 }}
                        className="flex items-start gap-3 group cursor-default"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/30 transition-colors">
                          <activity.icon className="w-3 h-3 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground/80 truncate group-hover:text-foreground transition-colors">{activity.text}</p>
                          <p className="text-[10px] text-muted-foreground/50">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Service benefits showcase */}
                  <div className="mt-4 pt-4 border-t border-white/[0.05]">
                    <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-2.5">Servicios</p>
                    <div className="grid grid-cols-3 gap-1.5">
                      {serviceBenefits.slice(0, 6).map((tag) => (
                        <div
                          key={tag.label}
                          className="flex flex-col items-center gap-1 p-2 rounded-lg bg-white/[0.03] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.06] transition-all duration-300 cursor-default"
                        >
                          <tag.icon className={`w-3 h-3 ${tag.color}`} />
                          <span className="text-[9px] text-muted-foreground/60 leading-tight text-center">{tag.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Floating mobile mockup - hidden on small mobile to avoid layout issues */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="absolute -right-4 sm:-right-6 lg:-right-12 top-1/4 w-20 sm:w-32 lg:w-40 animate-float hidden md:block pointer-events-none"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-xl shadow-emerald-500/15 glow-emerald">
              <img
                src="/hero-mobile.png"
                alt="Mobile App"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </motion.div>

          {/* Floating CRM mockup */}
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="absolute -left-2 sm:-left-6 lg:-left-12 bottom-0 w-28 sm:w-40 lg:w-48 animate-float hidden lg:block"
            style={{ animationDelay: "-3s" }}
          >
            <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-teal-500/15 glow-emerald">
              <img
                src="/hero-crm.png"
                alt="CRM System"
                className="w-full h-auto"
                loading="eager"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Social Proof Trust Bar */}
        <TrustBar />

        {/* Scroll to explore indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="relative mt-12 sm:mt-16 flex flex-col items-center gap-2 mx-auto"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
            Scroll para explorar
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
          >
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3], y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 rounded-full bg-emerald-400"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
