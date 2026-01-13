import React from "react";
import LinkButton from "@/shared/components/LinkButton";
import Badge from "@/shared/components/Badge";

interface ContentItemProps {
  date: string;
  title: string;
  location?: string;
  href?: string;
  techStack?: string[];
  description?: string;
  activities?: string[];
}

const classNames = {
  item: "grid grid-cols-[minmax(50px,100px)_auto_auto] md:grid-cols-[minmax(90px,120px)_auto_1fr] grid-rows-auto items-baseline justify-start gap-1 text-lg text-gray-600 mb-4 transition-all duration-300",
  date: "w-fit col-start-1 row-start-1",
  title: "col-start-2 row-start-1 font-semibold",
  location: "col-start-3 row-start-1 text-gray-400 text-sm",
  secondary:
    "col-start-1 md:col-start-2 row-start-2 row-span-2 col-span-3 md:col-span-2 flex flex-col gap-2 mt-1",
  description: "text-gray-500 md:text-sm text-md -indent-4 ml-4",
  separator: "h-1 w-full bg-gradient-to-r from-gray-200 to-transparent rounded-full",
  activities: "flex flex-col gap-1",
  activity: "text-gray-600 md:text-sm text-md",
  badgesContainer: "flex flex-wrap gap-2 transition-all duration-300",
};

const ContentItem: React.FC<ContentItemProps> = ({
  date,
  title,
  location,
  href,
  techStack = [],
  description,
  activities,
}) => {
  return (
    <div className={classNames.item}>
      <span className={classNames.date}>{date}</span>
      <div className={classNames.title}>
        {href ? (
          <LinkButton href={href}>{title}</LinkButton>
        ) : (
          <span>{title}</span>
        )}
      </div>

      {location && <p className={classNames.location}>{location}</p>}
      <div className={classNames.secondary}>
        {description && <p className={classNames.description}>{description}</p>}
        {description && activities && <div className={classNames.separator}/>}
        {activities && activities.length > 0 && (
          <div className={classNames.activities}>
            {activities.map((activity, index) => (
              <span key={index} className={classNames.activity}>
                • {activity}
              </span>
            ))}
          </div>
        )}
        {techStack.length > 0 && (
          <div className={classNames.badgesContainer}>
            {techStack.map((tech, index) => (
              <Badge key={index} tech={tech} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentItem;
