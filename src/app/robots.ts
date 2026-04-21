import type { MetadataRoute } from "next";

// ============================================================
// ROBOTS.TXT DINÁMICO — NicoPrompt
// ============================================================
// Bloquea explícitamente bots de IA y scrapers
// Permite solo motores de búsqueda legítimos
// ============================================================

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://nicoprompt.com";

  return {
    rules: [
      // ── Motores de búsqueda permitidos ──
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
      {
        userAgent: "Slurp", // Yahoo
        allow: "/",
      },
      {
        userAgent: "DuckDuckBot",
        allow: "/",
      },
      {
        userAgent: "Applebot",
        allow: "/",
      },

      // ── Redes sociales (previews de links) ──
      {
        userAgent: "Twitterbot",
        allow: "/",
      },
      {
        userAgent: "facebookexternalhit",
        allow: "/",
      },
      {
        userAgent: "LinkedInBot",
        allow: "/",
      },

      // ── Bots de IA — BLOQUEADOS ──
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "OAI-SearchBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "ClaudeBot",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "PetalBot",
        disallow: "/",
      },
      {
        userAgent: "Diffbot",
        disallow: "/",
      },
      {
        userAgent: "cohere-ai",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        disallow: "/",
      },
      {
        userAgent: "YouBot",
        disallow: "/",
      },

      // ── Scrapers SEO agresivos ──
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "DataForSeoBot",
        disallow: "/",
      },
      {
        userAgent: "BLEXBot",
        disallow: "/",
      },

      // ── Regla por defecto: permitir, pero restringir API ──
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
