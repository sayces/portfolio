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

export function getProfilePhotoUrl(path: string = "profile_photo.webp") {
  const timestamp = Date.now();
  const { data } = supabase.storage.from("public-photos").getPublicUrl(path);
  return `${data.publicUrl}?v=${timestamp}`;
}

export const getTechMetadata = async (techName: string) => {
  const { data } = await supabase
    .from("tech_metadata")
    .select("*")
    .eq("name", techName)
    .maybeSingle();
  return data;
};

export const updateTechMetadata = async (
  techName: string,
  updates: Partial<{
    name: string;
    color: string;
    border_color: string;
    url: string;
    description: string;
  }>,
) => {
  const { error } = await supabase
    .from("tech_metadata")
    .update(updates)
    .eq("name", techName);
  return { error };
};

export const renameTechInStacks = async (oldName: string, newName: string) => {
  const tables = ["experience", "projects", "education"];

  for (const table of tables) {
    const { data: items } = await supabase
      .from(table)
      .select("id, tech_stack")
      .eq("site_content_id", 1);

    if (!items) continue;

    for (const item of items) {
      if (item.tech_stack?.includes(oldName)) {
        const newStack = item.tech_stack.map((tech: string) =>
          tech === oldName ? newName : tech,
        );
        await supabase
          .from(table)
          .update({ tech_stack: newStack })
          .eq("id", item.id);
      }
    }
  }
};

export const createTechMetadata = async (techName: string) => {
  const { data: existing } = await supabase
    .from("tech_metadata")
    .select("*")
    .eq("name", techName)
    .maybeSingle();

  if (existing) {
    return { data: existing, error: null };
  }

  const { data, error } = await supabase
    .from("tech_metadata")
    .insert({
      name: techName,
      color: "bg-gray-200 text-gray-700",
      border_color: "border-gray-600",
    })
    .select()
    .single();

  return { data, error };
};
