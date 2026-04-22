// ============================================================
// PÁGINA pSEO DINÁMICA — ISR (Incremental Static Regeneration)
// ============================================================
// - NO pre-genera páginas en build (build rápido)
// - Genera cada página en la primera visita y la cachea 30 días
// - Servida desde CDN Edge después del primer hit = $0 extra
// - Metadata dinámica, canonicals, schema.org, no noindex
// ============================================================

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { parsePseoSlug, type PseoPageData } from "@/lib/pseo-router";
import { services } from "@/data/pseo-services";
import { getAllCities } from "@/data/pseo-cities";
import { industries } from "@/data/pseo-industries";
import Link from "next/link";

// ISR: revalidar cada 30 días — la página se sirve desde CDN sin serverless
export const revalidate = 2592000; // 30 días

// Permitir slugs dinámicos (NO pre-generar todo en build)
export const dynamicParams = true;

// Pre-generar solo las 50 páginas más importantes para el build inicial
export async function generateStaticParams() {
  const topCities = ["montevideo", "buenos-aires", "cordoba", "rosario", "punta-del-este"];
  const topServices = ["app-a-medida", "desarrollo-web", "chatbot-whatsapp", "sistema-crm", "ecommerce"];

  const params: { slug: string }[] = [];

  for (const service of topServices) {
    for (const city of topCities) {
      params.push({ slug: `${service}-en-${city}` });
    }
  }

  return params; // Solo 25 páginas pre-generadas
}

// ── Metadata SEO dinámica ──
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = parsePseoSlug(slug);

  if (!data) {
    return { title: "Página no encontrada | NicoPrompt" };
  }

  const { title, description } = generateTitleDescription(data);
  const baseUrl = "https://nicoprompt.com";

  return {
    title,
    description,
    // NO robots noindex — todas las páginas son indexables
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    alternates: {
      canonical: `${baseUrl}/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${slug}`,
      siteName: "NicoPrompt",
      locale: "es_UY",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

// ── Página principal ──
export default async function PseoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = parsePseoSlug(slug);

  if (!data) {
    notFound(); // Devuelve 404 limpio — NO genera páginas falsas
  }

  const { title } = generateTitleDescription(data);
  const schemaJson = generateSchemaOrg(data);

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />

      <main className="min-h-screen bg-background text-foreground">
        {/* Breadcrumbs */}
        <nav className="max-w-5xl mx-auto px-4 pt-6 pb-2" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Inicio</Link></li>
            <li className="text-white/20">/</li>
            {data.city && (
              <>
                <li><span className="text-muted-foreground">{data.city.flag} {data.city.countryName}</span></li>
                <li className="text-white/20">/</li>
                <li><span className="text-muted-foreground">{data.city.name}</span></li>
                <li className="text-white/20">/</li>
              </>
            )}
            {data.industry && (
              <>
                <li><span className="text-muted-foreground">{data.industry.emoji} {data.industry.name}</span></li>
                <li className="text-white/20">/</li>
              </>
            )}
            <li className="text-foreground font-medium">{data.service.shortTitle}</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
          <div className="text-center">
            {/* Location badge */}
            {data.city && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6">
                {data.city.flag} {data.city.name}, {data.city.countryName}
                {data.city.population && <span className="text-emerald-400/60">• {data.city.population} hab.</span>}
              </div>
            )}
            {data.industry && !data.city && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
                {data.industry.emoji} {data.industry.name}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {renderH1(data)}
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
              {renderSubtitle(data)}
            </p>

            {/* Key stats */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mb-10 flex-wrap">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{data.service.deliveryTime}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Tiempo de entrega</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{data.service.priceRange.replace("Desde ", "")}</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Inversión desde</div>
              </div>
              <div className="w-px h-10 bg-white/10 hidden sm:block" />
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">100%</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Código tuyo</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
              >
                Solicitar cotización gratuita
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="https://wa.me/59800000000"
                target="_blank"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#25D366]/30 text-[#25D366] font-semibold hover:bg-[#25D366]/10 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                WhatsApp directo
              </Link>
            </div>
          </div>
        </section>

        {/* Service Description */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">
                {data.type === "pricing-city"
                  ? `¿Cuánto cuesta ${data.service.shortTitle.toLowerCase()} en ${data.city?.name}?`
                  : `¿Por qué elegir NicoPrompt${data.city ? ` en ${data.city.name}` : ""}?`}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{data.service.longDesc}</p>
              {data.city && (
                <p className="text-muted-foreground leading-relaxed">
                  Trabajo con negocios en <strong className="text-foreground">{data.city.name}</strong>, {data.city.localContext}. Entiendo las necesidades del mercado local y ofrezco soluciones adaptadas a la realidad de {data.city.countryName}.
                </p>
              )}
            </div>

            {/* Benefits */}
            <div>
              <h3 className="text-xl font-bold mb-4">
                {data.service.emoji} Lo que incluye
              </h3>
              <ul className="space-y-3">
                {data.service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* Tech stack */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider">Tecnologías</h4>
                <div className="flex flex-wrap gap-2">
                  {data.service.techStack.map((tech) => (
                    <span key={tech} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industry Pain Points (if applicable) */}
        {data.industry && (
          <section className="max-w-5xl mx-auto px-4 py-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Problemas comunes en {data.industry.emoji} {data.industry.name}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
                <h3 className="font-semibold text-red-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Desafíos del sector
                </h3>
                <ul className="space-y-2">
                  {data.industry.painPoints.map((pp, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="text-red-400/50 mt-1">✕</span>
                      {pp}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                <h3 className="font-semibold text-emerald-400 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  Solución con NicoPrompt
                </h3>
                <ul className="space-y-2">
                  {data.industry.solutions.map((sol, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <span className="text-emerald-400 mt-1">✓</span>
                      {sol}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* Pricing Section (Tier 4) */}
        {data.type === "pricing-city" && data.city && (
          <section className="max-w-5xl mx-auto px-4 py-12">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-emerald-500/5 via-card/80 to-teal-500/5 border border-white/[0.06]">
              <h2 className="text-2xl font-bold mb-4">
                💰 Inversión en {data.service.shortTitle} en {data.city.name}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6 mt-6">
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-emerald-400">{data.service.priceRange.replace("Desde ", "")}</div>
                  <div className="text-sm text-muted-foreground mt-2">Inversión desde</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-emerald-400">{data.service.deliveryTime}</div>
                  <div className="text-sm text-muted-foreground mt-2">Tiempo de entrega</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-white/5">
                  <div className="text-3xl font-bold text-emerald-400">$0</div>
                  <div className="text-sm text-muted-foreground mt-2">Primera consulta</div>
                </div>
              </div>
              <p className="text-muted-foreground mt-6 text-sm leading-relaxed">
                El precio final depende de la complejidad, funcionalidades e integraciones requeridas.
                Solicitá una cotización personalizada sin compromiso para tu proyecto en {data.city.name}.
              </p>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            Preguntas frecuentes sobre {data.service.shortTitle.toLowerCase()}
            {data.city ? ` en ${data.city.name}` : ""}
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {data.service.faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-white/[0.06] bg-card/50 overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] transition-colors">
                  <span className="font-medium pr-4">{contextualizeQuestion(faq.question, data)}</span>
                  <svg className="w-5 h-5 text-muted-foreground shrink-0 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <div className="px-5 pb-5 text-muted-foreground leading-relaxed border-t border-white/[0.04] pt-4">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Internal Links */}
        <section className="max-w-5xl mx-auto px-4 py-12">
          <InternalLinks data={data} />
        </section>

        {/* Final CTA */}
        <section className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-card/80 to-teal-500/10 border border-emerald-500/20">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              ¿Listo para empezar tu proyecto{data.city ? ` en ${data.city.name}` : ""}?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              La primera consulta es gratis y sin compromiso. Te respondo en menos de 24hs.
            </p>
            <Link
              href="/#contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105"
            >
              Solicitar consulta gratuita
            </Link>
          </div>
        </section>

        {/* Footer link back to home */}
        <div className="max-w-5xl mx-auto px-4 pb-12 text-center">
          <Link href="/" className="text-sm text-muted-foreground hover:text-emerald-400 transition-colors">
            ← Volver a NicoPrompt.com
          </Link>
        </div>
      </main>
    </>
  );
}

// ── Helper Functions ──

function generateTitleDescription(data: PseoPageData) {
  const city = data.city;
  const service = data.service;
  const industry = data.industry;

  switch (data.type) {
    case "service-city":
      return {
        title: `${service.title} en ${city!.name} ${city!.flag} | NicoPrompt`,
        description: `Desarrollo de ${service.shortTitle.toLowerCase()} profesional en ${city!.name}, ${city!.countryName}. ${service.outcome}. MVP en ${service.deliveryTime}. Código 100% tuyo. Cotización gratuita.`,
      };
    case "service-industry":
      return {
        title: `${service.shortTitle} para ${industry!.name} ${industry!.emoji} | NicoPrompt`,
        description: `${service.shortTitle} especializado para ${industry!.name.toLowerCase()}. ${industry!.description} ${service.priceRange}. Consultá sin compromiso.`,
      };
    case "service-industry-city":
      return {
        title: `${service.shortTitle} para ${industry!.name} en ${city!.name} ${city!.flag} | NicoPrompt`,
        description: `${service.shortTitle} para ${industry!.name.toLowerCase()} en ${city!.name}, ${city!.countryName}. Soluciones a medida: ${industry!.solutions.slice(0, 2).join(", ")}. Cotización gratuita.`,
      };
    case "pricing-city":
      return {
        title: `¿Cuánto cuesta ${service.shortTitle.toLowerCase()} en ${city!.name}? | NicoPrompt`,
        description: `Precios de ${service.shortTitle.toLowerCase()} en ${city!.name}, ${city!.countryName}. ${service.priceRange}. Entrega en ${service.deliveryTime}. Cotización personalizada sin compromiso.`,
      };
    case "best-industry-city":
      return {
        title: `Mejor Software para ${industry!.name} en ${city!.name} ${city!.flag} | NicoPrompt`,
        description: `El mejor software para ${industry!.name.toLowerCase()} en ${city!.name}. ${industry!.description} Soluciones: ${industry!.solutions.slice(0, 2).join(", ")}. Consultá gratis.`,
      };
  }
}

function renderH1(data: PseoPageData) {
  switch (data.type) {
    case "service-city":
      return <>{data.service.title} en <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{data.city!.name}</span></>;
    case "service-industry":
      return <>{data.service.shortTitle} para <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{data.industry!.name}</span></>;
    case "service-industry-city":
      return <>{data.service.shortTitle} para <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{data.industry!.name}</span> en <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">{data.city!.name}</span></>;
    case "pricing-city":
      return <>¿Cuánto cuesta <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">{data.service.shortTitle.toLowerCase()}</span> en {data.city!.name}?</>;
    case "best-industry-city":
      return <>Mejor Software para <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">{data.industry!.name}</span> en {data.city!.name}</>;
  }
}

function renderSubtitle(data: PseoPageData) {
  switch (data.type) {
    case "service-city":
      return `${data.service.shortDesc} Trabajo con negocios en ${data.city!.name}, ${data.city!.localContext}. ${data.service.outcome}.`;
    case "service-industry":
      return `${data.industry!.description} ${data.service.outcome}.`;
    case "service-industry-city":
      return `${data.service.shortDesc} Especializado en ${data.industry!.name.toLowerCase()} en ${data.city!.name}. ${data.service.outcome}.`;
    case "pricing-city":
      return `Conocé los precios de ${data.service.shortTitle.toLowerCase()} profesional en ${data.city!.name}. ${data.service.priceRange}. Entrega en ${data.service.deliveryTime}. Sin costos ocultos.`;
    case "best-industry-city":
      return `Comparativa y recomendación del mejor software para ${data.industry!.name.toLowerCase()} en ${data.city!.name}. Soluciones probadas que resuelven: ${data.industry!.painPoints.slice(0, 2).join(", ")}.`;
  }
}

function contextualizeQuestion(question: string, data: PseoPageData): string {
  if (data.city) {
    return question.replace(/\?$/, ` en ${data.city.name}?`);
  }
  return question;
}

function generateSchemaOrg(data: PseoPageData) {
  const schemas: any[] = [];

  // Service schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.service.title + (data.city ? ` en ${data.city.name}` : ""),
    description: data.service.longDesc,
    provider: {
      "@type": "LocalBusiness",
      name: "NicoPrompt",
      url: "https://nicoprompt.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: data.city?.name || "Montevideo",
        addressCountry: data.city?.country || "UY",
      },
      priceRange: data.service.priceRange,
    },
    areaServed: data.city ? {
      "@type": "City",
      name: data.city.name,
      containedInPlace: {
        "@type": "Country",
        name: data.city.countryName,
      },
    } : undefined,
    offers: {
      "@type": "Offer",
      price: data.service.priceRange.replace(/[^0-9]/g, ""),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  });

  // FAQPage schema (Google shows these as rich snippets)
  schemas.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.service.faqs.map((faq) => ({
      "@type": "Question",
      name: contextualizeQuestion(faq.question, data),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  // BreadcrumbList schema
  const breadcrumbs: any[] = [
    { "@type": "ListItem", position: 1, name: "Inicio", item: "https://nicoprompt.com" },
  ];
  let pos = 2;
  if (data.city) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: pos++,
      name: data.city.name,
    });
  }
  if (data.industry) {
    breadcrumbs.push({
      "@type": "ListItem",
      position: pos++,
      name: data.industry.name,
    });
  }
  breadcrumbs.push({
    "@type": "ListItem",
    position: pos,
    name: data.service.shortTitle,
    item: data.canonicalUrl,
  });

  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs,
  });

  return schemas;
}

// ── Internal Links Component ──
function InternalLinks({ data }: { data: PseoPageData }) {
  const allCities = getAllCities();

  // Same service, other cities (max 10)
  const sameCitiesLinks = data.city
    ? allCities
        .filter((c) => c.slug !== data.city!.slug && c.country === data.city!.country)
        .slice(0, 10)
        .map((c) => ({
          href: `/${data.service.slug}-en-${c.slug}`,
          label: `${data.service.shortTitle} en ${c.name}`,
        }))
    : [];

  // Same city, other services (max 8)
  const sameServiceLinks = data.city
    ? services
        .filter((s) => s.slug !== data.service.slug)
        .slice(0, 8)
        .map((s) => ({
          href: `/${s.slug}-en-${data.city!.slug}`,
          label: `${s.shortTitle} en ${data.city!.name}`,
        }))
    : [];

  // Related industries (max 6)
  const industryLinks = data.city
    ? industries
        .slice(0, 6)
        .map((ind) => ({
          href: `/${data.service.slug}-para-${ind.slug}-en-${data.city!.slug}`,
          label: `${data.service.shortTitle} para ${ind.name}`,
        }))
    : data.industry
    ? allCities
        .filter((c) => c.country === "UY")
        .slice(0, 8)
        .map((c) => ({
          href: `/${data.service.slug}-para-${data.industry!.slug}-en-${c.slug}`,
          label: `${data.industry!.name} en ${c.name}`,
        }))
    : [];

  // Pricing links (max 4)
  const pricingLinks = data.city && data.type !== "pricing-city"
    ? [{
        href: `/cuanto-cuesta-${data.service.slug}-en-${data.city.slug}`,
        label: `¿Cuánto cuesta ${data.service.shortTitle.toLowerCase()} en ${data.city.name}?`,
      }]
    : [];

  const hasLinks = sameCitiesLinks.length > 0 || sameServiceLinks.length > 0 || industryLinks.length > 0 || pricingLinks.length > 0;
  if (!hasLinks) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-center mb-8">También te puede interesar</h2>

      {sameCitiesLinks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {data.service.shortTitle} en otras ciudades
          </h3>
          <div className="flex flex-wrap gap-2">
            {sameCitiesLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:border-emerald-500/30 hover:text-emerald-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {sameServiceLinks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Otros servicios en {data.city?.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {sameServiceLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:border-violet-500/30 hover:text-violet-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {industryLinks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Soluciones por industria
          </h3>
          <div className="flex flex-wrap gap-2">
            {industryLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:border-amber-500/30 hover:text-amber-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      {pricingLinks.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Precios
          </h3>
          <div className="flex flex-wrap gap-2">
            {pricingLinks.map((link) => (
              <Link key={link.href} href={link.href} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground hover:border-cyan-500/30 hover:text-cyan-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
