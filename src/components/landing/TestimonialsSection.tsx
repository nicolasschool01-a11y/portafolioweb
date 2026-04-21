"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateOnScroll } from "./Animations";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

/* ─────────────────────────────────────────────
 * Testimonial data (6 items for 2 desktop slides)
 * ───────────────────────────────────────────── */
const testimonials = [
  {
    name: "Martín Rodríguez",
    role: "CEO, FoodExpress",
    avatar: "MR",
    content:
      "NicoPrompt transformó nuestra operación. Pasamos de gestionar pedidos en papel a tener un sistema completo en 10 días. Las ventas online aumentaron un 40% el primer mes.",
    rating: 5,
    gradient: "from-amber-500 to-orange-500",
    metric: "+40% ventas",
    accent: "text-amber-400",
  },
  {
    name: "Lucía Fernández",
    role: "Fundadora, PropManager",
    avatar: "LF",
    content:
      "Necesitábamos un CRM a medida para nuestra inmobiliaria. No solo lo construyó en tiempo récord, sino que entendió nuestro negocio mejor que nosotros. El resultado superó todas las expectativas.",
    rating: 5,
    gradient: "from-violet-500 to-purple-500",
    metric: "3x cierres",
    accent: "text-violet-400",
  },
  {
    name: "Diego Torres",
    role: "CTO, Startup SaaS",
    avatar: "DT",
    content:
      "El MVP que armó NicoPrompt nos permitió levantar $500K en funding. La velocidad y calidad del código son impresionantes. No es un desarrollador, es un socio estratégico.",
    rating: 5,
    gradient: "from-cyan-500 to-blue-500",
    metric: "$500K funding",
    accent: "text-cyan-400",
  },
  {
    name: "Sofía Gómez",
    role: "Dir. Marketing, RetailPro",
    avatar: "SG",
    content:
      "La landing page que nos hizo fue increíble. Convierte visitantes en leads a un ritmo que no habíamos visto antes. El diseño es moderno, rápido y refleja perfectamente nuestra marca.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-500",
    metric: "+250% leads",
    accent: "text-emerald-400",
  },
  {
    name: "Andrés Morales",
    role: "Founder, FitLife App",
    avatar: "AM",
    content:
      "Contraté a NicoPrompt para desarrollar nuestra app de fitness. La integración con wearables y el dashboard de analytics superaron mis expectativas. Launch en tiempo y forma.",
    rating: 5,
    gradient: "from-rose-500 to-pink-500",
    metric: "10K users",
    accent: "text-rose-400",
  },
  {
    name: "Valentina Ruiz",
    role: "COO, LogiTrack",
    avatar: "VR",
    content:
      "Necesitábamos un sistema de tracking de flotas con GPS, sensores IoT y reportes en tiempo real. NicoPrompt lo construyó con una arquitectura que escala sin problemas.",
    rating: 5,
    gradient: "from-sky-500 to-indigo-500",
    metric: "-30% costos",
    accent: "text-sky-400",
  },
] as const;

/* ─────────────────────────────────────────────
 * Constants
 * ───────────────────────────────────────────── */
const AUTO_ROTATE_INTERVAL = 5000;
const ITEMS_DESKTOP = 3;
const ITEMS_MOBILE = 1;
const SWIPE_THRESHOLD = 50;

function safeMod(n: number, m: number) {
  return ((n % m) + m) % m;
}

/* ─────────────────────────────────────────────
 * Slide animation variants
 * ───────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -300 : 300,
    opacity: 0,
  }),
};

/* ─────────────────────────────────────────────
 * Individual testimonial card
 * ───────────────────────────────────────────── */
function TestimonialCard({
  testimonial,
}: {
  testimonial: (typeof testimonials)[number];
}) {
  return (
    <div className="relative h-full group/card">
      {/* Card */}
      <motion.div
        whileHover={{ y: -6, transition: { duration: 0.3 } }}
        className="relative h-full p-6 sm:p-8 rounded-2xl bg-card/50 border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 overflow-hidden"
      >
        {/* Top accent gradient */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${testimonial.gradient} opacity-40 group-hover/card:opacity-70 transition-opacity duration-500`}
        />

        {/* Background glow on hover */}
        <div
          className={`absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-24 bg-gradient-to-t ${testimonial.gradient} rounded-full opacity-0 group-hover/card:opacity-[0.08] blur-[40px] transition-opacity duration-500 pointer-events-none`}
        />

        {/* Large decorative quote marks */}
        <div className="absolute top-4 left-5 sm:top-6 sm:left-6 opacity-[0.06] group-hover/card:opacity-[0.10] transition-opacity duration-500 pointer-events-none select-none">
          <span className="text-6xl sm:text-7xl font-serif leading-none">❝</span>
        </div>
        <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-6 opacity-[0.04] group-hover/card:opacity-[0.08] transition-opacity duration-500 pointer-events-none select-none">
          <span className="text-6xl sm:text-7xl font-serif leading-none rotate-180">❝</span>
        </div>

        {/* Stars */}
        <div className="flex gap-0.5 mb-5">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, type: "spring", stiffness: 400, damping: 20 }}
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </motion.div>
          ))}
        </div>

        {/* Quote text */}
        <p className="text-sm sm:text-[15px] text-muted-foreground leading-relaxed mb-6 relative z-10">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Metric badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] mb-6 group-hover/card:border-white/[0.1] transition-colors duration-300">
          <span className={`text-xs font-bold ${testimonial.accent}`}>
            {testimonial.metric}
          </span>
          <span className="text-[10px] text-muted-foreground/60">resultado</span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/[0.04]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center shadow-lg text-sm font-bold text-white shrink-0`}
          >
            {testimonial.avatar}
          </motion.div>
          <div>
            <div className="font-semibold text-sm">{testimonial.name}</div>
            <div className="text-xs text-muted-foreground">{testimonial.role}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Main Testimonials Section with Carousel
 * ───────────────────────────────────────────── */
export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [direction, setDirection] = useState(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const itemsPerView = isDesktop ? ITEMS_DESKTOP : ITEMS_MOBILE;
  const totalDots = isDesktop
    ? Math.ceil(testimonials.length / ITEMS_DESKTOP)
    : testimonials.length;
  const advanceStep = itemsPerView;

  /* ---- Detect desktop breakpoint ---- */
  useEffect(() => {
    const check = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      // Snap index to nearest page boundary when switching to desktop
      if (desktop) {
        setCurrentIndex((prev) => {
          const page = Math.floor(safeMod(prev, testimonials.length) / ITEMS_DESKTOP);
          return page * ITEMS_DESKTOP;
        });
      }
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---- Auto-rotate with pause on hover ---- */
  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
      return;
    }
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => safeMod(prev + advanceStep, testimonials.length));
    }, AUTO_ROTATE_INTERVAL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, advanceStep]);

  /* ---- Navigation helpers ---- */
  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrentIndex(safeMod(index, testimonials.length));
  }, []);

  const goNext = useCallback(
    () => goTo(currentIndex + advanceStep, 1),
    [currentIndex, advanceStep, goTo],
  );

  const goPrev = useCallback(
    () => goTo(currentIndex - advanceStep, -1),
    [currentIndex, advanceStep, goTo],
  );

  /* ---- Visible testimonials with wrap-around ---- */
  const getVisibleTestimonials = () => {
    const result: { testimonial: (typeof testimonials)[number]; key: number }[] = [];
    for (let i = 0; i < itemsPerView; i++) {
      const idx = safeMod(currentIndex + i, testimonials.length);
      result.push({ testimonial: testimonials[idx], key: idx });
    }
    return result;
  };

  /* ---- Active dot index ---- */
  const activeDotIndex = isDesktop
    ? Math.floor(safeMod(currentIndex, testimonials.length) / ITEMS_DESKTOP) % totalDots
    : safeMod(currentIndex, testimonials.length);

  /* ---- Touch / swipe handlers ---- */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartRef.current - touchEndRef.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) goNext();
      else goPrev();
    }
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <section id="testimonios" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section header ── */}
        <AnimateOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            💬 Testimonios
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Lo que dicen{" "}
            <span className="gradient-text">mis clientes</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Resultados reales de emprendedores y empresas que ya transformaron su operación.
          </p>
        </AnimateOnScroll>

        {/* ── Carousel ── */}
        <div
          className="group/carousel relative select-none rounded-2xl p-px before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-emerald-500/20 before:via-transparent before:to-teal-500/20 before:pointer-events-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* ── Prev arrow (desktop, hover-only) ── */}
          <button
            onClick={goPrev}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-white/[0.15] opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 -translate-x-1/2"
            aria-label="Testimonio anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* ── Next arrow (desktop, hover-only) ── */}
          <button
            onClick={goNext}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-11 h-11 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] text-white/70 hover:text-white hover:bg-white/[0.12] hover:border-white/[0.15] opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 translate-x-1/2"
            aria-label="Testimonio siguiente"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* ── Slides ── */}
          <div className="md:mx-14 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  type: "tween",
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className={`grid gap-5 sm:gap-6 ${
                  isDesktop ? "grid-cols-3" : "grid-cols-1 max-w-lg mx-auto"
                }`}
              >
                {visibleTestimonials.map((item) => (
                  <TestimonialCard
                    key={item.key}
                    testimonial={item.testimonial}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Dot indicators ── */}
          <div className="flex justify-center items-center gap-2 mt-8" role="tablist" aria-label="Testimonios">
            {Array.from({ length: totalDots }).map((_, i) => (
              <motion.button
                key={i}
                onClick={() => {
                  const target = isDesktop ? i * ITEMS_DESKTOP : i;
                  const dir = target > currentIndex ? 1 : -1;
                  goTo(target, dir);
                }}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  activeDotIndex === i
                    ? "bg-emerald-400 w-6 h-2.5"
                    : "bg-white/20 hover:bg-white/40 w-2 h-2"
                }`}
                style={activeDotIndex === i ? { boxShadow: "0 0 10px oklch(0.72 0.19 163 / 40%)" } : undefined}
                animate={activeDotIndex === i ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={activeDotIndex === i ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.3 }}
                role="tab"
                aria-selected={activeDotIndex === i}
                aria-label={`Testimonio ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ── Social proof micro-stats ── */}
        <AnimateOnScroll delay={0.4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
              {[
                { value: "50+", label: "Proyectos entregados", icon: "🚀" },
                { value: "98%", label: "Satisfacción", icon: "⭐" },
                { value: "24hs", label: "Respuesta promedio", icon: "⚡" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -2 }}
                  className="text-center cursor-default"
                >
                  <span className="text-2xl block mb-1">{stat.icon}</span>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
