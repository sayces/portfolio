import { useState, useEffect, useRef } from "react";
import Badge from "@/shared/components/Badge";

type ActivePreview = string | null;

type TechnologiesSectionProps = {
  technologies: string[];
};

export default function TechnologiesSection({
  technologies,
}: TechnologiesSectionProps) {
  const [activePreview, setActivePreview] = useState<ActivePreview>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const openPreview = (tech: string) => {
    setActivePreview(tech);
  };

  const closePreview = () => {
    setActivePreview(null);
  };

  // Закрытие по клику вне превью
  useEffect(() => {
    if (!activePreview) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Проверяем, что клик произошёл не внутри секции (там бейджи и превью)
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
        />
      ))}
    </div>
  );
}
