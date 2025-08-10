import { getRandomBreedCards } from "@/lib/services/breeds";
import { getAllBreedNames } from "@/lib/services/breeds";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import HomeClient from "./home-client";

export default async function Page() {
 const cards = await getRandomBreedCards(9);
 const allBreeds = await getAllBreedNames();

  return (
     <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Explore Pet Breeds</h1>
        <p className="mt-1 text-sm text-gray-500">Cats & Dogs — quick search and details</p>
      </div>

      <SearchAutocomplete allBreeds={allBreeds} />

      <section className="">
        <HomeClient cards={cards} />
      </section>
    </div>
  );
}