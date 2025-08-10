"use client";

import { memo, useEffect, useMemo, useRef, useState, useDeferredValue } from "react";
import Link from "next/link";
import { Spinner } from "./ui/Spinner";

type BreedItem = { id: string; name: string; source: "cat" | "dog" };
type Props = { allBreeds?: BreedItem[]; useServerSearch?: boolean };

function SearchAutocompleteBase({ allBreeds = [], useServerSearch = false }: Props) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [results, setResults] = useState<BreedItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    const q = deferred.trim().toLowerCase();
    if (!q) {
      setResults([]);
      setOpen(false);
      setLoading(false);
      return;
    }

    if (!useServerSearch) {
      const list = allBreeds.filter(b => b.name.toLowerCase().includes(q)).slice(0, 8);
      setResults(list);
      setOpen(true);
      setLoading(false);
      return;
    }

    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        const data = (await res.json()) as BreedItem[];
        setResults(data.slice(0, 8));
        setOpen(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [deferred, useServerSearch, allBreeds]);

  return (
    <div className="relative mx-auto w-full max-w-xl" ref={boxRef}>
      <div className="group relative flex items-center rounded-xl border border-gray-200 bg-white shadow-sm focus-within:ring-2 focus-within:ring-gray-900">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => query && setOpen(true)}
          placeholder="Search breeds…"
          className="w-full rounded-xl bg-transparent px-4 py-2.5 outline-none placeholder:text-gray-400"
          aria-label="Search breeds"
        />
        <div className="pr-3">
          {loading ? <Spinner /> : <span className="text-gray-400 text-sm px-2">⌘K</span>}
        </div>
      </div>

      <div
        className={`absolute z-20 mt-2 w-full origin-top rounded-xl border border-gray-200 bg-white shadow-lg transition
          ${open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
        role="listbox"
        aria-expanded={open}
      >
        {results.length === 0 && query ? (
          <div className="px-4 py-3 text-sm text-gray-500">No matches found.</div>
        ) : (
          results.map(b => (
            <Link
              key={`${b.source}-${b.id}`}
              href={`/breed/${b.source}/${b.id}`}
              className="block px-4 py-2.5 text-sm hover:bg-gray-50"
              onClick={() => setOpen(false)}
              role="option"
            >
              <span className="font-medium">{b.name}</span>{" "}
              <span className="text-xs text-gray-400">({b.source})</span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export const SearchAutocomplete = memo(SearchAutocompleteBase);