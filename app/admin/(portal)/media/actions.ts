"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { cloudinary, cloudinaryConfigured } from "@/lib/cloudinary";
import { getUsedAssetUrls } from "@/lib/media-usage";

/**
 * Deletes assets no longer referenced by ANY content column — the safe way to
 * reclaim files dropped from editors. Shared assets are never touched.
 */
export async function cleanupUnusedAssets(): Promise<number> {
  const used = await getUsedAssetUrls();
  const assets = await db.mediaAsset.findMany();

  const orphans = assets.filter((asset) => !used.has(asset.url));
  if (orphans.length === 0) return 0;

  if (cloudinaryConfigured()) {
    await Promise.all(
      orphans.map((asset) =>
        cloudinary.uploader.destroy(asset.publicId).catch(() => undefined),
      ),
    );
  }
  await db.mediaAsset.deleteMany({
    where: { id: { in: orphans.map((a) => a.id) } },
  });

  revalidatePath("/admin/media");
  return orphans.length;
}
