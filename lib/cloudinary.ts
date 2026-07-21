import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Sunucu içinden (route handler'lardan) doğrudan çağrılır; kendi API'sine
// HTTP isteği atmaz. Self-fetch (baseUrl + fetch("/api/upload")) production'da
// apex -> www yönlendirmesine takılıp multipart body'nin kaybolmasına yol
// açıyordu, ürün/blog kaydı görsel olmadan sessizce oluşuyordu.
export async function uploadImage(
  file: File,
  folderName: string = "genel"
): Promise<string> {
  const safeFolder =
    folderName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "_")
      .replace(/[^a-z0-9_]/g, "") || "genel";

  const buffer = Buffer.from(await file.arrayBuffer());

  const uploadResult = await new Promise<any>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: `products/${safeFolder}`,
        resource_type: "image",
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });

  return uploadResult.secure_url as string;
}
