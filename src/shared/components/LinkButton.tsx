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
      className={`flex items-center justify-center gap-2 rounded-full ${className}`}
      style={style}
    >
      {children}
      <span className="text-white/50 opacity-50 mix-blend-difference group-hover:opacity-100 transition-opacity duration-300 ml-1">
        ↗
      </span>
    </a>
  );
};

export default LinkButton;