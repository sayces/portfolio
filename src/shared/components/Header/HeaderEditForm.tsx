import React from "react";
import { useContent } from "@/shared/context/ContentContext";
import ProfilePhoto from "@/shared/components/ProfilePhoto";

const classNames = {
  wrapper: "flex items-center gap-6",
  inputName:
    "text-3xl font-bold border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent min-w-[200px]",
  inputPosition:
    "text-xl text-gray-500 border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent min-w-[200px]",
};

const HeaderEditForm: React.FC = () => {
  const { content, updateContent } = useContent();

  return (
    <div className={classNames.wrapper}>
      <ProfilePhoto src={content.photo_src} alt="Sasha" />

      <div className="flex flex-col gap-2">
        <input
          value={content.name}
          onChange={(e) => updateContent({ name: e.target.value })}
          className={classNames.inputName}
          placeholder="Name"
          autoFocus
        />
        <input
          value={content.position}
          onChange={(e) => updateContent({ position: e.target.value })}
          className={classNames.inputPosition}
          placeholder="Position"
        />
      </div>
    </div>
  );
};

export default HeaderEditForm;
