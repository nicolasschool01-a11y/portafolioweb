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
  Globe2,
  Database
} from "lucide-react";
import Papa from "papaparse";
import { parsePhoneNumber, isValidNumber } from "libphonenumber-js";
import { MatrixRain } from "@/components/admin/MatrixRain";
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

export default function AdminDashboardPage() {
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
    return (
      <div className="min-h-screen bg-[#020202] text-white flex items-center justify-center p-6 relative overflow-hidden">
        {/* Cinematic Background */}
        <MatrixRain color="#10b981" speed={1.2} density={0.8} />
        
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-[480px]"
        >
          <div className="bg-[#0c0c0c]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-12 shadow-2xl shadow-emerald-500/10">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 rounded-[1.5rem] bg-emerald-500 flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                <ShieldCheck className="w-10 h-10 text-black" />
              </div>
              <h1 className="text-3xl font-black mb-3 tracking-tighter">INTELLIGENCE CENTER</h1>
              <p className="text-muted-foreground text-sm max-w-[280px] leading-relaxed">
                Terminal de gestión avanzada para <span className="text-emerald-400 font-bold">NicoPrompt™</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-emerald-500/50">
                  <Zap className="w-5 h-5" />
                </div>
                <Input
                  type="password"
                  placeholder="Insertar Clave Maestra"
                  value={masterKey}
                  onChange={(e) => setMasterKey(e.target.value)}
                  className="bg-white/5 border-white/10 h-16 rounded-2xl pl-14 text-lg focus:ring-emerald-500/50 border-2 focus:border-emerald-500/30 transition-all font-mono"
                  onKeyDown={(e) => e.key === "Enter" && checkAuth()}
                />
              </div>
              
              <Button 
                onClick={() => checkAuth()} 
                disabled={loading}
                className="w-full h-16 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all group active:scale-95"
              >
                {loading ? "VERIFICANDO..." : (
                  <span className="flex items-center gap-2">
                    DESBLOQUEAR TERMINAL <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </div>

            <div className="mt-10 pt-10 border-t border-white/5 flex flex-col items-center gap-4 text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">
               <div className="flex items-center gap-3">
                 <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
                 SISTEMA ENCRIPTADO AES-256
               </div>
               <p className="opacity-40">© 2026 NICOPROMPT ELITE DIVISION</p>
            </div>
          </div>
        </motion.div>
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
            <Button variant="ghost" onClick={() => { localStorage.removeItem("nicoprompt_admin_key"); setIsAuthenticated(false); }} className="rounded-xl border border-white/10 hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest">Cerrar Sesión</Button>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto p-6 space-y-10">
        <Tabs defaultValue="leads" className="w-full">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8 border-b border-white/5 pb-8">
            <div className="flex flex-wrap items-center gap-3">
              <TabsList className="bg-white/5 border border-white/10 p-1 rounded-2xl">
                <TabsTrigger value="leads" className="rounded-xl px-6 py-2.5 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> Leads
                </TabsTrigger>
                <TabsTrigger value="insights" className="rounded-xl px-6 py-2.5 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                  <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Analíticas
                </TabsTrigger>
                <TabsTrigger value="marketing" className="rounded-xl px-6 py-2.5 flex items-center gap-2 font-bold uppercase text-[10px] tracking-widest">
                  <Send className="w-3.5 h-3.5 text-amber-400" /> Marketing
                </TabsTrigger>
              </TabsList>

              {/* Filtros Rápidos */}
              <div className="flex items-center bg-white/5 border border-white/10 p-1.5 rounded-xl gap-1.5">
                <Button 
                  variant={currentFilter === "all" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentFilter("all")}
                  className="rounded-lg h-7 text-[9px] font-black uppercase px-3 transition-all"
                >Todos</Button>
                <Button 
                  variant={currentFilter === "whatsapp" ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setCurrentFilter("whatsapp")}
                  className={`rounded-lg h-7 text-[9px] font-black uppercase px-3 transition-all ${currentFilter === "whatsapp" ? 'bg-emerald-500 text-black' : 'text-emerald-500/80'}`}
                >WhatsApp</Button>
                <Button 
                  variant={isProspectingMode ? "secondary" : "ghost"} 
                  size="sm" 
                  onClick={() => setIsProspectingMode(!isProspectingMode)}
                  className={`rounded-lg h-7 text-[9px] font-black uppercase px-3 transition-all ${isProspectingMode ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'text-amber-500/80 border border-amber-500/10'}`}
                >Modo Agente ⚡</Button>
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1 justify-end">
               <div className="relative w-64 lg:w-80">
                <Input
                  placeholder="Buscar prospecto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 h-11 rounded-xl pl-11 text-sm focus:border-emerald-500/50 transition-all font-medium"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500/50" />
              </div>
              
              <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
                <Input 
                  placeholder="ID Campaña" 
                  value={campaignTag}
                  onChange={(e) => setCampaignTag(e.target.value)}
                  className="bg-transparent border-none h-9 w-32 text-[10px] uppercase font-black tracking-[0.1em] px-3 focus-visible:ring-0"
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
                  variant="secondary" 
                   className={`rounded-lg h-9 gap-2 cursor-pointer transition-all px-4 ${isImporting ? 'opacity-50 pointer-events-none' : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/10'}`}
                >
                  <label htmlFor="csv-upload-input" className="flex items-center gap-2 cursor-pointer w-full h-full px-2 text-[10px] font-black uppercase tracking-widest">
                    <Upload className={`w-3.5 h-3.5 ${isImporting ? 'animate-bounce' : ''}`} />
                    <span>{isImporting ? '⏳' : 'CSV'}</span>
                  </label>
                </Button>
              </div>
            </div>
          </div>

          <TabsContent value="leads" className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="space-y-3">
              {filteredLeads.map((lead) => (
                <motion.div
                  layout
                  key={lead.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`group px-6 py-4 rounded-[2rem] border transition-all duration-300 ${
                    lead.status === "won" ? "bg-emerald-500/[0.03] border-emerald-500/20" : "bg-[#080808] border-white/5 hover:border-white/10 shadow-lg hover:shadow-emerald-500/[0.02]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1 min-w-0">
                      <div className="min-w-[220px] max-w-[280px]">
                        <h3 className="text-base font-bold truncate group-hover:text-emerald-400 transition-colors tracking-tight">{lead.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="w-3 h-3 text-red-500/50" />
                          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold truncate">{lead.city || "Sin Ciudad"}</p>
                        </div>
                      </div>

                      <div className="hidden lg:flex items-center gap-3">
                         {lead.rating && (
                          <div className="flex items-center gap-1.5 bg-amber-500/10 text-amber-500 px-2.5 py-1 rounded-lg text-[10px] font-black border border-amber-500/20">
                            ★ {lead.rating}
                          </div>
                        )}
                        {!lead.website && (
                          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] font-black uppercase tracking-wider h-6 rounded-full px-3 leading-none">Sin Web 🌐</Badge>
                        )}
                         <Badge variant="outline" className="border-white/10 text-[9px] font-bold uppercase tracking-widest h-6 rounded-full px-3 opacity-60">{lead.industry?.split(" ")[0] || "Prospecto"}</Badge>
                         {lead.tags && lead.tags.split(", ").map(tag => (
                            <Badge key={tag} className="bg-white/5 text-white/50 border-white/5 text-[8px] h-5 rounded-full px-2 uppercase">{tag}</Badge>
                         ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 min-w-[280px] justify-end">
                      {lead.whatsapp && (
                         <button 
                          onClick={() => window.open(`https://wa.me/${lead.whatsapp?.replace(/[^0-9]/g, "")}`, "_blank")}
                          className="flex items-center gap-3 group/btn px-4 py-2 bg-emerald-500/5 hover:bg-emerald-500 rounded-2xl border border-emerald-500/20 transition-all active:scale-95"
                         >
                           <MessageSquare className="w-4 h-4 text-emerald-500 group-hover/btn:text-black" />
                           <span className="text-xs font-mono font-bold text-emerald-500 group-hover/btn:text-black tracking-tighter">{lead.whatsapp}</span>
                         </button>
                      )}

                      <div className="flex items-center gap-2">
                         {lead.projectType && lead.projectType !== "Prospect" && (
                           <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedLeadForDiscovery(lead)}
                            className="h-10 border-blue-500/30 hover:bg-blue-500/10 text-blue-400 font-black text-[10px] tracking-widest rounded-xl px-4 gap-2 transition-all active:scale-95"
                          >
                            <Database className="w-3.5 h-3.5" /> RADAR
                          </Button>
                         )}
                         <Button 
                          size="sm"
                          onClick={() => generateAIPitch(lead, "WhatsApp")}
                          className="h-10 bg-white text-black hover:bg-white/90 font-black text-[10px] tracking-widest rounded-xl px-4 gap-2 transition-all active:scale-95 shadow-lg shadow-white/5"
                        >
                          <Sparkles className="w-3.5 h-3.5" /> IA PITCH
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl border border-white/5 group hover:bg-white/5">
                               <MoreVertical className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-[#0c0c0c] border-white/10 w-52 rounded-2xl shadow-2xl p-2">
                             <div className="px-3 py-2 text-[9px] uppercase font-black text-muted-foreground/50 tracking-widest border-b border-white/5 mb-1 text-center">Estado del Lead</div>
                             <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "won")} className="rounded-xl gap-2 font-bold text-xs py-2.5 text-emerald-400 hover:bg-emerald-500/10 cursor-pointer">
                               <CheckCircle2 className="w-4 h-4" /> Marcar Ganado
                             </DropdownMenuItem>
                             <DropdownMenuItem onClick={() => updateLeadStatus(lead.id, "lost")} className="rounded-xl gap-2 font-bold text-xs py-2.5 text-red-500 hover:bg-red-500/10 cursor-pointer">
                               <ShieldAlert className="w-4 h-4" /> Perder Lead
                             </DropdownMenuItem>
                             <DropdownMenuSeparator className="bg-white/5" />
                             <DropdownMenuItem 
                              onClick={() => deleteLead(lead.id)} 
                              className="rounded-xl gap-2 font-bold text-xs py-2.5 text-muted-foreground hover:bg-red-600 hover:text-white cursor-pointer transition-all"
                             >
                               <Trash2 className="w-4 h-4" /> Eliminar Registro
                             </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredLeads.length === 0 && (
                <div className="flex flex-col items-center justify-center p-32 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.01]">
                   <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <ShieldAlert className="w-10 h-10 text-muted-foreground/20" />
                   </div>
                  <p className="text-muted-foreground text-sm font-black uppercase tracking-[0.2em]">Terminal Vacía</p>
                  <p className="text-[10px] text-muted-foreground/40 uppercase tracking-widest mt-3">Importa nuevos prospectos para activar el sistema</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          {/* Conservamos el resto de pestañas (Insights, Marketing) con sus diseños actuales */}
          <TabsContent value="insights" className="animate-in fade-in duration-700">
             <div className="p-20 text-center border border-white/5 rounded-[3rem] bg-white/[0.01]">
                <p className="text-muted-foreground font-black uppercase tracking-widest">Cargando Módulo de Analíticas Avanzado...</p>
             </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
