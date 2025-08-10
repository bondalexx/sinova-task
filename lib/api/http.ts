type HttpMethod = "GET" | "POST";

type HttpOptions = {
  base: "cat" | "dog";
  path: string;
  method?: HttpMethod;
  searchParams?: Record<string, string | number | boolean | undefined>;
  revalidate?: number; 
};

const CAT_BASE = process.env.NEXT_PUBLIC_CAT_API_URL;
const DOG_BASE = process.env.NEXT_PUBLIC_DOG_API_URL;
const CAT_API_KEY = process.env.CAT_API_KEY;
const DOG_API_KEY = process.env.DOG_API_KEY;

function buildUrl(base: string, path: string, searchParams?: Record<string, any>): string {
  const url = new URL(base + (path.startsWith("/") ? path : `/${path}`));

  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function httpGet<T>(options: HttpOptions): Promise<T> {
  const { base, path, searchParams, revalidate = 3600 } = options;

  const baseUrl = base === "cat" ? CAT_BASE : DOG_BASE;
  const apiKey = base === "cat" ? CAT_API_KEY : DOG_API_KEY;

  if (!baseUrl) throw new Error(`Missing ${base.toUpperCase()} API base URL in .env`);

  const url = buildUrl(baseUrl, path, searchParams);

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (apiKey) {
    headers["x-api-key"] = apiKey;
  }

  const res = await fetch(url, {
    method: "GET",
    headers,
    next: { revalidate }, 
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error(`HTTP ${res.status} Error on ${url}: ${errText}`);
    throw new Error(`${base.toUpperCase()} API error ${res.status}: ${errText}`);
  }

  return res.json() as Promise<T>;
}