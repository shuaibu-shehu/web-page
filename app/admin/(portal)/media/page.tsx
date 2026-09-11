import MediaLibrary from "@/components/admin/media-library";
import { db } from "@/lib/db";
import { getUsedAssetUrls } from "@/lib/media-usage";

export const metadata = { title: "Media Library — CodeTherapy Admin" };

export default async function AdminMediaPage() {
  const [assets, usedUrls] = await Promise.all([
    db.mediaAsset.findMany({ orderBy: { createdAt: "desc" } }),
    getUsedAssetUrls(),
  ]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Media Library</h1>
        {/* Upload button lives in the client MediaLibrary (file inputs with
            onChange handlers cannot render from this server component). */}
      </header>
      <MediaLibrary assets={assets.map((a) => ({ ...a, used: usedUrls.has(a.url) }))} />
    </div>
  );
}
