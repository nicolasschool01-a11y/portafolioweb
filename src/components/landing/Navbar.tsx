"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Zap, Menu, X, ArrowRight, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setScrolled(scrollTop > 100);

      // Scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection using IntersectionObserver
  useEffect(() => {
    const sectionIds = ["hero", "servicios", "proceso", "proyectos", "contacto"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px",
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

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      {/* Animated gradient bottom border when scrolled */}
      {scrolled && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
          style={{
            background: "linear-gradient(to right, #10b981, #14b8a6, #10b981, #14b8a6)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s ease-in-out infinite",
          }}
        />
      )}

      {/* Scroll progress bar at top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-500 origin-left z-50"
        style={{ scaleX: scrollProgress, boxShadow: scrollProgress > 0 ? '0 0 8px rgba(16,185,129,0.5), 0 0 16px rgba(20,184,166,0.25)' : 'none' }}
        transition={{ duration: 0.1 }}
      />

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[72px]">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className={`flex items-center gap-2.5 group ${scrolled ? 'group-hover:scale-105' : ''} transition-transform duration-300`}
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/30 transition-shadow duration-300">
              <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="white" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              Nico<span className="gradient-text" style={scrolled ? { textShadow: '0 0 20px rgba(16,185,129,0.3), 0 0 40px rgba(20,184,166,0.15)' } : undefined}>Prompt</span>
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative px-4 py-2 text-sm rounded-lg transition-all duration-200 ${
                    isActive
                      ? "text-emerald-400 font-medium"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 to-teal-400"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </div>

          {/* Theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:bg-white/10 hover:scale-110 transition-all duration-300"
              aria-label="Cambiar tema"
            >
              {mounted && (
                <AnimatePresence mode="wait">
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Sun className="w-4 h-4 text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                      animate={{ rotate: 0, opacity: 1, scale: 1 }}
                      exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Moon className="w-4 h-4 text-blue-400" />
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </button>
            <Button
              onClick={() => scrollTo("#contacto")}
              className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/35 transition-all duration-300 rounded-lg text-sm font-medium group/cta"
            >
              <span className="relative z-10">Crear mi proyecto</span>
              {/* Shimmer overlay on hover */}
              <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12" />
            </Button>
          </div>

          {/* Mobile menu - 44px minimum touch target */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="relative h-11 w-11 active:scale-95 transition-transform">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] bg-background/95 backdrop-blur-2xl border-white/[0.06] data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right transition-transform duration-300 ease-out"
            >
              <SheetTitle className="flex items-center gap-2.5 mb-10">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" fill="white" />
                </div>
                <span className="text-lg font-bold">
                  Nico<span className="gradient-text">Prompt</span>
                </span>
              </SheetTitle>
              <div className="flex flex-col gap-1.5">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => scrollTo(link.href)}
                    className={`text-left px-4 py-3.5 text-base transition-colors rounded-xl hover:bg-white/5 min-h-[44px] ${
                      activeSection === link.href.slice(1) ? "text-foreground bg-white/[0.05]" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="h-px bg-white/5 my-3" />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <Button
                    onClick={() => scrollTo("#contacto")}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/20 rounded-xl h-12 text-sm font-medium"
                  >
                    Crear mi proyecto
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-3 w-full text-left px-4 py-3.5 text-sm text-muted-foreground hover:text-foreground rounded-xl hover:bg-white/5 min-h-[44px] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.08] flex items-center justify-center">
                      {mounted && (
                        <AnimatePresence mode="wait">
                          {theme === "dark" ? (
                            <motion.div
                              key="sun-mobile"
                              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                              animate={{ rotate: 0, opacity: 1, scale: 1 }}
                              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <Sun className="w-4 h-4 text-amber-400" />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="moon-mobile"
                              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                              animate={{ rotate: 0, opacity: 1, scale: 1 }}
                              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <Moon className="w-4 h-4 text-blue-400" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                    <span>{theme === "dark" ? "Modo claro" : "Modo oscuro"}</span>
                  </button>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  );
}
