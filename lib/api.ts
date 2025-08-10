import { Breed } from '@/lib/utils/types';
export async function getDogBreeds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOG_API_URL}/breeds`, {
    headers: { 'x-api-key': process.env.DOG_API_KEY! },
    cache: 'force-cache',
  });
  return res.json();
}

export async function getCatBreeds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CAT_API_URL}/breeds`, {
    headers: { 'x-api-key': process.env.CAT_API_KEY! },
    cache: 'force-cache',
  });
  return res.json();
}

export async function getBreedImages(breedId: string, type: 'dog' | 'cat') {
  const base = type === 'dog' ? process.env.NEXT_PUBLIC_DOG_API_URL : process.env.NEXT_PUBLIC_CAT_API_URL;
  const key = type === 'dog' ? process.env.DOG_API_KEY! : process.env.CAT_API_KEY!;
  const res = await fetch(`${base}/images/search?breed_id=${breedId}&limit=10`, {
    headers: { 'x-api-key': key },
    cache: 'no-store',
  });
  return res.json();
}

export async function getRandomBreeds(): Promise<{ type: 'dog' | 'cat'; breed: Breed }[]> {
  const [dogs, cats] = await Promise.all([getDogBreeds(), getCatBreeds()]);
  const randomDogs = dogs.sort(() => 0.5 - Math.random()).slice(0, 5);
  const randomCats = cats.sort(() => 0.5 - Math.random()).slice(0, 5);

  return [
    ...randomDogs.map((breed: Breed) => ({ type: 'dog' as const, breed })),
    ...randomCats.map((breed: Breed) => ({ type: 'cat' as const, breed })),
  ];
}