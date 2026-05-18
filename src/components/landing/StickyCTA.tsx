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
  const [isBouncing, setIsBouncing] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

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
      // Hide the CTA stack when user reaches the footer area (last 5%)
      setAtFooter(progress >= 0.92);
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
      {/* Back-to-top button — always just a scroll-up button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            key="backtotop"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            onMouseEnter={() => setShowBttTooltip(true)}
            onMouseLeave={() => setShowBttTooltip(false)}
            className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/15 flex items-center justify-center transition-all duration-300"
            aria-label="Volver arriba"
          >
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
            {/* Tooltip: Volver arriba */}
            <AnimatePresence>
              {showBttTooltip && (
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

      {/* Main CTA stack: consulta + contacto — hide at footer */}
      <AnimatePresence>
        {visible && !atFooter && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
          >
            {/* Main CTA: Consulta IA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="relative flex items-center gap-2 sm:gap-2.5 pl-3 pr-4 sm:pl-4 sm:pr-5 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 font-medium text-xs sm:text-sm group"
            >
              {/* Pulse ring animation */}
              <span className="absolute inset-0 rounded-full animate-ping bg-emerald-500/20 pointer-events-none" style={{ animationDuration: '2.5s' }} />

              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Consulta IA gratuita</span>

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

            {/* WhatsApp CTA: Contactame */}
            <motion.a
              href="https://wa.me/59893836619"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-1.5 sm:gap-2 pl-3 pr-3.5 sm:pl-3.5 sm:pr-4 py-2 sm:py-2.5 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white shadow-xl shadow-[#25D366]/25 hover:shadow-[#25D366]/40 transition-all duration-300 font-medium text-xs sm:text-sm"
            >
              {/* Pulse ring animation */}
              <span className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/20 pointer-events-none" style={{ animationDuration: '2.5s' }} />

              {/* WhatsApp Icon */}
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <span>Contactame</span>
            </motion.a>

            {/* Dismiss button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDismiss}
              className="w-7 h-7 sm:w-8 sm:h-8 mt-1 rounded-full bg-card/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-card transition-all duration-200 shadow-lg"
              aria-label="Cerrar"
            >
              <X className="w-3 h-3" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
