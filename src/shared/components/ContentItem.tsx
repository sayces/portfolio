import React from "react";
import LinkButton from "@/shared/components/LinkButton";
import TechnologiesSection from "@/shared/components/TechnologiesSection";

interface ContentItemProps {
  date: React.ReactNode;
  title: React.ReactNode;
  location?: React.ReactNode;
  href?: string;
  techStack?: string[];
  description?: React.ReactNode;
  activities?: string[];
  onRemoveTech?: (tech: string) => void;
  onRenameTech?: (oldName: string, newName: string) => void;
  onAddTech?: (tech: string) => void;
  uniqueId?: string; // Добавляем уникальный ID
}

const classNames = {
  item: "grid grid-cols-[minmax(50px,100px)_auto_auto] md:grid-cols-[minmax(90px,120px)_auto_1fr] grid-rows-auto items-baseline justify-start gap-1 text-lg text-gray-600 mb-4 transition-all duration-300",
  date: "w-fit col-start-1 row-start-1",
  title: "col-start-2 row-start-1 font-semibold",
  location: "col-start-3 row-start-1 text-gray-400 text-sm",
  secondary:
    "col-start-1 md:col-start-2 row-start-2 row-span-2 col-span-3 md:col-span-2 flex flex-col gap-2 mt-1",
  description: "text-gray-500 md:text-sm text-md -indent-4 ml-4",
  separator:
    "h-1 w-full bg-gradient-to-r from-gray-200 to-transparent rounded-full my-2",
  activities: "flex flex-col gap-1",
  activity: "text-gray-600 md:text-sm text-md",
  badgesContainer: "flex flex-wrap gap-2 mt-2",
};

const ContentItem: React.FC<ContentItemProps> = ({
  date,
  title,
  location,
  href,
  techStack = [],
  description,
  activities = [],
  onRemoveTech,
  onRenameTech,
  onAddTech,
  uniqueId = "",
}) => {
  const titleContent = href ? (
    <LinkButton href={href}>{title}</LinkButton>
  ) : (
    title
  );

  return (
    <div className={classNames.item}>
      <div className={classNames.date}>{date}</div>

      <div className={classNames.title}>{titleContent}</div>

      {location && <div className={classNames.location}>{location}</div>}

      <div className={classNames.secondary}>
        {description && (
          <div className={classNames.description}>{description}</div>
        )}

        {(description || activities.length > 0) && techStack.length > 0 && (
          <div className={classNames.separator} />
        )}

        {activities.length > 0 && (
          <div className={classNames.activities}>
            {activities.map((activity, index) => (
              <div key={index} className={classNames.activity}>
                • {activity}
              </div>
            ))}
          </div>
        )}

        {(techStack.length > 0 || onAddTech) && (
          <div className={classNames.badgesContainer}>
            <TechnologiesSection
              technologies={techStack}
              onRemoveTech={onRemoveTech}
              onRenameTech={onRenameTech}
              onAddTech={onAddTech}
              uniqueId={uniqueId}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentItem;
