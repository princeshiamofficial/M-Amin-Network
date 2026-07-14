import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        { error: "Invalid file type. Only PDF documents are allowed." },
        { status: 400 }
      );
    }
    if (file.size > 15 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum size allowed is 15 MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const destDir = path.join(process.cwd(), "public");
    await mkdir(destDir, { recursive: true });
    
    // Save as exactly btrc-tariff.pdf
    await writeFile(path.join(destDir, "btrc-tariff.pdf"), buffer);

    return NextResponse.json({ url: "/btrc-tariff.pdf" });
  } catch (err) {
    console.error("BTRC PDF upload error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
