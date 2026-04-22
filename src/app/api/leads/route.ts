import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log("📥 API Leads: Recibida petición POST");
  try {
    const data = await request.json();
    console.log(`📦 Procesando ${Array.isArray(data) ? data.length : 1} leads...`);
    const leadsData = Array.isArray(data) ? data : [data];
    const createdLeads: any[] = [];

    for (const body of leadsData) {
      const {
        name,
        email,
        phone,
        whatsapp,
        company,
        projectType,
        budget,
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
      if (!name) continue;

      const lead = await db.lead.create({
        data: {
          name,
          email: email || "",
          phone: phone || null,
          whatsapp: whatsapp || null,
          company: company || null,
          projectType: projectType || "Prospect",
          budget: budget || "",
          description: description || null,
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
          tags: tags || null,
        },
      });
      createdLeads.push(lead);
    }

    // Enviar email solo para el primer lead si es orgánico (pSEO)
    if (createdLeads.length === 1 && createdLeads[0].leadSource === "organic") {
      try {
        const lead = createdLeads[0];
        await resend.emails.send({
          from: "NicoPrompt CRM <onboarding@resend.dev>",
          to: "nicolas.olivera.uy24@gmail.com",
          subject: `🎯 Nuevo Lead: ${lead.name}`,
          html: `<h2>🚀 ¡Nuevo Proyecto de ${lead.projectType}!</h2><p>Ver en el CRM: https://nicoprompt.com/admin/leads</p>`,
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
