"use client";

import Image from "next/image";
import Link from "next/link";
import { memo, useState } from "react";
import type { BreedCardData } from "@/lib/utils/types";
import { Spinner } from "./ui/Spinner";

type Props = { item: BreedCardData };

function BreedCardBase({ item }: Props) {
  const [isNavigating, setIsNavigating] = useState(false);

  return (
    <div className="group relative">
      <Link
        href={`/breed/${item.source}/${item.id}`}
        onClick={() => setIsNavigating(true)}
        className="block overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition
                   hover:shadow-lg focus-visible:ring-2 focus-visible:ring-gray-900"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-105"
            priority={false}
          />
        
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-gray-400">{item.source}</div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
          </div>
          <div className="rounded-full border border-gray-200 px-2 py-0.5 text-xs text-gray-500 opacity-0 transition group-hover:opacity-100">
            View
          </div>
        </div>
      </Link>

      
      <div className="pointer-events-none absolute inset-0 rounded-2xl transition group-hover:scale-[1.02]" />

     
      {isNavigating && (
        <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/60 backdrop-blur">
          <Spinner className="h-6 w-6" />
        </div>
      )}
    </div>
  );
}

export const BreedCard = memo(BreedCardBase);