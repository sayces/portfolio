import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfilePhotoUrl, supabase } from "@/lib/supabase/client";
import { useAuth } from "@/shared/context/AuthContext";

export interface ExperienceItem {
  id?: number;
  order_num: number;
  date_str: string;
  title: string;
  company?: string;
  location?: string;
  href?: string;
  description?: string;
  activities: string[];
  tech_stack: string[];
}

export interface ProjectItem {
  id?: number;
  order_num: number;
  date_str: string;
  title: string;
  href: string;
  description?: string;
  tech_stack: string[];
}

export interface EducationItem {
  id?: number;
  order_num: number;
  date_str: string;
  title: string;
  location?: string;
  href?: string;
  description?: string;
  tech_stack: string[];
}

export interface Content {
  name: string;
  position: string;
  about: string;
  email: string;
  phone: string;
  photo_src: string;
  experience: ExperienceItem[];
  projects: ProjectItem[];
  education: EducationItem[];
}

type ContentContextType = {
  content: Content;
  updateContent: (patch: Partial<Content>) => void;
  updateNested: (path: string, value: any) => Promise<void>;
  isOwner: boolean;
};

const ContentContext = createContext<ContentContextType>(
  {} as ContentContextType,
);

const defaultContent: Content = {
  name: "",
  position: "",
  about: "",
  email: "",
  phone: "",
  photo_src: getProfilePhotoUrl("profile_photo.webp"),
  experience: [],
  projects: [],
  education: [],
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<Content>(defaultContent);
  const { isOwner } = useAuth();

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [contentRes, expRes, projRes, eduRes] = await Promise.all([
          supabase.from("site_content").select("*").eq("id", 1).maybeSingle(),
          supabase
            .from("experience")
            .select("*")
            .eq("site_content_id", 1)
            .order("order_num", { ascending: true }),
          supabase
            .from("projects")
            .select("*")
            .eq("site_content_id", 1)
            .order("order_num", { ascending: true }),
          supabase
            .from("education")
            .select("*")
            .eq("site_content_id", 1)
            .order("order_num", { ascending: true }),
        ]);

        if (expRes.error || projRes.error || eduRes.error)
          throw new Error("Load error");

        const siteData = contentRes.data ?? {
          name: defaultContent.name,
          position: defaultContent.position,
          about: defaultContent.about,
          email: defaultContent.email,
          phone: defaultContent.phone,
          photo_src: defaultContent.photo_src,
        };

        setContent({
          ...siteData,
          photo_src: `${getProfilePhotoUrl(siteData.photo_src)}?v=${Date.now()}`,
          experience: expRes.data || [],
          projects: projRes.data || [],
          education: eduRes.data || [],
        });
      } catch (err) {
        console.error("Failed to load content:", err);
      }
    };

    loadAll();
  }, []);

  const updateContent = (patch: Partial<Content>) => {
    setContent((prev) => ({ ...prev, ...patch }));
  };

  const updateNested = async (path: string, value: any) => {
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev));
      const parts = path.split(".");
      let current: any = newContent;

      for (let i = 0; i < parts.length - 1; i++) {
        const part = parts[i];
        const match = part.match(/(\w+)\[(\d+)\]/);
        if (match) {
          const key = match[1];
          const idx = parseInt(match[2], 10);
          current = current[key] = current[key] || [];
          current = current[idx] = current[idx] || {};
        } else {
          current = current[part] = current[part] || {};
        }
      }

      const last = parts[parts.length - 1];
      const lastMatch = last.match(/(\w+)\[(\d+)\]/);
      if (lastMatch) {
        const key = lastMatch[1];
        const idx = parseInt(lastMatch[2], 10);
        current[key][idx] = value;
      } else {
        current[last] = value;
      }

      return newContent;
    });

    if (!isOwner) return;

    try {
      const [section, ...rest] = path.split(".");
      const fieldPath = rest.join(".");

      if (
        ["name", "position", "about", "email", "phone", "photo_src"].includes(
          section,
        )
      ) {
        await supabase
          .from("site_content")
          .update({ [section]: value })
          .eq("id", 1);
      } else if (["experience", "projects", "education"].includes(section)) {
        const table = section;
        const match = fieldPath.match(/^(\d+)\.(.+)$/);
        if (!match) return;

        const [, indexStr, fieldName] = match;
        const index = parseInt(indexStr, 10);

        await supabase
          .from(table)
          .update({ [fieldName]: value })
          .eq("site_content_id", 1)
          .eq("order_num", index);
      }
    } catch (err) {
      console.error("Auto-save failed for path:", path, err);
    }
  };

  return (
    <ContentContext.Provider
      value={{ content, updateContent, updateNested, isOwner }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
