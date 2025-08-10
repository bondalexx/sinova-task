"use client";
import { memo, useMemo } from "react";
import { BreedCard } from "./BreedCard";
import type { BreedCardData } from "@/lib/utils/types";

type Props = {
  items: BreedCardData[];
};

function BreedGridBase({ items }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((i, index) => (
        <BreedCard key={`${i.source}-${i.id}-${index}`} item={i} />
      ))}
    </div>
  );
}

export const BreedGrid = memo(BreedGridBase);