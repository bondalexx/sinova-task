import { httpGet } from "./http";

export type CatBreedRaw = {
  id: string;
  name: string;
  origin?: string;
  temperament?: string;
  life_span?: string;
  description?: string;
  wikipedia_url?: string;
};

export type CatImageRaw = {
  id: string;
  url: string;
  breeds?: CatBreedRaw[];
};

export async function getCatBreedsRaw() {
  return httpGet<CatBreedRaw[]>({
    base: "cat",
    path: "/breeds",
  });
}

export async function getCatImagesByBreedRaw(breedId: string, limit = 6) {
  return httpGet<CatImageRaw[]>({
    base: "cat",
    path: "/images/search",
    searchParams: { breed_id: breedId, limit },
  });
}

export async function getRandomCatImagesRaw(limit = 12) {
  return httpGet<CatImageRaw[]>({
    base: "cat",
    path: "/images/search",
    searchParams: { limit, has_breeds: true, size: "med" },
  });
}