import React, { useEffect, useRef, useState } from "react";
import TechPreview from "@/shared/components/TechPreview";
import { techConfig, defaultBadgeClass, defaultBorderClass } from "@/lib/constants/tech-config";
import { getTechMetadata } from "@/lib/supabase/client";

type BadgeProps = {
  tech: string;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
  onDelete?: () => void;
  onRename?: (newName: string) => void;
};

const Badge: React.FC<BadgeProps> = ({
  tech,
  isActive,
  onOpen,
  onClose,
  onDelete,
  onRename,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadMetadata = async () => {
      const dbData = await getTechMetadata(tech);
      if (dbData) {
        setMetadata(dbData);
      } else {
        const fallback = techConfig[tech] || {
          color: defaultBadgeClass,
          borderColor: defaultBorderClass,
        };
        setMetadata({
          name: tech,
          color: fallback.color,
          border_color: fallback.borderColor || defaultBorderClass,
          url: fallback.url || "",
          description: fallback.description || "",
        });
      }
    };
    loadMetadata();
  }, [tech]);

  if (!metadata) return null;

  const colorClass = metadata.color || defaultBadgeClass;
  const borderClass = metadata.border_color || defaultBorderClass;

  const [bgClass, textClass] = colorClass.split(" ");

  const url = metadata.url || "";
  const description = metadata.description || "";
  const domain = url ? new URL(url).hostname.replace(/^www\./, "") : "";

  return (
    <>
      <div
        ref={badgeRef}
        onClick={onOpen}
        className={`
          relative px-3 py-0.5 rounded-full text-sm font-medium cursor-pointer
          transition-all duration-200 select-none whitespace-nowrap h-7 flex items-center
          ${colorClass} ${isActive ? "ring-2 ring-offset-2 ring-blue-500" : "hover:opacity-80"}
        `}
      >
        {tech}
      </div>

      {isActive && (
        <TechPreview
          tech={tech}
          url={url}
          description={description}
          domain={domain}
          isMobile={isMobile}
          show={isActive}
          onClose={onClose}
          onDelete={onDelete}
          onRename={onRename}
          anchorRef={badgeRef}
          badgeColorClass={bgClass}
          badgeTextColorClass={textClass}
          badgeBorderClass={borderClass}
        />
      )}
    </>
  );
};

export default Badge;