import React, { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { updateTechMetadata, renameTechInStacks } from "@/lib/supabase/client";

interface TechPreviewProps {
  tech: string;
  url: string;
  description: string;
  domain: string;
  isMobile: boolean;
  show: boolean;
  onClose: () => void;
  onDelete?: () => void;
  onRename?: (newName: string) => void;
  anchorRef: RefObject<HTMLDivElement | null>;
  previewRef?: RefObject<HTMLDivElement | null>;
  badgeColorClass: string;
  badgeTextColorClass: string;
  badgeBorderClass?: string;
}

const TechPreview: React.FC<TechPreviewProps> = ({
  tech,
  url,
  description,
  domain,
  isMobile,
  show,
  onClose,
  onDelete,
  onRename,
  anchorRef,
  previewRef,
  badgeColorClass,
  badgeTextColorClass,
  badgeBorderClass = "border-gray-600",
}) => {
  const { isOwner } = useAuth();
  const internalPreviewRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(show);
  const [shouldRender, setShouldRender] = useState(show);

  const [editableName, setEditableName] = useState(tech);
  const [editableUrl, setEditableUrl] = useState(url);
  const [editableDescription, setEditableDescription] = useState(description);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setEditableName(tech);
    setEditableUrl(url);
    setEditableDescription(description);
  }, [tech, url, description]);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    } else {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [show]);

  useEffect(() => {
    if (!shouldRender || !anchorRef.current || !internalPreviewRef.current)
      return;

    const positionPreview = () => {
      internalPreviewRef.current!.offsetHeight;

      const anchor = anchorRef.current!.getBoundingClientRect();
      const preview = internalPreviewRef.current!.getBoundingClientRect();

      let top = anchor.top - preview.height - 12;
      if (anchor.top < preview.height + 12) {
        top = anchor.bottom + 12;
      }

      let left = anchor.left + anchor.width / 2 - preview.width / 2;

      const padding = isMobile ? 16 : 100;
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - preview.width - padding)
      );

      const width = isMobile ? Math.min(window.innerWidth * 0.9, 384) : 400;

      Object.assign(internalPreviewRef.current!.style, {
        width: `${width}px`,
        top: `${top}px`,
        left: `${left}px`,
      });
    };

    positionPreview();
    const raf = requestAnimationFrame(positionPreview);

    window.addEventListener("resize", positionPreview);
    window.addEventListener("scroll", positionPreview);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", positionPreview);
      window.removeEventListener("scroll", positionPreview);
    };
  }, [shouldRender, anchorRef, isMobile]);

  const handleNameBlur = async () => {
    setIsEditingName(false);
    const newName = editableName.trim();
    if (!newName || newName === tech) {
      setEditableName(tech);
      return;
    }

    await updateTechMetadata(tech, { name: newName });
    await renameTechInStacks(tech, newName);

    if (onRename) {
      onRename(newName);
    }
    onClose();
  };

  const handleUrlBlur = async () => {
    setIsEditingUrl(false);
    if (editableUrl.trim() !== url.trim()) {
      await updateTechMetadata(tech, { url: editableUrl.trim() });
    }
  };

  const handleDescriptionBlur = async () => {
    setIsEditingDescription(false);
    if (editableDescription.trim() !== description.trim()) {
      await updateTechMetadata(tech, { description: editableDescription.trim() });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    field: "name" | "url" | "description"
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (field === "name") nameInputRef.current?.blur();
      if (field === "url") urlInputRef.current?.blur();
      if (field === "description") descriptionInputRef.current?.blur();
    }
    if (e.key === "Escape") {
      if (field === "name") {
        setEditableName(tech);
        setIsEditingName(false);
      }
      if (field === "url") {
        setEditableUrl(url);
        setIsEditingUrl(false);
      }
      if (field === "description") {
        setEditableDescription(description);
        setIsEditingDescription(false);
      }
    }
  };

  if (!shouldRender) return null;

  const borderRadiusClass = "rounded-xl";
  const borderClass = `border-2 ${badgeBorderClass} saturate-70`;

  return (
    <div
      ref={(node) => {
        internalPreviewRef.current = node;
        if (previewRef) previewRef.current = node;
      }}
      className={`
        fixed z-50 transition-all duration-300 ease-out
        ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className={`${badgeColorClass} ${borderRadiusClass} ${borderClass} overflow-hidden shadow-2xl`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-3xl z-10 hover:opacity-70"
        >
          ×
        </button>

        {isOwner && onDelete && (
          <button
            onClick={onDelete}
            className="absolute top-4 right-14 text-2xl z-10 hover:opacity-70"
            title="Удалить технологию"
          >
            🗑
          </button>
        )}

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-5">
            {editableUrl && (
              <img
                src={`https://www.google.com/s2/favicons?domain=${editableUrl}&sz=128`}
                alt={`${tech} favicon`}
                className="w-14 h-14 rounded-xl shrink-0 opacity-95"
              />
            )}
            <div className="flex-1">
              {isOwner ? (
                isEditingName ? (
                  <input
                    ref={nameInputRef}
                    type="text"
                    value={editableName}
                    onChange={(e) => setEditableName(e.target.value)}
                    onBlur={handleNameBlur}
                    onKeyDown={(e) => handleKeyDown(e, "name")}
                    autoFocus
                    className={`font-bold text-xl ${badgeTextColorClass} w-full bg-transparent border-b border-current focus:outline-none`}
                  />
                ) : (
                  <h4
                    className={`font-bold text-xl ${badgeTextColorClass} cursor-pointer hover:opacity-70 transition-opacity`}
                    onClick={() => setIsEditingName(true)}
                  >
                    {editableName}
                  </h4>
                )
              ) : (
                <h4 className={`font-bold text-xl ${badgeTextColorClass}`}>
                  {tech}
                </h4>
              )}

              {isOwner ? (
                isEditingDescription ? (
                  <input
                    ref={descriptionInputRef}
                    type="text"
                    value={editableDescription}
                    onChange={(e) => setEditableDescription(e.target.value)}
                    onBlur={handleDescriptionBlur}
                    onKeyDown={(e) => handleKeyDown(e, "description")}
                    placeholder="Описание"
                    autoFocus
                    className={`${badgeTextColorClass} opacity-85 text-sm mt-1 w-full bg-transparent border-b border-current focus:outline-none`}
                  />
                ) : (
                  <p
                    className={`${badgeTextColorClass} opacity-85 text-sm mt-1 cursor-pointer hover:opacity-70 transition-opacity`}
                    onClick={() => setIsEditingDescription(true)}
                  >
                    {editableDescription || (
                      <span className="italic opacity-50">Добавить описание...</span>
                    )}
                  </p>
                )
              ) : (
                description && (
                  <p className={`${badgeTextColorClass} opacity-85 text-sm mt-1`}>
                    {description}
                  </p>
                )
              )}
            </div>
          </div>

          {isOwner ? (
            isEditingUrl ? (
              <input
                ref={urlInputRef}
                type="url"
                value={editableUrl}
                onChange={(e) => setEditableUrl(e.target.value)}
                onBlur={handleUrlBlur}
                onKeyDown={(e) => handleKeyDown(e, "url")}
                placeholder="https://example.com"
                autoFocus
                className={`${badgeTextColorClass} opacity-70 text-sm w-full bg-transparent border-b border-current focus:outline-none`}
              />
            ) : (
              <div
                className={`${badgeTextColorClass} opacity-70 text-sm cursor-pointer hover:opacity-50 transition-opacity`}
                onClick={() => setIsEditingUrl(true)}
              >
                {editableUrl || (
                  <span className="italic opacity-50">Добавить ссылку...</span>
                )}
              </div>
            )
          ) : (
            domain && (
              <div className={`${badgeTextColorClass} opacity-70 text-sm`}>
                {domain}
              </div>
            )
          )}

          {editableUrl && (
            <a
              href={editableUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${badgeTextColorClass} text-sm font-medium hover:underline block`}
            >
              Перейти на сайт →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default TechPreview;