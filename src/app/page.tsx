"use client";

import { motion } from "framer-motion";
import { SectionDots } from "@/components/landing/SectionDots";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { ClientLogoMarquee } from "@/components/landing/ClientLogoMarquee";
import { StatsBar } from "@/components/landing/StatsBar";
import { ProjectSlotsWidget } from "@/components/landing/ProjectSlotsWidget";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { TechStackSection } from "@/components/landing/TechStackSection";
import { DifferentialSection } from "@/components/landing/DifferentialSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { IntermediateCTA } from "@/components/landing/IntermediateCTA";
import { PortfolioSection } from "@/components/landing/PortfolioSection";
import { PricingPreview } from "@/components/landing/PricingPreview";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { SEOSection } from "@/components/landing/SEOSection";
import { EducationSection } from "@/components/landing/EducationSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { LeadCaptureForm } from "@/components/landing/LeadCaptureForm";
import { TrustSection } from "@/components/landing/TrustSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Footer } from "@/components/landing/Footer";
import { StickyCTA } from "@/components/landing/StickyCTA";
import { PresentationSection } from "@/components/landing/PresentationSection";

import { TechTicker } from "@/components/landing/TechTicker";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { CursorGlow } from "@/components/landing/CursorGlow";
import { WhyMeStrip } from "@/components/landing/WhyMeStrip";
import { QuickContactBar } from "@/components/landing/QuickContactBar";
import { ScrollProgress, ScrollProgressTopLine } from "@/components/landing/Animations";
import { NotificationProvider } from "@/components/landing/NotificationToast";

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
              <ClientLogoMarquee />
            </SectionReveal>
            <SectionReveal>
              <StatsBar />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <ProjectSlotsWidget />
            </SectionReveal>
            <SectionReveal>
              <SocialProofSection />
            </SectionReveal>
            <SectionReveal>
              <ServicesSection />
            </SectionReveal>
            <SectionReveal>
              <WhyMeStrip />
            </SectionReveal>
            <SectionReveal>
              <TechStackSection />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <DifferentialSection />
            </SectionReveal>
            <SectionReveal>
              <ProcessSection />
            </SectionReveal>
            <SectionReveal>
              <IntermediateCTA />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <PresentationSection />
            </SectionReveal>
            <SectionReveal>
              <PortfolioSection />
            </SectionReveal>
            <SectionReveal>
              <PricingPreview />
            </SectionReveal>
            <SectionReveal>
              <TestimonialsSection />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <SEOSection />
            </SectionReveal>
            <SectionReveal>
              <EducationSection />
            </SectionReveal>
            <SectionReveal>
              <FAQSection />
            </SectionReveal>
            <SectionReveal>
              <TrustSection />
            </SectionReveal>
            <SectionReveal>
              <QuickContactBar />
            </SectionReveal>
            <SectionReveal>
              <LeadCaptureForm />
            </SectionReveal>
            <div className="section-glow" />
            <SectionReveal>
              <FinalCTA />
            </SectionReveal>
          </main>
          <Footer />
          <CookieConsent />

          <StickyCTA />
          <CursorGlow />
          <SectionDots />
        </div>
      </div>
    </NotificationProvider>
  );
}
