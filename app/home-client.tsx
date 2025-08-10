"use client";

import { useDeferredValue, useMemo, useState } from "react";
import type { BreedCardData } from "@/lib/utils/types";
import { BreedGrid } from "@/components/BreedGrid";

function Spinner({ className = "h-4 w-4" }) {
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 ${className}`} />
  );
}

export default function HomeClient({ cards }: { cards: BreedCardData[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);


  return (
    <section className="space-y-5">
      <BreedGrid items={cards}  />
    </section>
  );
}