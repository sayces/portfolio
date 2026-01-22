import { useState, useEffect, useRef } from "react";
import Badge from "@/shared/components/Badge/Badge";
import { useAuth } from "@/shared/context/AuthContext";

type ActivePreview = string | null;

type TechnologiesSectionProps = {
  technologies: string[];
  onRemoveTech?: (tech: string) => void;
  onRenameTech?: (oldName: string, newName: string) => void;
};

export default function TechnologiesSection({
  technologies,
  onRemoveTech,
  onRenameTech,
}: TechnologiesSectionProps) {
  const [activePreview, setActivePreview] = useState<ActivePreview>(null);
  const { isOwner } = useAuth();
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={sectionRef} className="flex flex-wrap gap-2">
      {technologies.map((tech) => (
        <Badge
          key={tech}
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
    </div>
  );
}