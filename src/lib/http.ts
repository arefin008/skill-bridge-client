import { env } from "@/env";
import { cookies } from "next/headers";

/**
 * Server-side fetch (auth via cookies)
 */
export async function serverFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();

  const res = await fetch(`${env.BACKEND_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieStore.toString(),
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}

/**
 * Client-side fetch (browser)
 */
export async function clientFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(await res.text());
  }

  return res.json();
}
