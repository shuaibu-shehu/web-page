import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { cloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { getSession } from "@/lib/auth";

/**
 * Media upload — multipart POST with a `file` field.
 * Uploads to Cloudinary, stores only the URL in MediaAsset.
 * Requires an admin session (middleware covers /admin, not /api — check here).
 */
export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!cloudinaryConfigured()) {
    return NextResponse.json(
      { error: "Cloudinary is not configured. Set CLOUDINARY_* in .env." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const isVideo = file.type.startsWith("video/");
  const isDoc =
    !file.type.startsWith("image/") && !isVideo;

  try {
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      format: string;
      bytes: number;
      width?: number;
      height?: number;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "codetherapy-cms",
          resource_type: isVideo ? "video" : "auto",
        },
        (error, res) => (error ? reject(error) : resolve(res as never)),
      );
      stream.end(buffer);
    });

    const asset = await db.mediaAsset.create({
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        type: isVideo ? "video" : isDoc ? "document" : "image",
        dimensions:
          result.width && result.height ? `${result.width} × ${result.height} px` : null,
        uploadedBy: session.name,
      },
    });

    return NextResponse.json({ asset }, { status: 201 });
  } catch (e) {
    console.error("Cloudinary upload failed:", e);
    return NextResponse.json(
      { error: "Upload failed — check the file and Cloudinary credentials." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json().catch(() => ({ id: null }));
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const asset = await db.mediaAsset.findUnique({ where: { id } });
  if (!asset) return NextResponse.json({ error: "Not found." }, { status: 404 });

  if (cloudinaryConfigured()) {
    await cloudinary.uploader.destroy(asset.publicId).catch(() => undefined);
  }
  await db.mediaAsset.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
