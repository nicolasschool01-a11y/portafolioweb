"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Proceso" },
  { id: "proyectos", label: "Proyectos" },
  { id: "testimonios", label: "Testimonios" },
  { id: "contacto", label: "Contacto" },
];

export function SectionDots() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [visible, setVisible] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  // Track scroll position for visibility and progress
  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);

      // Calculate scroll percentage
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
      setScrollPercent(percent);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for section tracking
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(section.id);
          }
        },
        {
          rootMargin: "-30% 0px -60% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const getActiveIndex = () => {
    return sections.findIndex((s) => s.id === activeSection);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-0"
          aria-label="Navegación por secciones"
        >
          <div className="relative flex flex-col items-center">
            {sections.map((section, index) => {
              const isActive = activeSection === section.id;
              const isPassed = index <= getActiveIndex();
              const isHovered = hoveredSection === section.id;

              return (
                <div key={section.id} className="flex flex-col items-center">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    onMouseEnter={() => setHoveredSection(section.id)}
                    onMouseLeave={() => setHoveredSection(null)}
                    className="group relative flex items-center gap-3 outline-none py-[10px]"
                    aria-label={`Ir a ${section.label}`}
                  >
                    {/* Always-visible label for active section */}
                    <span className={`absolute right-8 text-[11px] font-medium whitespace-nowrap pointer-events-none transition-all duration-300 ${
                      isActive
                        ? "text-emerald-400 opacity-100"
                        : "text-muted-foreground opacity-0 group-hover:opacity-100"
                    } bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-md border ${
                      isActive ? "border-emerald-500/25" : "border-white/[0.06]"
                    }`}>
                      {section.label}
                      {isHovered && (
                        <span className="ml-1.5 text-emerald-400/60">— {scrollPercent}%</span>
                      )}
                    </span>

                    {/* Dot with glow pulse ring for active */}
                    <div className="relative">
                      {isActive && (
                        <motion.span
                          className="absolute inset-[-6px] rounded-full border border-emerald-500/20 glow-pulse"
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      <motion.span
                        className={`block rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-3 h-3"
                            : "w-2 h-2 bg-white/20 hover:bg-white/40"
                        }`}
                        animate={
                          isActive
                            ? {
                                background: "linear-gradient(135deg, #34d399, #2dd4bf)",
                                boxShadow: "0 0 12px oklch(0.72 0.19 163 / 50%), 0 0 4px oklch(0.72 0.19 163 / 30%)",
                              }
                            : {}
                        }
                        whileHover={
                          !isActive
                            ? { scale: 1.3, backgroundColor: "rgba(255,255,255,0.5)" }
                            : {}
                        }
                        whileTap={{ scale: 0.9 }}
                      />
                    </div>
                  </button>

                  {/* Progress line connecting dots */}
                  {index < sections.length - 1 && (
                    <div className="w-px h-[10px] relative">
                      <div className={`absolute inset-x-0 top-0 bottom-0 transition-all duration-500 ${
                        isPassed
                          ? "bg-gradient-to-b from-emerald-500/60 to-emerald-500/30"
                          : "bg-white/[0.06]"
                      }`} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
