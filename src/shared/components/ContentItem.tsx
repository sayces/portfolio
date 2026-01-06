import React from 'react';
import LinkButton from './LinkButton';
import Badge from './Badge'; // Новый импорт!

interface ContentItemProps {
  date: string;
  title: string;
  location?: string;
  href?: string;
  techStack?: string[];
}

const classNames = {
  item: 'grid grid-cols-[auto_auto_1fr] grid-rows-[auto_auto] items-baseline gap-4 text-lg text-gray-600 mb-4',
  date: 'w-30', // Твоя ширина
  location: 'hidden md:block col-start-3 text-gray-400',
  badgesContainer: 'col-start-1 md:col-start-2 row-start-2 row-span-1 col-span-3 md:col-span-2 flex flex-wrap gap-2', // Твои стили
};

const ContentItem: React.FC<ContentItemProps> = ({
  date,
  title,
  location,
  href,
  techStack = [],
}) => {
  return (
    <div className={classNames.item}>
      <span className={classNames.date}>{date}</span>
      {href ? (
        <LinkButton href={href}>{title}</LinkButton>
      ) : (
        <span>{title}</span>
      )}

      {location && <p className={classNames.location}>{location}</p>}

      {techStack.length > 0 && (
        <div className={classNames.badgesContainer}>
          {techStack.map((tech, index) => (
            <Badge key={index} tech={tech} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentItem;