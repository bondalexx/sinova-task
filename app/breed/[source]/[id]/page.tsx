import { getBreedDetails } from "@/lib/services/breeds";
import Image from "next/image";
import { GalleryGridWithModal } from "@/components/GalleryGridWithModal";

type RouteParams = { source: "cat" | "dog"; id: string };
export const revalidate = 3600;

export default async function BreedPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { source, id } = await params;
  if (source !== "cat" && source !== "dog") throw new Error(`Invalid source: ${source}`);

  const { breed, gallery } = await getBreedDetails(source, id);

  return (
    <div className="space-y-8">
   
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wider text-gray-400">{breed.source}</div>
        <h1 className="text-3xl font-semibold tracking-tight">{breed.name}</h1>
      </div>

   
      {breed.coverImage && (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
          <Image src={breed.coverImage} alt={breed.name} fill className="object-cover" />
        </div>
      )}

    
      <div className="grid gap-8 lg:grid-cols-12">
    
        <div className="space-y-4 lg:col-span-7">
          {breed.description && (
            <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="mb-2 text-lg font-semibold">About</h2>
              <p className="leading-relaxed text-gray-700">{breed.description}</p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {breed.temperament && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-gray-400">Temperament</div>
                <div className="mt-1 font-medium text-gray-900">{breed.temperament}</div>
              </div>
            )}
            {breed.origin && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-gray-400">Origin</div>
                <div className="mt-1 font-medium text-gray-900">{breed.origin}</div>
              </div>
            )}
            {breed.lifeSpan && (
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="text-xs uppercase tracking-wider text-gray-400">Life span</div>
                <div className="mt-1 font-medium text-gray-900">{breed.lifeSpan}</div>
              </div>
            )}
            {breed.wikiUrl && (
              <a
                href={breed.wikiUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="text-xs uppercase tracking-wider text-gray-400">More</div>
                <div className="mt-1 font-medium text-blue-600 underline">Wikipedia</div>
              </a>
            )}
          </div>
        </div>

       
        <div className="lg:col-span-5">
          <GalleryGridWithModal images={gallery} title={`${breed.name} gallery`} />
        </div>
      </div>
    </div>
  );
}