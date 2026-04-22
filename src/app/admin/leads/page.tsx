"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Clock, 
  MessageSquare, 
  Mail, 
  Globe, 
  ShieldAlert, 
  ShieldCheck,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Zap,
  PieChart as PieChartIcon,
  Trash2,
  Filter,
  DollarSign,
  Send,
  MoreVertical,
  Activity,
  Upload,
  Sparkles,
  Instagram as InstagramIcon,
  FileText,
  Copy,
  Map as MapIcon,
  Globe2
} from "lucide-react";
import Papa from "papaparse";
import { parsePhoneNumber, isValidNumber } from "libphonenumber-js";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend,
  AreaChart,
  Area
} from "recharts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// ─── Interfaces ─────────────────────────────────────────────

interface Lead {
  id: string;
  name: string;
  email: string | null;
  whatsapp: string | null;
  phone: string | null;
  company: string | null;
  budget: string;
  projectType: string;
  status: string;
  sourceSlug: string | null;
  createdAt: string;
  updatedAt: string;
  description: string | null;
  adminNotes: string | null;
  
  // Gamified Form Fields v4.5
  problemSolved: string | null;
  targetUsers: string | null;
  designStatus: string | null;
  timeline: string | null;
  contentNeeds: string | null;
  demoGoal: string | null;
  extraFeatures: string | null;
  
  // Intelligence Fields
  website: string | null;
  mapsUrl: string | null;
  rating: number | null;
  reviewsCount: number | null;
  street: string | null;
  city: string | null;
  state: string | null;
  industry: string | null;
  instagram: string | null;
  facebook: string | null;
  leadSource: string;
  category: string | null;
  tags: string | null;
}

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ef4444", "#ec4899"];

// ─── Componente Principal ───────────────────────────────────

export default function AdminLeadsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [masterKey, setMasterKey] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("leads");

  // New States v3.1 + v4.0
  const [isImporting, setIsImporting] = useState(false);
  const [currentFilter, setCurrentFilter] = useState("all"); 
  const [campaignTag, setCampaignTag] = useState("");
  const [isProspectingMode, setIsProspectingMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [generatingPitch, setGeneratingPitch] = useState<{ id: string, channel: string } | null>(null);
  const [generatedPitch, setGeneratedPitch] = useState<string | null>(null);
  const [selectedLeadForDiscovery, setSelectedLeadForDiscovery] = useState<Lead | null>(null);

  // Auth check
  const checkAuth = async (keyParam?: string) => {
    setLoading(true);
    const keyToUse = keyParam || masterKey;
    try {
      const res = await fetch("/api/leads", {
        headers: { Authorization: `Bearer ${keyToUse}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setIsAuthenticated(true);
        localStorage.setItem("nicoprompt_admin_key", keyToUse);
        toast.success("Acceso concedido — Bienvenido, Nico");
      } else if (keyParam) {
        localStorage.removeItem("nicoprompt_admin_key");
      } else {
        toast.error("Clave maestra incorrecta");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedKey = localStorage.getItem("nicoprompt_admin_key");
    if (savedKey) checkAuth(savedKey);
  }, []);

  // ─── Lógica de Datos Avanzada ───────────────────────────

  const stats = useMemo(() => {
    const total = leads.length;
    
    // Revenue Estimation Logic
    let potentialRevenue = 0;
    leads.forEach(l => {
      const val = l.budget.replace(/[^0-9]/g, "");
      potentialRevenue += parseInt(val) || 0;
    });

    const byStatus = {
      new: leads.filter(l => l.status === "new").length,
      contacted: leads.filter(l => l.status === "contacted").length,
      won: leads.filter(l => l.status === "won").length,
      lost: leads.filter(l => l.status === "lost").length,
    };

    // Data for Charts
    const serviceDistribution = leads.reduce((acc: any, lead) => {
      const type = lead.projectType.split(" ")[0]; // Get main category
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    const cityDistribution = leads.reduce((acc: any, lead) => {
      const city = lead.sourceSlug?.split("-en-")[1] || "Directo/Home";
      acc[city] = (acc[city] || 0) + 1;
      return acc;
    }, {});

    // WhatsApp vs Fixed Intelligence metric
    const contactReadiness = {
      whatsapp: leads.filter(l => l.whatsapp).length,
      fixed: leads.filter(l => l.tags?.includes("Telefono Fijo")).length,
      unknown: leads.filter(l => !l.whatsapp && !l.tags?.includes("Telefono Fijo")).length
    };

    // Timeline logic
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split("T")[0];
    }).reverse();

    const timelineData = last7Days.map(date => ({
      date: date.split("-").slice(1).join("/"),
      count: leads.filter(l => l.createdAt.split("T")[0] === date).length
    }));

    // Pain Points Intelligence
    const painPoints = {
      noWeb: leads.filter(l => !l.website).length,
      lowRating: leads.filter(l => l.rating && l.rating < 4.2).length,
      lowReviews: leads.filter(l => l.reviewsCount && l.reviewsCount < 20).length
    };

    const chartData = {
      services: Object.entries(serviceDistribution).map(([name, value]) => ({ name, value })),
      cities: Object.entries(cityDistribution).map(([name, value]) => ({ name, value })).sort((a: any, b: any) => b.value - a.value).slice(0, 6),
      contactReadiness: [
        { name: "WhatsApp", value: contactReadiness.whatsapp },
        { name: "Fijos", value: contactReadiness.fixed },
        { name: "S/D", value: contactReadiness.unknown }
      ],
      painPoints: [
        { name: "Sin Web", value: painPoints.noWeb, color: "#3b82f6" },
        { name: "Reputación", value: painPoints.lowRating, color: "#ef4444" },
        { name: "Visibilidad", value: painPoints.lowReviews, color: "#f59e0b" }
      ],
      timeline: timelineData
    };

    return { total, potentialRevenue, byStatus, chartData, contactReadiness, painPoints };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    let result = leads.filter((lead) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchLower) ||
        (lead.city || "").toLowerCase().includes(searchLower) ||
        (lead.industry || "").toLowerCase().includes(searchLower);
      
      const matchesFilter = 
        currentFilter === "all" ||
        (currentFilter === "whatsapp" && lead.whatsapp) ||
        (currentFilter === "fixed" && lead.tags?.includes("Fijo")) ||
        (currentFilter === "no-web" && !lead.website) ||
        (currentFilter === "low-rating" && lead.rating && lead.rating < 4.2) ||
        (lead.industry === currentFilter);

      return matchesSearch && matchesFilter;
    });

    // Ordenar prioritariamente: WhatsApp primero
    return [...result].sort((a, b) => {
      if (a.whatsapp && !b.whatsapp) return -1;
      if (!a.whatsapp && b.whatsapp) return 1;
      return 0;
    });
  }, [leads, searchQuery, currentFilter]);

  // Lead Update Actions
  const updateLeadStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${masterKey || localStorage.getItem("nicoprompt_admin_key")}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
        toast.success(`Estado actualizado a ${newStatus}`);
      }
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  const deleteLead = async (id: string) => {
    if (!confirm("¿Eliminar este lead de forma permanente?")) return;
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: "DELETE",
        headers: { 
          Authorization: `Bearer ${masterKey || localStorage.getItem("nicoprompt_admin_key")}`
        },
      });
      if (res.ok) {
        setLeads(leads.filter(l => l.id !== id));
        toast.success("Lead eliminado");
      }
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  // ─── Lógica de Prospección IA & CSV ────────────────────────

  const generateAIPitch = async (lead: Lead, channel: string) => {
    setGeneratingPitch({ id: lead.id, channel });
    
    // Construir contexto de Pain Points para la IA
    const pains: string[] = [];
    if (!lead.website) pains.push("No tiene sitio web propio");
    if (lead.rating && lead.rating < 4.2) pains.push(`Tiene baja calificación en Google (${lead.rating})`);
    if (lead.reviewsCount && lead.reviewsCount < 50) pains.push("Tiene pocas reseñas en Google Maps");
    
    const context = `Puntos de dolor detectados: ${pains.join(", ") || "Ninguno crítico"}. 
      Prioridad: Venta consultiva de soluciones digitales (Web, SEO, Reputación).`;

    try {
      const res = await fetch("/api/admin/ai-pitch", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${masterKey || localStorage.getItem("nicoprompt_admin_key")}`
        },
        body: JSON.stringify({ lead, channel, context }),
      });
      const data = await res.json();
      if (data.pitch) {
        setGeneratedPitch(data.pitch);
        toast.success("Pitch generado con éxito ✨");
      }
    } catch (error) {
      toast.error("Error al conectar con Gemini");
    } finally {
      setGeneratingPitch(null);
    }
  };

  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const loadingToast = toast.loading("Procesando archivo CSV...");
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim(), // Limpiar espacios en cabeceras
      complete: async (results) => {
        const rawData = results.data as any[];
        console.log("📊 CSV Detectado:", rawData.length, "filas.");
        
        if (rawData.length === 0) {
          toast.error("El archivo CSV parece estar vacío", { id: loadingToast });
          setIsImporting(false);
          return;
        }

        // Mapeo Inteligente v4.0 con Inteligencia Telefónica
        const mappedLeads: Partial<Lead>[] = rawData.map((row, idx) => {
          const rawPhone = row.phone || row.phoneNumber || row.contact_number || "";
          let whatsapp: string | null = null;
          let leadTags = "";
          let detectedCountry = "UY";

          try {
            const countryCode = (row.countryCode || "UY") as any;
            const phoneNumber = parsePhoneNumber(rawPhone.startsWith("+") ? rawPhone : `+598${rawPhone.replace(/^0+/, "")}`, countryCode);
            
            if (phoneNumber && phoneNumber.isValid()) {
              detectedCountry = phoneNumber.country || "UY";
              const nationalNumber = phoneNumber.nationalNumber.toString();
              const isMobile = phoneNumber.country === "UY" 
                ? (nationalNumber.startsWith("9") || nationalNumber.startsWith("09"))
                : phoneNumber.getType() === "MOBILE";

              if (isMobile) {
                whatsapp = phoneNumber.formatInternational();
              } else {
                leadTags = "Fijo";
              }
            }
          } catch (e) {
            // Silencioso
          }
          
          // Combinar tags de sistema con el tag de campaña del usuario
          const finalTags = campaignTag 
            ? `${campaignTag}${leadTags ? `, ${leadTags}` : ""}`
            : (leadTags || "Prospect");

          return {
            name: row.title || row.name || `Prospecto #${idx + 1}`,
            website: row.website || row.url || null,
            phone: rawPhone,
            whatsapp: whatsapp,
            industry: campaignTag || row.categoryName || row["categories/0"] || "Prospect",
            rating: (row.totalScore && !isNaN(parseFloat(row.totalScore))) ? parseFloat(row.totalScore) : null,
            reviewsCount: (row.reviewsCount && !isNaN(parseInt(row.reviewsCount))) ? parseInt(row.reviewsCount) : null,
            city: row.city || row.state || "Montevideo",
            street: row.street || null,
            mapsUrl: row.url || null,
            leadSource: "scraped-apify",
            status: "new",
            projectType: "Prospect",
            tags: finalTags,
            state: detectedCountry,
            email: row.email || null,
            description: row.description || null
          };
        });

        console.log("🚀 Enviando a la API...", mappedLeads.length, "leads mapeados.");

        try {
          const res = await fetch("/api/leads", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              Authorization: `Bearer ${masterKey || localStorage.getItem("nicoprompt_admin_key")}`
            },
            body: JSON.stringify(mappedLeads),
          });

          if (res.ok) {
            toast.success(`¡Éxito! ${mappedLeads.length} leads importados.`, { id: loadingToast });
            const savedKey = masterKey || localStorage.getItem("nicoprompt_admin_key");
            if (savedKey) checkAuth(savedKey); // Refresh list
          } else {
            const errData = await res.json();
            console.error("❌ Error API:", errData);
            toast.error(`Error ${res.status}: ${errData.error || "Falla en el servidor"}`, { id: loadingToast });
          }
        } catch (error) {
          console.error("❌ Error Red:", error);
          toast.error("Error de conexión con la API", { id: loadingToast });
        } finally {
          setIsImporting(false);
          e.target.value = ""; // Reset input
        }
      },
      error: (error) => {
        console.error("❌ Error PapaParse:", error);
        toast.error("Error al leer el archivo CSV", { id: loadingToast });
        setIsImporting(false);
      }
    });
  };

  if (!isAuthenticated) {
    // Render de login (mantenemos el anterior pero con retoque estético)
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-4">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="glass-card p-10 rounded-[2.5rem] border border-white/10 shadow-2xl w-full max-w-md bg-black/40 backdrop-blur-3xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2 tracking-tight">Acceso Privado</h1>
            <p className="text-muted-foreground text-sm">Control de Inteligencia de Leads NicoPrompt</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Clave Maestra"
              value={masterKey}
              onChange={(e) => setMasterKey(e.target.value)}
              className="bg-white/5 border-white/10 h-14 rounded-2xl pl-12 text-lg focus:ring-emerald-500/50"
              onKeyDown={(e) => e.key === "Enter" && checkAuth()}
            />
            <Button 
              onClick={() => checkAuth()} 
              disabled={loading}
              className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-black font-black rounded-2xl shadow-xl shadow-emerald-500/10 transition-all disabled:opacity-50"
            >
              {loading ? "VERIFICANDO..." : "DESBLOQUEAR TERMINAL"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30">
      {/* Modal de Pitch Generado con IA */}
      <AnimatePresence>
        {generatedPitch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0c0c0c] border border-white/10 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-black" />
                  </div>
                  <h3 className="text-xl font-bold">Propuesta Generada con IA</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setGeneratedPitch(null)} className="rounded-full hover:bg-white/5">×</Button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
                <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">{generatedPitch}</p>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => { navigator.clipboard.writeText(generatedPitch); toast.success("Copiado al portapapeles"); }}
                  className="flex-1 h-14 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  <Copy className="w-5 h-5" /> Copiar Mensaje
                </Button>
                <Button onClick={() => setGeneratedPitch(null)} variant="outline" className="flex-1 h-14 border-white/10 rounded-2xl">
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL: RADIOGRAFÍA DEL LEAD v4.5 */}
      <AnimatePresence>
        {selectedLeadForDiscovery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-[#0c0c0c] border border-white/10 p-8 rounded-[2.5rem] w-full max-w-2xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[100px] -z-10" />
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                    <Database className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Radiografía del Lead</h3>
                    <p className="text-xs text-muted-foreground">{selectedLeadForDiscovery.name} • {selectedLeadForDiscovery.company || "Sin Empresa"}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedLeadForDiscovery(null)} className="rounded-full hover:bg-white/5">×</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 overflow-y-auto max-h-[60vh] pr-2 scrollbar-thin">
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Tipo de Proyecto</p>
                    <p className="text-sm font-semibold text-blue-400 capitalize">{selectedLeadForDiscovery.projectType}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Presupuesto</p>
                    <p className="text-sm font-semibold text-emerald-400 capitalize">{selectedLeadForDiscovery.budget}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Problema a Resolver</p>
                    <p className="text-sm italic">{selectedLeadForDiscovery.problemSolved || "No especificado"}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">¿Cuándo lo necesita?</p>
                    <p className="text-sm font-semibold text-amber-400 capitalize">{selectedLeadForDiscovery.timeline || "No especificado"}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Estado del Diseño</p>
                    <p className="text-sm capitalize">{selectedLeadForDiscovery.designStatus || "No especificado"}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Extra Features</p>
                    <p className="text-[10px] text-muted-foreground truncate">{selectedLeadForDiscovery.extraFeatures || "Sin detalles"}</p>
                  </div>
                </div>
                {selectedLeadForDiscovery.description && (
                   <div className="col-span-1 md:col-span-2 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-1">Feedback Detallado / Demo Goals</p>
                    <p className="text-xs leading-relaxed opacity-80">{selectedLeadForDiscovery.demoGoal || "N/A"}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={() => window.open(`https://wa.me/${selectedLeadForDiscovery.whatsapp?.replace(/[^0-9]/g, "")}`, "_blank")}
                  className="flex-1 h-14 bg-emerald-500 text-black font-bold rounded-2xl flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" /> Contactar por WhatsApp
                </Button>
                <Button onClick={() => setSelectedLeadForDiscovery(null)} variant="outline" className="flex-1 h-14 border-white/10 rounded-2xl">
                  Cerrar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Estilo Centro de Comando */}
      <header className="border-b border-white/10 bg-[#050505]/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1500px] mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Activity className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="font-bold tracking-tighter text-xl">NicoPrompt Intelligence</h1>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SISTEMA_ACTIVO • v2.0-ELITE
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 border-x border-white/5 px-8">
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Revenue Potencial</p>
                <p className="text-xl font-bold text-emerald-400">USD ${stats.potentialRevenue.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Total Leads</p>
                <p className="text-xl font-bold">{stats.total}</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => { localStorage.removeItem("nicoprompt_admin_key"); setIsAuthenticated(false); }} className="rounded-xl border border-white/10 hover:bg-white/5">Salir</Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto p-6 space-y-10">
        <Tabs defaultValue="leads" className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl">
                <TabsTrigger value="leads" className="rounded-xl px-6 py-2.5 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Gestión
                </TabsTrigger>
                <TabsTrigger value="insights" className="rounded-xl px-6 py-2.5 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Analíticas
                </TabsTrigger>
                <TabsTrigger value="marketing" className="rounded-xl px-6 py-2.5 flex items-center gap-2">
                  <Send className="w-4 h-4" /> Marketing
                </TabsTrigger>
              </TabsList>

              {/* Filtros Rápidos de Prospección */}
              <div className="flex items-center bg-white/5 border border-white/10 p-1 rounded-xl gap-1">
                <Button 
                  variant={currentFilter === "all" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentFilter("all")}
                  className="rounded-lg h-8 text-[10px] font-bold uppercase px-3"
                >Todos</Button>
                <Button 
                  variant={currentFilter === "whatsapp" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentFilter("whatsapp")}
                  className="rounded-lg h-8 text-[10px] font-bold uppercase px-3 text-emerald-400"
                >WhatsApp ✅</Button>
                <Button 
                  variant={currentFilter === "fixed" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentFilter("fixed")}
                  className="rounded-lg h-8 text-[10px] font-bold uppercase px-3 text-amber-400"
                >Solo Fijo</Button>
                <Button 
                  variant={currentFilter === "no-web" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentFilter("no-web")}
                  className="rounded-lg h-8 text-[10px] font-bold uppercase px-3 text-blue-400"
                >Sin Web 🌐</Button>
                <div className="w-px h-4 bg-white/10 mx-1" />
                <Button 
                  variant={isProspectingMode ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setIsProspectingMode(!isProspectingMode)}
                  className={`rounded-lg h-8 text-[10px] font-bold uppercase px-3 ${isProspectingMode ? 'bg-emerald-500 text-black' : 'text-emerald-500 border border-emerald-500/20'}`}
                >Agente ⚡</Button>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">
               <div className="relative w-64 lg:w-80">
                <Input
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 h-10 rounded-xl pl-10 text-sm"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              <div className="flex items-center gap-2">
                <Input 
                  placeholder="Etiqueta Campaña (ej: Inmobiliaria)" 
                  value={campaignTag}
                  onChange={(e) => setCampaignTag(e.target.value)}
                  className="bg-white/5 border-white/10 h-10 w-44 text-[10px] uppercase font-bold tracking-widest px-3 rounded-xl focus:border-emerald-500/50"
                />
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleCSVUpload}
                  className="hidden"
                  id="csv-upload-input"
                />
                <Button 
                  asChild
                  variant="outline" 
                   className={`rounded-xl border-white/10 h-10 gap-2 cursor-pointer transition-all ${isImporting ? 'opacity-50 pointer-events-none' : 'hover:bg-white/5 hover:border-emerald-500/50'}`}
                >
                  <label htmlFor="csv-upload-input" className="flex items-center gap-2 cursor-pointer w-full h-full px-4 text-xs font-bold uppercase">
                    <Upload className={`w-3.5 h-3.5 ${isImporting ? 'animate-bounce' : ''}`} />
                    <span>{isImporting ? 'Cargando' : 'Importar'}</span>
                  </label>
                </Button>
              </div>
            </div>
          </div>

          {/* ────── BARRA DE COMANDO DEL AGENTE (Flotante) ────── */}
          <AnimatePresence>
            {isProspectingMode && filteredLeads.length > 0 && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
              >
                <div className="bg-[#0c0c0c]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 shadow-2xl shadow-emerald-500/20 flex items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-black text-emerald-400 tracking-tighter">Agente en Prospección</span>
                    <h4 className="text-sm font-black truncate max-w-[200px]">{filteredLeads[currentIndex]?.name}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" size="sm" 
                      onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                      disabled={currentIndex === 0}
                      className="rounded-xl h-10"
                    >Anterior</Button>
                    
                    <div className="bg-white/5 px-4 h-10 flex items-center rounded-xl text-[10px] font-mono border border-white/10">
                      {currentIndex + 1} / {filteredLeads.length}
                    </div>

                    <Button 
                      variant="ghost" size="sm" 
                      onClick={() => setCurrentIndex(prev => Math.min(filteredLeads.length - 1, prev + 1))}
                      disabled={currentIndex === filteredLeads.length - 1}
                      className="rounded-xl h-10"
                    >Siguiente</Button>
                  </div>

                  <div className="h-10 w-px bg-white/10 mx-2" />

                  <div className="flex items-center gap-2">
                    <Button 
                      className="bg-emerald-500 hover:bg-emerald-600 text-black font-black rounded-xl h-10 px-6 gap-2"
                      onClick={() => generateAIPitch(filteredLeads[currentIndex], "WhatsApp")}
                    >
                      <Sparkles className="w-3.5 h-3.5" /> ATACAR
                    </Button>
                    <Button 
                      variant="outline" 
                      className="rounded-xl h-10 border-white/10 text-red-500 font-bold px-3"
                      onClick={() => setIsProspectingMode(false)}
                    >SALIR</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ────── PESTAÑA: GESTIÓN DE LEADS ────── */}
          <TabsContent value="leads" className="space-y-4">
            <div className="space-y-2">
              {filteredLeads.map((lead) => (
                <motion.div
                  layout
                  key={lead.id}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`group px-6 py-3 rounded-2xl border transition-all duration-200 ${
                    lead.status === "won" ? "bg-emerald-500/5 border-emerald-500/20" : "bg-[#080808] border-white/5 hover:border-white/10 hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    {/* INFO PRINCIPAL (Nombre + Ciudad + Tags) */}
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="min-w-[200px] max-w-[250px]">
                        <h3 className="text-sm font-bold truncate group-hover:text-emerald-400 transition-colors">{lead.name}</h3>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono truncate">{lead.city || "S/D"}</p>
                      </div>

                      <div className="hidden lg:flex items-center gap-2">
                         {lead.rating && (
                          <div className="flex items-center gap-1 bg-amber-500/5 text-amber-500/80 px-2 py-0.5 rounded-lg text-[9px] font-black border border-amber-500/10">
                            ★ {lead.rating}
                          </div>
                        )}
                        {!lead.website && (
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-bold uppercase rounded-md">Sin Web 🌐</Badge>
                        )}
                        {lead.tags?.includes("Fijo") && (
                          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-[9px] font-bold uppercase rounded-md">Fijo</Badge>
                        )}
                         <Badge variant="outline" className="border-white/5 text-[9px] opacity-40 uppercase">{lead.industry?.split(" ")[0] || "Prospect"}</Badge>
                      </div>
                    </div>

                    {/* CONTACTO (Iconos Rápidos) */}
                    <div className="flex items-center gap-4 min-w-[250px]">
                      {lead.whatsapp ? (
                         <button 
                          onClick={() => window.open(`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, "")}`, "_blank")}
                          className="flex items-center gap-2 group/btn"
                         >
                           <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center group-hover/btn:bg-emerald-500 transition-colors">
                             <MessageSquare className="w-4 h-4 text-emerald-500 group-hover/btn:text-black" />
                           </div>
                           <span className="text-xs font-mono text-emerald-500 group-hover/btn:underline">{lead.whatsapp}</span>
                         </button>
                      ) : (
                        <div className="flex items-center gap-2 opacity-30">
                           <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                             <MessageSquare className="w-4 h-4" />
                           </div>
                           <span className="text-[10px] line-through">Whatsapp</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-red-500/20"
                          onClick={() => window.open(lead.mapsUrl || `https://www.google.com/maps/search/${encodeURIComponent(lead.name + " " + (lead.city || ""))}`, "_blank")}
                        >
                          <MapIcon className="w-4 h-4 text-red-500" />
                        </Button>
                        <Button 
                          variant="ghost" size="icon" 
                          className="h-8 w-8 rounded-lg hover:bg-blue-500/20"
                          onClick={() => window.open(`https://www.google.com/search?q=${encodeURIComponent(lead.name + " " + (lead.city || "") + " sitio web oficial")}`, "_blank")}
                        >
                          <Globe2 className="w-4 h-4 text-blue-500" />
                        </Button>
                      </div>
                    </div>

                    {/* ACCIONES DE CIERRE */}
                    <div className="flex items-center gap-2">
                       {lead.projectType && (
                         <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedLeadForDiscovery(lead)}
                          className="h-9 border-blue-500/30 hover:bg-blue-500/10 text-blue-400 font-bold rounded-xl px-4 gap-2 transition-transform active:scale-95"
                        >
                          <Database className="w-3 h-3" /> RADIOGRAFÍA
                        </Button>
                       )}
                       <Button 
                        size="sm"
                        onClick={() => generateAIPitch(lead, "WhatsApp")}
                        className="h-9 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl px-4 gap-2 transition-transform active:scale-95"
                      >
                        <Sparkles className="w-3 h-3" /> IA PITCH
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl border border-white/5 group">
                             <MoreVertical className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-[#0c0c0c] border-white/10 w-48 rounded-2xl shadow-2xl">
                          <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "contacted")} className="rounded-xl gap-2 cursor-pointer">
                             <TrendingUp className="w-4 h-4 text-amber-500" /> Marcar Contactado
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "won")} className="rounded-xl gap-2 cursor-pointer">
                             <CheckCircle2 className="w-4 h-4 text-emerald-500" /> GANADO
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-white/5" />
                          <DropdownMenuItem onClick={() => deleteLead(lead.id)} className="rounded-xl gap-2 text-red-500 cursor-pointer">
                             <Trash2 className="w-4 h-4" /> Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* ────── PESTAÑA: INSIGHTS & ANALÍTICAS ────── */}
          <TabsContent value="insights" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Leady by Service */}
              <Card className="p-8 bg-[#080808] border-white/10 rounded-[2.5rem]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Demanda</h3>
                    <p className="text-xs text-muted-foreground mt-1">Sectores interesados</p>
                  </div>
                  <PieChartIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.chartData.services}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={8}
                        dataKey="value"
                        onClick={(data) => setCurrentFilter(data.name)}
                        className="cursor-pointer"
                      >
                        {stats.chartData.services.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #333", borderRadius: "12px" }} 
                        itemStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Health: WhatsApp vs Fixed */}
              <Card className="p-8 bg-[#080808] border-white/10 rounded-[2.5rem]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">Estado Contacto</h3>
                    <p className="text-xs text-muted-foreground mt-1">Calidad de prospección</p>
                  </div>
                  <Zap className="w-6 h-6 text-amber-500" />
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.chartData.contactReadiness}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={8}
                        dataKey="value"
                      >
                         <Cell fill="#10b981" />
                         <Cell fill="#f59e0b" />
                         <Cell fill="#333" />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #333", borderRadius: "12px" }} 
                        itemStyle={{ color: "#fff" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 text-[10px] font-bold uppercase tracking-widest mt-4">
                  <span className="text-emerald-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"/> Móvil</span>
                  <span className="text-amber-500 flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-amber-500"/> Fijo</span>
                </div>
              </Card>

              {/* Radar de Oportunidades: Pain Points Chart */}
              <Card className="p-8 bg-[#080808] border-white/10 rounded-[2.5rem]">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-blue-400">Radar de Dolores</h3>
                    <p className="text-xs text-muted-foreground mt-1">Oportunidades de venta detectadas</p>
                  </div>
                  <AlertCircle className="w-6 h-6 text-blue-500" />
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.chartData.painPoints} layout="vertical">
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" stroke="#666" fontSize={11} width={80} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #333", borderRadius: "12px" }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 8, 8, 0]}
                        onClick={(data) => {
                          if (data.name === "Sin Web") setCurrentFilter("no-web");
                          if (data.name === "Reputación") setCurrentFilter("low-rating");
                        }}
                        className="cursor-pointer"
                      >
                        {stats.chartData.painPoints.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} className="hover:brightness-125 transition-all" />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Growth Chart */}
            <Card className="p-10 bg-[#080808] border-white/10 rounded-[3rem] overflow-hidden relative">
               <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] -z-10" />
               <div className="flex items-center justify-between mb-10">
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Tendencia de Crecimiento</h3>
                    <p className="text-sm text-muted-foreground mt-1">Nuevas oportunidades capturadas por día</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-4 py-2">
                       +{(stats.chartData.timeline[6]?.count || 0)} hoy
                    </Badge>
                    <Activity className="w-6 h-6 text-amber-500" />
                  </div>
                </div>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.chartData.timeline}>
                      <defs>
                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="date" 
                        stroke="#333" 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false}
                        dy={10}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0c0c0c", border: "1px solid #333", borderRadius: "16px", boxShadow: "0 20px 50px rgba(0,0,0,0.5)" }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="count" 
                        stroke="#10b981" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorCount)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
            </Card>
          </TabsContent>

          {/* ────── PESTAÑA: MARKETING & BROADCAST ────── */}
          <TabsContent value="marketing" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="p-8 bg-[#080808] border-white/10 rounded-[2.5rem]">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-amber-500" /> Nueva Campaña de Email
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Asunto del Correo</label>
                      <Input placeholder="Ej: Nueva solución de IA para tu inmobiliaria en Punta del Este" className="bg-white/5 border-white/10 h-12 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Segmento Objetivo</label>
                      <div className="flex flex-wrap gap-2">
                        {["Todos", "Inmobiliarias", "Hoteles", "Punta del Este", "Montevideo", "+5000 USD"].map(segment => (
                          <Badge key={segment} variant="outline" className="px-4 py-2 rounded-xl cursor-pointer hover:bg-white/5 transition-colors">
                            {segment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Cuerpo del Mensaje</label>
                      <textarea className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-4 text-sm focus:outline-none focus:border-emerald-500/50" placeholder="Hola [Nombre], te escribo porque..." />
                    </div>
                    <Button className="w-full h-14 bg-white text-black font-bold rounded-2xl hover:bg-white/90 shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                       ENVIAR CAMPAÑA A {filteredLeads.length} LEADS
                    </Button>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="p-8 bg-emerald-500/5 border-emerald-500/10 rounded-[2.5rem] relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[80px]" />
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" /> Estado de Resend
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Plan actual</span>
                      <span className="font-bold">Gratuito</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Límite diario</span>
                      <span className="font-bold">100 / 3,000 mes</span>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                       <p className="text-[10px] text-muted-foreground italic leading-relaxed">
                         Nico: Al enviar campañas masivas, asegúrate de no exceder el límite gratuito de Resend para no bloquear las notificaciones automáticas de nuevos leads.
                       </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-black border-white/10 rounded-[2.5rem] border-dashed border-2 flex flex-col items-center justify-center text-center">
                  <AlertCircle className="w-8 h-8 text-muted-foreground/30 mb-4" />
                  <p className="text-sm font-bold">Automatización de WhatsApp</p>
                  <p className="text-xs text-muted-foreground mt-2">Próximamente: Integración con API de Meta para envíos masivos directos.</p>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
