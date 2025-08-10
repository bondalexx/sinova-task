import { getRandomCatImagesRaw,getCatBreedsRaw,getCatImagesByBreedRaw } from "../api/cat";
import { getRandomDogImagesRaw,getDogBreedsRaw,getDogImagesByBreedRaw } from "../api/dog";
import type { BreedCardData,Breed } from "../utils/types";
export async function getRandomBreedCards(limitPerKind = 6): Promise<BreedCardData[]> {
  const [catImgs, dogImgs] = await Promise.all([
    getRandomCatImagesRaw(limitPerKind),
    getRandomDogImagesRaw(limitPerKind),
  ]);

  const catCards: BreedCardData[] =
    catImgs
      .filter((img) => img.breeds?.[0])
      .map((img) => {
        const b = img.breeds![0];
        return {
          id: b.id,
          name: b.name,
          image: img.url,
          source: "cat",
        };
      });

  const dogCards: BreedCardData[] =
    dogImgs
      .filter((img) => img.breeds?.[0])
      .map((img) => {
        const b = img.breeds![0];
        return {
          id: String(b.id),
          name: b.name,
          image: img.url,
          source: "dog",
        };
      });

  return [...catCards, ...dogCards];
}


export async function getAllBreedNames(): Promise<
  { id: string; name: string; source: "cat" | "dog" }[]
> {
  const [cats, dogs] = await Promise.all([getCatBreedsRaw(), getDogBreedsRaw()]);

  const catNames = cats.map((cat) => ({
    id: cat.id,
    name: cat.name,
    source: "cat" as const,
  }));

  const dogNames = dogs.map((dog) => ({
    id: String(dog.id),
    name: dog.name,
    source: "dog" as const,
  }));

  return [...catNames, ...dogNames].sort((a, b) => a.name.localeCompare(b.name));
}


export async function getBreedDetails(source: "cat" | "dog", id: string): Promise<{
  breed: Breed;
  gallery: string[];
}> {
  if (source === "cat") {
    const [allBreeds, images] = await Promise.all([
      getCatBreedsRaw(),
      getCatImagesByBreedRaw(id, 10),
    ]);

    const raw = allBreeds.find((b) => b.id === id);
    if (!raw) throw new Error(`Cat breed with ID "${id}" not found.`);

    const gallery = images.map((img) => img.url);

    const breed: Breed = {
      id: raw.id,
      name: raw.name,
      source: "cat",
      description: raw.description,
      temperament: raw.temperament,
      origin: raw.origin,
      lifeSpan: raw.life_span,
      wikiUrl: raw.wikipedia_url,
      coverImage: gallery[0],
    };

    return { breed, gallery };
  }

  if (source === "dog") {
    const [allBreeds, images] = await Promise.all([
      getDogBreedsRaw(),
      getDogImagesByBreedRaw(id, 10),
    ]);

    const raw = allBreeds.find((b) => String(b.id) === id);
    if (!raw) throw new Error(`Dog breed with ID "${id}" not found.`);

    const gallery = images.map((img) => img.url);

    const breed: Breed = {
      id: String(raw.id),
      name: raw.name,
      source: "dog",
      description: raw.bred_for ?? "",
      temperament: raw.temperament,
      origin: raw.origin,
      lifeSpan: raw.life_span,
      wikiUrl: undefined,
      coverImage: gallery[0],
    };

    return { breed, gallery };
  }

  throw new Error(`Unsupported source: ${source}`);
}