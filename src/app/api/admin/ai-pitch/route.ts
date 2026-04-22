import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterKey = process.env.ADMIN_MASTER_KEY;

    if (!masterKey || authHeader !== `Bearer ${masterKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lead, channel, context } = await request.json();

    if (!lead) {
      return NextResponse.json({ error: "Lead data missing" }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Eres un experto en prospección consultiva de alta conversión. Tu misión es redactar un mensaje corto, directo y de alto impacto.
      
      CONTEXTO ESTRATÉGICO: 
      - ${context || "Venta de servicios digitales generales."}
      - El objetivo es solucionar un problema real del cliente, no solo vender.

      DATOS DEL CLIENTE:
      - Nombre: ${lead.name}
      - Industria: ${lead.industry || "General"}
      - Website: ${lead.website || "No detectado"}
      - Reputación Google: ${lead.rating ? `${lead.rating} ★` : "Sin datos"} (${lead.reviewsCount || 0} reseñas)
      
      CANAL: ${channel}
      
      REGLAS DE ORO:
      - WhatsApp: Máximo 3 párrafos cortos. Agrega un emoji que aporte valor. Empieza con un saludo humano.
      - Si NO tiene sitio web: Enfócate en la pérdida de clientes y falta de profesionalismo.
      - Si tiene BAJA calificación: Enfócate en la recuperación de marca y captación de confianza.
      - NO menciones que eres una IA. Sé un consultor senior.
      - Incluye un gancho final (ej: "¿Te parece que hablemos 5 min mañana?")

      Responde ÚNICAMENTE con el cuerpo del mensaje en español.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return NextResponse.json({ pitch: responseText });
  } catch (error) {
    console.error("Gemini AI error:", error);
    return NextResponse.json(
      { error: "Error generando mensaje con IA" },
      { status: 500 }
    );
  }
}
