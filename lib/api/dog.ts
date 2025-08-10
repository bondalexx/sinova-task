import { httpGet } from "./http";

export type DogBreedRaw = {
  id: number;
  name: string;
  bred_for?: string;
  breed_group?: string;
  life_span?: string;
  temperament?: string;
  origin?: string;
  reference_image_id?: string;
};

export type DogImageRaw = {
  id: string;
  url: string;
  breeds?: DogBreedRaw[];
};

export async function getDogBreedsRaw() {
  return httpGet<DogBreedRaw[]>({
    base: "dog",
    path: "/breeds",
  });
}

export async function getDogImagesByBreedRaw(breedId: number | string, limit = 6) {
  return httpGet<DogImageRaw[]>({
    base: "dog",
    path: "/images/search",
    searchParams: { breed_id: breedId, limit },
  });
}

export async function getRandomDogImagesRaw(limit = 12) {
  return httpGet<DogImageRaw[]>({
    base: "dog",
    path: "/images/search",
    searchParams: { limit, has_breeds: true, size: "med" },
  });
}