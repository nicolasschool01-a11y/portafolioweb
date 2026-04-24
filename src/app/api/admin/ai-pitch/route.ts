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
      Actúa como un estratega digital de élite y closer de ventas B2B. Tu objetivo ÚNICO es generar un mensaje rompehielo contundente que enviaremos a este prospecto.
      Deberás usar tu conocimiento de internet para inferir las debilidades y oportunidades de su nicho/industria específica.

      CONTEXTO ESTRATÉGICO: 
      - ${context || "Venta de soluciones digitales de alto impacto."}
      - El objetivo NO es vender directamente un producto, sino conseguir que el prospecto acceda a ver un "Demo MVP" (Producto Mínimo Viable) diseñado a medida para él. Para ello, necesitamos que complete un breve formulario web (nicoprompt.com).

      DATOS DEL CLIENTE:
      - Nombre: ${lead.name}
      - Industria/Nicho: ${lead.industry || "General"}
      - Website: ${lead.website || "No detectado"}
      - Reputación Google: ${lead.rating ? `${lead.rating} ★` : "Sin datos"} (${lead.reviewsCount || 0} reseñas)
      
      CANAL ELEGIDO: ${channel}
      
      ESTRATEGIA A APLICAR:
      1. Inicio: Saludo cercano y mención directa a algo de su negocio o industria (demuestra que investigaste).
      2. Dolor: Toca una fibra sensible. Ejemplo: Si no tiene web, pierde terreno frente a la competencia digital. Si tiene baja reputación, pierde ventas por desconfianza. Si no hay datos, enfatiza en cómo la competencia de su nicho se está modernizando con IA y software a medida.
      3. Propuesta/Valor: Ofrécele una solución gratuita inicial: "He pensado en armar un prototipo/Demo (MVP) sin costo para mostrarte cómo optimizar tus operaciones/ventas".
      4. Call to Action (CTA): El CTA DEBE ser invitarlo a responder unas breves preguntas en tu web para poder crearle el Demo. Ejemplo: "Solo necesito que respondas 5 preguntas aquí: nicoprompt.com, ¿te animas y te armo el demo?"

      REGLAS DE ORO:
      - Máximo 3 párrafos cortos (espectacularmente leíbles).
      - Añade 1 o 2 emojis estratégicos, no abuses.
      - Tono: Profesional, seguro, innovador, como un consultor top.
      - NO menciones que eres una IA, actúa en representación de "NicoPrompt".
      - Responde ÚNICAMENTE con el cuerpo exacto del mensaje que debo enviarle (sin comillas adicionales, sin saludos extra tuyos).
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
