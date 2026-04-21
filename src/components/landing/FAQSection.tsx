"use client";

import { useState, useMemo } from "react";
import { FadeInStagger, FadeInItem } from "./Animations";
import { ChevronDown, HelpCircle, MessageCircle, Search } from "lucide-react";
import { motion } from "framer-motion";

type FAQCategory = "Todos" | "Proceso" | "Garantías" | "Tecnología" | "General";

const categories: FAQCategory[] = ["Todos", "Proceso", "Garantías", "Tecnología", "General"];

const faqs = [
  {
    question: "¿Cuánto tarda un proyecto típico?",
    answer:
      "La mayoría de los MVPs se entregan entre 5 y 15 días hábiles, dependiendo de la complejidad. Proyectos más grandes pueden tomar 3-4 semanas. Siempre te doy una estimación clara antes de empezar.",
    category: "Proceso" as const,
  },
  {
    question: "¿Trabajás con empresas de cualquier tamaño?",
    answer:
      "Sí, trabajo con emprendedores individuales, startups y empresas establecidas. Cada proyecto se adapta al presupuesto y necesidades del cliente, sin importar el tamaño.",
    category: "General" as const,
  },
  {
    question: "¿Qué tecnologías usás?",
    answer:
      "Uso un stack moderno: Next.js, React, TypeScript, Node.js, Prisma, PostgreSQL y herramientas de IA. Elijo las mejores tecnologías para cada proyecto específico, priorizando escalabilidad y rendimiento.",
    category: "Tecnología" as const,
  },
  {
    question: "¿El código es mío al final?",
    answer:
      "Absolutamente. Todo el código fuente, diseño y activos son 100% tuyos. Entrego documentación y acceso completo para que cualquier equipo pueda continuar el desarrollo si lo necesitás.",
    category: "Garantías" as const,
  },
  {
    question: "¿Ofrecés soporte después de la entrega?",
    answer:
      "Sí, incluyo 30 días de soporte post-entrega sin costo. También ofrezco planes de mantenimiento mensual para quienes necesitan soporte continuo, mejoras y nuevas funcionalidades.",
    category: "Garantías" as const,
  },
  {
    question: "¿Cómo es el proceso de pago?",
    answer:
      "Trabajo con un anticipo del 50% para empezar y el 50% restante al entregar. Para proyectos grandes, podemos dividir en hitos de pago. Acepto transferencias, MercadoPago y criptomonedas.",
    category: "Proceso" as const,
  },
  {
    question: "¿Qué garantías tenés sobre el trabajo?",
    answer:
      "Trabajo con un acuerdo de satisfacción: si el resultado no cumple con lo acordado en la propuesta, hago las revisiones necesarias sin costo adicional. Mi reputación depende de la calidad de cada entrega, así que me comprometo al 100% con cada proyecto.",
    category: "Garantías" as const,
  },
  {
    question: "¿Podes trabajar con mi equipo de diseño?",
    answer:
      "Sí, me encanta colaborar con equipos de diseño existentes. Puedo integrarme a tu flujo de trabajo en Figma, recibir assets y specs de diseño, y mantener comunicación directa con tus diseñadores para asegurar una implementación fiel al pixel.",
    category: "Proceso" as const,
  },
  {
    question: "¿Qué pasa si necesito cambios después de la entrega?",
    answer:
      "Incluyo revisiones dentro del alcance original sin costo. Para cambios adicionales fuera del alcance, te presento una cotización transparente antes de empezar. También ofrezco planes de retainer mensual para quienes anticipan iteraciones continuas.",
    category: "Garantías" as const,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<FAQCategory>("Todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "Todos" || faq.category === activeCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Reset open index when filters change
  const handleCategoryChange = (category: FAQCategory) => {
    setActiveCategory(category);
    setOpenIndex(null);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setOpenIndex(null);
  };

  const scrollToContacto = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0 dot-bg opacity-20" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInStagger stagger={0.08} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-5">
            <HelpCircle className="w-3 h-3" />
            Preguntas frecuentes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            ¿Tenes{" "}
            <span className="gradient-text">preguntas</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            Las respuestas mas comunes sobre como trabajamos.
          </p>
        </FadeInStagger>

        {/* Category filter pills */}
        <FadeInStagger stagger={0.04} delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                    isActive
                      ? "text-white shadow-lg shadow-emerald-500/20 border-0"
                      : "bg-white/[0.04] text-muted-foreground border border-white/[0.06] hover:bg-white/[0.07] hover:border-white/[0.1] hover:text-foreground backdrop-blur-sm"
                  }`}
                  style={
                    isActive
                      ? {
                          background:
                            "linear-gradient(135deg, #10b981, #14b8a6, #2dd4bf)",
                        }
                      : undefined
                  }
                >
                  {category}
                </motion.button>
              );
            })}
          </div>
        </FadeInStagger>

        {/* Search input */}
        <FadeInStagger stagger={0.04} delay={0.15}>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar en preguntas frecuentes..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm"
            />
          </div>
        </FadeInStagger>

        {/* FAQ list — accordion mode with stagger entrance */}
        <FadeInStagger stagger={0.06} delay={0.2}>
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground/60 text-sm">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("Todos");
                  setSearchQuery("");
                }}
                className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const num = String(index + 1).padStart(2, "0");

                return (
                  <FadeInItem key={`${faq.category}-${index}`}>
                    <motion.div
                      className={`rounded-xl border overflow-hidden relative card-shine ${
                        isOpen
                          ? "border-emerald-500/20 bg-emerald-500/[0.03] shadow-lg shadow-emerald-500/[0.03]"
                          : "border-white/[0.05] bg-card/50 hover:border-white/[0.08]"
                      }`}
                      animate={{
                        scale: isOpen ? 1.01 : 1,
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    >
                      {/* Left accent bar — slides in when opening */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-xl z-10"
                        initial={false}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          scaleY: isOpen ? 1 : 0.4,
                        }}
                        style={{
                          background: "linear-gradient(to bottom, #34d399, #2dd4bf, #14b8a6)",
                          transformOrigin: "top",
                        }}
                        transition={{ duration: 0.3 }}
                      />

                      {/* Animated gradient dot — visible when open */}
                      <motion.div
                        className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full z-10"
                        initial={false}
                        animate={{
                          opacity: isOpen ? 1 : 0,
                          scale: isOpen ? 1 : 0,
                        }}
                        style={{
                          background: "radial-gradient(circle, #34d399, #2dd4bf)",
                          boxShadow: "0 0 8px oklch(0.72 0.19 163 / 40%)",
                        }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      />

                      <button
                        onClick={() =>
                          setOpenIndex(openIndex === index ? null : index)
                        }
                        className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 text-left group min-h-[48px]"
                      >
                        <div className="flex items-center gap-3">
                          {/* Number badge */}
                          <span
                            className={`flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold tracking-wider transition-all duration-300 ${
                              isOpen
                                ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                                : "bg-white/[0.04] text-muted-foreground/40 border border-white/[0.06] group-hover:bg-white/[0.06] group-hover:text-muted-foreground/60"
                            }`}
                          >
                            {num}
                          </span>
                          <span
                            className={`font-medium text-sm sm:text-base pr-4 transition-colors duration-200 ${
                              isOpen
                                ? "text-foreground"
                                : "text-muted-foreground group-hover:text-foreground"
                            }`}
                          >
                            {faq.question}
                          </span>
                        </div>
                        <motion.div
                          className="flex-shrink-0"
                          initial={false}
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                          <ChevronDown
                            className={`w-5 h-5 ${
                              isOpen
                                ? "text-emerald-400"
                                : "text-muted-foreground/50"
                            }`}
                          />
                        </motion.div>
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-5 sm:px-6 pb-5 pl-[3.25rem] sm:pl-[3.75rem]">
                          <div className="h-px bg-white/5 mb-4" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </FadeInItem>
                );
              })}
            </div>
          )}
        </FadeInStagger>

        {/* ¿Todavía tenés dudas? CTA */}
        <FadeInStagger stagger={0.1} delay={0.6}>
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              ¿Todavía tenés dudas?
            </p>
            <button
              onClick={scrollToContacto}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium hover:bg-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <MessageCircle className="w-4 h-4" />
              Escribime y las resolvemos
            </button>
          </div>
        </FadeInStagger>
      </div>
    </section>
  );
}
