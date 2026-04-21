"use client";

import { AnimateOnScroll, StaggerContainer, StaggerItem } from "./Animations";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Smartphone,
  Globe,
  Bot,
  Zap,
  ShoppingCart,
  Megaphone,
  BarChart3,
  FileText,
  Video,
  Camera,
  MessageCircle,
  LineChart,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Shield,
  Rocket,
  Target,
  Users,
  Layers,
  Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ─── Types ─── */
interface Solution {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  glowClass: string;
  tagline: string;
  keywords: string[];
  outcome: string;
}

interface SolutionCategory {
  id: string;
  label: string;
  emoji: string;
  description: string;
  solutions: Solution[];
}

/* ─── Data ─── */
const solutionCategories: SolutionCategory[] = [
  {
    id: "products",
    label: "Productos Digitales",
    emoji: "🚀",
    description: "Soluciones completas que transforman tu negocio",
    solutions: [
      {
        id: "apps",
        title: "Apps a Medida",
        description: "Aplicaciones web y móviles diseñadas para resolver un problema específico de tu negocio. Desde el concepto hasta el deploy.",
        icon: Smartphone,
        gradient: "from-emerald-500 to-teal-500",
        glowClass: "group-hover:shadow-emerald-500/20",
        tagline: "Tu idea, nuestra ingeniería",
        keywords: ["Web", "Mobile", "PWA"],
        outcome: "MVP funcional en 2 semanas",
      },
      {
        id: "saas",
        title: "Plataformas SaaS",
        description: "Productos como servicio con suscripciones, dashboards, gestión de usuarios y pagos automatizados listos para escalar.",
        icon: Layers,
        gradient: "from-violet-500 to-purple-500",
        glowClass: "group-hover:shadow-violet-500/20",
        tagline: "Tu negocio recurrente en piloto automático",
        keywords: ["Suscripciones", "Multi-tenant", "Analytics"],
        outcome: "Ingresos recurrentes desde el día 1",
      },
      {
        id: "ecommerce",
        title: "E-commerce",
        description: "Tiendas online profesionales con catálogo, carrito, pasarela de pago y gestión de pedidos. Vendé las 24hs.",
        icon: ShoppingCart,
        gradient: "from-amber-500 to-orange-500",
        glowClass: "group-hover:shadow-amber-500/20",
        tagline: "Tu local, abierto siempre",
        keywords: ["Catálogo", "Pagos", "Envíos"],
        outcome: "+40% de ventas en el primer mes",
      },
      {
        id: "crm",
        title: "Sistemas de Gestión",
        description: "CRMs, ERPs y sistemas internos que centralizan la operación de tu empresa. Datos, procesos y decisiones en un solo lugar.",
        icon: BarChart3,
        gradient: "from-cyan-500 to-sky-500",
        glowClass: "group-hover:shadow-cyan-500/20",
        tagline: "Tu negocio bajo control total",
        keywords: ["CRM", "ERP", "Dashboards"],
        outcome: "Eliminá 15+ horas semanales de trabajo manual",
      },
    ],
  },
  {
    id: "automation",
    label: "Automatización & IA",
    emoji: "⚡",
    description: "Inteligencia artificial trabajando para tu negocio las 24 horas",
    solutions: [
      {
        id: "ai-bots",
        title: "Chatbots & Asistentes IA",
        description: "Bots inteligentes que atienden clientes, responden preguntas frecuentes y cierran ventas automáticamente.",
        icon: MessageCircle,
        gradient: "from-emerald-500 to-cyan-500",
        glowClass: "group-hover:shadow-emerald-500/20",
        tagline: "Ventas automáticas mientras dormís",
        keywords: ["WhatsApp", "Web", "Telegram"],
        outcome: "Respuesta instantánea 24/7",
      },
      {
        id: "workflows",
        title: "Automatización de Procesos",
        description: "Flujos de trabajo automatizados que conectan tus herramientas, eliminan tareas repetitivas y reducen errores humanos.",
        icon: Zap,
        gradient: "from-rose-500 to-pink-500",
        glowClass: "group-hover:shadow-rose-500/20",
        tagline: "Menos trabajo manual, más resultados",
        keywords: ["Integraciones", "Triggers", "Webhooks"],
        outcome: "80% menos tareas manuales",
      },
      {
        id: "ai-content",
        title: "Generación de Contenido con IA",
        description: "Contenido UGC, copys para redes, descripciones de productos y material visual generado por inteligencia artificial.",
        icon: Camera,
        gradient: "from-violet-500 to-fuchsia-500",
        glowClass: "group-hover:shadow-violet-500/20",
        tagline: "Contenido profesional a escala",
        keywords: ["UGC", "Copywriting", "Imágenes IA"],
        outcome: "10x más contenido en la mitad de tiempo",
      },
    ],
  },
  {
    id: "growth",
    label: "Crecimiento & Presencia",
    emoji: "📈",
    description: "Estrategias digitales para que te encuentren y te elijan",
    solutions: [
      {
        id: "landing-pages",
        title: "Landing Pages de Conversión",
        description: "Páginas de aterrizaje optimizadas para convertir visitantes en clientes. Diseño premium, copy persuasivo y velocidad.",
        icon: Globe,
        gradient: "from-teal-500 to-emerald-600",
        glowClass: "group-hover:shadow-teal-500/20",
        tagline: "Más leads, menos esfuerzo",
        keywords: ["SEO", "CRO", "Velocidad"],
        outcome: "+60% tasa de conversión",
      },
      {
        id: "seo-content",
        title: "SEO & Contenido Programático",
        description: "Estrategias de posicionamiento orgánico con miles de páginas optimizadas. Aparecé primero en Google sin pagar ads.",
        icon: FileText,
        gradient: "from-sky-500 to-blue-500",
        glowClass: "group-hover:shadow-sky-500/20",
        tagline: "Primero en Google, sin publicidad",
        keywords: ["pSEO", "Blog", "ISR"],
        outcome: "+300K páginas indexadas en Google",
      },
      {
        id: "analytics",
        title: "Analytics & BI",
        description: "Dashboards de business intelligence que convierten tus datos en decisiones. Métricas clave, reportes automatizados y alertas.",
        icon: LineChart,
        gradient: "from-amber-500 to-yellow-500",
        glowClass: "group-hover:shadow-amber-500/20",
        tagline: "Decisiones basadas en datos reales",
        keywords: ["Métricas", "Reportes", "KPIs"],
        outcome: "Decisiones 10x más informadas",
      },
    ],
  },
];

/* ─── Animated Counter Hook ─── */
function useAnimatedCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  if (inView && !hasAnimated.current) {
    hasAnimated.current = true;
    const duration = 1500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }

  return count;
}

/* ─── Solution Card ─── */
function SolutionCard({
  solution,
  index,
}: {
  solution: Solution;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({ x: (y - 0.5) * -4, y: (x - 0.5) * 4 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const floatDelay = (index * 0.4) % 5;

  // Unique gradient accents per solution for left border
  const borderAccent = solution.gradient.split(" ").slice(0, 1)[0].replace("from-", "from-");

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
    >
      <div
        className="sol-float"
        style={{ animationDelay: `${floatDelay}s` }}
      >
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          whileHover={{ y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-card/50 backdrop-blur-sm p-6 sm:p-7 cursor-default transition-all duration-500 hover:border-white/[0.14] group hover:shadow-2xl ${solution.glowClass} card-shine`}
          style={{
            transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: "transform 0.25s ease-out",
          }}
        >
          {/* Left gradient accent border */}
          <div
            className={`absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b ${solution.gradient} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
          />
          {/* Corner glow */}
          <div
            className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${solution.gradient} rounded-full opacity-0 group-hover:opacity-[0.08] blur-[60px] transition-opacity duration-700 pointer-events-none`}
          />

          {/* Top accent line */}
          <div
            className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${solution.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
          />

          {/* Icon */}
          <div
            className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <solution.icon className="w-6 h-6 text-white" />
            {/* Pulse ring */}
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-500`}
            />
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base sm:text-lg mb-2 group-hover:text-white transition-colors duration-300">
            {solution.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
            {solution.description}
          </p>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2 mb-4">
            {solution.keywords.map((kw) => (
              <span
                key={kw}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-white/[0.04] border border-white/[0.06] text-muted-foreground group-hover:bg-white/[0.08] group-hover:text-foreground/70 transition-all duration-300"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* Outcome badge — only shows on hover */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-1 border-t border-white/[0.05] flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">
                {solution.outcome}
              </span>
            </div>
          </motion.div>

          {/* Bottom arrow */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
            <ArrowRight className={`w-4 h-4 bg-gradient-to-r ${solution.gradient} bg-clip-text`} style={{ color: "transparent", backgroundClip: "text" }} />
            <ArrowRight className={`w-4 h-4 absolute top-0 left-0 ${solution.gradient.replace("from-", "text-").split(" ")[0]}`} style={{ opacity: 0.3 }} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Stats Counter ─── */
function StatCounter({
  value,
  suffix,
  label,
  colorClass,
  inView,
}: {
  value: number;
  suffix: string;
  label: string;
  colorClass: string;
  inView: boolean;
}) {
  const count = useAnimatedCounter(value, inView);
  return (
    <div className="text-center p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.12] transition-all duration-300 hover:bg-white/[0.04]">
      <div className={`text-2xl sm:text-3xl font-bold ${colorClass}`}>
        {count}
        {suffix}
      </div>
      <div className="text-xs text-muted-foreground/60 mt-1">{label}</div>
    </div>
  );
}

/* ─── Main Section ─── */
export function TechStackSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 tech-dot-bg opacity-30" />
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-emerald-500/[0.04] rounded-full blur-[120px] animate-orb pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-violet-500/[0.04] rounded-full blur-[120px] animate-orb-reverse pointer-events-none" />
      <div className="absolute top-2/3 left-1/3 w-60 h-60 bg-teal-500/[0.03] rounded-full blur-[100px] animate-orb pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Soluciones Digitales
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Tu solución digital,{" "}
            <span className="gradient-text">a medida</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base sm:text-lg leading-relaxed">
            No vendemos tecnologías — entregamos{" "}
            <span className="text-foreground font-medium">
              resultados concretos
            </span>
            . Cada solución está diseñada para resolver un problema real de tu
            negocio, con IA integrada y un enfoque en el retorno de inversión.
          </p>
        </AnimateOnScroll>

        {/* Solution Categories */}
        <div className="space-y-16 sm:space-y-20">
          {solutionCategories.map((category, catIdx) => (
            <div key={category.id}>
              {/* Category Header */}
              <AnimateOnScroll>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xl">{category.emoji}</span>
                    <div className="text-center">
                      <span className="text-sm sm:text-base font-bold text-foreground block">
                        {category.label}
                      </span>
                      <span className="text-[11px] text-muted-foreground/60 block mt-0.5 hidden sm:block">
                        {category.description}
                      </span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/[0.06] to-transparent" />
                  </div>
                </div>
              </AnimateOnScroll>

              {/* Solutions Grid */}
              <div
                className={`grid gap-5 sm:gap-6 ${
                  category.solutions.length === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                }`}
              >
                {category.solutions.map((solution, idx) => (
                  <SolutionCard
                    key={solution.id}
                    solution={solution}
                    index={catIdx * 4 + idx}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Value Proposition Strip */}
        <AnimateOnScroll delay={0.2}>
          <div className="mt-20 sm:mt-24 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-emerald-500/[0.04] via-card/50 to-teal-500/[0.04] p-8 sm:p-10 backdrop-blur-sm">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
              {/* Left: Message */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium mb-4">
                  <Shield className="w-3 h-3" />
                  Filosofía de trabajo
                </div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                  No es sobre la tecnología.{" "}
                  <span className="gradient-text">
                    Es sobre tu crecimiento.
                  </span>
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
                  Elegimos las herramientas correctas para cada proyecto — vos
                  solo ves el resultado. Un MVP funcional, un sistema que
                  escala, una automatización que ahorra horas.{" "}
                  <span className="text-foreground/80 font-medium">
                    Nos enfocamos en que tu inversión se transforme en ingresos.
                  </span>
                </p>
              </div>

              {/* Right: Stats */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 gap-3 sm:gap-4 w-full lg:w-auto lg:min-w-[320px]"
              >
                <StatCounter
                  value={50}
                  suffix="+"
                  label="Proyectos entregados"
                  colorClass="text-emerald-400"
                  inView={statsInView}
                />
                <StatCounter
                  value={98}
                  suffix="%"
                  label="Satisfacción de clientes"
                  colorClass="text-teal-400"
                  inView={statsInView}
                />
                <StatCounter
                  value={15}
                  suffix=" días"
                  label="MVP promedio"
                  colorClass="text-violet-400"
                  inView={statsInView}
                />
                <StatCounter
                  value={3}
                  suffix="x"
                  label="ROI promedio"
                  colorClass="text-amber-400"
                  inView={statsInView}
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Bottom CTA */}
        <AnimateOnScroll delay={0.3}>
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              ¿No encontrás lo que buscás?{" "}
              <span className="text-foreground/80 font-medium">
                Cada solución es única
              </span>
              .
            </p>
            <button
              onClick={() => {
                const el = document.querySelector("#contacto");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.08] hover:border-white/[0.14] transition-all duration-300 group"
            >
              <Lightbulb className="w-4 h-4 text-emerald-400" />
              Contame tu idea y la hacemos realidad
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
