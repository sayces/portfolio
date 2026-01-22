import { useState, useEffect, useRef } from "react";
import Badge from "@/shared/components/Badge/Badge";
import { useAuth } from "@/shared/context/AuthContext";
import { createTechMetadata } from "@/lib/supabase/client";

type ActivePreview = string | null;

type TechnologiesSectionProps = {
  technologies: string[];
  onRemoveTech?: (tech: string) => void;
  onRenameTech?: (oldName: string, newName: string) => void;
  onAddTech?: (tech: string) => void;
  uniqueId?: string; // Добавляем уникальный ID для секции
};

export default function TechnologiesSection({
  technologies,
  onRemoveTech,
  onRenameTech,
  onAddTech,
  uniqueId = "",
}: TechnologiesSectionProps) {
  const [activePreview, setActivePreview] = useState<ActivePreview>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newTechName, setNewTechName] = useState("");
  const { isOwner } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const openPreview = (tech: string) => {
    setActivePreview(tech);
  };

  const closePreview = () => {
    setActivePreview(null);
  };

  useEffect(() => {
    if (!activePreview) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        sectionRef.current &&
        !sectionRef.current.contains(e.target as Node)
      ) {
        closePreview();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activePreview]);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAddTech = async () => {
    const trimmedName = newTechName.trim();
    if (!trimmedName) {
      setIsAdding(false);
      setNewTechName("");
      return;
    }

    if (technologies.includes(trimmedName)) {
      setIsAdding(false);
      setNewTechName("");
      return;
    }

    const { data, error } = await createTechMetadata(trimmedName);

    if (error) {
      console.error("Error creating tech metadata:", error);
    } else {
      console.log("Tech metadata created:", data);
    }

    if (onAddTech) {
      onAddTech(trimmedName);
    }

    setIsAdding(false);
    setNewTechName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTech();
    }
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewTechName("");
    }
  };

  return (
    <div ref={sectionRef} className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <Badge
          key={`${uniqueId}-${tech}-${index}`} // Уникальный ключ
          tech={tech}
          isActive={activePreview === tech}
          onOpen={() => openPreview(tech)}
          onClose={closePreview}
          onDelete={
            isOwner && onRemoveTech
              ? () => {
                  closePreview();
                  onRemoveTech(tech);
                }
              : undefined
          }
          onRename={
            isOwner && onRenameTech
              ? (newName: string) => {
                  onRenameTech(tech, newName);
                }
              : undefined
          }
        />
      ))}

      {isOwner && (
        <>
          {isAdding ? (
            <input
              ref={inputRef}
              type="text"
              value={newTechName}
              onChange={(e) => setNewTechName(e.target.value)}
              onBlur={handleAddTech}
              onKeyDown={handleKeyDown}
              placeholder="Technology name"
              className="px-3 py-0.5 rounded-full text-sm font-medium border-2 border-dashed border-gray-400 focus:outline-none focus:border-blue-500 bg-white text-gray-700 h-7"
            />
          ) : (
            <button
              onClick={() => setIsAdding(true)}
              className="px-3 py-0.5 rounded-full text-sm font-medium border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors bg-white text-gray-500 hover:text-gray-700 h-7 flex items-center cursor-pointer"
            >
              + Add tech
            </button>
          )}
        </>
      )}
    </div>
  );
}