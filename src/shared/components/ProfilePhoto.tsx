import React, { useState } from "react";
import FullscreenPhoto from "@/shared/components/FullscreenPhoto";

interface ProfilePhotoProps {
  src: string;
  alt: string;
}

const classNames = {
  wrapper:
    "overflow-hidden rounded-full border border-gray-200 shadow-sm group cursor-pointer",
  button: "w-full h-full cursor-pointer",
  img: "w-full h-full object-[0%_30%] object-cover group-hover:object-[0_100%] scale-110 transition-all duration-400 ease-in-out group-hover:scale-100",
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      <div className={classNames.wrapper + " w-24 h-24 md:w-32 md:h-32"}>
        <button
          className={classNames.button}
          onClick={() => setIsFullscreen(true)}
        >
          <img src={src} alt={alt} className={classNames.img} />
        </button>
      </div>
      {isFullscreen && (
        <FullscreenPhoto
          src={src}
          alt={alt}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </>
  );
};

export default ProfilePhoto;