"use client";

import { motion } from "framer-motion";
import { Code2, Zap, Headphones, Shield, Star, Briefcase, Timer } from "lucide-react";
import { useRef, useState, useEffect } from "react";

const tooltips: Record<string, string> = {
  "100% Código tuyo": "+50 repos entregados",
  "Entrega en 15 días": "Récord: 8 días",
  "Soporte 30 días": "Extensible a 90 días",
  "0 Costos ocultos": "Transparencia total",
};

const metrics = [
  { value: "4.9/5", label: "Rating promedio", icon: Star, gradient: "from-emerald-400 to-teal-400", iconColor: "text-emerald-400" },
  { value: "50+", label: "Proyectos completados", icon: Briefcase, gradient: "from-cyan-400 to-teal-400", iconColor: "text-cyan-400" },
  { value: "15 días", label: "Tiempo promedio MVP", icon: Timer, gradient: "from-violet-400 to-purple-400", iconColor: "text-violet-400" },
];

const items = [
  {
    icon: Code2,
    label: "100% Código tuyo",
    description: "Todo el código fuente es propiedad tuya desde el día uno",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",
    borderColor: "border-emerald-500/20",
    lineColor: "from-emerald-500/30 to-cyan-500/30",
  },
  {
    icon: Zap,
    label: "Entrega en 15 días",
    description: "MVP funcional en tiempo récord sin sacrificar calidad",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",
    borderColor: "border-cyan-500/20",
    lineColor: "from-cyan-500/30 to-violet-500/30",
  },
  {
    icon: Headphones,
    label: "Soporte 30 días",
    description: "Acompañamiento completo después de la entrega",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",
    borderColor: "border-violet-500/20",
    lineColor: "from-violet-500/30 to-amber-500/30",
  },
  {
    icon: Shield,
    label: "0 Costos ocultos",
    description: "Presupuesto transparente sin sorpresas",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",
    borderColor: "border-amber-500/20",
    lineColor: "from-amber-500/30 to-emerald-500/30",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

function UnifiedConnectingPath() {
  return (
    <div className="absolute inset-x-12 top-10 h-[2px] pointer-events-none" aria-hidden="true">
      {/* Background track line */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 rounded-full" />
      
      {/* Animated comet pulse */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-48 h-[6px] z-20"
        animate={{ 
          left: ["-5%", "105%"],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "linear",
          repeatDelay: 0.5
        }}
      >
        {/* Thick Comet Head with Core and Glow */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-cyan-400 blur-[4px] rounded-full shadow-[0_0_25px_rgba(34,211,238,0.5)]" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[4px] bg-white rounded-full blur-[1px] z-30" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-400/10 rounded-full blur-[20px] -z-10" />
        
        {/* Disintegrating particles tail */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute right-0 top-1/2 w-1 h-1 rounded-full bg-emerald-400/60"
            animate={{ 
              x: [0, -(Math.random() * 50 + 30)],
              y: [0, (Math.random() * 12 - 6)],
              opacity: [0.8, 0],
              scale: [1, 0]
            }}
            transition={{ 
              duration: 1, 
              repeat: Infinity,
              delay: i * 0.08,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}

export function WhyMeStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const [borderOpacity, setBorderOpacity] = useState(0.3);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewCenter = window.innerHeight * 0.5;
      const elementCenter = rect.top + rect.height / 2;
      const distance = Math.abs(viewCenter - elementCenter);
      const maxDistance = window.innerHeight;
      const opacity = Math.max(0.3, 1 - distance / maxDistance);
      setBorderOpacity(opacity);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Animated headline */}
        <div className="text-center mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold gradient-text-emerald inline-block">
            ¿Por qué elegir NicoPrompt?
          </h3>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative rounded-2xl border border-white/[0.05] bg-white/[0.02] p-6 sm:p-8 backdrop-blur-sm"
          style={{ opacity: Math.max(0.5, borderOpacity) }}
        >
          {/* Decorative gradient mesh background */}
          <div className="absolute inset-0 gradient-mesh opacity-20 pointer-events-none" />

          {/* Subtle particle dots */}
          {[
            { top: "15%", left: "10%", size: 2, delay: 0 },
            { top: "70%", left: "25%", size: 3, delay: 1.5 },
            { top: "25%", left: "55%", size: 2, delay: 0.8 },
            { top: "80%", left: "70%", size: 2, delay: 2.2 },
            { top: "10%", left: "85%", size: 3, delay: 1 },
            { top: "50%", left: "40%", size: 2, delay: 3 },
          ].map((dot, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-emerald-400/20 pointer-events-none"
              style={{
                top: dot.top,
                left: dot.left,
                width: dot.size,
                height: dot.size,
              }}
              animate={{
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: dot.delay,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Decorative top gradient line — opacity increases on scroll proximity */}
          <div
            className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-emerald-500 to-transparent transition-opacity duration-500"
            style={{ opacity: borderOpacity }}
          />

          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:hidden relative z-10">
            {items.map((item) => (
              <motion.div
                key={item.label}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center gap-3 group relative overflow-hidden p-2 rounded-2xl shimmer-sweep"
              >
                <div className="relative z-10">
                  {/* Glow behind icon circle on hover */}
                  <div
                    className={`absolute inset-0 rounded-full blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-400 bg-gradient-to-br ${item.iconColor.replace("text-", "bg-")}`}
                    style={{ filter: "blur(12px)" }}
                  />
                  <div
                    className={`relative flex h-14 w-14 items-center justify-center rounded-full border ${item.borderColor} ${item.iconBg} backdrop-blur-sm transition-all duration-300 group-hover:scale-110`}
                  >
                    <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                  </div>
                </div>
                <div className="text-center relative z-10">
                  <span className={`text-center text-sm font-bold block mb-1 ${
                    item.iconColor.includes("emerald") ? "gradient-text-emerald-animated" : 
                    item.iconColor.includes("cyan") ? "gradient-text-cyan-animated" : 
                    item.iconColor.includes("violet") ? "gradient-text-violet-animated" : 
                    "gradient-text-amber-animated"
                  }`}>
                    {item.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground/60 group-hover:text-foreground/80 mt-1 block leading-tight max-w-[140px] transition-colors">
                    {item.description}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop layout with unified animated path */}
          <div className="hidden md:block relative z-10 w-full mb-4">
            <UnifiedConnectingPath />
            <div className="flex items-start justify-between relative z-10 w-full">
              {items.map((item, index) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -8 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex flex-col items-center gap-3 group cursor-default relative overflow-visible p-3 rounded-2xl transition-all hover:bg-white/[0.02] w-1/4"
                >
                  <div className="relative z-20">
                    {/* Glow behind icon circle on hover */}
                    <div
                      className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-400`}
                      style={{
                        filter: "blur(16px)",
                        background: item.iconColor === "text-emerald-400" ? "#34d399" : item.iconColor === "text-cyan-400" ? "#22d3ee" : item.iconColor === "text-violet-400" ? "#a78bfa" : "#fbbf24",
                      }}
                    />
                    <div
                      className={`relative flex h-14 w-14 items-center justify-center rounded-full border ${item.borderColor} ${item.iconBg} backdrop-blur-sm transition-all duration-300 group-hover:scale-110 shadow-lg`}
                    >
                      <item.icon className={`h-6 w-6 ${item.iconColor}`} />
                    </div>
                  </div>
                  <motion.span 
                    className={`relative z-10 text-center text-sm font-bold block mb-1 ${
                      item.iconColor.includes("emerald") ? "gradient-text-emerald-animated" : 
                      item.iconColor.includes("cyan") ? "gradient-text-cyan-animated" : 
                      item.iconColor.includes("violet") ? "gradient-text-violet-animated" : 
                      "gradient-text-amber-animated"
                    }`}
                    animate={index === 0 ? { opacity: 1 } : { 
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity, 
                      times: [0, index * 0.23 + 0.1, 0.95, 1],
                      ease: "easeInOut"
                    }}
                  >
                    {item.label}
                  </motion.span>
                  <motion.div
                    className="relative z-10 text-[11px] text-zinc-300 group-hover:text-white text-center font-medium leading-snug max-w-[120px] overflow-hidden"
                    animate={index === 0 ? { opacity: 1, height: "auto", y: 0 } : { 
                      opacity: [0, 1, 1, 0],
                      height: ["0px", "auto", "auto", "0px"],
                      y: [4, 0, 0, 4]
                    }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity, 
                      times: [0, index * 0.23 + 0.15, 0.95, 1],
                      ease: "easeOut"
                    }}
                  >
                    {item.description}
                  </motion.div>
                  {/* Hover metric tooltip */}
                  <motion.span
                    className="relative z-10 whitespace-nowrap text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-emerald-400/80 mt-1"
                    animate={index === 0 ? { opacity: 1, y: 0 } : { 
                      opacity: [0, 1, 1, 0],
                      y: [4, 0, 0, 4]
                    }}
                    transition={{ 
                      duration: 4.5, 
                      repeat: Infinity, 
                      times: [0, index * 0.23 + 0.2, 0.95, 1],
                      ease: "easeOut"
                    }}
                  >
                    {tooltips[item.label]}
                  </motion.span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Animated counting metrics row */}
          <div className="mt-6 pt-6 border-t border-white/[0.04] relative z-10">
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {metrics.map((metric, i) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + i * 0.12 }}
                  className="flex flex-col items-center gap-1.5 sm:gap-2"
                >
                  <metric.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${metric.iconColor}`} />
                  <span className={`text-xl sm:text-2xl font-bold bg-gradient-to-r ${metric.gradient} bg-clip-text text-transparent`}>
                    {metric.value}
                  </span>
                  <span className="text-[10px] sm:text-xs text-muted-foreground text-center leading-tight">
                    {metric.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Decorative bottom gradient line */}
          <div className="absolute inset-x-0 bottom-0 h-px rounded-b-2xl bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
