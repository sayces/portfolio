import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { useContent } from "@/shared/context/ContentContext";

interface EditableTextProps {
  field: string;
  initialValue: string;
  as?: "h1" | "p" | "div" | "span";
  className?: string;
  placeholder?: string;
  multiline?: boolean;
}

const EditableText: React.FC<EditableTextProps> = ({
  field,
  initialValue,
  as: Tag = "div",
  className = "",
  placeholder = "Enter text...",
  multiline = false,
}) => {
  const { isOwner } = useAuth();
  const { updateNested } = useContent();

  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const startEditing = () => {
    if (!isOwner) return;
    setIsEditing(true);
    setTimeout(() => {
      multiline ? textareaRef.current?.focus() : inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = async () => {
    setIsEditing(false);
    const trimmed = value.trim();
    if (trimmed !== initialValue.trim()) {
      await updateNested(field, trimmed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !multiline) {
      e.preventDefault();
      inputRef.current?.blur();
    }
    if (e.key === "Escape") {
      setValue(initialValue);
      setIsEditing(false);
    }
  };

  if (!isOwner || !isEditing) {
    return (
      <Tag
        className={`${className} ${isOwner ? "cursor-pointer hover:bg-gray-50/50 transition-colors rounded px-1 -mx-1" : ""}`}
        onClick={startEditing}
      >
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </Tag>
    );
  }

  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    placeholder,
    className: `${className} border-b border-blue-400 focus:outline-none focus:border-blue-600 bg-white`,
  };

  if (multiline) {
    return <textarea ref={textareaRef} {...common} rows={4} className={`${common.className} resize-y w-full`} />;
  }

  return <input ref={inputRef} type="text" {...common} />;
};

export default EditableText;