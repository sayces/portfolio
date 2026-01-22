import React from "react";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  className = "",
  style,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-row items-baseline rounded-full w-full m-0.5 gap-2 group-active:mx-3 px-2 
        ${className}
        `}
      style={style}
    >
      {children}
      <span className="mix-blend-difference opacity-50 group-hover:opacity-100 transition-opacity duration-300 ml-1">
        ⬈
      </span>
    </a>
  );
};

export default LinkButton;
