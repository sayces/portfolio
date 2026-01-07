import React, { useEffect, useRef } from "react";
import type { RefObject } from "react";

interface TechPreviewProps {
  tech: string;
  url: string;
  description: string;
  domain: string;
  isMobile: boolean;
  show: boolean;
  onClose: () => void;
  anchorRef: RefObject<HTMLDivElement>;
  previewRef?: RefObject<HTMLDivElement>;
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
  anchorRef,
  previewRef,
  badgeColorClass,
  badgeTextColorClass,
  badgeBorderClass = "border-gray-600",
}) => {
  const internalPreviewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (previewRef && internalPreviewRef.current) {
      (previewRef as React.MutableRefObject<HTMLDivElement | null>).current = internalPreviewRef.current;
    }
  }, [previewRef]);

  const borderRadiusClass = "rounded-xl";
  const borderClass = `border-2 ${badgeBorderClass}`;

  const previewWidth = isMobile ? Math.min(window.innerWidth * 0.9, 384) : 400;

  const positionPreview = () => {
    if (!show || !anchorRef.current || !internalPreviewRef.current) return;

    // Force reflow — магия, чтобы браузер точно посчитал размеры
    internalPreviewRef.current.offsetHeight;

    const anchor = anchorRef.current.getBoundingClientRect();
    const preview = internalPreviewRef.current.getBoundingClientRect();

    // Сначала пробуем разместить НАД бейджем
    let top = anchor.top - preview.height - 12;

    // Если сверху мало места — ставим ПОД бейджем
    if (anchor.top < preview.height + 12) {
      top = anchor.bottom + 12;
    }

    // Горизонталь: центрируем относительно бейджа
    let left = anchor.left + anchor.width / 2 - preview.width / 2;

    // Отступы от краёв экрана
    const padding = isMobile ? 16 : 100;
    left = Math.max(padding, Math.min(left, window.innerWidth - preview.width - padding));

    // Применяем
    internalPreviewRef.current.style.width = `${previewWidth}px`;
    internalPreviewRef.current.style.top = `${top}px`;
    internalPreviewRef.current.style.left = `${left}px`;
  };

  useEffect(() => {
    if (!show) return;

    // Первый расчёт сразу
    positionPreview();

    // Второй — на следующем кадре (на случай подгрузки изображений)
    const raf = requestAnimationFrame(() => {
      positionPreview();
    });

    // И на ресайз/скролл — обновляем позицию
    window.addEventListener("resize", positionPreview);
    window.addEventListener("scroll", positionPreview);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", positionPreview);
      window.removeEventListener("scroll", positionPreview);
    };
  }, [show, anchorRef, isMobile, previewWidth]);

  if (!show) return null;

  return (
    <div
      ref={internalPreviewRef}
      className="fixed z-50 opacity-0 transition-opacity duration-200"
      style={{ opacity: show ? 1 : 0 }} // Плавное появление
      onClick={(e) => e.stopPropagation()}
    >
      <div className={`${badgeColorClass} ${borderRadiusClass} ${borderClass} overflow-hidden shadow-2xl`}>
        {isMobile && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-3xl z-10 text-white hover:opacity-70"
          >
            ×
          </button>
        )}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-5">
            <img
              src={`https://www.google.com/s2/favicons?domain=${url}&sz=128`}
              alt={`${tech} favicon`}
              className="w-14 h-14 rounded-xl shrink-0 opacity-95"
            />
            <div>
              <h4 className={`font-bold text-xl ${badgeTextColorClass}`}>{tech}</h4>
              {description && (
                <p className={`${badgeTextColorClass} opacity-85 text-sm mt-1`}>{description}</p>
              )}
            </div>
          </div>
          <div className={`${badgeTextColorClass} opacity-70 text-sm`}>{domain}</div>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${badgeTextColorClass} text-sm font-medium hover:underline`}
          >
            Перейти на сайт →
          </a>
        </div>
      </div>
    </div>
  );
};

export default TechPreview;