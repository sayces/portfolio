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
  rows?: number;
  minWidth?: string;
  maxWidth?: string;
}

const EditableText: React.FC<EditableTextProps> = ({
  field,
  initialValue,
  as: Tag = "div",
  className = "",
  placeholder = "Enter text...",
  multiline = false,
  rows = 1,
  minWidth = "50px",
  maxWidth = "100%",
}) => {
  const { isOwner } = useAuth();
  const { updateNested } = useContent();

  const [value, setValue] = useState(initialValue);
  const [isEditing, setIsEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState("auto");
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // Обновляем ширину при изменении значения или при монтировании (для однострочного)
  useEffect(() => {
    if (measureRef.current && !multiline) {
      const textWidth = measureRef.current.offsetWidth;
      const containerWidth = containerRef.current?.offsetWidth || 0;
      
      // Используем максимум из ширины текста и ширины контейнера
      const width = Math.max(textWidth + 10, containerWidth);
      setInputWidth(`${width}px`);
    }
  }, [value, multiline, isEditing]);

  // Автоматическая регулировка высоты textarea
  useEffect(() => {
    if (multiline && isEditing && textareaRef.current) {
      // Сбрасываем высоту для правильного расчета scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Если есть containerRef, учитываем его высоту
      const containerHeight = containerRef.current?.offsetHeight || 0;
      const finalHeight = Math.max(scrollHeight, containerHeight);
      
      setTextareaHeight(`${finalHeight}px`);
      textareaRef.current.style.height = `${finalHeight}px`;
    }
  }, [value, multiline, isEditing]);

  // Инициализация высоты при переходе в режим редактирования
  useEffect(() => {
    if (multiline && isEditing && containerRef.current) {
      const containerHeight = containerRef.current.offsetHeight;
      setTextareaHeight(`${containerHeight}px`);
    }
  }, [isEditing, multiline]);

  const startEditing = () => {
    if (!isOwner) return;
    setIsEditing(true);
    setTimeout(() => {
      if (multiline && textareaRef.current) {
        textareaRef.current.focus();
        // Устанавливаем курсор в конец текста
        textareaRef.current.setSelectionRange(
          textareaRef.current.value.length,
          textareaRef.current.value.length
        );
      } else {
        inputRef.current?.focus();
      }
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
        ref={containerRef as any}
        className={`${className} ${isOwner ? "cursor-pointer hover:bg-gray-50/50 transition-colors rounded px-1 -mx-1 wrap-break-word" : "wrap-break-word"} ${multiline ? "whitespace-pre-wrap" : ""}`}
        onClick={startEditing}
      >
        {value || <span className="text-gray-400 italic">{placeholder}</span>}
      </Tag>
    );
  };

  const common = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
    onBlur: handleBlur,
    onKeyDown: handleKeyDown,
    placeholder,
    className: `${className} border-b border-blue-400 focus:outline-none focus:border-blue-600 bg-white`,
  };

  if (multiline) {
    return (
      <>
        {/* Невидимый элемент для точного измерения высоты */}
        <div
          ref={measureRef as any}
          className={`${className} invisible absolute whitespace-pre-wrap pointer-events-none wrap-break-word`}
          style={{ 
            width: containerRef.current?.offsetWidth || '100%',
            maxWidth: maxWidth 
          }}
          aria-hidden="true"
        >
          {value || placeholder}
        </div>
        
        <textarea
          ref={textareaRef}
          {...common}
          className={`${common.className} resize-none overflow-hidden w-full wrap-break-word whitespace-pre-wrap`}
          style={{ 
            height: textareaHeight,
            minHeight: `${rows * 1.5}em` 
          }}
        />
      </>
    );
  }

  return (
    <>
      {/* Невидимый элемент для измерения ширины текста */}
      <span
        ref={measureRef}
        className={`${className} invisible absolute whitespace-pre pointer-events-none`}
        aria-hidden="true"
      >
        {value || placeholder}
      </span>
      
      <input
        ref={inputRef}
        type="text"
        {...common}
        style={{
          width: inputWidth,
          minWidth: minWidth,
          maxWidth: maxWidth,
        }}
      />
    </>
  );
};

export default EditableText;