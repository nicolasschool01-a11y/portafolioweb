"use client";

import { motion } from "framer-motion";

const techs = [
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "React", icon: "⚛" },
  { name: "Node.js", icon: "🟢" },
  { name: "Prisma", icon: "◆" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Tailwind", icon: "🎨" },
  { name: "OpenAI", icon: "🤖" },
  { name: "Vercel", icon: "▲" },
  { name: "Supabase", icon: "⚡" },
  { name: "Docker", icon: "🐳" },
  { name: "Python", icon: "🐍" },
];

export function TechTicker() {
  return (
    <section className="relative py-10 sm:py-14 overflow-hidden border-y border-white/[0.04] bg-white/[0.01]">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground/40 font-medium"
        >
          Tecnologías que domino
        </motion.p>
      </div>

      {/* Row 1 */}
      <div className="relative mb-3">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex animate-marquee-ticker hover:[animation-play-state:paused]">
          {[...techs, ...techs, ...techs].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex items-center gap-2.5 px-5 sm:px-7 py-2.5 mx-2 rounded-full border border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 shrink-0 cursor-default"
            >
              <span className="text-sm sm:text-base">{tech.icon}</span>
              <span className="text-xs sm:text-sm font-medium text-muted-foreground/70 whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
