import { NextRequest, NextResponse } from "next/server";
import { reorderPartners } from "@/lib/partners";
import { verifyAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { items } = await request.json();
    await reorderPartners(items);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reorder partners" },
      { status: 500 }
    );
  }
}
