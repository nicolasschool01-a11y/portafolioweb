import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NicoPrompt — IA aplicada a procesos de negocio",
  description:
    "Consulta IA Inicial gratuita e IA Sprint para ordenar procesos, ahorrar tiempo y prototipar sistemas simples con inteligencia artificial.",
  keywords: [
    "NicoPrompt",
    "IA aplicada",
    "IA para negocios",
    "automatizacion con IA",
    "IA Sprint",
    "consulta IA",
    "procesos de negocio",
    "IA",
    "CRM",
    "automatizacion",
    "pymes",
    "founders",
    "Uruguay",
  ],
  authors: [{ name: "NicoPrompt" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "NicoPrompt — IA aplicada a procesos de negocio",
    description:
      "Consulta IA Inicial gratuita e IA Sprint para detectar oportunidades concretas y prototipar sistemas simples.",
    type: "website",
    locale: "es_UY",
    siteName: "NicoPrompt",
  },
  twitter: {
    card: "summary_large_image",
    title: "NicoPrompt — IA aplicada a procesos de negocio",
    description:
      "Consulta IA Inicial gratuita e IA Sprint para ordenar procesos y validar sistemas con IA.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// JSON-LD structured data for the business
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NicoPrompt",
  description:
    "IA aplicada a procesos de negocio: consulta inicial, IA Sprint e implementacion posterior segun alcance.",
  url: "https://nicoprompt.com",
  serviceType: [
    "Consulta IA Inicial",
    "NicoPrompt IA Sprint",
    "Automatizacion con IA",
    "Sistemas CRM",
    "Optimización de procesos",
  ],
  areaServed: {
    "@type": "Place",
    name: "Uruguay",
  },
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          id="json-ld-seo"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
          <SonnerToaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
