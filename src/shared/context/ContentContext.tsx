import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfilePhotoUrl, supabase } from "@/lib/supabase/client";
import { useAuth } from "@/shared/context/AuthContext";

export interface ContentItem {
  id?: number;
  site_content_id?: number;
  section: "experience" | "projects" | "education";
  order_num: number;
  date_str: string;
  title: string;
  company?: string | null;
  location?: string | null;
  href?: string | null;
  description?: string | null;
  activities: string[];
  tech_stack: string[];
  created_at?: string;
  updated_at?: string;
}

export type ExperienceItem = ContentItem;
export type ProjectItem = ContentItem;
export type EducationItem = ContentItem;

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
  updateContentItem: (
    section: "experience" | "projects" | "education",
    idx: number,
    updates: Partial<ContentItem>,
  ) => Promise<void>;
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
        const [contentRes, itemsRes] = await Promise.all([
          supabase.from("site_content").select("*").eq("id", 1).maybeSingle(),
          supabase
            .from("content_items")
            .select("*")
            .eq("site_content_id", 1)
            .order("order_num", { ascending: true }),
        ]);

        console.log("itemsRes", itemsRes);

        if (itemsRes.error) throw itemsRes.error;

        const siteData = contentRes.data ?? {
          name: defaultContent.name,
          position: defaultContent.position,
          about: defaultContent.about,
          email: defaultContent.email,
          phone: defaultContent.phone,
          photo_src: defaultContent.photo_src,
        };

        const items = itemsRes.data || [];

        setContent({
          ...siteData,
          photo_src: getProfilePhotoUrl(siteData.photo_src),
          experience: items.filter((item) => item.section === "experience"),
          projects: items.filter((item) => item.section === "projects"),
          education: items.filter((item) => item.section === "education"),
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

  // Добавьте в ContentContext.tsx в функцию updateNested
  const updateNested = async (path: string, value: any) => {
    // Обновляем локальное состояние
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

    // Синхронизация с БД для content_items
    const sectionMatch = path.match(
      /^(experience|projects|education)\[(\d+)\]\.(\w+)(?:\[(\d+)\])?$/,
    );

    if (sectionMatch) {
      const [, section, idxStr, field, activityIdxStr] = sectionMatch;
      const idx = parseInt(idxStr, 10);
      const item =
        content[section as "experience" | "projects" | "education"][idx];

      if (!item?.id) return;

      // Если это обновление activity
      if (field === "activities" && activityIdxStr !== undefined) {
        const activityIdx = parseInt(activityIdxStr, 10);
        const newActivities = [...item.activities];
        newActivities[activityIdx] = value;

        const { error } = await supabase
          .from("content_items")
          .update({ activities: newActivities })
          .eq("id", item.id);

        if (error) console.error("Error updating activity:", error);
      }
      // Если это обновление description или другого поля
      else {
        const { error } = await supabase
          .from("content_items")
          .update({ [field]: value })
          .eq("id", item.id);

        if (error) console.error(`Error updating ${field}:`, error);
      }
    }
  };

  // Новая функция для обновления content_item в БД
  const updateContentItem = async (
    section: "experience" | "projects" | "education",
    idx: number,
    updates: Partial<ContentItem>,
  ) => {
    const item = content[section][idx];
    if (!item?.id) return;

    // Обновляем локально
    setContent((prev) => {
      const newContent = { ...prev };
      newContent[section] = [...newContent[section]];
      newContent[section][idx] = { ...newContent[section][idx], ...updates };
      return newContent;
    });

    // Обновляем в БД
    const { error } = await supabase
      .from("content_items")
      .update(updates)
      .eq("id", item.id);

    if (error) {
      console.error(`Error updating content_item:`, error);
    }
  };

  return (
    <ContentContext.Provider
      value={{
        content,
        updateContent,
        updateNested,
        updateContentItem,
        isOwner,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
