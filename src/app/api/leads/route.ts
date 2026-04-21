import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    } = body;

    // Required fields: name, email, projectType
    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and projectType are required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const lead = await db.lead.create({
      data: {
        name,
        email,
        phone: phone || null,
        whatsapp: whatsapp || null,
        company: company || null,
        projectType,
        problemSolved: problemSolved || null,
        targetUsers: targetUsers || null,
        designStatus: designStatus || null,
        timeline: timeline || null,
        budget: budget || "",
        contentNeeds: contentNeeds ? JSON.stringify(contentNeeds) : null,
        demoGoal: demoGoal || null,
        extraFeatures: extraFeatures ? JSON.stringify(extraFeatures) : null,
        description: description || null,
        status: "new",
      },
    });

    return NextResponse.json(
      { success: true, id: lead.id },
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

export async function GET() {
  try {
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
