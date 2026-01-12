import React, { useState, useRef, useEffect } from "react";
import { techConfig, defaultBadgeClass } from "@/shared/tech-config";
import TechPreview from "@/shared/components/TechPreview";

interface BadgeProps {
  tech: string;
}

const Badge: React.FC<BadgeProps> = ({ tech }) => {
  const config = techConfig[tech] || { color: defaultBadgeClass };

  const classNames = {
    badge: `${config.color} text-sm px-3 py-1 rounded-full hover:opacity-80 transition-opacity select-none cursor-pointer saturate-40`,
    wrapper: "relative inline-block",
  };

  const [showPreview, setShowPreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const openPreview = () => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    setShowPreview(true);
  };

  const delayedClose = () => {
    leaveTimeout.current = setTimeout(() => setShowPreview(false), 300);
  };

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(openPreview, 500);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    const related = e.relatedTarget as Node | null;
    if (!previewRef.current?.contains(related)) {
      delayedClose();
    }
  };

  const handleTouchStart = () => {
    hoverTimeout.current = setTimeout(openPreview, 500);
  };

  const handleTouchEnd = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isMobile || showPreview) e.preventDefault();
  };

  if (!config.url) return <span className={classNames.badge}>{tech}</span>;

  const description = config.description || "";
  const domain = new URL(config.url).hostname;

  const colorClasses = config.color.trim().split(" ");
  const badgeBgClass = colorClasses.find((c: string) => c.startsWith("bg-")) || "";
  const badgeTextClass = colorClasses.find((c: string) => c.startsWith("text-")) || "";
  const badgeBorderClass = config.borderColor || "border-gray-600";

  return (
    <div
      ref={wrapperRef}
      className={classNames.wrapper}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={config.url}
        target="_blank"
        rel="noopener noreferrer"
        className={classNames.badge}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {tech}
      </a>

      {showPreview && (
        <TechPreview
          tech={tech}
          url={config.url}
          description={description}
          domain={domain}
          isMobile={isMobile}
          show={showPreview}
          onClose={() => setShowPreview(false)}
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