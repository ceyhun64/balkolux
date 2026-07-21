// /api/upload/route.ts
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const folderNameInput = formData.get("folderName") as string | null;

    if (!file) {
      return NextResponse.json(
        { error: "Dosya bulunamadı. Lütfen bir dosya yükleyin." },
        { status: 400 }
      );
    }

    const path = await uploadImage(file, folderNameInput || "genel");

    return NextResponse.json({ path });
  } catch (err: any) {
    console.error("Dosya yükleme hatası:", err);
    return NextResponse.json(
      { error: err.message || "Yükleme başarısız" },
      { status: 500 }
    );
  }
}
