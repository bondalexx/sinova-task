export type Source = "cat" | "dog";

export type Breed = {
  id: string;           
  name: string;
  source: Source;
  description?: string;
  temperament?: string;
  lifeSpan?: string;
  origin?: string;
  wikiUrl?: string;
  coverImage?: string; 
};

export type BreedCardData = {
  id: string;
  name: string;
  image: string;
  source: Source;
};