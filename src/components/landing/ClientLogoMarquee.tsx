"use client";

import { AnimateOnScroll } from "./Animations";

const clients = [
  { name: "BrandiShot", category: "SaaS" },
  { name: "FoodExpress", category: "Delivery" },
  { name: "PropManager", category: "Inmobiliaria" },
  { name: "MediConnect", category: "Salud" },
  { name: "EduPlatform", category: "Educación" },
  { name: "FinTrack", category: "Fintech" },
  { name: "ShopLocal", category: "E-commerce" },
  { name: "AutoLead", category: "Automotive" },
  { name: "GymFlow", category: "Fitness" },
  { name: "LegalTech", category: "Legal" },
  { name: "AgriSmart", category: "Agro" },
  { name: "TravelAI", category: "Turismo" },
];

export function ClientLogoMarquee() {
  return (
    <section className="relative py-16 sm:py-20 overflow-hidden">
      {/* Gradient line above */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      {/* Top gradient fade - more visible */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#020617] to-transparent z-10 pointer-events-none" />
      {/* Bottom gradient fade - more visible */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none" />
      {/* Gradient line below */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <AnimateOnScroll>
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground/50 font-medium">
            Empresas que confían en NicoPrompt
          </p>
        </AnimateOnScroll>
      </div>

      {/* Row 1 - scrolling left */}
      <div className="relative overflow-hidden mb-6">
        <div className="flex animate-marquee">
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`row1-${index}`}
              className="flex-shrink-0 mx-3 sm:mx-4"
            >
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.08] hover:scale-[1.05] transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center text-xs font-bold text-emerald-400 group-hover:from-emerald-500/30 group-hover:to-teal-500/30 transition-colors">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground/40 ml-2 hidden sm:inline">
                    {client.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 - scrolling right */}
      <div className="relative overflow-hidden">
        <div className="flex animate-marquee-reverse">
          {[...clients.slice(6), ...clients.slice(0, 6), ...clients.slice(6), ...clients.slice(0, 6)].map((client, index) => (
            <div
              key={`row2-${index}`}
              className="flex-shrink-0 mx-3 sm:mx-4"
            >
              <div className="flex items-center gap-3 px-6 py-3 rounded-xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/[0.08] hover:scale-[1.05] transition-all duration-300 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center text-xs font-bold text-violet-400 group-hover:from-violet-500/30 group-hover:to-purple-500/30 transition-colors">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground/40 ml-2 hidden sm:inline">
                    {client.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
