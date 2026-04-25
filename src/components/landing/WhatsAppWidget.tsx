"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

export function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-6 z-40"
        >
          {/* Chat bubble */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 left-0 w-72 sm:w-80 rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden"
              >
                {/* Header */}
                <div className="p-4 bg-gradient-to-r from-green-600 to-green-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white">NicoPrompt</h4>
                      <p className="text-[11px] text-white/80">En línea · Responde en minutos</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    ¡Hola! 👋 ¿Tenés una idea de proyecto? Escribime y te ayudo a
                    hacerla realidad.
                  </p>
                  <a
                    href="https://wa.me/59893836619?text=Hola%20NicoPrompt!%20Tengo%20una%20idea%20de%20proyecto%20que%20me%20gustaría%20compartir."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium text-sm transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Chatear por WhatsApp
                  </a>
                  <p className="text-[10px] text-muted-foreground/50 text-center mt-3">
                    O completá el formulario más abajo
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trigger button */}
          <motion.button
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-xl shadow-green-500/30 hover:shadow-green-500/40 transition-all duration-300 flex items-center justify-center group whatsapp-pulse-ring"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Notification dot */}
            {!isOpen && (
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </motion.button>

          {/* Tooltip on hover */}
          <AnimatePresence>
            {showTooltip && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-4 left-16 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white font-medium whitespace-nowrap shadow-lg z-50"
              >
                ¿Hablamos?
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 w-2 h-2 rotate-45 bg-white/10 border-r border-b border-white/10" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
