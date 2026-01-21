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
  img: "w-full h-full object-[50%_30%] object-cover scale-110 transition-all duration-500 ease-in-out group-hover:scale-100",
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
          <img
            src={src}
            alt={alt}
            className={classNames.img}
            decoding="async"
            loading="eager"
            width={160}
            height={160}
            onError={(e) => {
              e.currentTarget.src = "./profile_photo_fallback.png";
              e.currentTarget.onerror = null;
            }}
          ></img>
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
