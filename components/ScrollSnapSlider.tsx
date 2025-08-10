"use client";
import Image from "next/image";
import { useRef } from "react";

export function ScrollSnapSlider({ images }: { images: string[] }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" });
  };

  if (images.length === 0) return null;

  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl border border-gray-100"
      >
        {images.map((url, i) => (
          <div key={url} className="relative aspect-[16/9] w-full shrink-0 snap-center">
            <Image src={url} alt={`slide-${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2">
        <button
          onClick={() => scrollBy(-1)}
          className="pointer-events-auto rounded-full border border-gray-200 bg-white/90 px-2 py-1 text-sm shadow-sm"
        >
          ←
        </button>
      </div>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <button
          onClick={() => scrollBy(1)}
          className="pointer-events-auto rounded-full border border-gray-200 bg-white/90 px-2 py-1 text-sm shadow-sm"
        >
          →
        </button>
      </div>
    </div>
  );
}
