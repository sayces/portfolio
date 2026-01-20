import React, { createContext, useContext, useEffect, useState } from "react";
import { getProfilePhotoUrl, supabase } from "@/lib/supabase/client";

type Content = {
  name: string;
  position: string;
  about: string;
  email: string;
  phone: string;
  photo_src: string;
};

type ContentContextType = {
  content: Content;
  updateContent: (newContent: Partial<Content>) => void;
  saveContent: () => Promise<void>;
  isEditing: boolean;
  toggleEditing: () => void;
};

const ContentContext = createContext<ContentContextType>(
  {} as ContentContextType,
);

const defaultContent: Content = {
  name: "Sasha Makarov",
  position: "Frontend/Fullstack developer",
  about:
    "A creative web developer with a strong passion for coding with experience in a commercial project. I specialize in creating clean, responsive interfaces and strong functionality using React + TypeScript. I'm looking for a part-time job or a junior+ position to grow in the team.",
  email: "sayces@mail.ru",
  phone: "+79997174837",
  photo_src: getProfilePhotoUrl("avatar/profile_photo.jpg"),
};

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [content, setContent] = useState<Content>(defaultContent);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("*")
      .eq("id", 1)
      .single()
      .then(({ data }) => {
        if (data) {
          setContent({
            ...data,
            photo_src:
              data.photo_src ||
              getProfilePhotoUrl("avatars/profile_photo.webp"),
          });
        }
      });
  }, []);

  const updateContent = (patch: Partial<Content>) => {
    setContent((prev) => ({ ...prev, ...patch }));
  };

  const saveContent = async () => {
    const { error } = await supabase
      .from("site_content")
      .update(content)
      .eq("id", 1);
    if (error) alert("Ошибка сохранения");
    else alert("Сохранено!");
  };

  const toggleEditing = () => setIsEditing((v) => !v);

  return (
    <ContentContext.Provider
      value={{ content, updateContent, saveContent, isEditing, toggleEditing }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => useContext(ContentContext);
