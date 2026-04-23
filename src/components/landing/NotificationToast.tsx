"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Users, Megaphone, X, CheckCircle2, Info, AlertTriangle } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type NotificationType = "tip" | "social-proof" | "cta" | "success" | "info" | "warning";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  duration?: number; // ms, default 5000
}

interface NotificationContextValue {
  addNotification: (n: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Theme config per type                                              */
/* ------------------------------------------------------------------ */

const themeMap: Record<
  NotificationType,
  {
    icon: React.ElementType;
    accentClass: string;
    borderClass: string;
    bgClass: string;
    iconBgClass: string;
    progressClass: string;
  }
> = {
  tip: {
    icon: Lightbulb,
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/25",
    bgClass: "from-emerald-500/[0.08] via-card/95 to-card/90",
    iconBgClass: "bg-emerald-500/15 border-emerald-500/20",
    progressClass: "bg-emerald-500",
  },
  "social-proof": {
    icon: Users,
    accentClass: "text-amber-400",
    borderClass: "border-amber-500/25",
    bgClass: "from-amber-500/[0.08] via-card/95 to-card/90",
    iconBgClass: "bg-amber-500/15 border-amber-500/20",
    progressClass: "bg-amber-500",
  },
  cta: {
    icon: Megaphone,
    accentClass: "text-violet-400",
    borderClass: "border-violet-500/25",
    bgClass: "from-violet-500/[0.08] via-card/95 to-card/90",
    iconBgClass: "bg-violet-500/15 border-violet-500/20",
    progressClass: "bg-violet-500",
  },
  success: {
    icon: CheckCircle2,
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-500/25",
    bgClass: "from-emerald-500/[0.08] via-card/95 to-card/90",
    iconBgClass: "bg-emerald-500/15 border-emerald-500/20",
    progressClass: "bg-emerald-500",
  },
  info: {
    icon: Info,
    accentClass: "text-cyan-400",
    borderClass: "border-cyan-500/25",
    bgClass: "from-cyan-500/[0.08] via-card/95 to-card/90",
    iconBgClass: "bg-cyan-500/15 border-cyan-500/20",
    progressClass: "bg-cyan-500",
  },
  warning: {
    icon: AlertTriangle,
    accentClass: "text-amber-400",
    borderClass: "border-amber-500/25",
    bgClass: "from-amber-500/[0.08] via-card/95 to-card/90",
    iconBgClass: "bg-amber-500/15 border-amber-500/20",
    progressClass: "bg-amber-500",
  },
};

/* ------------------------------------------------------------------ */
/*  Context                                                            */
/* ------------------------------------------------------------------ */

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be used within <NotificationProvider>");
  return ctx;
}

/* ------------------------------------------------------------------ */
/*  Single notification item                                           */
/* ------------------------------------------------------------------ */

const MAX_STACK = 3;

function NotificationItem({
  notification,
  onClose,
}: {
  notification: Notification;
  onClose: () => void;
}) {
  const { type, title, description } = notification;
  const theme = themeMap[type];
  const Icon = theme.icon;
  const duration = notification.duration ?? 5000;

  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  /* progress timer */
  useEffect(() => {
    if (paused) {
      // save how far we got
      pausedAtRef.current = performance.now();
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = (now: number) => {
      if (startTimeRef.current === null) startTimeRef.current = now;
      const elapsed = pausedAtRef.current + (now - startTimeRef.current);
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgress(pct);
      if (pct >= 100) {
        onClose();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    if (pausedAtRef.current > 0) {
      // resuming — adjust startTime so elapsed is continuous
      const savedElapsed = pausedAtRef.current;
      pausedAtRef.current = 0;
      startTimeRef.current = null;
      const resumeTick = (now: number) => {
        startTimeRef.current = now - savedElapsed;
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(resumeTick);
      return () => cancelAnimationFrame(rafRef.current);
    }

    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 80, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 80, scale: 0.9, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`
        relative w-[320px] sm:w-[380px] rounded-xl
        border ${theme.borderClass}
        bg-gradient-to-br ${theme.bgClass}
        backdrop-blur-xl shadow-2xl shadow-black/30
        overflow-hidden cursor-default
      `}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
        <motion.div
          className={`h-full ${theme.progressClass} rounded-full`}
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>

      {/* Content */}
      <div className="flex items-start gap-3 p-4 pr-9">
        <div
          className={`
            shrink-0 w-9 h-9 rounded-xl border
            ${theme.iconBgClass}
            flex items-center justify-center
          `}
        >
          <Icon className={`w-4 h-4 ${theme.accentClass}`} />
        </div>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${theme.accentClass}`}>{title}</p>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/10 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="w-3.5 h-3.5 text-muted-foreground/60 hover:text-muted-foreground" />
      </button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Provider                                                           */
/* ------------------------------------------------------------------ */

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (n: Omit<Notification, "id">) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      setNotifications((prev) => [...prev.slice(-(MAX_STACK - 1)), { ...n, id }]);
    },
    []
  );

  /* ---- Auto-show schedule (Dynamic & Randomized) ---- */
  useEffect(() => {
    const cities = ["Buenos Aires", "Córdoba", "Rosario", "Mendoza", "Montevideo", "Santiago", "Bogotá", "Lima", "Ciudad de México", "Madrid", "Barcelona", "Miami", "Valencia", "Neuquén", "Tucumán"];
    const avatars = ["Un emprendedor", "Una startup", "Una agencia", "Un e-commerce", "Alguien", "Una empresa"];
    
    const getDynamicMessage = () => {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const avatar = avatars[Math.floor(Math.random() * avatars.length)];
      const min = Math.floor(Math.random() * 15) + 2;
      const count = Math.floor(Math.random() * 7) + 3;
      
      const templates = [
        {
          type: "social-proof" as const,
          title: "¡Nueva solicitud!",
          description: `${avatar} de ${city} solicitó una cotización hace ${min} minutos`,
        },
        {
          type: "social-proof" as const,
          title: "Actividad reciente",
          description: `${avatar} de ${city} acaba de pedir su presupuesto`,
        },
        {
          type: "social-proof" as const,
          title: "¡Mucho movimiento!",
          description: `${avatar} de ${city} acaba de agendar una demo gratuita`,
        },
        {
          type: "info" as const,
          title: "👁️ En este momento",
          description: `${count} personas de distintas ciudades están viendo esta misma página`,
        },
        {
          type: "tip" as const,
          title: "💡 Consejo útil",
          description: "La mayoría de los MVPs bien armados se validan en su primer mes de vida",
        },
        {
          type: "tip" as const,
          title: "🤖 Automatizaciones",
          description: "Tip: Integrar IA o bots a tu negocio puede ahorrarte más de 10hs semanales",
        },
        {
          type: "success" as const,
          title: "✅ Proyecto entregado",
          description: `Un sistema a medida fue deployado con éxito en ${min} días esta semana`,
        },
        {
          type: "info" as const,
          title: "🚀 Escalabilidad",
          description: "Construimos arquitecturas Cloud nativas listas para soportar miles de usuarios",
        }
      ];
      
      return templates[Math.floor(Math.random() * templates.length)];
    };

    let timeoutId: NodeJS.Timeout;
    
    const scheduleNext = (delay: number) => {
      timeoutId = setTimeout(() => {
        addNotification(getDynamicMessage());
        // Programar la siguiente notificación de manera muy aleatoria entre 20s y 60s
        scheduleNext(20000 + Math.random() * 40000);
      }, delay);
    };

    // Primera notificación arranca aleatorio entre los 15s y 25s iniciales
    scheduleNext(15000 + Math.random() * 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [addNotification]);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}

      {/* Toast container — fixed top-right, below navbar */}
      <div
        className="fixed top-20 right-4 sm:right-6 z-[45] flex flex-col-reverse gap-3 pointer-events-none"
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout">
          {notifications.map((n) => (
            <div key={n.id} className="pointer-events-auto">
              <NotificationItem
                notification={n}
                onClose={() => removeNotification(n.id)}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </NotificationContext.Provider>
  );
}
