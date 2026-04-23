"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Send,
  Sparkles,
  Globe,
  Smartphone,
  Database,
  Zap,
  Palette,
  ShoppingCart,
  Cloud,
  Lightbulb,
  DollarSign,
  Users,
  MessageSquare,
  FileText,
  Brain,
  Handshake,
  Flame,
  Clock,
  Calendar,
  Leaf,
  Phone,
  User,
  Building2,
  PartyPopper,
  Rocket,
  ArrowUpRight,
  Video,
  Camera,
  Megaphone,
  Target,
  Wand2,
  MonitorPlay,
  PenTool,
  Image,
  BarChart3,
  Mail,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

// ─── Data Options ───────────────────────────────────────────

const projectTypes = [
  { id: "web-app", label: "App Web", emoji: "🌐", icon: Globe, tagline: "Tu negocio, en cualquier dispositivo" },
  { id: "mobile-app", label: "App Móvil", emoji: "📱", icon: Smartphone, tagline: "Llevá tu app al pocket de tus usuarios" },
  { id: "crm", label: "CRM / Sistema", emoji: "📊", icon: Database, tagline: "Gestioná tu negocio de forma inteligente" },
  { id: "automation", label: "Automatización con IA", emoji: "⚡", icon: Zap, tagline: "Potenciá tu productividad con IA" },
  { id: "website", label: "Sitio Web", emoji: "🎨", icon: Palette, tagline: "Tu vitrina digital profesional" },
  { id: "ecommerce", label: "E-commerce", emoji: "🛒", icon: ShoppingCart, tagline: "Vendé las 24hs, los 7 días" },
  { id: "saas", label: "SaaS", emoji: "☁️", icon: Cloud, tagline: "Tu producto como servicio" },
  { id: "other", label: "Otro", emoji: "💡", icon: Lightbulb, tagline: "Contame tu idea y vemos" },
];

const problemOptions = [
  { id: "vender-mas", label: "Vender más", emoji: "💰", icon: DollarSign },
  { id: "automatizar", label: "Automatizar procesos", emoji: "⚙️", icon: Zap },
  { id: "gestionar-datos", label: "Gestionar datos/clientes", emoji: "📋", icon: Database },
  { id: "crear-contenido", label: "Crear contenido", emoji: "✍️", icon: FileText },
  { id: "mejorar-comunicacion", label: "Mejorar comunicación interna", emoji: "💬", icon: MessageSquare },
  { id: "otro-problema", label: "Otro (contame más)", emoji: "💭", icon: Lightbulb },
];

const targetUsersOptions = [
  { id: "mis-clientes", label: "Mis clientes", emoji: "👥", icon: Users },
  { id: "equipo-interno", label: "Mi equipo interno", emoji: "🏢", icon: Building2 },
  { id: "publico-general", label: "Público general", emoji: "🌍", icon: Globe },
  { id: "b2b", label: "Otro negocio (B2B)", emoji: "🤝", icon: Handshake },
  { id: "no-claro", label: "No lo tengo claro todavía", emoji: "🤔", icon: Brain },
];

const designStatusOptions = [
  { id: "wireframes", label: "Sí, tengo wireframes o mockups", emoji: "✅" },
  { id: "referencia-visual", label: "Tengo una referencia visual (otra app/sitio)", emoji: "🎨" },
  { id: "documentado", label: "Tengo el proyecto escrito/documentado", emoji: "📝" },
  { id: "solo-idea", label: "Solo tengo la idea en mi cabeza", emoji: "💭" },
  { id: "ayuda-diseno", label: "Quiero que me ayudes con el diseño también", emoji: "🤝" },
];

const timelineOptions = [
  { id: "1-2-semanas", label: "Lo necesito YA", emoji: "🔥", desc: "1-2 semanas", icon: Flame },
  { id: "2-4-semanas", label: "Urgente", emoji: "⚡", desc: "2-4 semanas", icon: Zap },
  { id: "1-2-meses", label: "Normal", emoji: "📅", desc: "1-2 meses", icon: Calendar },
  { id: "3-meses", label: "Sin apuro", emoji: "🌿", desc: "3+ meses", icon: Leaf },
];

const budgetOptions = [
  { id: "500-1500", label: "$500 - $1,500", desc: "MVP básico", emoji: "🚀" },
  { id: "1500-5000", label: "$1,500 - $5,000", desc: "Producto sólido", emoji: "⭐" },
  { id: "5000-15000", label: "$5,000 - $15,000", desc: "App completa", emoji: "💎" },
  { id: "15000+", label: "$15,000+", desc: "Enterprise", emoji: "🏢" },
  { id: "no-se", label: "No tengo idea", desc: "Necesito orientación", emoji: "💰" },
];

const contentNeedsOptions = [
  { id: "redes-sociales", label: "Contenido para redes sociales", emoji: "📱", icon: Megaphone, desc: "Posts, stories, reels" },
  { id: "fotos-producto", label: "Fotos de producto con IA", emoji: "📸", icon: Camera, desc: "Catálogos, menús, productos" },
  { id: "videos-ugc", label: "Videos / contenido UGC", emoji: "🎬", icon: Video, desc: "Reviews, tutoriales, unboxings" },
  { id: "copywriting", label: "Copywriting & textos", emoji: "✍️", icon: PenTool, desc: "Descripciones, emails, ads" },
  { id: "imagenes-ia", label: "Imágenes generativas con IA", emoji: "🎨", icon: Image, desc: "Banners, posts, creativos" },
  { id: "seo-content", label: "Contenido SEO / Blog", emoji: "🔍", icon: FileText, desc: "Artículos, landing pages" },
  { id: "no-necesita", label: "No necesito contenido por ahora", emoji: "✅", icon: Check, desc: "Solo el producto digital" },
];

const demoGoalsOptions = [
  { id: "ver-funcional", label: "Ver algo funcional", emoji: "🖥️", icon: MonitorPlay, desc: "Quiero clickear y probar" },
  { id: "pitch-inversores", label: "Presentar a inversores", emoji: "💼", icon: Handshake, desc: "Demo para levantar capital" },
  { id: "validar-mercado", label: "Validar con clientes reales", emoji: "👥", icon: Users, desc: "Testear antes de invertir más" },
  { id: "presupuesto-formal", label: "Cotización formal", emoji: "📋", icon: FileText, desc: "Proposal detallada por escrito" },
  { id: "solo-orientacion", label: "Solo orientación por ahora", emoji: "💡", icon: Lightbulb, desc: "Quiero entender opciones" },
];

const extraFeaturesOptions = [
  { id: "pagos", label: "Pagos / Suscripciones", emoji: "💳" },
  { id: "notificaciones", label: "Notificaciones push/email", emoji: "🔔" },
  { id: "chat-soporte", label: "Chat / Soporte al usuario", emoji: "💬" },
  { id: "panel-admin", label: "Panel de administración", emoji: "📊" },
  { id: "autenticacion", label: "Login / Registro de usuarios", emoji: "🔐" },
  { id: "integraciones", label: "Integraciones (APIs externas)", emoji: "🔗" },
  { id: "analitica", label: "Analytics / Métricas", emoji: "📈" },
  { id: "multidioma", label: "Multiidioma", emoji: "🌍" },
  { id: "diseno-ui", label: "Diseño UI/UX", emoji: "🎨" },
  { id: "ninguna", label: "Nada de esto por ahora", emoji: "✅" },
];

// ─── Motivational Messages ──────────────────────────────────

const motivationalMessages: Record<number, string> = {
  0: "",
  1: "¡Buen comienzo! 👏",
  2: "¡Interesante! Seguimos 🎯",
  3: "Cada vez más cerca 🎯",
  4: "¡Ya le estamos dando forma! ✨",
  5: "Ya casi tenemos todo 🏁",
  6: "¡Gran paso! Seguimos 🚀",
  7: "Ya casi cerramos 📋",
  8: "¡Info clave para tu demo! 🎬",
  9: "¡Ultimo paso! Estamos a punto ✨",
  10: "",
};

// ─── Summary Helpers ────────────────────────────────────────

function getLabelFromId(options: { id: string; label: string; emoji?: string; desc?: string }[], id: string): string {
  const opt = options.find((o) => o.id === id);
  if (!opt) return id;
  if (opt.desc) return `${opt.emoji} ${opt.label} — ${opt.desc}`;
  return `${opt.emoji} ${opt.label}`;
}

function getMotivationalByProject(projectType: string): string {
  const msgs: Record<string, string> = {
    "web-app": "Una app web sólida puede transformar tu negocio. Vamos a hacerla realidad 🚀",
    "mobile-app": "Las apps móviles conectan con los usuarios como nada más. ¡Vamos por ella! 📱",
    "crm": "Un buen CRM puede ahorrarte horas de trabajo cada semana. ¡Vamos a construirlo! 📊",
    automation: "La automatización con IA es el futuro, y estás a punto de ser parte de él ⚡",
    website: "Tu vitrina digital va a impresionar. ¡Vamos a diseñarla! 🎨",
    ecommerce: "El comercio online no descansa. ¡Vamos a hacer que venda por vos! 🛒",
    saas: "Un producto SaaS es un activo que escala. ¡Vamos a construirlo juntos! ☁️",
    other: "Las mejores ideas a veces no encajan en una categoría. ¡Vamos a explorarla! 💡",
  };
  return msgs[projectType] || "¡Estamos listos para dar vida a tu proyecto! 🚀";
}

// ─── Confetti Data ──────────────────────────────────────────

const CONFETTI_COLORS = [
  "#10b981",
  "#14b8a6",
  "#34d399",
  "#fbbf24",
  "#f472b6",
  "#818cf8",
  "#fb7185",
  "#fcd34d",
  "#a78bfa",
  "#6ee7b7",
];

const CONFETTI_PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.8,
  duration: 2.5 + Math.random() * 2,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
  size: 5 + Math.random() * 7,
  rotation: Math.random() * 360,
  drift: (Math.random() - 0.5) * 200,
  isCircle: Math.random() > 0.5,
}));

// ─── Animation Variants ────────────────────────────────────

const summaryContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const summaryItemVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

// ─── Sparkle burst component ────────────────────────────────

function SparkleBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-emerald-400"
          style={{
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
          }}
          initial={{
            x: "50%",
            y: "50%",
            opacity: 1,
            scale: 0,
          }}
          animate={{
            x: `${50 + Math.cos((i * Math.PI * 2) / 12) * 65}%`,
            y: `${50 + Math.sin((i * Math.PI * 2) / 12) * 65}%`,
            opacity: 0,
            scale: 1.2,
          }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

// ─── Confetti Effect Component ──────────────────────────────

function ConfettiEffect() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {CONFETTI_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: -20,
            width: p.size,
            height: p.isCircle ? p.size : p.size * 0.55,
            backgroundColor: p.color,
            borderRadius: p.isCircle ? "50%" : "2px",
          }}
          initial={{ y: 0, x: 0, rotate: 0, opacity: 1 }}
          animate={{
            y: 550,
            x: p.drift,
            rotate: p.rotation + 900,
            opacity: 0,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        />
      ))}
    </div>
  );
}

// ─── Floating Orbs Component (Welcome BG) ───────────────────

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="absolute w-36 h-36 rounded-full blur-3xl"
        style={{ top: "8%", left: "10%", background: "rgba(16,185,129,0.08)" }}
        animate={{ y: [0, -25, 0], x: [0, 15, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-28 h-28 rounded-full blur-3xl"
        style={{ bottom: "15%", right: "8%", background: "rgba(20,184,166,0.1)" }}
        animate={{ y: [0, 20, 0], x: [0, -18, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute w-20 h-20 rounded-full blur-2xl"
        style={{ top: "45%", left: "55%", background: "rgba(52,211,153,0.06)" }}
        animate={{ y: [0, -15, 0], x: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full blur-2xl"
        style={{ top: "20%", right: "25%", background: "rgba(167,139,250,0.05)" }}
        animate={{ y: [0, 10, 0], x: [0, -10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

// ─── Ripple Card Component ──────────────────────────────────

function RippleCard({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className: string;
}) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipples((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
    onClick();
  };

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  return (
    <motion.button 
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick} 
      className={`relative w-full h-full overflow-hidden shadow-sm hover:shadow-emerald-500/10 transition-shadow ${className}`}
    >
      {children}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 6, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute rounded-full bg-emerald-500/20 pointer-events-none w-10 h-10"
          style={{ left: r.x - 20, top: r.y - 20 }}
        />
      ))}
    </motion.button>
  );
}

// ─── Select Sparkle Micro-Animation ─────────────────────────

function SelectSparkle() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            scale: [0, 1.5, 0],
            x: Math.cos((i * 60 * Math.PI) / 180) * 25,
            y: Math.sin((i * 60 * Math.PI) / 180) * 25,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="absolute w-1.5 h-1.5 bg-emerald-400 rounded-full"
          style={{ top: "40%", left: "40%" }}
        />
      ))}
    </>
  );
}

// ─── Floating Input Field Component ─────────────────────────

function FloatingInputField({
  label,
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  optional = false,
}: {
  label: string;
  icon: React.ElementType;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  optional?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const isActive = focused || localValue.length > 0;

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleBlur = () => {
    setFocused(false);
    if (localValue !== value) {
      onChange(localValue);
    }
  };

  return (
    <div className="relative">
      <label
        className={`absolute left-3 flex items-center gap-1.5 pointer-events-none z-10 transition-all duration-200 ease-out origin-left ${
          isActive
            ? "top-1.5 text-[10px] text-emerald-400 scale-[0.85]"
            : "top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
        }`}
      >
        <Icon className={`w-3.5 h-3.5 transition-colors duration-200 ${isActive ? "text-emerald-400" : "text-muted-foreground/60"}`} />
        <span>{label}</span>
        {required && <span className="text-emerald-400 ml-0.5">*</span>}
        {optional && <span className="text-muted-foreground/50 ml-1 text-[9px]">(opcional)</span>}
      </label>
      <Input
        type={type}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        placeholder={isActive ? placeholder : " "}
        className={`rounded-xl h-12 border transition-all duration-300 ${
          isActive ? "pt-5" : ""
        } ${
          focused
            ? "bg-white/[0.07] border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.12),0_0_4px_rgba(16,185,129,0.2)]"
            : "bg-white/5 border-white/10 hover:border-white/15"
        }`}
      />
    </div>
  );
}

// ─── Form Data Interface ────────────────────────────────────

interface FormData {
  projectType: string;
  problemSolved: string;
  problemSolvedOther: string;
  targetUsers: string;
  designStatus: string;
  timeline: string;
  budget: string;
  contentNeeds: string[];
  demoGoal: string;
  extraFeatures: string[];
  name: string;
  email: string;
  phone: string;
  whatsapp: string;
  company: string;
}

const TOTAL_STEPS = 11; // 0 (welcome) + 10 (steps 1-10)

export function LeadCaptureForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(0);
  const [sparkleKey, setSparkleKey] = useState(0);
  const [showSparkle, setShowSparkle] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [formData, setFormData] = useState<FormData>({
    projectType: "",
    problemSolved: "",
    problemSolvedOther: "",
    targetUsers: "",
    designStatus: "",
    timeline: "",
    budget: "",
    contentNeeds: [],
    demoGoal: "",
    extraFeatures: [],
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    company: "",
  });
  const { toast } = useToast();
  const params = useParams();
  const sourceSlug = params?.slug as string || "direct";

  // Typing effect for welcome
  const fullText = "¡Hola! 👋 Soy NicoPrompt y voy a ayudarte a dar forma a tu proyecto";

  useEffect(() => {
    if (step === 0) {
      setTypedText("");
      let index = 0;
      const interval = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(interval);
        }
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step]);

  // Interceptar clics en todos los CTAs globales para restarle un clic al lead
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const buttonOrLink = target.closest("button, a");
      if (!buttonOrLink) return;
      
      // Ignorar clics si ya están dentro del formulario o su propia estructura
      if (target.closest("#contacto") || target.closest("form")) return;

      const text = buttonOrLink.textContent?.toLowerCase() || "";
      const href = buttonOrLink.getAttribute("href");
      
      // Reconocer palabras clave típicas de cta de la landing
      const isCta = href === "#contacto" || 
                    text.includes("crear mi proyecto") || 
                    text.includes("cotización") || 
                    text.includes("comenzar") ||
                    text.includes("contacto");

      if (isCta) {
        // En vez de mostrar la pantalla de bienvenida (Paso 0), abrir directo el form (Paso 1)
        if (step === 0) {
          setStep(1);
        }
      }
    };
    
    // Fase de captura
    document.addEventListener("click", handleGlobalClick, true);
    return () => document.removeEventListener("click", handleGlobalClick, true);
  }, [step]);

  const triggerSparkle = useCallback(() => {
    setSparkleKey((k) => k + 1);
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 700);
  }, []);

  const nextStep = () => {
    triggerSparkle();
    setDirection(1);
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        projectType: formData.projectType,
        problemSolved:
          formData.problemSolved === "otro-problema"
            ? formData.problemSolvedOther
            : formData.problemSolved,
        targetUsers: formData.targetUsers,
        designStatus: formData.designStatus,
        timeline: formData.timeline,
        budget: formData.budget,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        whatsapp: formData.whatsapp,
        company: formData.company,
        description: JSON.stringify({
          step1: formData.projectType,
          step2:
            formData.problemSolved === "otro-problema"
              ? formData.problemSolvedOther
              : formData.problemSolved,
          step3: formData.targetUsers,
          step4: formData.designStatus,
          step5: formData.timeline,
          step6: formData.budget,
          step7: formData.contentNeeds,
          step8: formData.extraFeatures,
          step9: formData.demoGoal,
        }),
        contentNeeds: formData.contentNeeds,
        demoGoal: formData.demoGoal,
        extraFeatures: formData.extraFeatures,
        sourceSlug: sourceSlug,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
      toast({
        title: "¡Proyecto enviado!",
        description: "Te contactaré en menos de 24 horas con una propuesta.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Hubo un error. Intentá de nuevo o contactame directamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return formData.projectType !== "";
      case 2:
        return (
          formData.problemSolved !== "" &&
          (formData.problemSolved !== "otro-problema" || formData.problemSolvedOther.trim() !== "")
        );
      case 3:
        return formData.targetUsers !== "";
      case 4:
        return formData.designStatus !== "";
      case 5:
        return formData.timeline !== "";
      case 6:
        return formData.budget !== "";
      case 7:
        return true; // Content needs - optional
      case 8:
        return true; // Extra features - optional
      case 9:
        return formData.demoGoal !== "";
      case 10:
        return formData.name.trim() !== "" && formData.email.trim() !== "" && formData.whatsapp.trim() !== "";
      default:
        return false;
    }
  };

  const getProgressPercent = (): number => {
    if (step === 0) return 0;
    if (step >= 10) return 100;
    return Math.round((step / 9) * 100);
  };

  const getStepLabel = (): string => {
    if (step === 0) return "";
    if (step >= 10) return "¡Completado!";
    return `Paso ${step} de 9`;
  };

  // ─── Slide + Scale variants ───────────────────────────
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 280 : -280,
      opacity: 0,
      scale: 0.94,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 280 : -280,
      opacity: 0,
      scale: 0.94,
    }),
  };

  // Progress bar milestones (emoji markers at key points)
  const milestoneEmojis = ["", "🎯", "💡", "👥", "🎨", "⏰", "💰", "📱", "🔧", "🎬", "✅"];

  const isContactStep = step === 10;
  const isSummaryStep = false; // No separate summary - submit on contact step

  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <Sparkles className="w-3 h-3" />
            Comenzar proyecto
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Descubramos juntos{" "}
            <span className="gradient-text-emerald">tu proyecto</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Un breve viaje de descubrimiento para entender exactamente lo que necesitás.
          </p>
        </div>

        {/* ─── Progress bar with milestones + glow + bounce ─── */}
        {step > 0 && !submitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground/80">
                {getStepLabel()}{" "}
                {motivationalMessages[step] && (
                  <span className="ml-2">{motivationalMessages[step]}</span>
                )}
              </span>
              <span className="text-sm font-bold tabular-nums text-emerald-400">
                {getProgressPercent()}%
              </span>
            </div>
            <div className="relative h-2.5 rounded-full bg-white/[0.04] overflow-visible">
              {/* Glow layer behind the fill */}
              <motion.div
                className="absolute inset-y-[-4px] left-0 bg-cyan-500/40 rounded-full blur-md"
                initial={false}
                animate={{ width: `${getProgressPercent()}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
              {/* Actual fill with electricity effect (Blue Lightning Core) */}
              <motion.div
                className="absolute inset-y-[2px] left-0 bg-white rounded-full z-10"
                initial={false}
                animate={{ 
                  width: `${getProgressPercent()}%`,
                  opacity: [0.9, 1, 0.85, 1] 
                }}
                transition={{
                  width: { duration: 0.4, ease: "easeOut" },
                  opacity: { duration: 0.15, repeat: Infinity, ease: "linear" }
                }}
                style={{
                  boxShadow: "0 0 8px #fff, 0 0 15px #22d3ee, 0 0 25px #06b6d4, 0 0 40px #0891b2",
                }}
              />

              {/* Electric arcing branches overlay - CLIPPED TO FILLED PART */}
              <motion.div
                className="absolute inset-y-[-6px] left-0 overflow-hidden mix-blend-screen pointer-events-none z-10"
                initial={false}
                animate={{ width: `${getProgressPercent()}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ width: `${getProgressPercent()}%` }}
              >
                <motion.div 
                  className="absolute inset-y-0 left-0 w-[800px] sm:w-[1200px] h-full opacity-80"
                  animate={{ backgroundPosition: ["0px 0px", "-100px 0px"] }}
                  transition={{ duration: 0.3, repeat: Infinity, ease: "linear" }}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='22'%3E%3Cpath d='M0 11 L10 4 L20 18 L30 7 L40 16 L50 2 L60 20 L70 5 L80 16 L90 8 L100 11' stroke='%2322d3ee' fill='none' stroke-width='1.5' filter='drop-shadow(0 0 2px %2306b6d4)' /%3E%3Cpath d='M0 11 L15 19 L25 5 L35 18 L55 4 L75 18 L85 5 L100 11' stroke='%23a5f3fc' fill='none' stroke-width='1' /%3E%3C/svg%3E")`,
                    backgroundSize: "100px 100%",
                  }}
                />
              </motion.div>
              {/* Explosion at the head/tip of progress bar (Blue Zap & Sparks) */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none"
                initial={false}
                animate={{ left: `${getProgressPercent()}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Core Zap */}
                <motion.div
                  key={`lightning-zap-${step}`} 
                  initial={{ scale: 0.1, opacity: 1, rotate: 0 }}
                  animate={{ scale: [0.1, 4, 0], opacity: [1, 0.9, 0], rotate: [0, 90, 180] }}
                  transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
                  className="absolute w-5 h-5 bg-white mix-blend-screen"
                  style={{ 
                    left: "-10px", top: "-10px", 
                    boxShadow: "0 0 30px 15px rgba(34,211,238,0.9)",
                    clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)"
                  }}
                />
                {/* Electric Sparks */}
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={`spark-${step}-${i}`}
                    initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                    animate={{
                      scale: [0, 1, 0],
                      x: (Math.random() - 0.5) * 80,
                      y: (Math.random() - 0.5) * 80,
                      opacity: [1, 1, 0]
                    }}
                    transition={{ duration: 0.4 + Math.random() * 0.2, delay: 0.15, ease: "easeOut" }}
                    className="absolute w-3 h-0.5 bg-cyan-300 mix-blend-screen"
                    style={{ 
                      left: "-1.5px", top: "-1px",
                      transformOrigin: "left center",
                      rotate: `${Math.random() * 360}deg`,
                      boxShadow: "0 0 10px 2px #22d3ee"
                    }}
                  />
                ))}
              </motion.div>
              {/* Milestone emojis with bounce */}
              {milestoneEmojis.map((emoji, i) => {
                if (i === 0) return null;
                const position = (i / 9) * 100;
                const reached = step >= i;
                const justReached = step === i;
                return (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 text-xs z-10"
                    style={{ left: `${position}%` }}
                  >
                    <motion.span
                      key={`m-${i}`}
                      initial={false}
                      animate={
                        justReached
                          ? {
                              scale: [1, 1.6, 0.85, 1.2, 1],
                              y: [0, -10, 0, -5, 0],
                            }
                          : { scale: 1, y: 0 }
                      }
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className={`transition-opacity duration-300 ${reached ? "opacity-100 drop-shadow-sm" : "opacity-25"}`}
                    >
                      {emoji}
                    </motion.span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ─── Form card with animated gradient border ─── */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="gradient-border-animated rounded-[18px] p-[2px]">
          <div className="relative rounded-2xl border border-white/10 bg-card/50 backdrop-blur-sm p-4 sm:p-8 overflow-visible min-h-0 sm:min-h-[420px]">
          <SparkleBurst key={sparkleKey} active={showSparkle} />

          <AnimatePresence mode="wait" custom={direction}>
            {/* ═══════════════════ STEP 0: Welcome ═══════════════════ */}
            {step === 0 && (
              <motion.div
                key="step-0"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="flex flex-col items-center justify-center py-8 text-center"
              >
                {/* Floating orbs for visual depth */}
                <FloatingOrbs />

                {/* Content on top of orbs */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: 0.1,
                    }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/25"
                  >
                    <Rocket className="w-10 h-10 text-white" />
                  </motion.div>

                  <p className="text-xl sm:text-2xl font-semibold mb-2 min-h-[3rem] flex items-center justify-center">
                    {typedText}
                    <span className="animate-pulse ml-1 text-emerald-400">|</span>
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="mt-4"
                  >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 text-emerald-400" />
                      En promedio, respondo en menos de 6 horas
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                    className="mt-8"
                  >
                    <Button
                      onClick={nextStep}
                      size="lg"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl px-8 py-6 text-lg font-semibold group shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Comenzar
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                    className="text-xs text-muted-foreground mt-4"
                  >
                    Solo 9 preguntas rápidas · Sin compromiso
                  </motion.p>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 1: Project Type ═══════════════════ */}
            {step === 1 && (
              <motion.div
                key="step-1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Qué tipo de proyecto necesitás? 🚀
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Elegí la opción que mejor describe tu idea.
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {projectTypes.map((type) => {
                    const Icon = type.icon;
                    const isSelected = formData.projectType === type.id;
                    return (
                      <RippleCard
                        key={type.id}
                        onClick={() =>
                          setFormData({ ...formData, projectType: type.id })
                        }
                        className={`relative p-3.5 sm:p-5 rounded-xl border text-left transition-all duration-200 group ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/20"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`p-1.5 rounded-lg transition-colors duration-200 ${
                              isSelected
                                ? "bg-emerald-500/20"
                                : "bg-white/5 group-hover:bg-white/10"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 transition-colors duration-200 ${
                                isSelected
                                  ? "text-emerald-400"
                                  : "text-muted-foreground group-hover:text-foreground"
                              }`}
                            />
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                            >
                              <SelectSparkle />
                              <Check className="w-4 h-4 text-emerald-400 relative z-10" />
                            </motion.div>
                          )}
                        </div>
                        <span className="text-xl sm:text-2xl mb-1 block relative z-10">{type.emoji}</span>
                        <span className="text-[13px] sm:text-[15px] font-medium block leading-tight relative z-10">
                          {type.label}
                        </span>
                        <span className="text-[10px] sm:text-[11px] text-muted-foreground block mt-1 leading-tight relative z-10">
                          {type.tagline}
                        </span>
                        {/* Selected glow overlay */}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
                          />
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 2: Problem Solved ═══════════════════ */}
            {step === 2 && (
              <motion.div
                key="step-2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Qué problema resuelve? 🎯
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Elegí el objetivo principal de tu proyecto.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {problemOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.problemSolved === opt.id;
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, problemSolved: opt.id })
                        }
                        className={`relative p-2.5 sm:p-4 rounded-xl border text-left transition-all duration-200 group flex items-center gap-3 ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/20"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl sm:text-2xl flex-shrink-0">{opt.emoji}</span>
                        <div className="flex-1">
                          <span className="text-[13px] sm:text-sm font-medium block">
                            {opt.label}
                          </span>
                        </div>
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                            isSelected ? "text-emerald-400" : "text-muted-foreground"
                          }`}
                        />
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                            className="absolute top-2 right-2"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </motion.div>
                        )}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
                          />
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
                {formData.problemSolved === "otro-problema" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4"
                  >
                    <Input
                      placeholder="Contame qué problema querés resolver..."
                      value={formData.problemSolvedOther}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          problemSolvedOther: e.target.value,
                        })
                      }
                      className="bg-white/5 border-white/10 focus:border-emerald-500/50 rounded-xl h-12 shadow-[0_0_20px_rgba(16,185,129,0.12),0_0_4px_rgba(16,185,129,0.2)] focus:shadow-[0_0_20px_rgba(16,185,129,0.12),0_0_4px_rgba(16,185,129,0.2)]"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* ═══════════════════ STEP 3: Target Users ═══════════════════ */}
            {step === 3 && (
              <motion.div
                key="step-3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Quiénes son tus usuarios? 👥
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  ¿Quiénes van a usar lo que vamos a construir?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {targetUsersOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.targetUsers === opt.id;
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, targetUsers: opt.id })
                        }
                        className={`relative p-2.5 sm:p-4 rounded-xl border text-left transition-all duration-200 group flex items-center gap-3 ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/20"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl sm:text-2xl flex-shrink-0">{opt.emoji}</span>
                        <div className="flex-1">
                          <span className="text-[13px] sm:text-sm font-medium block">
                            {opt.label}
                          </span>
                        </div>
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                            isSelected ? "text-emerald-400" : "text-muted-foreground"
                          }`}
                        />
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                            className="absolute top-2 right-2"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </motion.div>
                        )}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
                          />
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 4: Design Status ═══════════════════ */}
            {step === 4 && (
              <motion.div
                key="step-4"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Tenés diseños o referencias? 🎨
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  No worries si no tenés nada, ¡eso es parte del proceso!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {designStatusOptions.map((opt) => {
                    const isSelected = formData.designStatus === opt.id;
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, designStatus: opt.id })
                        }
                        className={`relative p-2.5 sm:p-4 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/20"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl sm:text-2xl block mb-1">{opt.emoji}</span>
                        <span className="text-[13px] sm:text-sm font-medium block leading-tight">
                          {opt.label}
                        </span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                            className="absolute top-2 right-2"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </motion.div>
                        )}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
                          />
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 5: Timeline ═══════════════════ */}
            {step === 5 && (
              <motion.div
                key="step-5"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Cuándo lo necesitás? ⏰
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  ¿Cuándo te gustaría tener tu producto listo?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timelineOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.timeline === opt.id;
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, timeline: opt.id })
                        }
                        className={`relative p-2.5 sm:p-5 rounded-xl border text-left transition-all duration-200 group ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/20"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xl sm:text-2xl">{opt.emoji}</span>
                          <div className="flex-1">
                            <span className="text-sm font-semibold block">
                              {opt.label}
                            </span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground">
                              {opt.desc}
                            </span>
                          </div>
                          <Icon
                            className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                              isSelected
                                ? "text-emerald-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 15,
                            }}
                            className="absolute top-2 right-2"
                          >
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </motion.div>
                        )}
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
                          />
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 6: Budget ═══════════════════ */}
            {step === 6 && (
              <motion.div
                key="step-6"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Cuál es tu presupuesto? 💰
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Esto me ayuda a dimensionar la mejor solución para vos. ¡Cotizaciones
                  sin compromiso!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {budgetOptions.map((opt) => {
                    const isSelected = formData.budget === opt.id;
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, budget: opt.id })
                        }
                        className={`relative p-2.5 sm:p-5 rounded-xl border text-left transition-all duration-200 ${
                          isSelected
                            ? "border-emerald-500/60 bg-emerald-500/10 shadow-lg shadow-emerald-500/15 ring-1 ring-emerald-500/20"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl sm:text-2xl">{opt.emoji}</span>
                          <div className="flex-1">
                            <span className="text-base font-semibold block">
                              {opt.label}
                            </span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground">
                              {opt.desc}
                            </span>
                          </div>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 15,
                              }}
                              className="absolute top-2 right-2 flex items-center justify-center"
                            >
                              <SelectSparkle />
                              <Check className="w-4 h-4 text-emerald-400 relative z-10" />
                            </motion.div>
                          )}
                        </div>
                        {isSelected && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-500/5 to-teal-500/5 pointer-events-none"
                          />
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 7: Content Needs (Multi-select) ═══════════════════ */}
            {step === 7 && (
              <motion.div
                key="step-7"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Necesitás contenido también? 📱
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Podemos incluir generación de contenido con IA en tu proyecto.
                </p>
                <p className="text-xs text-muted-foreground/60 mb-5">
                  Elegí todas las que apliquen — o skipeá si no necesitás.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {contentNeedsOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.contentNeeds.includes(opt.id);
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            contentNeeds: isSelected
                              ? formData.contentNeeds.filter((id) => id !== opt.id)
                              : [...formData.contentNeeds, opt.id],
                          });
                        }}
                        className={`relative p-2.5 sm:p-4 rounded-xl border text-left transition-all duration-200 group flex items-center gap-2 sm:gap-3 ${
                          isSelected
                            ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl sm:text-2xl flex-shrink-0">{opt.emoji}</span>
                        <div className="flex-1">
                          <span className="text-[13px] sm:text-sm font-medium block">{opt.label}</span>
                          <span className="text-[11px] text-muted-foreground">{opt.desc}</span>
                        </div>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2 flex items-center justify-center">
                            <SelectSparkle />
                            <Check className="w-3.5 h-3.5 text-emerald-400 relative z-10" />
                          </motion.div>
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 8: Extra Features (Multi-select) ═══════════════════ */}
            {step === 8 && (
              <motion.div
                key="step-8"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Funcionalidades extra? 🔧
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Seleccioná las features que te gustaría incluir en tu producto.
                </p>
                <p className="text-xs text-muted-foreground/60 mb-5">
                  Cuanta más info me des, más preciso será el demo que preparemos.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {extraFeaturesOptions.map((opt) => {
                    const isSelected = formData.extraFeatures.includes(opt.id);
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            extraFeatures: isSelected
                              ? formData.extraFeatures.filter((id) => id !== opt.id)
                              : [...formData.extraFeatures, opt.id],
                          });
                        }}
                        className={`relative p-2.5 sm:p-3.5 rounded-xl border text-center transition-all duration-200 group ${
                          isSelected
                            ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <span className="text-xl sm:text-2xl block mb-1">{opt.emoji}</span>
                        <span className="text-xs font-medium block leading-tight">{opt.label}</span>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-1.5 right-1.5 flex items-center justify-center">
                            <SelectSparkle />
                            <Check className="w-3 h-3 text-emerald-400 relative z-10" />
                          </motion.div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 9: Demo Goal ═══════════════════ */}
            {step === 9 && (
              <motion.div
                key="step-9"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¿Qué esperás como siguiente paso? 🎬
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Con esta info puedo prepararte un demo MVP para que veas tu producto en acción.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {demoGoalsOptions.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.demoGoal === opt.id;
                    return (
                      <RippleCard
                        key={opt.id}
                        onClick={() => setFormData({ ...formData, demoGoal: opt.id })}
                        className={`relative p-2.5 sm:p-5 rounded-xl border text-left transition-all duration-200 group ${
                          isSelected
                            ? "border-emerald-500/50 bg-emerald-500/10 shadow-lg shadow-emerald-500/10"
                            : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/5"
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xl sm:text-2xl">{opt.emoji}</span>
                          <div className="flex-1">
                            <span className="text-sm font-semibold block">{opt.label}</span>
                            <span className="text-[10px] sm:text-xs text-muted-foreground">{opt.desc}</span>
                          </div>
                          <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? "text-emerald-400" : "text-muted-foreground"} transition-colors`} />
                        </div>
                        {isSelected && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute top-2 right-2">
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          </motion.div>
                        )}
                      </RippleCard>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ STEP 10: Contact Info (Floating Labels) ═══════════════════ */}
            {step === 10 && (
              <motion.div
                key="step-10"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  ¡Casi listo! Solo falta tu contacto 📬
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Te avisaré por WhatsApp cuando el demo esté listo para probar.
                </p>
                <div className="space-y-4">
                  <FloatingInputField
                    label="¿A quién contactamos?"
                    icon={User}
                    value={formData.name}
                    onChange={(val) =>
                      setFormData({ ...formData, name: val })
                    }
                    placeholder="Tu nombre completo"
                    required
                  />
                  <FloatingInputField
                    label="Email para enviar el presupuesto"
                    icon={Mail}
                    value={formData.email}
                    onChange={(val) =>
                      setFormData({ ...formData, email: val })
                    }
                    placeholder="tu@email.com"
                    type="email"
                    required
                  />
                  <div className="pt-2">
                    <FloatingInputField
                      label="WhatsApp (para contacto rápido)"
                      icon={MessageSquare}
                      value={formData.whatsapp}
                      onChange={(val) =>
                        setFormData({ ...formData, whatsapp: val })
                      }
                      placeholder="+598 9x xxx xxx"
                      required
                    />
                    <p className="text-[10px] text-emerald-400/70 mt-2 flex items-center gap-1">
                       <Zap className="w-3 h-3" /> Usaré este número solo para enviarte el demo o coordinar la llamada.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ═══════════════════ SUCCESS (Confetti) ═══════════════════ */}
            {submitted && (
              <motion.div
                key="step-success"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                className="flex flex-col items-center justify-center py-10 text-center relative"
              >
                {/* Confetti celebration */}
                <ConfettiEffect />

                {/* Content above confetti */}
                <div className="relative z-10 w-full max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mb-6 shadow-2xl shadow-emerald-500/30 mx-auto"
                  >
                    <Check
                      className="w-10 h-10 text-white"
                      strokeWidth={3}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
                      ¡Tu proyecto está en marcha! 🎉
                    </h3>
                    <p className="text-muted-foreground mb-8 text-sm sm:text-base leading-relaxed">
                      Recibimos tu solicitud con éxito. Para acelerar el proceso y tener tu presupuesto hoy mismo, <span className="text-emerald-400 font-semibold underline decoration-emerald-500/30 underline-offset-4">agendá una Sesión de Descubrimiento de 15 min</span> para conocernos.
                    </p>
                  </motion.div>

                  {/* CALENDLY BUTTON - ACCIÓN PRINCIPAL */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                  >
                    <Button
                      size="lg"
                      onClick={() => window.open("https://calendly.com/nicoprompt/15min", "_blank")}
                      className="w-full bg-white text-black hover:bg-white/90 rounded-2xl h-14 text-base font-bold shadow-[0_0_30px_rgba(255,255,255,0.15)] group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <Calendar className="w-5 h-5 mr-3 text-emerald-600" />
                      📅 Agendar Sesión de Descubrimiento (15 min)
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-[10px] text-muted-foreground/60 mt-3 flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3" /> Solo te tomará 15 minutos
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col items-center gap-4 mt-10"
                  >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                      <Zap className="w-3.5 h-3.5" />
                      Te envié una confirmación a {formData.email}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ─── Navigation buttons ─── */}
          {step > 0 && step < 10 && !submitted && (
            <div className="flex justify-between items-center mt-8">
              {/* Subtle back button */}
              <button
                onClick={prevStep}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group px-3 py-1.5 rounded-lg hover:bg-white/5 -ml-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span>Atrás</span>
              </button>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl group disabled:opacity-50 transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Continuar
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </motion.div>
            </div>
          )}

          {/* ─── Final Submit (Step 10) ─── */}
          {step === 10 && !submitted && (
            <div className="flex justify-between items-center mt-8">
              {/* Subtle back button */}
              <button
                onClick={prevStep}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-all duration-200 group px-3 py-1.5 rounded-lg hover:bg-white/5 -ml-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-200" />
                <span>Atrás</span>
              </button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || loading}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl px-6 group shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mi proyecto
                      <ArrowUpRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          )}
          </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Animated Summary Row (Staggered) ───────────────────────

function AnimatedSummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <motion.div
      variants={summaryItemVariants}
      className="flex items-start gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-colors duration-200"
    >
      <Badge
        variant="outline"
        className="bg-white/5 border-white/10 text-xs text-muted-foreground whitespace-nowrap mt-0.5"
      >
        {label}
      </Badge>
      <span className="text-sm font-medium">{value}</span>
    </motion.div>
  );
}
