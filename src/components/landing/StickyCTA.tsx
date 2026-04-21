"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, X, MessageCircle } from "lucide-react";

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showBttTooltip, setShowBttTooltip] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isContactMode, setIsContactMode] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;

      if (!dismissed) {
        setVisible(scrollTop > 600);
      }
      setShowBackToTop(scrollTop > 400);
      setScrollProgress(progress);
      setIsContactMode(progress >= 0.95);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  const scrollToContact = () => {
    document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = useCallback(() => {
    setIsBouncing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsBouncing(false), 600);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
  };

  // SVG circle parameters for the progress ring (main CTA)
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - scrollProgress);

  // SVG circle parameters for back-to-top progress ring
  const bttRadius = 16;
  const bttCircumference = 2 * Math.PI * bttRadius;
  const bttStrokeDashoffset = bttCircumference * (1 - scrollProgress);

  return (
    <>
      {/* Back-to-top / Contact button — appears after 400px scroll */}
      <AnimatePresence mode="wait">
        {showBackToTop && (
          <motion.button
            key={isContactMode ? "contact" : "backtotop"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={isContactMode ? scrollToContact : scrollToTop}
            onMouseEnter={() => !isContactMode && setShowBttTooltip(true)}
            onMouseLeave={() => setShowBttTooltip(false)}
            className={`fixed bottom-6 right-6 md:bottom-6 md:right-[200px] z-40 backdrop-blur-md border flex items-center justify-center transition-all duration-300 ${
              isContactMode
                ? "w-auto h-10 pl-3.5 pr-4 gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-500/30 text-white hover:shadow-emerald-500/25"
                : "w-10 h-10 rounded-full bg-white/10 border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/15 border-glow-emerald"
            }`}
            aria-label={isContactMode ? "Contactar" : "Volver arriba"}
          >
            {!isContactMode ? (
              <>
                {/* Progress ring showing scroll position */}
                <svg
                  className="absolute inset-0 w-full h-full -rotate-90"
                  viewBox="0 0 40 40"
                >
                  <circle
                    cx="20"
                    cy="20"
                    r={bttRadius}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="2"
                  />
                  <circle
                    cx="20"
                    cy="20"
                    r={bttRadius}
                    fill="none"
                    stroke="url(#bttScrollGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray={bttCircumference}
                    strokeDashoffset={bttStrokeDashoffset}
                    className="transition-[stroke-dashoffset] duration-150 ease-out"
                  />
                  <defs>
                    <linearGradient id="bttScrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <motion.div
                  animate={isBouncing ? { y: [0, -6, 0] } : { y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <ChevronUp className="w-4 h-4 relative z-10" />
                </motion.div>
                {/* Scroll percentage text */}
                <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-emerald-400/80">
                  {Math.round(scrollProgress * 100)}
                </span>
              </>
            ) : (
              <>
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Contactar</span>
              </>
            )}
            {/* Tooltip: Volver arriba */}
            <AnimatePresence>
              {showBttTooltip && !isContactMode && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 6, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-card/90 backdrop-blur-sm border border-white/10 text-[11px] text-foreground whitespace-nowrap shadow-lg pointer-events-none"
                >
                  Volver arriba
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card/90 border-b border-r border-white/10" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main CTA + Dismiss */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5"
          >
            {/* Main CTA with progress ring */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative flex items-center gap-2.5 pl-4 pr-5 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 font-medium text-sm group"
            >
              {/* Progress ring background */}
              <svg
                className="absolute -top-0.5 -right-0.5 w-[38px] h-[38px] -rotate-90"
                viewBox="0 0 38 38"
              >
                {/* Background track */}
                <circle
                  cx="19"
                  cy="19"
                  r={radius}
                  fill="none"
                  stroke="rgba(0,0,0,0.2)"
                  strokeWidth="2"
                />
                {/* Progress arc */}
                <circle
                  cx="19"
                  cy="19"
                  r={radius}
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                  opacity="0.6"
                />
              </svg>

              <MessageCircle className="w-4 h-4" />
              <span>Crear mi proyecto</span>

              {/* Scroll percentage tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-10 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg bg-card/90 backdrop-blur-sm border border-white/10 text-[11px] text-foreground whitespace-nowrap shadow-lg"
                  >
                    {Math.round(scrollProgress * 100)}% leído
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-card/90 border-b border-r border-white/10" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Dismiss button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="w-9 h-9 rounded-full bg-card/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 shadow-lg"
              aria-label="Cerrar"
            >
              <X className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
