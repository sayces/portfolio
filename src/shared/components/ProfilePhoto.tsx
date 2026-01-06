import React from 'react';

interface ProfilePhotoProps {
  src: string;
  alt: string;
}

const classNames = {
  img: 'w-24 h-24 rounded-full border border-gray-200 shadow-sm',
};

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ src, alt }) => {
  return (
    <img src={src} alt={alt} className={classNames.img} />
  );
};

export default ProfilePhoto;