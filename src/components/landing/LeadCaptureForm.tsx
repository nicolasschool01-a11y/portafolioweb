"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Database,
  FileText,
  Mail,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  Target,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const CALENDLY_URL = "https://calendly.com/nicoprompt/consulta-ia-inicial";

const priorityAreas = [
  "Ventas / seguimiento de leads",
  "Atencion al cliente",
  "Operaciones internas",
  "Marketing / contenido",
  "CRM / base de datos",
  "Reportes / dashboards",
  "Automatizacion administrativa",
  "Otro",
];

const tools = [
  "Web / landing",
  "Formularios",
  "WhatsApp",
  "Email",
  "Google Sheets / Excel",
  "CRM",
  "Supabase / base de datos",
  "Make / Zapier / n8n",
  "ChatGPT / IA",
  "Otra",
];

const urgencyOptions = [
  "Curiosidad / exploracion",
  "Quiero resolverlo este trimestre",
  "Quiero resolverlo este mes",
  "Es urgente",
];

const budgetOptions = [
  "Menos de USD 300",
  "USD 300-600",
  "USD 600-1000",
  "Mas de USD 1000",
  "No se todavia",
];

const authorityOptions = [
  "Decido yo",
  "Decido con otra persona",
  "Influyo, pero no decido",
  "Estoy explorando para mi equipo",
];

interface FormData {
  name: string;
  email: string;
  whatsapp: string;
  company: string;
  website: string;
  role: string;
  businessContext: string;
  audience: string;
  stage: string;
  priorityArea: string;
  processToImprove: string;
  painCost: string;
  firstValuableVersion: string;
  currentTools: string[];
  dataLocation: string;
  sensitiveData: string;
  sampleDataAvailable: string;
  urgency: string;
  budget: string;
  decisionAuthority: string;
  desiredStart: string;
  consentAccepted: boolean;
}

const initialFormData: FormData = {
  name: "",
  email: "",
  whatsapp: "",
  company: "",
  website: "",
  role: "",
  businessContext: "",
  audience: "",
  stage: "",
  priorityArea: "",
  processToImprove: "",
  painCost: "",
  firstValuableVersion: "",
  currentTools: [],
  dataLocation: "",
  sensitiveData: "",
  sampleDataAvailable: "",
  urgency: "",
  budget: "",
  decisionAuthority: "",
  desiredStart: "",
  consentAccepted: false,
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-medium text-foreground/90">{children}</label>;
}

function HelperText({ children }: { children: React.ReactNode }) {
  return <p className="text-xs text-muted-foreground leading-relaxed">{children}</p>;
}

function TextAreaField({
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/45 outline-none transition focus:border-emerald-500/45 focus:bg-white/[0.06] focus:ring-2 focus:ring-emerald-500/10"
    />
  );
}

function OptionButton({
  selected,
  children,
  onClick,
}: {
  selected: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-3 py-2.5 text-left text-sm transition ${
        selected
          ? "border-emerald-400/60 bg-emerald-500/12 text-foreground shadow-lg shadow-emerald-500/10"
          : "border-white/10 bg-white/[0.03] text-muted-foreground hover:border-white/20 hover:bg-white/[0.06] hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function calculateScore(data: FormData) {
  let score = 0;
  if (data.painCost.trim().length > 40) score += 2;
  else if (data.painCost.trim()) score += 1;

  if (data.processToImprove.trim().length > 40) score += 2;
  else if (data.priorityArea) score += 1;

  if (["USD 600-1000", "Mas de USD 1000"].includes(data.budget)) score += 2;
  else if (data.budget === "USD 300-600") score += 1;

  if (data.decisionAuthority === "Decido yo") score += 2;
  else if (data.decisionAuthority === "Decido con otra persona") score += 1;

  if (["Quiero resolverlo este mes", "Es urgente"].includes(data.urgency)) score += 2;
  else if (data.urgency === "Quiero resolverlo este trimestre") score += 1;

  if (data.sampleDataAvailable === "Si") score += 2;
  else if (data.sampleDataAvailable === "No se todavia") score += 1;

  if (data.firstValuableVersion.trim().length > 30) score += 2;
  else if (data.firstValuableVersion.trim()) score += 1;

  const hypothesis =
    score >= 10
      ? "Buen fit para consulta y posible IA Sprint"
      : score >= 7
        ? "Consulta posible; confirmar alcance y presupuesto"
        : "Fit bajo o temprano; nutrir o pedir mas contexto";

  return { score, hypothesis };
}

export function LeadCaptureForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();
  const params = useParams();
  const sourceSlug = (params?.slug as string) || "direct";
  const totalSteps = 5;
  const score = useMemo(() => calculateScore(formData), [formData]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const toggleTool = (tool: string) => {
    setFormData((current) => ({
      ...current,
      currentTools: current.currentTools.includes(tool)
        ? current.currentTools.filter((item) => item !== tool)
        : [...current.currentTools, tool],
    }));
  };

  const canProceed = () => {
    if (step === 0) {
      return Boolean(formData.name.trim() && formData.email.trim() && formData.company.trim() && formData.role.trim());
    }
    if (step === 1) {
      return Boolean(formData.businessContext.trim() && formData.priorityArea && formData.processToImprove.trim());
    }
    if (step === 2) {
      return Boolean(formData.painCost.trim() && formData.firstValuableVersion.trim());
    }
    if (step === 3) {
      return Boolean(formData.currentTools.length && formData.dataLocation.trim() && formData.sensitiveData && formData.sampleDataAvailable);
    }
    return Boolean(formData.urgency && formData.budget && formData.decisionAuthority && formData.consentAccepted);
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;

    setLoading(true);
    try {
      const payload = {
        leadType: "consulta-ia-inicial",
        name: formData.name,
        email: formData.email,
        whatsapp: formData.whatsapp,
        company: formData.company,
        website: formData.website,
        role: formData.role,
        businessContext: formData.businessContext,
        audience: formData.audience,
        stage: formData.stage,
        priorityArea: formData.priorityArea,
        processToImprove: formData.processToImprove,
        painCost: formData.painCost,
        firstValuableVersion: formData.firstValuableVersion,
        currentTools: formData.currentTools,
        dataLocation: formData.dataLocation,
        sensitiveData: formData.sensitiveData,
        sampleDataAvailable: formData.sampleDataAvailable,
        urgency: formData.urgency,
        budget: formData.budget,
        decisionAuthority: formData.decisionAuthority,
        desiredStart: formData.desiredStart,
        consentAccepted: formData.consentAccepted,
        qualificationScore: score.score,
        offerHypothesis: score.hypothesis,
        sourceSlug,
      };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      toast({
        title: "Contexto recibido",
        description: "Ahora podes agendar la Consulta IA Inicial gratuita.",
      });
    } catch {
      toast({
        title: "No se pudo enviar",
        description: "Intentá de nuevo o contactame por WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep((current) => Math.min(current + 1, totalSteps - 1));
  const previousStep = () => setStep((current) => Math.max(current - 1, 0));

  return (
    <section id="contacto" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute left-1/2 top-1/4 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-emerald-500/[0.05] blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400">
            <Sparkles className="h-3.5 w-3.5" />
            Precalificacion para Consulta IA Inicial
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Primero entendemos el proceso.{" "}
            <span className="gradient-text">Despues hablamos de IA.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Completá este formulario corto para llegar a la llamada con contexto. La consulta sirve para detectar oportunidad y fit; no incluye implementacion ni blueprint completo.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl border border-white/10 bg-card/50 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">NicoPrompt IA Sprint</p>
                <p className="text-xs text-muted-foreground">Hasta 14 dias, 1 proceso o area prioritaria.</p>
              </div>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>Consulta gratuita para detectar oportunidad concreta.</span>
              </div>
              <div className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>Formulario antes del calendario para evitar llamadas sin contexto.</span>
              </div>
              <div className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>Si hay fit, propuesta simple para un IA Sprint acotado.</span>
              </div>
              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span>No prometemos automatizacion total, ventas garantizadas ni soporte ilimitado.</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card/70 p-4 shadow-2xl shadow-emerald-500/5 sm:p-6">
            {!submitted ? (
              <>
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
                    <span>Paso {step + 1} de {totalSteps}</span>
                    <span>{Math.round(((step + 1) / totalSteps) * 100)}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                      style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div key="step-0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-4">
                      <div className="mb-2 flex items-center gap-2 text-emerald-400">
                        <User className="h-4 w-4" />
                        <h3 className="font-semibold">Datos basicos</h3>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <FieldLabel>Nombre y apellido *</FieldLabel>
                          <Input value={formData.name} onChange={(event) => updateField("name", event.target.value)} placeholder="Tu nombre" />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel>Email *</FieldLabel>
                          <Input type="email" value={formData.email} onChange={(event) => updateField("email", event.target.value)} placeholder="tu@email.com" />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel>WhatsApp</FieldLabel>
                          <Input value={formData.whatsapp} onChange={(event) => updateField("whatsapp", event.target.value)} placeholder="+598..." />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel>Empresa o proyecto *</FieldLabel>
                          <Input value={formData.company} onChange={(event) => updateField("company", event.target.value)} placeholder="Nombre del negocio" />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel>Web o red social</FieldLabel>
                          <Input value={formData.website} onChange={(event) => updateField("website", event.target.value)} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel>Rol *</FieldLabel>
                          <Input value={formData.role} onChange={(event) => updateField("role", event.target.value)} placeholder="Founder, gerente, marketing..." />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 1 && (
                    <motion.div key="step-1" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-5">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Briefcase className="h-4 w-4" />
                        <h3 className="font-semibold">Negocio y area prioritaria</h3>
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Que vende tu negocio? *</FieldLabel>
                        <TextAreaField value={formData.businessContext} onChange={(value) => updateField("businessContext", value)} placeholder="Contame en simple que ofrecen y a quien ayudan." rows={3} />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <FieldLabel>A quien le vendes?</FieldLabel>
                          <Input value={formData.audience} onChange={(event) => updateField("audience", event.target.value)} placeholder="B2B, consumidores, restaurantes..." />
                        </div>
                        <div className="space-y-2">
                          <FieldLabel>Etapa actual</FieldLabel>
                          <Input value={formData.stage} onChange={(event) => updateField("stage", event.target.value)} placeholder="Ya vendo, equipo chico, validacion..." />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <FieldLabel>Donde queres aplicar IA primero? *</FieldLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {priorityAreas.map((area) => (
                            <OptionButton key={area} selected={formData.priorityArea === area} onClick={() => updateField("priorityArea", area)}>
                              {area}
                            </OptionButton>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Que proceso queres mejorar primero? *</FieldLabel>
                        <TextAreaField value={formData.processToImprove} onChange={(value) => updateField("processToImprove", value)} placeholder="Ejemplo: seguimiento de leads que entran por formulario, WhatsApp y referidos." />
                      </div>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div key="step-2" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-5">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Target className="h-4 w-4" />
                        <h3 className="font-semibold">Dolor y primera version valiosa</h3>
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Que pasa hoy si ese proceso sigue igual? *</FieldLabel>
                        <TextAreaField value={formData.painCost} onChange={(value) => updateField("painCost", value)} placeholder="Tiempo perdido, leads sin respuesta, errores, oportunidades que se caen..." />
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Que seria una primera version valiosa en 14 dias? *</FieldLabel>
                        <TextAreaField value={formData.firstValuableVersion} onChange={(value) => updateField("firstValuableVersion", value)} placeholder="Un flujo, prototipo, blueprint o sistema liviano que ya permita validar valor." />
                      </div>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div key="step-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-5">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Database className="h-4 w-4" />
                        <h3 className="font-semibold">Herramientas y datos</h3>
                      </div>
                      <div className="space-y-3">
                        <FieldLabel>Que herramientas usan hoy? *</FieldLabel>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {tools.map((tool) => (
                            <OptionButton key={tool} selected={formData.currentTools.includes(tool)} onClick={() => toggleTool(tool)}>
                              {tool}
                            </OptionButton>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Donde viven los datos principales? *</FieldLabel>
                        <Input value={formData.dataLocation} onChange={(event) => updateField("dataLocation", event.target.value)} placeholder="Sheets, CRM, email, base de datos, WhatsApp..." />
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-3">
                          <FieldLabel>Hay datos sensibles? *</FieldLabel>
                          <div className="grid gap-2">
                            {["No", "Si", "No se todavia"].map((option) => (
                              <OptionButton key={option} selected={formData.sensitiveData === option} onClick={() => updateField("sensitiveData", option)}>
                                {option}
                              </OptionButton>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <FieldLabel>Podemos trabajar con datos de ejemplo? *</FieldLabel>
                          <div className="grid gap-2">
                            {["Si", "No", "No se todavia"].map((option) => (
                              <OptionButton key={option} selected={formData.sampleDataAvailable === option} onClick={() => updateField("sampleDataAvailable", option)}>
                                {option}
                              </OptionButton>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div key="step-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-5">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <Clock className="h-4 w-4" />
                        <h3 className="font-semibold">Urgencia, presupuesto y decision</h3>
                      </div>
                      <div className="grid gap-4 lg:grid-cols-3">
                        <div className="space-y-3">
                          <FieldLabel>Urgencia *</FieldLabel>
                          <div className="grid gap-2">
                            {urgencyOptions.map((option) => (
                              <OptionButton key={option} selected={formData.urgency === option} onClick={() => updateField("urgency", option)}>
                                {option}
                              </OptionButton>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <FieldLabel>Presupuesto *</FieldLabel>
                          <div className="grid gap-2">
                            {budgetOptions.map((option) => (
                              <OptionButton key={option} selected={formData.budget === option} onClick={() => updateField("budget", option)}>
                                {option}
                              </OptionButton>
                            ))}
                          </div>
                        </div>
                        <div className="space-y-3">
                          <FieldLabel>Decision *</FieldLabel>
                          <div className="grid gap-2">
                            {authorityOptions.map((option) => (
                              <OptionButton key={option} selected={formData.decisionAuthority === option} onClick={() => updateField("decisionAuthority", option)}>
                                {option}
                              </OptionButton>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <FieldLabel>Cuando te gustaria empezar?</FieldLabel>
                        <Input value={formData.desiredStart} onChange={(event) => updateField("desiredStart", event.target.value)} placeholder="Este mes, despues de cerrar presupuesto, etc." />
                      </div>
                      <button
                        type="button"
                        onClick={() => updateField("consentAccepted", !formData.consentAccepted)}
                        className={`flex w-full gap-3 rounded-xl border p-4 text-left text-sm transition ${
                          formData.consentAccepted
                            ? "border-emerald-400/60 bg-emerald-500/10"
                            : "border-white/10 bg-white/[0.03] hover:border-white/20"
                        }`}
                      >
                        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${formData.consentAccepted ? "border-emerald-400 bg-emerald-500 text-white" : "border-white/20"}`}>
                          {formData.consentAccepted && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className="text-muted-foreground">
                          Entiendo que la consulta gratuita sirve para detectar oportunidad y fit. No incluye implementacion, blueprint completo, automatizacion terminada ni soporte posterior.
                        </span>
                      </button>
                      <HelperText>Score interno estimado: {score.score}/14. Esto ayuda a preparar la llamada, no decide automaticamente.</HelperText>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    disabled={step === 0}
                    className="border-white/10 bg-white/[0.03]"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver
                  </Button>

                  {step < totalSteps - 1 ? (
                    <Button type="button" onClick={nextStep} disabled={!canProceed()} className="bg-emerald-500 text-white hover:bg-emerald-600">
                      Continuar
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="button" onClick={handleSubmit} disabled={!canProceed() || loading} className="bg-emerald-500 text-white hover:bg-emerald-600">
                      {loading ? "Enviando..." : "Enviar contexto"}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-xl shadow-emerald-500/25">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-2xl font-bold">Contexto recibido</h3>
                <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                  Ya tengo una primera foto de tu negocio, el proceso y el nivel de fit. El siguiente paso es agendar una Consulta IA Inicial gratuita para revisar tu caso.
                </p>
                <div className="mx-auto mb-6 max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left text-xs text-muted-foreground">
                  <p className="mb-2 flex items-center gap-2 text-foreground">
                    <FileText className="h-4 w-4 text-emerald-400" />
                    Importante
                  </p>
                  <p>La llamada es breve y sirve para detectar oportunidad. No incluye implementacion, blueprint completo ni automatizacion terminada.</p>
                </div>
                <Button asChild className="h-12 rounded-xl bg-white px-6 font-semibold text-black hover:bg-white/90">
                  <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4 text-emerald-600" />
                    Agendar Consulta IA Inicial gratuita
                  </a>
                </Button>
                <p className="mt-3 flex items-center justify-center gap-1 text-xs text-muted-foreground/70">
                  <Mail className="h-3.5 w-3.5" />
                  Nico revisa tus respuestas antes de la llamada.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
