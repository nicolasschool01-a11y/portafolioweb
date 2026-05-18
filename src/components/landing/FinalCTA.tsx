"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll } from "./Animations";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, Shield, Clock, MessageSquare } from "lucide-react";
import { useMemo } from "react";

export function FinalCTA() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const trustPoints = [
    { icon: MessageSquare, text: "Primera consulta gratis" },
    { icon: Clock, text: "Llamada breve con contexto" },
    { icon: Shield, text: "Alcance acotado" },
    { icon: Sparkles, text: "Sprint hasta 14 dias" },
  ];

  // Generate floating particles around the CTA
  const particles = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 6 + Math.random() * 8,
      delay: Math.random() * 4,
      opacity: 0.1 + Math.random() * 0.25,
    })),
  []);

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Static gradient orbs */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[150px]" />
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-teal-500/8 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] bg-violet-500/5 rounded-full blur-[100px]" />

      {/* Morphing decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-emerald-500/[0.04] to-teal-500/[0.02] animate-morph blur-[80px] pointer-events-none" />

      {/* Floating particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-emerald-400 pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [p.opacity, p.opacity * 2, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="text-center">
            {/* Main CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-emerald-500/[0.06] via-card/60 to-teal-500/[0.06] p-8 sm:p-12 lg:p-16 mb-10 overflow-hidden"
            >
              {/* Inner glow effects */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-emerald-500/[0.03] rounded-full blur-[60px] pointer-events-none" />

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-tl-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-teal-500/10 to-transparent rounded-br-3xl pointer-events-none" />

              {/* Live social proof indicator */}
              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 mx-auto"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-xs text-emerald-400 font-medium">
                    3 personas están viendo esto ahora
                  </span>
                </motion.div>
              </div>

              {/* Content with staggered entrance */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring", delay: 0.1 }}
                viewport={{ once: true }}
                className="text-5xl sm:text-6xl mb-6"
              >
                🧨
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-5 leading-[1.15] relative z-10"
              >
                Podés seguir probando{" "}
                <span className="text-muted-foreground/60">herramientas sueltas</span>
                ...
                <br />
                <span className="gradient-text-animated text-[1.1em]">
                  o empezar por el proceso que realmente conviene ordenar.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed relative z-10"
              >
                Completá el formulario, agendá una Consulta IA Inicial gratuita y vemos si tiene sentido avanzar a un IA Sprint.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center relative z-10"
              >
                <Button
                  onClick={() => scrollTo("#contacto")}
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-2xl transition-all duration-300 rounded-xl px-10 py-7 text-lg font-semibold group relative overflow-hidden breathe"
                >
                  {/* Shimmer overlay */}
                  <div className="absolute inset-0 animate-shimmer pointer-events-none" />
                  <Zap className="w-5 h-5 mr-2 relative z-10" />
                  <span className="relative z-10">Agendar consulta IA gratuita</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust points row with staggered entrance */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {trustPoints.map((item, i) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.6 + i * 0.12 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-muted-foreground hover:bg-white/[0.06] hover:border-white/[0.1] hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group cursor-default"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/15 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all duration-300">
                    <item.icon className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span className="text-foreground/80 font-medium leading-tight">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
