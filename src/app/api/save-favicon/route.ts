import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const { name, base64 } = await request.json();
    if (!name || !base64) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    // Remove metadata prefix (e.g. "data:image/png;base64,")
    const cleanBase64 = base64.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    const filePath = path.join(process.cwd(), "public", name);
    fs.writeFileSync(filePath, buffer);
    console.log(`Saved favicon to ${filePath}`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error saving favicon:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
