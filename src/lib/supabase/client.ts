import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: "pkce",
    persistSession: true,
    storageKey: "supabase.auth.token",
  },
  global: {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      apikey: import.meta.env.VITE_SUPABASE_ANON_KEY!,
    },
  },
});

export function getRedirectTo() {
  const isDev = import.meta.env.DEV;
  return isDev
    ? "http://localhost:5173/portfolio/callback"
    : `${window.location.origin}/portfolio/callback`;
}

export async function signInWithProvider(provider: string) {
  const redirectTo = getRedirectTo();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: provider as any,
    options: {
      redirectTo,
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function getProfilePhotoUrl(path: string = "avatar/profile_photo.jpg") {
  const timestamp = Date.now();
  const { data } = supabase.storage.from("public-assets").getPublicUrl(path);
  return `${data.publicUrl}?v=${timestamp}`;
}
