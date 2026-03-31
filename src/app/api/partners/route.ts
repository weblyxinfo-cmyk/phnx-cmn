import { NextRequest, NextResponse } from "next/server";
import { getActivePartners, createPartner } from "@/lib/partners";
import { verifyAuth } from "@/lib/auth";

export async function GET() {
  try {
    const data = await getActivePartners();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch partners" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    const result = await createPartner(body);
    return NextResponse.json(result[0], { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create partner" },
      { status: 500 }
    );
  }
}
