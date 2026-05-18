import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

function asString(value: unknown, fallback = "") {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function asNullableString(value: unknown) {
  const parsed = asString(value);
  return parsed || null;
}

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildOfferLeadDescription(body: any) {
  return {
    leadType: "consulta-ia-inicial",
    role: asString(body.role),
    businessContext: asString(body.businessContext),
    audience: asString(body.audience),
    stage: asString(body.stage),
    priorityArea: asString(body.priorityArea),
    processToImprove: asString(body.processToImprove),
    painCost: asString(body.painCost),
    firstValuableVersion: asString(body.firstValuableVersion),
    currentTools: asStringArray(body.currentTools),
    dataLocation: asString(body.dataLocation),
    sensitiveData: asString(body.sensitiveData),
    sampleDataAvailable: asString(body.sampleDataAvailable),
    urgency: asString(body.urgency),
    budget: asString(body.budget),
    decisionAuthority: asString(body.decisionAuthority),
    desiredStart: asString(body.desiredStart),
    consentAccepted: Boolean(body.consentAccepted),
    qualificationScore: typeof body.qualificationScore === "number" ? body.qualificationScore : null,
    offerHypothesis: asString(body.offerHypothesis),
    submittedAt: new Date().toISOString(),
  };
}

function safeParseJson(value: string | null) {
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("Email notify skipped: RESEND_API_KEY is not configured.");
    return null;
  }

  return new Resend(apiKey);
}

export async function POST(request: NextRequest) {
  console.log("API Leads: Recibida peticion POST");
  try {
    const data = await request.json();
    console.log(`Procesando ${Array.isArray(data) ? data.length : 1} leads...`);
    const leadsData = Array.isArray(data) ? data : [data];
    const createdLeads: any[] = [];

    for (const body of leadsData) {
      const isOfferLead = body.leadType === "consulta-ia-inicial";
      const offerDescription = isOfferLead ? buildOfferLeadDescription(body) : null;
      const {
        name,
        email,
        phone,
        whatsapp,
        company,
        projectType,
        problemSolved,
        targetUsers,
        designStatus,
        timeline,
        budget,
        contentNeeds,
        demoGoal,
        extraFeatures,
        description,
        sourceSlug,
        website,
        mapsUrl,
        rating,
        reviewsCount,
        street,
        city,
        state,
        industry,
        instagram,
        facebook,
        leadSource,
        category,
        tags,
      } = body;

      // Basic validation for name
      if (!asString(name)) continue;

      const lead = await db.lead.create({
        data: {
          name: asString(name),
          email: asString(email),
          phone: asNullableString(phone),
          whatsapp: asNullableString(whatsapp),
          company: asNullableString(company),
          projectType: isOfferLead ? "consulta-ia-inicial" : (projectType || "Prospect"),
          problemSolved: isOfferLead ? asNullableString(body.processToImprove || body.painCost) : (problemSolved || null),
          targetUsers: isOfferLead ? asNullableString(body.audience || body.businessContext) : (targetUsers || null),
          designStatus: isOfferLead ? asNullableString(body.role) : (designStatus || null),
          timeline: isOfferLead ? asNullableString(body.urgency) : (timeline || null),
          budget: isOfferLead ? asString(body.budget) : (budget || ""),
          contentNeeds: isOfferLead ? JSON.stringify(asStringArray(body.currentTools)) : (Array.isArray(contentNeeds) ? JSON.stringify(contentNeeds) : (contentNeeds || null)),
          demoGoal: isOfferLead ? asNullableString(body.offerHypothesis) : (demoGoal || null),
          extraFeatures: isOfferLead ? JSON.stringify({
            area: asString(body.priorityArea),
            score: body.qualificationScore ?? null,
          }) : (Array.isArray(extraFeatures) ? JSON.stringify(extraFeatures) : (extraFeatures || null)),
          description: isOfferLead ? JSON.stringify(offerDescription) : (description || null),
          status: "new",
          sourceSlug: sourceSlug || null,
          website: website || null,
          mapsUrl: mapsUrl || null,
          rating: (rating && !isNaN(parseFloat(rating))) ? parseFloat(rating) : null,
          reviewsCount: (reviewsCount && !isNaN(parseInt(reviewsCount))) ? parseInt(reviewsCount) : null,
          street: street || null,
          city: city || null,
          state: state || null,
          industry: industry || null,
          instagram: instagram || null,
          facebook: facebook || null,
          leadSource: leadSource || "organic",
          category: category || null,
          tags: isOfferLead
            ? `offer:consulta-ia, area:${asString(body.priorityArea, "sin-area")}, score:${body.qualificationScore ?? "na"}`
            : (tags || null),
        },
      });
      createdLeads.push(lead);
    }

    // Enviar email solo para el primer lead si es orgánico (pSEO)
    if (createdLeads.length === 1 && createdLeads[0].leadSource === "organic") {
      try {
        const resend = getResendClient();
        if (!resend) {
          return NextResponse.json(
            { success: true, count: createdLeads.length, notification: "skipped" },
            { status: 201 }
          );
        }

        const lead = createdLeads[0];
        const parsedDescription = safeParseJson(lead.description);
        const isOfferLead = parsedDescription?.leadType === "consulta-ia-inicial";
        const subject = isOfferLead
          ? `Nuevo lead Consulta IA - ${lead.company || lead.name}`
          : `Nuevo Lead: ${lead.name}`;
        const html = isOfferLead
          ? `
            <h2>Nuevo lead Consulta IA Inicial</h2>
            <p><strong>Nombre:</strong> ${escapeHtml(lead.name)}</p>
            <p><strong>Empresa:</strong> ${escapeHtml(lead.company || "-")}</p>
            <p><strong>Rol:</strong> ${escapeHtml(parsedDescription.role || "-")}</p>
            <p><strong>Email:</strong> ${escapeHtml(lead.email || "-")}</p>
            <p><strong>Area prioritaria:</strong> ${escapeHtml(parsedDescription.priorityArea || "-")}</p>
            <p><strong>Proceso:</strong> ${escapeHtml(parsedDescription.processToImprove || "-")}</p>
            <p><strong>Dolor/costo:</strong> ${escapeHtml(parsedDescription.painCost || "-")}</p>
            <p><strong>Herramientas:</strong> ${escapeHtml((parsedDescription.currentTools || []).join(", ") || "-")}</p>
            <p><strong>Urgencia:</strong> ${escapeHtml(parsedDescription.urgency || "-")}</p>
            <p><strong>Presupuesto:</strong> ${escapeHtml(parsedDescription.budget || "-")}</p>
            <p><strong>Autoridad:</strong> ${escapeHtml(parsedDescription.decisionAuthority || "-")}</p>
            <p><strong>Datos sensibles:</strong> ${escapeHtml(parsedDescription.sensitiveData || "-")}</p>
            <p><strong>Score preliminar:</strong> ${escapeHtml(parsedDescription.qualificationScore ?? "-")}</p>
            <p><strong>Hipotesis:</strong> ${escapeHtml(parsedDescription.offerHypothesis || "-")}</p>
            <p>Ver en el admin: https://nicoprompt.com/admin</p>
          `
          : `<h2>Nuevo Proyecto de ${escapeHtml(lead.projectType)}</h2><p>Ver en el CRM: https://nicoprompt.com/admin</p>`;

        await resend.emails.send({
          from: "NicoPrompt CRM <onboarding@resend.dev>",
          to: "nicolas.olivera.uy24@gmail.com",
          subject,
          html,
        });
      } catch (e) {
        console.error("Email notify error:", e);
      }
    }

    return NextResponse.json(
      { success: true, count: createdLeads.length },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lead creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const maxDuration = 60;

export async function GET(request: NextRequest) {
  try {
    // Protección simple con Clave Maestra en la cabecera Authorization
    const authHeader = request.headers.get("authorization");
    const masterKey = process.env.ADMIN_MASTER_KEY;

    if (!masterKey || authHeader !== `Bearer ${masterKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const leads = await db.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ leads });
  } catch (error) {
    console.error("Lead fetch error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
