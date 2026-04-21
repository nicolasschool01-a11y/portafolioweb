"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll } from "./Animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Eye } from "lucide-react";

export function IntermediateCTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <motion.div
            animate={{ boxShadow: ["0 0 0 0 rgba(16, 185, 129, 0)", "0 0 30px 2px rgba(16, 185, 129, 0.06)", "0 0 0 0 rgba(16, 185, 129, 0)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
          <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-card via-card/80 to-card/50 p-8 sm:p-12 lg:p-16 text-center overflow-hidden">
            {/* Animated glowing border effect */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none z-0">
              <div className="glow-border-ring" />
            </div>

            {/* CSS-only particle / sparkle background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={`sparkle-${i}`}
                  className="sparkle-dot"
                  style={{
                    left: `${(i * 17 + 7) % 94}%`,
                    top: `${(i * 23 + 11) % 88}%`,
                    animationDelay: `${(i * 0.7) % 4}s`,
                    animationDuration: `${2 + (i % 3)}s`,
                  }}
                />
              ))}
              {/* Floating micro-particles with randomized positions */}
              {Array.from({ length: 24 }).map((_, i) => (
                <span
                  key={`micro-${i}`}
                  className="micro-particle"
                  style={{
                    left: `${((i * 37 + 13) % 96) + 2}%`,
                    top: `${((i * 29 + 7) % 92) + 4}%`,
                    animationDelay: `${(i * 0.4) % 5}s`,
                    animationDuration: `${3 + (i % 4)}s`,
                  }}
                />
              ))}
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/8 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-teal-500/5 rounded-full blur-[100px]" />

            {/* More visible corner accents */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-tr-[100px]" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-teal-500/20 to-transparent rounded-tl-[100px]" />

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-5xl sm:text-6xl mb-6"
              >
                🔥
              </motion.div>

              <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight mb-4 leading-[1.15]">
                Si podés imaginarlo,{" "}
                <span className="gradient-text">podemos construirlo</span>
              </h2>

              <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                No importa si es una app, un sistema interno, una web o algo que todavía no existe.
                Lo creamos juntos.
              </p>

              <Button
                onClick={() => scrollTo("#contacto")}
                size="lg"
                className="cta-breathing-btn bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 rounded-xl px-8 py-6 text-base font-semibold group"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Empezar ahora
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              {/* Live viewers indicator */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center gap-2 mt-5 text-xs text-muted-foreground/70"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <Eye className="w-3 h-3" />
                <span>3 personas están viendo esto</span>
              </motion.div>
            </div>
          </div>
          </motion.div>
        </AnimateOnScroll>
      </div>

      {/* Scoped styles */}
      <style jsx global>{`
        /* ---- Sparkle dots (CSS-only particles) ---- */
        .sparkle-dot {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          animation: sparkle-pulse ease-in-out infinite;
          pointer-events: none;
        }

        /* ---- Micro particles (extra small dots) ---- */
        .micro-particle {
          position: absolute;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(16, 185, 129, 0.4);
          animation: micro-float ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes micro-float {
          0%, 100% {
            opacity: 0;
            transform: translateY(0) translateX(0);
          }
          25% {
            opacity: 0.7;
          }
          50% {
            opacity: 0.4;
            transform: translateY(-8px) translateX(3px);
          }
          75% {
            opacity: 0.6;
          }
        }

        @keyframes sparkle-pulse {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.4);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* ---- Animated glowing border ring ---- */
        .glow-border-ring {
          position: absolute;
          inset: -1px;
          border-radius: 1.5rem;
          background: conic-gradient(
            from var(--glow-angle, 0deg),
            transparent 0%,
            rgba(16, 185, 129, 0.35) 10%,
            transparent 20%,
            transparent 50%,
            rgba(20, 184, 166, 0.3) 60%,
            transparent 70%
          );
          animation: glow-rotate 4s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          padding: 1px;
        }

        @property --glow-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes glow-rotate {
          to {
            --glow-angle: 360deg;
          }
        }

        /* Fallback for browsers without @property support */
        @supports not (background: conic-gradient(from 0deg, red, blue)) {
          .glow-border-ring {
            background: transparent;
          }
        }

        /* ---- CTA breathing / pulse shadow ---- */
        .cta-breathing-btn {
          animation: cta-breathe 3s ease-in-out infinite;
        }

        @keyframes cta-breathe {
          0%,
          100% {
            box-shadow: 0 10px 25px -5px rgba(16, 185, 129, 0.25),
              0 0 0 0 rgba(16, 185, 129, 0);
          }
          50% {
            box-shadow: 0 10px 40px -5px rgba(16, 185, 129, 0.45),
              0 0 20px 4px rgba(16, 185, 129, 0.1);
          }
        }
      `}</style>
    </section>
  );
}
