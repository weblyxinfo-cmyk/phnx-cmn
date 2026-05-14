import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { verifyAuth } from "@/lib/auth";

const ALLOWED_MIME = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/svg+xml",
]);
const MAX_BYTES = 500_000;

function safeBaseName(name: string): string {
  const base = name.split(/[\\/]/).pop() ?? "upload";
  return base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80) || "upload";
}

export async function POST(request: NextRequest) {
  if (!(await verifyAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    if (!ALLOWED_MIME.has(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type" },
        { status: 415 }
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `File too large (max ${MAX_BYTES} B)` },
        { status: 413 }
      );
    }

    const blob = await put(safeBaseName(file.name), file, {
      access: "public",
      addRandomSuffix: true,
      contentType: file.type,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("upload POST", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
