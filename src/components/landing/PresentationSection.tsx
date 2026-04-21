"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Instagram, 
  Linkedin, 
  MapPin, 
  Sparkles, 
  Bot, 
  Globe, 
  Zap, 
  TrendingUp, 
  Target, 
  Camera, 
  Search,
  ArrowRight
} from "lucide-react";

const skills = [
  { name: "Webs Pro", icon: Globe, color: "text-emerald-400", bgColor: "bg-emerald-500/10" },
  { name: "Automatizaciones", icon: Zap, color: "text-amber-400", bgColor: "bg-amber-500/10" },
  { name: "IA Apps", icon: Bot, color: "text-cyan-400", bgColor: "bg-cyan-500/10" },
  { name: "Meta Ads", icon: Target, color: "text-blue-400", bgColor: "bg-blue-500/10" },
  { name: "SEO Avanzado", icon: Search, color: "text-rose-400", bgColor: "bg-rose-500/10" },
  { name: "Contenido UGC", icon: Camera, color: "text-violet-400", bgColor: "bg-violet-500/10" },
  { name: "Funnels", icon: TrendingUp, color: "text-teal-400", bgColor: "bg-teal-500/10" },
];

export function PresentationSection() {
  const scrollToContact = () => {
    const el = document.querySelector("#contacto");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="sobre-mi" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Left Side: Photo Container */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative shrink-0 w-full max-w-[320px] sm:max-w-[380px]"
          >
            {/* 9:16 Photo Wrapper */}
            <div className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-emerald-500/10 group">
              <img 
                src="https://res.cloudinary.com/dvbkp3ml7/image/upload/v1776775226/nico.setup1_r21two.png" 
                alt="Nicolas Olivera"
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
              
              {/* Floating Uruguay Badge */}
              <div className="absolute bottom-6 left-6">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
                  <span className="text-base">🇺🇾</span>
                  Uruguay
                </div>
              </div>
            </div>

            {/* Decorative Elements around photo */}
            <div className="absolute -z-10 -top-4 -left-4 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl animate-pulse" />
            <div className="absolute -z-10 -bottom-4 -right-4 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-6 px-4 py-1.5 border-emerald-500/20 bg-emerald-500/5 text-emerald-400 capitalize">
                <Sparkles className="w-3 h-3 mr-2" />
                Especialista en IA & Estratega Digital
              </Badge>
              
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Nicolás <span className="gradient-text-animated">Olivera</span>
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
                Ayudo a empresas y emprendedores a escalar mediante tecnología de vanguardia.
                Desde el desarrollo de <span className="text-foreground font-medium">aplicaciones con IA</span> hasta la creación de <span className="text-foreground font-medium">funnels de adquisición</span> de alto impacto. 
                Mi enfoque mezcla el código puro con la estrategia de marketing para lanzar productos que no solo funcionen, sino que vendan.
              </p>

              {/* Skill Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-10">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300 group relative overflow-hidden shimmer-sweep`}
                  >
                    <div className={`shrink-0 w-8 h-8 rounded-lg ${skill.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <skill.icon className={`w-4 h-4 ${skill.color}`} />
                    </div>
                    <span className="text-xs font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </motion.div>
                ))}
              </div>

              {/* Action Buttons & Socials */}
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl px-8 h-12 text-sm font-semibold shadow-lg shadow-emerald-500/20 group"
                >
                  Hablemos de tu proyecto
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <div className="flex items-center gap-4">
                  <a 
                    href="https://www.instagram.com/nico_prompt/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-muted-foreground hover:text-rose-400"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/nicolas-olivera-3410a422b" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 hover:border-white/20 transition-all text-muted-foreground hover:text-blue-400"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <div className="flex items-center gap-2 ml-2">
                    <MapPin className="w-4 h-4 text-muted-foreground/60" />
                    <span className="text-xs text-muted-foreground/60">Montevideo, Uruguay</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
