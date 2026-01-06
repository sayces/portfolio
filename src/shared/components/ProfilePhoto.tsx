import React from "react";

interface ProfilePhotoProps {
  src: string;
  alt: string;
}

const classNames = {
  wrapper:
    "overflow-hidden rounded-full border border-gray-200 shadow-sm group cursor-pointer",
  img: "w-full h-full object-cover object-center scale-110 transition-transform duration-400 ease-in-out group-hover:scale-100",
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt }) => {
  return (
    <div className={classNames.wrapper + " w-24 h-24 md:w-32 md:h-32"}>
      <img src={src} alt={alt} className={classNames.img} />
    </div>
  );
};

export default ProfilePhoto;
