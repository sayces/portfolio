import React from "react";
import ProfilePhoto from "@/shared/components/ProfilePhoto";

interface HeaderViewProps {
  name: string;
  position: string;
  photo_src: string;
  photoAlt: string;
}

const classNames = {
  wrapper: "flex items-center gap-6",
  name: "text-3xl font-bold",
  position: "text-xl text-gray-500",
};

const HeaderView: React.FC<HeaderViewProps> = ({
  name,
  position,
  photo_src,
  photoAlt,
}) => {
  return (
    <div className={classNames.wrapper}>
      <ProfilePhoto src={photo_src} alt={photoAlt} />
      <div>
        <h1 className={classNames.name}>{name}</h1>
        <p className={classNames.position}>{position}</p>
      </div>
    </div>
  );
};

export default HeaderView;
