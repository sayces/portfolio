import React, { useState, useRef, useEffect } from "react";
import { techConfig, defaultBadgeClass } from "@/shared/tech-config";
import TechPreview from "@/shared/components/TechPreview";

interface BadgeProps {
  tech: string;
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const Badge: React.FC<BadgeProps> = ({ tech, isActive, onOpen, onClose }) => {
  const config = techConfig[tech] || { color: defaultBadgeClass };

  const classNames = {
    badge: `${config.color} text-sm px-3 py-1 rounded-full select-none cursor-pointer saturate-50 transition-all hover:scale-105 active:scale-95`,
    wrapper: "block relative",
  };

  const [isMobile, setIsMobile] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBadgeClick = (e: React.MouseEvent) => {
    e.preventDefault(); // предотвращаем переход по ссылке

    if (isActive) {
      onClose();
    } else {
      onOpen();
    }
  };

  const InnerElement = config.url ? (
    <a
      href={config.url}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames.badge}
      onClick={handleBadgeClick}
    >
      {tech}
    </a>
  ) : (
    <span className={classNames.badge} onClick={handleBadgeClick}>
      {tech}
    </span>
  );

  const description = config.description || "";
  const domain = config.url ? new URL(config.url).hostname : "";

  const colorClasses = config.color.trim().split(" ");
  const badgeBgClass = colorClasses.find((c) => c.startsWith("bg-")) || "";
  const badgeTextClass = colorClasses.find((c) => c.startsWith("text-")) || "";
  const badgeBorderClass = config.borderColor || "border-gray-600";

  return (
    <div ref={wrapperRef} className={classNames.wrapper}>
      {InnerElement}

      {config.url && (
        <TechPreview
          tech={tech}
          url={config.url}
          description={description}
          domain={domain}
          isMobile={isMobile}
          show={isActive}
          onClose={onClose}
          anchorRef={wrapperRef}
          previewRef={previewRef}
          badgeColorClass={badgeBgClass}
          badgeTextColorClass={badgeTextClass}
          badgeBorderClass={badgeBorderClass}
        />
      )}
    </div>
  );
};

export default Badge;
