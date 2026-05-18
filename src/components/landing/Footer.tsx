"use client";

import { motion } from "framer-motion";
import { Zap, Mail, ArrowUp, Github, Linkedin, Twitter, MapPin, Phone, Heart, Shield, Clock, Code2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const footerLinks = {
  servicios: [
    { label: "Consulta IA Inicial", href: "#contacto" },
    { label: "IA Sprint", href: "#servicios" },
    { label: "Sistema inicial", href: "#servicios" },
    { label: "Implementacion Fase 2", href: "#servicios" },
  ],
  empresa: [
    { label: "Proceso", href: "#proceso" },
    { label: "Precios", href: "#contacto" },
    { label: "FAQ", href: "#contacto" },
    { label: "Contacto", href: "#contacto" },
  ],
  recursos: [
    { label: "Ventas / leads", href: "#servicios" },
    { label: "Atencion al cliente", href: "#servicios" },
    { label: "Operaciones internas", href: "#servicios" },
    { label: "CRM / datos", href: "#servicios" },
  ],
};

const trustBadges = [
  { icon: Shield, text: "Alcance claro" },
  { icon: Clock, text: "Sprint hasta 14 dias" },
  { icon: Code2, text: "1 proceso primero" },
];

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const techStack = [
  { label: "Next.js", abbr: "Nx" },
  { label: "React", abbr: "Re" },
  { label: "TypeScript", abbr: "TS" },
  { label: "Tailwind", abbr: "Tw" },
  { label: "Framer Motion", abbr: "Fm" },
];

export function Footer() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percent = docHeight > 0 ? Math.round((window.scrollY / docHeight) * 100) : 0;
      setScrollPercent(percent);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contacto@nicoprompt.com");
      setCopiedEmail(true);
      toast({
        title: "Email copiado",
        description: "contacto@nicoprompt.com",
      });
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback to mailto
      window.location.href = "mailto:contacto@nicoprompt.com";
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    // Simulate a short delay for UX feel
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast({
        title: "¡Gracias! Te contactaremos pronto.",
        description: "Tu email fue registrado exitosamente.",
      });
    }, 500);
  };

  return (
    <footer className="relative border-t border-white/[0.06]">
      {/* Enhanced gradient glow line at top */}
      <div className="absolute inset-x-0 top-0 h-px footer-glow-line bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
      {/* Secondary pulsing glow */}
      <div className="absolute inset-x-0 top-0 h-[2px] footer-glow-line-pulse" />
      {/* Subtle top gradient fade */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-emerald-500/[0.03] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-8 sm:pb-10">
        {/* Main grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/15">
                <Zap className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-lg font-bold">
                Nico<span className="gradient-text">Prompt</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed mb-6">
              IA aplicada para ordenar procesos, ahorrar tiempo y construir sistemas simples para negocios.
            </p>

            {/* Newsletter mini-form */}
            <div className="mb-6">
              <p className="text-xs text-muted-foreground/70 uppercase tracking-wider mb-2.5 font-medium">
                Newsletter
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu email"
                    required
                    className="w-full h-9 pl-9 pr-3 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-emerald-500/30 focus:bg-white/[0.06] transition-all duration-200"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="sm"
                  className="h-9 px-3 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-md shadow-emerald-500/15 transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              {trustBadges.map((badge) => (
                <motion.div
                  key={badge.text}
                  whileHover={{ y: -2 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] text-muted-foreground/80"
                >
                  <badge.icon className="w-3.5 h-3.5 text-emerald-400" />
                  {badge.text}
                </motion.div>
              ))}
            </div>

            {/* Social links with hover glow + tooltip */}
            <div className="flex items-center gap-3 mb-6 relative">
              {socialLinks.map((social) => (
                <div key={social.label} className="relative">
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => setHoveredSocial(social.label)}
                    onMouseLeave={() => setHoveredSocial(null)}
                    className={`w-9 h-9 rounded-lg bg-white/5 border flex items-center justify-center transition-all duration-200 ${
                      hoveredSocial === social.label
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25 shadow-lg shadow-emerald-500/10"
                        : "text-muted-foreground border-white/5 hover:text-foreground hover:bg-white/10 hover:border-white/10"
                    }`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                  {/* Tooltip */}
                  {hoveredSocial === social.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 4 }}
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/10 text-[10px] text-foreground whitespace-nowrap z-10 pointer-events-none"
                    >
                      {social.label}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-white/10 border-l border-t border-white/10" />
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-2.5">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-emerald-400 transition-colors"
              >
                {copiedEmail ? (
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <Mail className="w-4 h-4" />
                )}
                {copiedEmail ? "¡Copiado!" : "contacto@nicoprompt.com"}
              </button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
                <MapPin className="w-3.5 h-3.5" />
                <span>Uruguay</span>
              </div>
              {/* Availability indicator */}
              <div className="flex items-center gap-2 text-sm">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_6px_oklch(0.72_0.19_163/50%)]" />
                </span>
                <span className="text-emerald-400/80 text-xs font-medium">
                  Disponible para consultas IA
                </span>
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider mb-5 text-foreground/80">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-sm text-muted-foreground hover:text-emerald-400 hover:drop-shadow-[0_0_6px_oklch(0.72_0.19_163/40%)] transition-all duration-200 hover:translate-x-1 inline-block hover-underline-grow relative"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* pSEO Directory Column */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider mb-5 text-foreground/80">
              Ubicaciones
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/desarrollo-web-en-montevideo" className="text-sm text-muted-foreground hover:text-emerald-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Web en Montevideo
                </a>
              </li>
              <li>
                <a href="/app-a-medida-en-buenos-aires" className="text-sm text-muted-foreground hover:text-emerald-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Apps en Buenos Aires
                </a>
              </li>
              <li>
                <a href="/chatbot-whatsapp-en-punta-del-este" className="text-sm text-muted-foreground hover:text-emerald-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  Chatbot en Punta del Este
                </a>
              </li>
              <li>
                <a href="/sistema-crm-en-cordoba" className="text-sm text-muted-foreground hover:text-emerald-400 transition-all duration-200 hover:translate-x-1 inline-block">
                  CRM en Córdoba
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA strip with animated gradient border */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mb-12"
        >
          {/* Gradient border — static for performance */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20 pointer-events-none" />
          <motion.div
            className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-r from-emerald-500/[0.06] via-card/80 to-teal-500/[0.06] p-6 sm:p-8 text-center overflow-hidden"
          >
            {/* Static gradient accents behind CTA */}
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-teal-500/10 rounded-full blur-[70px] pointer-events-none" />

            <h3 className="text-lg sm:text-xl font-bold mb-2 relative z-10">¿Tenes un proceso que queres ordenar con IA?</h3>
            <p className="text-sm text-muted-foreground mb-5 relative z-10">
              Completá el formulario, agendá una Consulta IA Inicial gratuita y vemos si hay fit para un Sprint.
            </p>
            {/* Response guarantee badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-5 relative z-10">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/15">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] text-emerald-400/90 font-medium">Contexto antes de la llamada</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] text-muted-foreground/80 font-medium">Sin compromiso</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] text-muted-foreground/80 font-medium">Sin blueprint gratis</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
              <Button
                onClick={() => scrollTo("#contacto")}
                className="relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:shadow-xl rounded-xl text-sm font-medium group/btn transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Send className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform duration-200" />
                  Solicitar consulta gratuita
                </span>
                {/* Shimmer overlay on hover */}
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-sm text-muted-foreground hover:text-foreground rounded-xl gap-2 transition-all duration-200 hover:border-white/20"
              >
                <Phone className="w-4 h-4" />
                <a href="https://wa.me/59893836619" target="_blank" rel="noopener noreferrer">
                  WhatsApp directo
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Tech stack showcase */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <span className="text-[11px] text-muted-foreground/50 font-medium">Construido con</span>
            <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {techStack.map((tech, i) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
                whileHover={{ y: -2 }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-200"
              >
                <span className="w-5 h-5 rounded bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-[9px] font-bold text-emerald-400">
                  {tech.abbr}
                </span>
                <span className="text-[11px] text-muted-foreground/70">{tech.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Emerald gradient separator line */}
        <div className="mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent" />
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs text-muted-foreground/60 flex-wrap justify-center sm:justify-start">
            <span>© {new Date().getFullYear()} NicoPrompt. Todos los derechos reservados.</span>
            <span className="hidden sm:inline text-white/10">·</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
              <span>🇺🇾</span>
              <span className="text-muted-foreground/50">Hecho en Uruguay</span>
            </span>
            <span className="hidden sm:inline text-white/10">·</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/[0.06] border border-emerald-500/[0.12] text-emerald-400/80 text-xs font-medium">
              <span className="relative">
                <span className="text-sm animate-pulse">❤️</span>
              </span>
              Made with ❤️ y IA
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-emerald-500/[0.08] to-cyan-500/[0.08] border border-emerald-500/15 text-xs font-medium">
              <span className="text-sm">🤖</span>
              <span className="gradient-text-emerald-animated font-medium">Potenciado por IA</span>
            </span>
          </div>
          <motion.button
            onClick={scrollToTop}
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => setIsHoveringProgress(false)}
            className="relative w-10 h-10 flex items-center justify-center group cursor-pointer"
            aria-label="Volver arriba"
          >
            <svg className="absolute inset-0 w-10 h-10 -rotate-90" viewBox="0 0 36 36">
              {/* Background track */}
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="oklch(1 0 0 / 8%)" strokeWidth="2.5" />
              {/* Progress arc */}
              <circle
                cx="18" cy="18" r="15.5"
                fill="none"
                stroke="url(#scrollGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 15.5}`}
                strokeDashoffset={`${2 * Math.PI * 15.5 * (1 - scrollPercent / 100)}`}
                className="transition-all duration-150"
              />
              <defs>
                <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <motion.span
              className="relative z-10 text-[10px] font-bold gradient-text-emerald"
              animate={{ opacity: isHoveringProgress ? 0 : 1, scale: isHoveringProgress ? 0.8 : 1 }}
              transition={{ duration: 0.15 }}
            >
              {scrollPercent}%
            </motion.span>
            <motion.span
              className="absolute z-10 text-muted-foreground/70"
              animate={{ opacity: isHoveringProgress ? 1 : 0, scale: isHoveringProgress ? 1 : 0.8 }}
              transition={{ duration: 0.15 }}
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </motion.span>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
