// ============================================================
// SITEMAPS CHUNKEADOS — pSEO NicoPrompt
// ============================================================
// Next.js genera automáticamente un sitemap index en /sitemap.xml
// que referencia /sitemap/0.xml, /sitemap/1.xml, etc.
// Cada chunk tiene máx 5,000 URLs (recomendado por Google)
// ============================================================

import type { MetadataRoute } from "next";
import { services } from "@/data/pseo-services";
import { getAllCities, getCitiesByCountry } from "@/data/pseo-cities";
import { industries } from "@/data/pseo-industries";

const BASE_URL = "https://nicoprompt.com";
const CHUNK_SIZE = 5000;

// Generate sitemap chunk IDs
export async function generateSitemaps() {
  const allSlugs = generateAllSitemapSlugs();
  const totalChunks = Math.ceil(allSlugs.length / CHUNK_SIZE);

  return Array.from({ length: totalChunks }, (_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
  const allSlugs = generateAllSitemapSlugs();
  const start = id * CHUNK_SIZE;
  const end = start + CHUNK_SIZE;
  const chunk = allSlugs.slice(start, end);

  return chunk.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: getPriority(slug),
  }));
}

function generateAllSitemapSlugs(): string[] {
  const allCities = getAllCities();
  const uyCities = getCitiesByCountry("UY");
  const arCities = getCitiesByCountry("AR");
  const slugs: string[] = [];

  // Home page
  // (handled by Next.js default sitemap for /)

  // ── URUGUAY FIRST (higher priority) ──

  // Tier 1: service × UY city
  for (const service of services) {
    for (const city of uyCities) {
      slugs.push(`${service.slug}-en-${city.slug}`);
    }
  }

  // Tier 2: service × industry (shared, not country-specific)
  for (const service of services) {
    for (const industry of industries) {
      slugs.push(`${service.slug}-para-${industry.slug}`);
    }
  }

  // Tier 4: pricing × UY city
  for (const service of services) {
    for (const city of uyCities) {
      slugs.push(`cuanto-cuesta-${service.slug}-en-${city.slug}`);
    }
  }

  // Tier 5: best × industry × UY city
  for (const industry of industries) {
    for (const city of uyCities) {
      slugs.push(`mejor-software-para-${industry.slug}-en-${city.slug}`);
    }
  }

  // Tier 3: service × industry × UY city (biggest volume)
  for (const service of services) {
    for (const industry of industries) {
      for (const city of uyCities) {
        slugs.push(`${service.slug}-para-${industry.slug}-en-${city.slug}`);
      }
    }
  }

  // ── ARGENTINA (added after Uruguay) ──

  // Tier 1: service × AR city
  for (const service of services) {
    for (const city of arCities) {
      slugs.push(`${service.slug}-en-${city.slug}`);
    }
  }

  // Tier 4: pricing × AR city
  for (const service of services) {
    for (const city of arCities) {
      slugs.push(`cuanto-cuesta-${service.slug}-en-${city.slug}`);
    }
  }

  // Tier 5: best × industry × AR city
  for (const industry of industries) {
    for (const city of arCities) {
      slugs.push(`mejor-software-para-${industry.slug}-en-${city.slug}`);
    }
  }

  // Tier 3: service × industry × AR city
  for (const service of services) {
    for (const industry of industries) {
      for (const city of arCities) {
        slugs.push(`${service.slug}-para-${industry.slug}-en-${city.slug}`);
      }
    }
  }

  return slugs;
}

function getPriority(slug: string): number {
  // Uruguay gets higher priority
  const isUY = !slug.includes("-buenos-aires") && !slug.includes("-cordoba") && !slug.includes("-rosario");

  if (slug.startsWith("cuanto-cuesta-")) return 0.6;
  if (slug.startsWith("mejor-software-")) return 0.6;
  if (slug.includes("-para-") && slug.includes("-en-")) return isUY ? 0.7 : 0.5; // Tier 3
  if (slug.includes("-para-")) return 0.8; // Tier 2
  if (slug.includes("-en-")) return isUY ? 0.9 : 0.7; // Tier 1

  return 0.5;
}
