"use client";

import Image from "next/image";
import { useState } from "react";

export function GalleryGridWithModal({ images, title }: { images: string[]; title?: string }) {
  const [open, setOpen] = useState(false);
  const preview = images.slice(0, 4);

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title ?? "Gallery"}</h2>
        {images.length > 4 && (
          <button
            onClick={() => setOpen(true)}
            className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-50"
          >
            View all
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {preview.map(url => (
          <div key={url} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
            <Image src={url} alt="gallery" fill className="object-cover transition hover:scale-105" />
          </div>
        ))}
        {preview.length === 0 && <div className="text-sm text-gray-500">No images available.</div>}
      </div>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="max-h-[85vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{title ?? "Gallery"}</h3>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 transition hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {images.map(url => (
                <div key={url} className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100">
                  <Image src={url} alt="gallery-full" fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
