import React from "react";
import LinkButton from "@/shared/components/Buttons/LinkButton";
import TechnologiesSection from "@/shared/components/Technologies/TechnologiesSection";
import EditableText from "@/shared/components/EditableUI/EditableText";
import { useAuth } from "@/shared/context/AuthContext";

interface ContentItemProps {
  date: React.ReactNode;
  title: React.ReactNode;
  location?: React.ReactNode;
  href?: string | null;
  techStack?: string[];
  description?: string | null;
  activities?: string[];
  onRemoveTech?: (tech: string) => void;
  onRenameTech?: (oldName: string, newName: string) => void;
  onAddTech?: (tech: string) => void;
  onUpdateDescription?: (value: string) => void;
  onUpdateActivities?: (activities: string[]) => void;
  onUpdateActivity?: (index: number, value: string) => void;
  onDeleteActivity?: (index: number) => void;
  onAddActivity?: () => void;
  uniqueId?: string;
  sectionPath?: string; // например "experience.0"
}

const classNames = {
  item: "grid grid-cols-[minmax(50px,100px)_auto_auto] md:grid-cols-[minmax(90px,120px)_auto_1fr] grid-rows-auto items-baseline justify-start gap-1 text-lg text-gray-600 mb-4 transition-all duration-300",
  date: "w-fit col-start-1 row-start-1",
  title: "col-start-2 row-start-1 font-semibold",
  location: "col-start-3 row-start-1 text-gray-400 text-sm",
  secondary:
    "col-start-1 md:col-start-2 row-start-2 row-span-2 col-span-3 md:col-span-2 flex flex-col gap-2 mt-1",
  description:
    "text-gray-500 md:text-sm text-md -indent-4 pl-4 placeholder:text-gray-400",
  separator:
    "h-1 w-full bg-gradient-to-r from-gray-200 to-transparent rounded-full my-2",
  activities: "flex flex-col gap-1",
  activity: "text-gray-600 md:text-sm text-md flex items-center gap-2 group",
  badgesContainer: "flex flex-wrap gap-2 mt-2",
  deleteButton:
    "opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 cursor-pointer text-sm transition-opacity flex-shrink-0",
  addButton:
    "text-blue-500 hover:text-blue-700 cursor-pointer text-sm mt-1 flex items-center gap-1 w-fit",
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
  onUpdateDescription,
  onUpdateActivities,
  onDeleteActivity,
  onAddActivity,
  uniqueId = "",
  sectionPath = "",
}) => {
  const { isOwner } = useAuth();

  const titleContent = href ? (
    <LinkButton href={href}>{title}</LinkButton>
  ) : (
    title
  );

  const handleDeleteActivity = (index: number) => {
    if (onDeleteActivity) {
      onDeleteActivity(index);
    } else if (onUpdateActivities) {
      const newActivities = activities.filter((_, i) => i !== index);
      onUpdateActivities(newActivities);
    }
  };

  const handleAddActivity = () => {
    if (onAddActivity) {
      onAddActivity();
    } else if (onUpdateActivities) {
      onUpdateActivities([...activities, "New activity"]);
    }
  };

  // Показываем description только если есть текст ИЛИ если владелец
  const shouldShowDescription = (description && description.trim()) || isOwner;

  return (
    <div className={classNames.item}>
      <div className={classNames.date}>{date}</div>

      <div className={classNames.title}>{titleContent}</div>

      {location && <div className={classNames.location}>{location}</div>}

      <div className={classNames.secondary}>
        {/* Description */}
        {shouldShowDescription && onUpdateDescription && (
          <EditableText
            field={`${sectionPath}.description`}
            initialValue={description || ""}
            className={classNames.description}
            placeholder="Description......"
            multiline
            rows={1}
          />
        )}

        {/* Separator */}
        {((description && activities.length > 0) ||
          (isOwner && activities.length > 0)) &&
          techStack.length > 0 && <div className={classNames.separator} />}

        {/* Activities */}
        {(activities.length > 0 || isOwner) && (
          <div className={classNames.activities}>
            {activities.map((activity, index) => (
              <div key={index} className={classNames.activity}>
                <span className="shrink-0">•</span>
                <EditableText
                  field={`${sectionPath}.activities[${index}]`}
                  initialValue={activity}
                  className="flex-1 text-gray-600 md:text-sm text-md"
                  placeholder="Activity description..."
                />
                {isOwner && (
                  <button
                    onClick={() => handleDeleteActivity(index)}
                    className={classNames.deleteButton}
                    title="Delete activity"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {isOwner && (
              <button
                onClick={handleAddActivity}
                className={classNames.addButton}
              >
                <span>+</span>
                <span>Add activity</span>
              </button>
            )}
          </div>
        )}

        {/* Tech Stack */}
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
