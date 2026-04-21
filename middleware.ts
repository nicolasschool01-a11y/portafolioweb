import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ============================================================
// MIDDLEWARE DE PROTECCIÓN — NicoPrompt
// ============================================================
// Capa 1: Bloqueo de bots de IA, scrapers y crawlers maliciosos
// Capa 2: Rate limiting básico por IP
// Capa 3: Headers de seguridad
// ============================================================

// Bots de IA y scrapers conocidos que consumen recursos
const BLOCKED_BOTS = [
  // AI Crawlers
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-Web",
  "Bytespider",        // ByteDance/TikTok AI
  "Diffbot",
  "CCBot",             // Common Crawl (entrena IAs)
  "Google-Extended",   // Google AI training (NOT Googlebot)
  "FacebookBot",       // Meta AI training
  "cohere-ai",
  "PerplexityBot",
  "YouBot",

  // Scrapers agresivos
  "PetalBot",
  "SemrushBot",
  "AhrefsBot",
  "MJ12bot",
  "DotBot",
  "BLEXBot",
  "DataForSeoBot",
  "Scrapy",
  "colly",
  "Go-http-client",
  "python-requests",
  "Java/",
  "libwww-perl",
  "Wget",
  "curl/",
  "HTTPClient",

  // Vulnerability scanners
  "Nmap",
  "Nikto",
  "sqlmap",
  "masscan",
  "ZmEu",
  "w3af",
];

// Bots PERMITIDOS (motores de búsqueda legítimos + redes sociales)
const ALLOWED_BOTS = [
  "Googlebot",
  "Googlebot-Image",
  "Googlebot-Video",
  "Bingbot",
  "Slurp",             // Yahoo
  "DuckDuckBot",
  "Twitterbot",
  "facebookexternalhit",  // Facebook link previews (NOT FacebookBot)
  "LinkedInBot",
  "WhatsApp",
  "TelegramBot",
  "Applebot",
  "Pinterest",
];

// Rate limiting simple en memoria (por IP, para rutas pSEO)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minuto
const RATE_LIMIT_MAX = 30;        // máx 30 requests/min por IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  record.count++;
  if (record.count > RATE_LIMIT_MAX) {
    return true;
  }

  return false;
}

// Limpiar el mapa cada 5 minutos para evitar memory leaks
if (typeof globalThis !== "undefined") {
  const cleanup = () => {
    const now = Date.now();
    for (const [ip, record] of rateLimitMap.entries()) {
      if (now - record.timestamp > RATE_LIMIT_WINDOW * 2) {
        rateLimitMap.delete(ip);
      }
    }
  };
  // @ts-ignore - setInterval exists in edge runtime
  if (!globalThis.__rateLimitCleanup) {
    globalThis.__rateLimitCleanup = setInterval(cleanup, 300_000);
  }
}

export function middleware(request: NextRequest) {
  const ua = request.headers.get("user-agent") || "";
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  const pathname = request.nextUrl.pathname;

  // ── Capa 1: Bloquear bots maliciosos ──
  const isBlocked = BLOCKED_BOTS.some((bot) =>
    ua.toLowerCase().includes(bot.toLowerCase())
  );

  if (isBlocked) {
    // Verificar que no sea un bot permitido que coincida parcialmente
    const isAllowed = ALLOWED_BOTS.some((bot) =>
      ua.toLowerCase().includes(bot.toLowerCase())
    );

    if (!isAllowed) {
      return new NextResponse("Forbidden", {
        status: 403,
        headers: {
          "Content-Type": "text/plain",
          "X-Blocked-Reason": "bot-protection",
        },
      });
    }
  }

  // ── Capa 2: Bloquear user-agents vacíos (bots primitivos) ──
  if (!ua || ua.length < 10) {
    // Permitir health checks de Vercel
    if (pathname === "/api/health" || pathname === "/_next/") {
      // Allow
    } else {
      return new NextResponse("Forbidden", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // ── Capa 3: Rate limiting en rutas pSEO (futuro) ──
  // Solo aplicar rate limit a rutas que NO sean assets estáticos
  const isStaticAsset =
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") // archivos con extensión (.png, .css, .js, etc.)

  if (!isStaticAsset && isRateLimited(ip)) {
    return new NextResponse("Too Many Requests", {
      status: 429,
      headers: {
        "Content-Type": "text/plain",
        "Retry-After": "60",
        "X-Blocked-Reason": "rate-limit",
      },
    });
  }

  // ── Capa 4: Headers de seguridad ──
  const response = NextResponse.next();

  // Prevenir clickjacking
  response.headers.set("X-Frame-Options", "DENY");
  // Prevenir MIME sniffing
  response.headers.set("X-Content-Type-Options", "nosniff");
  // Referrer policy
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // XSS Protection (legacy browsers)
  response.headers.set("X-XSS-Protection", "1; mode=block");
  // Permissions policy
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  return response;
}

// Aplicar middleware a TODAS las rutas excepto assets estáticos internos
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, logo.svg (static root files)
     */
    "/((?!_next/static|_next/image|favicon.ico|logo.svg).*)",
  ],
};
