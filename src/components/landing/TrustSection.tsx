"use client";

import { motion } from "framer-motion";
import { AnimateOnScroll } from "./Animations";
import {
  Shield,
  Code2,
  Clock,
  Headphones,
  Lock,
  CheckCircle2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const guarantees = [
  {
    icon: Code2,
    title: "Código 100% tuyo",
    desc: "Todo el código fuente, diseño y activos son tuyos. Entrego documentación completa para que cualquier equipo pueda continuar.",
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "rgba(16,185,129,0.04)",
  },
  {
    icon: Clock,
    title: "Entrega en tiempo récord",
    desc: "MVPs funcionales en 5-15 días. Si no llego a la fecha pactada, te devuelvo el anticipo.",
    gradient: "from-cyan-500 to-blue-500",
    bgGlow: "rgba(6,182,212,0.04)",
  },
  {
    icon: Shield,
    title: "Garantía de satisfacción",
    desc: "30 días de soporte incluido sin costo. Si algo no funciona, lo arreglo sin cargo adicional.",
    gradient: "from-violet-500 to-purple-500",
    bgGlow: "rgba(139,92,246,0.04)",
  },
  {
    icon: Headphones,
    title: "Soporte continuo",
    desc: "No te dejo solo después de la entrega. Disponible para consultas, mejoras y mantenimiento.",
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "rgba(245,158,11,0.04)",
  },
  {
    icon: Lock,
    title: "Seguridad y privacidad",
    desc: "Tus datos y los de tus clientes están protegidos. Implemento las mejores prácticas de seguridad.",
    gradient: "from-rose-500 to-pink-500",
    bgGlow: "rgba(244,63,94,0.04)",
  },
];

const extraGuarantees = [
  "Sin costos ocultos ni sorpresas",
  "Transparencia total en cada etapa",
  "Stack tecnológico moderno y escalable",
  "Despliegue en producción incluido",
  "Documentación técnica completa",
  "Integraciones con tus herramientas",
];

export function TrustSection() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.02] to-transparent" />
      <div className="absolute inset-0 dot-bg opacity-10" />

      {/* Background decorative orbs */}
      <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-emerald-500/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-1/4 w-[250px] h-[250px] bg-violet-500/[0.02] rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <Shield className="w-3 h-3" />
            Garantías
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5">
            Tu tranquilidad es mi{" "}
            <span className="gradient-text">prioridad</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
            Trabajo con transparencia, sin letra chica y con garantías que protegen tu inversión.
          </p>
        </AnimateOnScroll>

        {/* Guarantee cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-12">
          {guarantees.map((guarantee, i) => (
            <motion.div
              key={guarantee.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group card-shine relative overflow-hidden p-5 sm:p-6 rounded-2xl border border-white/[0.06] hover:border-white/[0.14] transition-all duration-300"
              style={{ background: `linear-gradient(135deg, ${guarantee.bgGlow}, transparent 60%)` }}
            >
              {/* Animated checkmark badge on hover */}
              <motion.div
                className="absolute top-4 right-4"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <div className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 + i * 0.08 }}
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  </motion.div>
                </div>
              </motion.div>

              {/* Border glow on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/[0.08] rounded-full opacity-0 group-hover:opacity-100 blur-[60px] transition-opacity duration-700 pointer-events-none" />

              {/* Top accent line on hover */}
              <div className={`absolute top-0 left-6 right-6 h-px bg-gradient-to-r ${guarantee.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />

              {/* Icon */}
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${guarantee.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300`}>
                <guarantee.icon className="w-5 h-5 text-white" />
              </div>

              <h3 className="font-semibold mb-2">{guarantee.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{guarantee.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Extra guarantees list */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-white/[0.06] bg-card/30 p-6 sm:p-8"
          style={{
            borderTop: "1px solid rgba(16, 185, 129, 0.2)",
            background: "linear-gradient(to bottom, rgba(16, 185, 129, 0.03), transparent) no-repeat, var(--card) / 30%",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold">Además, podés confiar en que:</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            {extraGuarantees.map((item, idx) => (
              <motion.div
                key={item}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-2.5 cursor-default rounded-md px-1 py-0.5 hover:translate-x-1 transition-transform duration-200"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 400, damping: 15, delay: idx * 0.08 }}
                  className="shrink-0 flex items-center justify-center w-4 h-4"
                >
                  <svg
                    className="w-3 h-3 text-emerald-400"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
                <span className="text-sm text-muted-foreground">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mt-10"
        >
          <Button
            onClick={() => scrollTo("#contacto")}
            className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 rounded-xl px-8 py-5 text-sm font-semibold group"
          >
            Empezar mi proyecto con garantías
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
