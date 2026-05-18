"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { IntermediateCTA } from "@/components/landing/IntermediateCTA";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import dynamic from "next/dynamic";

const FAQSection = dynamic(() => import("@/components/landing/FAQSection").then(mod => mod.FAQSection));
const LeadCaptureForm = dynamic(() => import("@/components/landing/LeadCaptureForm").then(mod => mod.LeadCaptureForm));

import { StickyCTA } from "@/components/landing/StickyCTA";
import { TechTicker } from "@/components/landing/TechTicker";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { CursorGlow } from "@/components/landing/CursorGlow";
import { ScrollProgress, ScrollProgressTopLine } from "@/components/landing/Animations";
import { NotificationProvider } from "@/components/landing/NotificationToast";

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <NotificationProvider>
      {/* Accessibility: Skip to content */}
      <a
        href="#contacto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-5 focus:py-2.5 focus:rounded-xl focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg focus:shadow-emerald-500/25 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        style={{ background: "linear-gradient(135deg, #10b981, #14b8a6, #2dd4bf)" }}
      >
        Saltar al formulario de contacto
      </a>
      <div className="min-h-screen bg-background text-foreground noise-overlay">
        <ScrollProgress />
        <ScrollProgressTopLine />
        <div className="relative z-10">
          <Navbar />
          <main className="pb-28 sm:pb-24">
            <SectionReveal>
              <HeroSection />
            </SectionReveal>
            <SectionReveal>
              <TechTicker />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <ServicesSection />
            </SectionReveal>
            <SectionReveal>
              <ProcessSection />
            </SectionReveal>
            <SectionReveal>
              <IntermediateCTA />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <PricingPreview />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <FAQSection />
            </SectionReveal>
            <div className="relative z-[60]">
              <LeadCaptureForm />
            </div>
            <div className="section-glow" />
            <SectionReveal>
              <FinalCTA />
            </SectionReveal>
          </main>
          <Footer />
          <CookieConsent />

          <StickyCTA />
          <CursorGlow />
        </div>
      </div>
    </NotificationProvider>
  );
}
