import React from "react";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const classNames = {
  link: "flex justify-between items-center hover:opacity-80 transition-opacity",
  arrow: "mix-blend-difference invert-50 ml-1",
};

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  className,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${classNames.link} ${className}`}
    >
      {children}
      <span className={classNames.arrow}>↗</span>
    </a>
  );
};

export default LinkButton;
