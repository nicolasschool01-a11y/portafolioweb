import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterKey = process.env.ADMIN_MASTER_KEY;

    if (!masterKey || authHeader !== `Bearer ${masterKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status, adminNotes } = body;

    const updatedLead = await db.lead.update({
      where: { id: params.id },
      data: {
        status: status || undefined,
        adminNotes: adminNotes || undefined,
      },
    });

    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Lead update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authHeader = request.headers.get("authorization");
    const masterKey = process.env.ADMIN_MASTER_KEY;

    if (!masterKey || authHeader !== `Bearer ${masterKey}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await db.lead.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Lead delete error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
