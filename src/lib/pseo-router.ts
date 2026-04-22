// ============================================================
// PSEO ROUTER — Motor de parsing de URLs
// ============================================================
// Parsea slugs como:
//   app-a-medida-en-montevideo → Tier 1 (service × city)
//   crm-para-restaurantes → Tier 2 (service × industry)
//   chatbot-whatsapp-para-veterinarias-en-montevideo → Tier 3
//   cuanto-cuesta-app-a-medida-en-montevideo → Tier 4
//   mejor-software-para-restaurantes-en-montevideo → Tier 5
// ============================================================

import { services, getServiceBySlug, type Service } from "@/data/pseo-services";
import { getAllCities, getCityBySlug, type City } from "@/data/pseo-cities";
import { industries, getIndustryBySlug, type Industry } from "@/data/pseo-industries";

export type PageType = "service-city" | "service-industry" | "service-industry-city" | "pricing-city" | "best-industry-city";

export interface PseoPageData {
  type: PageType;
  service: Service;
  city?: City;
  industry?: Industry;
  slug: string;
  canonicalUrl: string;
}

const BASE_URL = "https://nicoprompt.com";

/**
 * Parse a pSEO slug and return the page data, or null if invalid.
 * Tries patterns from most specific to least specific.
 */
export function parsePseoSlug(slug: string): PseoPageData | null {
  // ── Tier 4: "cuanto-cuesta-{service}-en-{city}" ──
  if (slug.startsWith("cuanto-cuesta-")) {
    const remainder = slug.slice("cuanto-cuesta-".length);
    const match = matchServiceCity(remainder);
    if (match) {
      return {
        type: "pricing-city",
        service: match.service,
        city: match.city,
        slug,
        canonicalUrl: `${BASE_URL}/${slug}`,
      };
    }
  }

  // ── Tier 5: "mejor-software-para-{industry}-en-{city}" ──
  if (slug.startsWith("mejor-software-para-")) {
    const remainder = slug.slice("mejor-software-para-".length);
    const match = matchIndustryCity(remainder);
    if (match) {
      return {
        type: "best-industry-city",
        service: services[0], // Generic service placeholder
        city: match.city,
        industry: match.industry,
        slug,
        canonicalUrl: `${BASE_URL}/${slug}`,
      };
    }
  }

  // ── Tier 3: "{service}-para-{industry}-en-{city}" ──
  const tier3 = matchServiceIndustryCity(slug);
  if (tier3) {
    return {
      type: "service-industry-city",
      service: tier3.service,
      industry: tier3.industry,
      city: tier3.city,
      slug,
      canonicalUrl: `${BASE_URL}/${slug}`,
    };
  }

  // ── Tier 1: "{service}-en-{city}" ──
  const tier1 = matchServiceCity(slug);
  if (tier1) {
    return {
      type: "service-city",
      service: tier1.service,
      city: tier1.city,
      slug,
      canonicalUrl: `${BASE_URL}/${slug}`,
    };
  }

  // ── Tier 2: "{service}-para-{industry}" ──
  const tier2 = matchServiceIndustry(slug);
  if (tier2) {
    return {
      type: "service-industry",
      service: tier2.service,
      industry: tier2.industry,
      slug,
      canonicalUrl: `${BASE_URL}/${slug}`,
    };
  }

  return null;
}

// ── Matchers ──

function matchServiceCity(input: string): { service: Service; city: City } | null {
  for (const service of services) {
    const prefix = `${service.slug}-en-`;
    if (input.startsWith(prefix)) {
      const citySlug = input.slice(prefix.length);
      const city = getCityBySlug(citySlug);
      if (city) return { service, city };
    }
  }
  return null;
}

function matchServiceIndustry(input: string): { service: Service; industry: Industry } | null {
  for (const service of services) {
    const prefix = `${service.slug}-para-`;
    if (input.startsWith(prefix)) {
      const industrySlug = input.slice(prefix.length);
      const industry = getIndustryBySlug(industrySlug);
      if (industry) return { service, industry };
    }
  }
  return null;
}

function matchServiceIndustryCity(input: string): { service: Service; industry: Industry; city: City } | null {
  for (const service of services) {
    const prefix = `${service.slug}-para-`;
    if (input.startsWith(prefix)) {
      const remainder = input.slice(prefix.length);
      // Now match "{industry}-en-{city}"
      for (const industry of industries) {
        const indPrefix = `${industry.slug}-en-`;
        if (remainder.startsWith(indPrefix)) {
          const citySlug = remainder.slice(indPrefix.length);
          const city = getCityBySlug(citySlug);
          if (city) return { service, industry, city };
        }
      }
    }
  }
  return null;
}

function matchIndustryCity(input: string): { industry: Industry; city: City } | null {
  for (const industry of industries) {
    const prefix = `${industry.slug}-en-`;
    if (input.startsWith(prefix)) {
      const citySlug = input.slice(prefix.length);
      const city = getCityBySlug(citySlug);
      if (city) return { industry, city };
    }
  }
  return null;
}

// ── URL Generators (for internal linking & sitemaps) ──

export function generateAllSlugs(): string[] {
  const allCities = getAllCities();
  const slugs: string[] = [];

  // Tier 1: service × city
  for (const service of services) {
    for (const city of allCities) {
      slugs.push(`${service.slug}-en-${city.slug}`);
    }
  }

  // Tier 2: service × industry
  for (const service of services) {
    for (const industry of industries) {
      slugs.push(`${service.slug}-para-${industry.slug}`);
    }
  }

  // Tier 3: service × industry × city
  for (const service of services) {
    for (const industry of industries) {
      for (const city of allCities) {
        slugs.push(`${service.slug}-para-${industry.slug}-en-${city.slug}`);
      }
    }
  }

  // Tier 4: cuanto-cuesta × service × city
  for (const service of services) {
    for (const city of allCities) {
      slugs.push(`cuanto-cuesta-${service.slug}-en-${city.slug}`);
    }
  }

  // Tier 5: mejor-software × industry × city
  for (const industry of industries) {
    for (const city of allCities) {
      slugs.push(`mejor-software-para-${industry.slug}-en-${city.slug}`);
    }
  }

  return slugs;
}

export function generateSlugsByCountry(country: "UY" | "AR"): string[] {
  const cities = getAllCities().filter(c => c.country === country);
  const slugs: string[] = [];

  for (const service of services) {
    for (const city of cities) {
      slugs.push(`${service.slug}-en-${city.slug}`);
    }
  }

  for (const service of services) {
    for (const industry of industries) {
      slugs.push(`${service.slug}-para-${industry.slug}`);
    }
  }

  for (const service of services) {
    for (const industry of industries) {
      for (const city of cities) {
        slugs.push(`${service.slug}-para-${industry.slug}-en-${city.slug}`);
      }
    }
  }

  for (const service of services) {
    for (const city of cities) {
      slugs.push(`cuanto-cuesta-${service.slug}-en-${city.slug}`);
    }
  }

  for (const industry of industries) {
    for (const city of cities) {
      slugs.push(`mejor-software-para-${industry.slug}-en-${city.slug}`);
    }
  }

  return slugs;
}

/** Get total page count */
export function getTotalPageCount(): number {
  const totalCities = getAllCities().length;
  return (
    services.length * totalCities +       // Tier 1
    services.length * industries.length +  // Tier 2
    services.length * industries.length * totalCities + // Tier 3
    services.length * totalCities +        // Tier 4
    industries.length * totalCities        // Tier 5
  );
}
