import React from "react";

interface SectionBlockProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const classNames = {
  section: "max-w-4xl mx-auto mb-12",
  title: "text-2xl font-semibold mb-4",
};

const SectionBlock: React.FC<SectionBlockProps> = ({
  id,
  title,
  children,
  className,
}) => {
  return (
    <section id={id} className={`${className} ${classNames.section}`}>
      <h2 className={`${classNames.title}`}>{title}</h2>
      {children}
    </section>
  );
};

export default SectionBlock;
