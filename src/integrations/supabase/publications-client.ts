// Separate Supabase client for the school publications feature.
// Lives in its own project (URL/anon key in VITE_PUBLICATIONS_SUPABASE_*)
// to avoid touching the Lovable-managed Supabase that powers AI chat.
//
// Anon (publishable) key is safe to ship to the browser.
// Service role key is NEVER referenced from src/ — only from
// scripts/sync-publications.mjs.

import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const url = import.meta.env.VITE_PUBLICATIONS_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_PUBLICATIONS_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  // Loud failure during development; in production this never trips
  // because Vite hard-fails on missing env vars at build time.
  // eslint-disable-next-line no-console
  console.error(
    "[publications-client] Missing VITE_PUBLICATIONS_SUPABASE_URL or " +
      "VITE_PUBLICATIONS_SUPABASE_ANON_KEY in .env"
  );
}

export const publicationsSupabase = createClient<Database>(
  url ?? "",
  anonKey ?? "",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

export const PUBLICATIONS_BUCKET = "school-publications";

export function publicationsPublicUrl(storagePath: string): string {
  if (!url) return "";
  return `${url.replace(/\/$/, "")}/storage/v1/object/public/${PUBLICATIONS_BUCKET}/${storagePath
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}
