// ============================================================
// CONTROLADOR DE SITEMAPS CONSOLIDADO — pSEO NicoPrompt
// ============================================================
// Maneja todas las peticiones de sitemaps bajo /sitemaps/[chunk]
// - index.xml: Índice principal
// - home.xml: Sitemap de la página de inicio
// - [0-9].xml: Chunks de pSEO (5,000 URLs cada uno)
// ============================================================

import { NextResponse } from "next/server";
import { services } from "@/data/pseo-services";
import { getAllCities, getCitiesByCountry } from "@/data/pseo-cities";
import { industries } from "@/data/pseo-industries";

const BASE_URL = "https://nicoprompt.com";
const CHUNK_SIZE = 5000;

export const revalidate = 86400; // Caché ISR de 24 horas

// Generamos parámetros estáticos para los chunks más importantes
export async function generateStaticParams() {
  const allSlugs = generateAllSlugs();
  const totalChunks = Math.ceil(allSlugs.length / CHUNK_SIZE);
  
  const params = [
    { chunk: "index.xml" },
    { chunk: "home.xml" },
  ];

  // Agregamos los IDs de los chunks (0.xml, 1.xml, etc.)
  for (let i = 0; i < totalChunks; i++) {
    params.push({ chunk: `${i}.xml` });
  }

  return params;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ chunk: string }> }
) {
  const segmentData = await params;
  const chunk = segmentData.chunk;

  // ── 1. SITEMAP INDEX ──
  if (chunk === "index.xml") {
    const allSlugs = generateAllSlugs();
    const totalChunks = Math.ceil(allSlugs.length / CHUNK_SIZE);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<sitemap><loc>${BASE_URL}/sitemap-home.xml</loc></sitemap>
${Array.from({ length: totalChunks }, (_, i) => `<sitemap><loc>${BASE_URL}/sitemap-${i}.xml</loc></sitemap>`).join("\n")}
</sitemapindex>`;

    return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
  }

  // ── 2. HOME SITEMAP ──
  if (chunk === "home.xml") {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>${BASE_URL}</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
</urlset>`;
    return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
  }

  // ── 3. PSEO CHUNKS ([id].xml) ──
  const match = chunk.match(/^(\d+)\.xml$/);
  if (match) {
    const chunkIndex = parseInt(match[1], 10);
    const allSlugs = generateAllSlugs();
    const totalChunks = Math.ceil(allSlugs.length / CHUNK_SIZE);

    if (chunkIndex >= totalChunks) return new NextResponse("Not Found", { status: 404 });

    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, allSlugs.length);
    const chunkSlugs = allSlugs.slice(start, end);

    const urls = chunkSlugs
      .map(
        (slug) =>
          `<url><loc>${BASE_URL}/${slug}</loc><changefreq>monthly</changefreq><priority>${getPriority(slug)}</priority></url>`
      )
      .join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    return new NextResponse(xml, { headers: { "Content-Type": "application/xml" } });
  }

  return new NextResponse("Not Found", { status: 404 });
}

// ── GENERACIÓN DE SLUGS (Ordenado por prioridad) ──

function generateAllSlugs(): string[] {
  const uyCities = getCitiesByCountry("UY");
  const arCities = getCitiesByCountry("AR");
  const slugs: string[] = [];

  // TIER 1: Servicio × Ciudad UY (Prioridad Máxima)
  for (const service of services) {
    for (const city of uyCities) {
      slugs.push(`${service.slug}-en-${city.slug}`);
    }
  }

  // TIER 2: Servicio × Industria
  for (const service of services) {
    for (const industry of industries) {
      slugs.push(`${service.slug}-para-${industry.slug}`);
    }
  }

  // TIER 4: Precios × Ciudad UY
  for (const service of services) {
    for (const city of uyCities) {
      slugs.push(`cuanto-cuesta-${service.slug}-en-${city.slug}`);
    }
  }

  // TIER 5: Mejor × Industria × Ciudad UY
  for (const industry of industries) {
    for (const city of uyCities) {
      slugs.push(`mejor-software-para-${industry.slug}-en-${city.slug}`);
    }
  }

  // TIER 3: Triple Combinación UY (Volumen masivo)
  for (const service of services) {
    for (const industry of industries) {
      for (const city of uyCities) {
        slugs.push(`${service.slug}-para-${industry.slug}-en-${city.slug}`);
      }
    }
  }

  // ── REPETIR PARA ARGENTINA (Tier 1 a 3) ──
  for (const service of services) {
    for (const city of arCities) {
      slugs.push(`${service.slug}-en-${city.slug}`);
    }
  }
  for (const service of services) {
    for (const city of arCities) {
      slugs.push(`cuanto-cuesta-${service.slug}-en-${city.slug}`);
    }
  }
  for (const industry of industries) {
    for (const city of arCities) {
      slugs.push(`mejor-software-para-${industry.slug}-en-${city.slug}`);
    }
  }
  for (const service of services) {
    for (const industry of industries) {
      for (const city of arCities) {
        slugs.push(`${service.slug}-para-${industry.slug}-en-${city.slug}`);
      }
    }
  }

  return slugs;
}

function getPriority(slug: string): string {
  if (slug.startsWith("cuanto-cuesta-")) return "0.6";
  if (slug.startsWith("mejor-software-")) return "0.6";
  if (slug.includes("-para-") && slug.includes("-en-")) return "0.5";
  if (slug.includes("-para-")) return "0.8";
  if (slug.includes("-en-")) return "0.9";
  return "0.5";
}
