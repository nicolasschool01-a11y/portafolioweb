"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Clock, MessageCircle, Zap, Check } from "lucide-react";

const contactItems = [
  {
    icon: Mail,
    label: "hola@nicoprompt.com",
    href: "mailto:hola@nicoprompt.com",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    available: true,
  },
  {
    icon: Clock,
    label: "Respuesta en menos de 24hs",
    href: null,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    available: true,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp directo",
    href: "https://wa.me/5491100000000",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    available: true,
  },
  {
    icon: Zap,
    label: "MVP listo en 15 días",
    href: null,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    available: false,
  },
];

export function QuickContactBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("hola@nicoprompt.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      window.location.href = "mailto:hola@nicoprompt.com";
    }
  };

  return (
    <div ref={ref} className="relative mb-8">
      {/* Animated top gradient line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      />

      <motion.div
        className="relative rounded-2xl border border-white/[0.05] bg-white/[0.02] backdrop-blur-sm overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Subtle gradient mesh background */}
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />

        <div className="relative z-10 px-4 py-5 sm:px-6 sm:py-6">
          {/* Mobile: 2x2 grid */}
          <div className="grid grid-cols-2 gap-4 sm:hidden">
            {contactItems.map((item, index) => {
              const Icon = copiedEmail && item.icon === Mail ? Check : item.icon;
              const isEmailCard = item.icon === Mail;
              const content = (
                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-all duration-300 hover:border-l-2 hover:border-l-emerald-500/60">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${item.bg} border ${item.border} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-foreground/80">
                      {isEmailCard && copiedEmail ? "¡Copiado!" : item.label}
                    </span>
                    {item.available && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.15 }}
                        className="flex items-center gap-1 mt-0.5"
                      >
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                        </span>
                        <span className="text-[9px] text-emerald-400/70 font-medium">Disponible</span>
                      </motion.span>
                    )}
                  </div>
                </div>
              );

              return isEmailCard ? (
                <motion.div
                  key={item.label}
                  onClick={copyEmail}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileTap={{ scale: 0.97 }}
                  className="cursor-pointer"
                >
                  {content}
                </motion.div>
              ) : item.href ? (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {content}
                </motion.a>
              ) : (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  {content}
                </motion.div>
              );
            })}
          </div>

          {/* Desktop: horizontal row */}
          <div className="hidden sm:flex items-center justify-between gap-6">
            {contactItems.map((item, index) => {
              const Icon = copiedEmail && item.icon === Mail ? Check : item.icon;
              const isEmailCard = item.icon === Mail;
              const content = (
                <div className="flex items-center gap-3 group cursor-default hover:border-l-2 hover:border-l-emerald-500/60 pl-3 transition-all duration-300">
                  <div className="relative">
                    <div className={`flex-shrink-0 w-11 h-11 rounded-xl ${item.bg} border ${item.border} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    {item.available && (
                      <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground/80 whitespace-nowrap group-hover:text-foreground transition-colors duration-200">
                      {isEmailCard && copiedEmail ? "¡Copiado!" : item.label}
                    </span>
                    {item.available && (
                      <motion.span
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.15 }}
                        className="text-[10px] text-emerald-400/60 font-medium"
                      >
                        Disponible ahora
                      </motion.span>
                    )}
                  </div>
                </div>
              );

              return (
                <div key={item.label} className="flex items-center gap-6">
                  {isEmailCard ? (
                    <motion.div
                      onClick={copyEmail}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      className="group cursor-pointer"
                    >
                      {content}
                    </motion.div>
                  ) : item.href ? (
                    <motion.a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ y: -3 }}
                      className="group"
                    >
                      {content}
                    </motion.a>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      {content}
                    </motion.div>
                  )}
                  {index < contactItems.length - 1 && (
                    <div className="hidden md:block w-px h-8 bg-white/[0.06]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom gradient line */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

        {/* Social proof - response indicator */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="relative z-10 px-4 sm:px-6 pb-4 sm:pb-5"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            <span className="text-[11px] text-muted-foreground/60 font-medium">
              Última respuesta: hace 5 min
            </span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
