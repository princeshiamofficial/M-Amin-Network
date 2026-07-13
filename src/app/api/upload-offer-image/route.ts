import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only JPG, PNG, WEBP, GIF allowed." },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitise filename
    const ext = path.extname(file.name).toLowerCase() || ".jpg";
    const safeName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${ext}`;

    const uploadDir = path.join(process.cwd(), "public", "uploads", "offers");
    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, safeName), buffer);

    return NextResponse.json({ url: `/uploads/offers/${safeName}` });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
