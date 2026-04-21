"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Shield, Settings, X, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "cookie-consent-accepted";
const AUTO_COLLAPSE_MS = 8000;

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (accepted) return;

    const handleScroll = () => {
      if (hasScrolled.current) return;
      if (window.scrollY > 300) {
        hasScrolled.current = true;
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-collapse after 15 seconds
  useEffect(() => {
    if (!visible || collapsed) return;
    const timer = setTimeout(() => setCollapsed(true), AUTO_COLLAPSE_MS);
    return () => clearTimeout(timer);
  }, [visible, collapsed]);

  const handleAcceptAll = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "all");
    setVisible(false);
  }, []);

  const handleReject = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "necessary");
    setVisible(false);
  }, []);

  const handleConfigure = () => {
    console.log("Cookie settings dialog would open here");
  };

  const handleExpand = () => {
    setCollapsed(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          className="fixed bottom-0 left-0 right-0 z-[35] pointer-events-none"
        >
          <div className="relative max-w-md pointer-events-auto mx-3 sm:mx-4 mb-16 sm:mb-20">
            <AnimatePresence mode="wait">
              {collapsed ? (
                <motion.div
                  key="pill"
                  initial={{ y: 20, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between rounded-full bg-card/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/20 px-4 py-2"
                >
                  <button
                    onClick={handleExpand}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <span>🍪</span>
                    <span>Cookies</span>
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <div className="flex items-center gap-1.5">
                    <Button
                      onClick={handleAcceptAll}
                      size="sm"
                      className="h-7 px-3 text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full shadow-md shadow-emerald-500/20"
                    >
                      Aceptar
                    </Button>
                    <button
                      onClick={handleReject}
                      className="h-7 w-7 rounded-full bg-white/[0.06] hover:bg-white/[0.1] flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Rechazar cookies"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="full"
                  initial={{ y: 20, opacity: 0, scale: 0.95 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 20, opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Gradient top border */}
                  <div className="absolute top-0 left-4 right-4 sm:left-5 sm:right-5 h-[2px] rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500" />

                  <div className="relative rounded-2xl bg-card/95 backdrop-blur-xl border border-white/[0.08] shadow-xl shadow-black/20 p-4 sm:p-5">
                    {/* Dismiss X button - top right */}
                    <button
                      onClick={handleReject}
                      className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-white/[0.06] hover:bg-white/[0.12] flex items-center justify-center text-muted-foreground hover:text-foreground transition-all duration-200"
                      aria-label="Cerrar"
                    >
                      <X className="w-3 h-3" />
                    </button>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Left: Icon + Copy */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20 shrink-0">
                            <Cookie className="w-4 h-4 text-emerald-400" />
                          </div>
                          <h3 className="text-sm sm:text-base font-semibold text-foreground tracking-tight">
                            Configuración de cookies
                          </h3>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          Usamos cookies para mejorar tu experiencia y analizar el tráfico
                          del sitio. Al continuar, aceptás nuestra{" "}
                          <a
                            href="#"
                            className="text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                          >
                            política de cookies
                          </a>
                          .
                        </p>
                      </div>

                      {/* Right: Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                        <Button
                          onClick={handleAcceptAll}
                          className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-xl transition-all duration-300 rounded-xl px-5 py-2 text-sm font-semibold"
                        >
                          <Shield className="w-3.5 h-3.5 mr-1.5" />
                          Aceptar todas
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleReject}
                          className="w-full sm:w-auto bg-transparent border-white/[0.12] hover:bg-white/[0.06] hover:border-white/20 text-muted-foreground hover:text-foreground rounded-xl px-5 py-2 text-sm font-medium transition-all duration-200"
                        >
                          Solo necesarias
                        </Button>
                      </div>
                    </div>

                    {/* Configure link */}
                    <button
                      onClick={handleConfigure}
                      className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground/70 hover:text-muted-foreground transition-colors group cursor-pointer"
                    >
                      <Settings className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
                      Configurar
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
