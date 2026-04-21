"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Smartphone,
  Globe,
  Cloud,
  Bot,
  ShoppingCart,
  ArrowRight,
  Clock,
  TrendingUp,
  DollarSign,
  Zap,
  Calculator,
} from "lucide-react";

const projectTypes = [
  {
    id: "mobile",
    label: "App Móvil",
    icon: Smartphone,
    efficiencyMultiplier: 1.4,
    estimatedCost: 3500,
    hoursPerMonth: 120,
  },
  {
    id: "web",
    label: "Web App",
    icon: Globe,
    efficiencyMultiplier: 1.5,
    estimatedCost: 2500,
    hoursPerMonth: 100,
  },
  {
    id: "saas",
    label: "SaaS",
    icon: Cloud,
    efficiencyMultiplier: 2.0,
    estimatedCost: 5000,
    hoursPerMonth: 160,
  },
  {
    id: "ai",
    label: "Automatización IA",
    icon: Bot,
    efficiencyMultiplier: 2.5,
    estimatedCost: 3000,
    hoursPerMonth: 200,
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingCart,
    efficiencyMultiplier: 1.6,
    estimatedCost: 4000,
    hoursPerMonth: 80,
  },
] as const;

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 800,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const startTime = performance.now();
    const startValue = displayValue;
    const diff = value - startValue;

    if (Math.abs(diff) < 0.01) {
      setDisplayValue(value);
      return;
    }

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(startValue + diff * eased);
      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [value, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  const formatted = decimals > 0
    ? displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    : Math.round(displayValue).toLocaleString("es-AR");

  return (
    <span className="counter-smooth inline-block">
      {prefix}{formatted}{suffix}
    </span>
  );
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export function ROICalculator() {
  const [selectedType, setSelectedType] = useState(projectTypes[0]);
  const [revenue, setRevenue] = useState(10000);

  const monthlyGain = revenue * selectedType.efficiencyMultiplier;
  const annualGain = monthlyGain * 12;
  const roi =
    ((annualGain - selectedType.estimatedCost) /
      selectedType.estimatedCost) *
    100;
  const paybackMonths =
    monthlyGain > 0
      ? selectedType.estimatedCost / monthlyGain
      : 0;

  const scrollToContact = useCallback(() => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  const sliderPercentage = ((revenue - 1000) / (100000 - 1000)) * 100;

  const results = [
    {
      icon: Clock,
      label: "Horas ahorradas por mes",
      value: <AnimatedNumber value={selectedType.hoursPerMonth} suffix=" hs" />,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      icon: TrendingUp,
      label: "Ganancia anual estimada",
      value: (
        <AnimatedNumber
          value={annualGain}
          prefix="US$ "
          duration={1000}
        />
      ),
      color: "text-teal-400",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20",
    },
    {
      icon: DollarSign,
      label: "ROI proyectado",
      value: <AnimatedNumber value={Math.max(0, roi)} suffix="%" decimals={0} />,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
    },
    {
      icon: Zap,
      label: "Período de recuperación",
      value: (
        <AnimatedNumber
          value={paybackMonths}
          suffix=" meses"
          decimals={1}
        />
      ),
      color: "text-violet-400",
      bgColor: "bg-violet-500/10",
      borderColor: "border-violet-500/20",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-500/[0.04] rounded-full blur-[140px] roi-orb pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-teal-500/[0.04] rounded-full blur-[120px] roi-orb pointer-events-none" style={{ animationDelay: "-4s" }} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <Calculator className="w-3 h-3" />
            Herramienta interactiva
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            <span className="gradient-text-emerald">Calculadora de ROI</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto">
            Estimá tu retorno de inversión proyectado según el tipo de proyecto y tus ingresos actuales.
          </p>
        </motion.div>

        {/* Calculator Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6 sm:p-8 lg:p-10"
        >
          {/* Project Type Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-foreground/80 mb-3">
              Tipo de proyecto
            </label>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((type) => {
                const isActive = selectedType.id === type.id;
                return (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedType(type)}
                    className={`
                      flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                      transition-all duration-300 border cursor-pointer
                      ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-transparent shadow-lg shadow-emerald-500/20"
                          : "bg-white/[0.04] text-muted-foreground border-white/[0.06] hover:bg-white/[0.08] hover:text-foreground hover:border-white/[0.12]"
                      }
                    `}
                  >
                    <type.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{type.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Revenue Slider */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground/80">
                Ingresos mensuales actuales
              </label>
              <span className="text-lg sm:text-xl font-bold gradient-text-emerald">
                {formatCurrency(revenue)}
              </span>
            </div>
            <div className="relative">
              <input
                type="range"
                min={1000}
                max={100000}
                step={1000}
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="roi-slider w-full"
                aria-label="Ingresos mensuales en dólares"
              />
              {/* Tick marks */}
              <div className="flex justify-between mt-2 px-1">
                <span className="text-[10px] text-muted-foreground/50">$1K</span>
                <span className="text-[10px] text-muted-foreground/50">$25K</span>
                <span className="text-[10px] text-muted-foreground/50">$50K</span>
                <span className="text-[10px] text-muted-foreground/50">$75K</span>
                <span className="text-[10px] text-muted-foreground/50">$100K</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent mb-8" />

          {/* Results Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <AnimatePresence mode="wait">
              {results.map((result, i) => (
                <motion.div
                  key={`${selectedType.id}-${result.label}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.07,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`
                    p-4 sm:p-5 rounded-xl border transition-all duration-300
                    ${result.bgColor} ${result.borderColor}
                    hover:border-white/[0.12] group
                  `}
                >
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${result.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <result.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${result.color}`} />
                    </div>
                    <span className="text-[11px] sm:text-xs text-muted-foreground/70 leading-tight">
                      {result.label}
                    </span>
                  </div>
                  <div
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight ${result.color}`}
                  >
                    {result.value}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 sm:mt-10"
          >
            <Button
              onClick={scrollToContact}
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-2xl transition-all duration-300 rounded-xl px-8 py-6 text-base font-semibold group mx-auto block"
            >
              Obtener mi cotización personalizada
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="text-center text-xs text-muted-foreground/50 mt-3">
              Sin compromiso · Respuesta en menos de 24hs
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
