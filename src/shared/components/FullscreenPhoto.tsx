import React from "react";

interface FullscreenPhotoProps {
  src: string;
  alt: string;
  onClose: () => void;
}

const FullscreenPhoto: React.FC<FullscreenPhotoProps> = ({
  src,
  alt,
  onClose,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent"
      onClick={onClose}
    >
      <img
        src={src}
        alt={alt}
        className="max-w-[90vw] max-h-[90vh] object-contain rounded-md shadow-[0_0_40px_20px_rgba(0,0,0,0.3)]"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
};

export default FullscreenPhoto;
