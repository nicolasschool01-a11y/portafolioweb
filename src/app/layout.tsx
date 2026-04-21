import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NicoPrompt — Apps & Software a Medida con IA",
  description:
    "Desarrollo aplicaciones, sistemas y webs a medida usando inteligencia artificial. MVPs rápidos, funcionales y listos para escalar. Convierte tu idea en software real en días, no meses.",
  keywords: [
    "NicoPrompt",
    "desarrollo de software",
    "aplicaciones a medida",
    "IA",
    "MVP",
    "apps web",
    "CRM",
    "automatización",
    "desarrollo rápido",
    "startup",
    "software a medida",
    "Argentina",
  ],
  authors: [{ name: "NicoPrompt" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "NicoPrompt — Software a Medida con IA en Días",
    description:
      "Desarrollo aplicaciones, sistemas y webs a medida usando inteligencia artificial. MVPs rápidos, funcionales y listos para escalar.",
    type: "website",
    locale: "es_AR",
    siteName: "NicoPrompt",
  },
  twitter: {
    card: "summary_large_image",
    title: "NicoPrompt — Software a Medida con IA en Días",
    description:
      "Desarrollo aplicaciones, sistemas y webs a medida usando inteligencia artificial.",
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
    "Desarrollo de software a medida potenciado por inteligencia artificial. MVPs rápidos, funcionales y listos para escalar.",
  url: "https://nicoprompt.com",
  serviceType: [
    "Desarrollo de aplicaciones a medida",
    "Desarrollo web",
    "Sistemas CRM",
    "Automatización con IA",
    "MVP para startups",
  ],
  areaServed: {
    "@type": "Place",
    name: "Argentina",
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
        </ThemeProvider>
      </body>
    </html>
  );
}
