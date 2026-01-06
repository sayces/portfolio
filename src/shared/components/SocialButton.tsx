import React from "react";
import LinkButton from "./LinkButton";
// Для иконки стрелки (как раньше)

type SocialPlatform = "instagram" | "telegram" | "github";

interface SocialButtonProps {
  platform: SocialPlatform;
  username: string;
  href: string;
}

const textColor = "mix-blend-difference invert-70";

const platformConfig: Record<
  SocialPlatform,
  {
    baseGradient: string;
    hoverGradient: string;
    textColor: string;
  }
> = {
  instagram: {
    baseGradient: "bg-gradient-to-r",
    hoverGradient:
      "bg-gradient-to-r from-pink-500 via-purple-100 to-indigo-300 bg-[length:200%_200%] animate-gradient-wave",
    textColor: textColor,
  },
  telegram: {
    baseGradient: "bg-gradient-to-r",
    hoverGradient:
      "bg-gradient-to-r from-blue-500 via-cyan-100 to-blue-100 bg-[length:200%_200%] animate-gradient-wave",
    textColor: textColor,
  },
  github: {
    baseGradient: "bg-gradient-to-r from-gray-100 to-gray-200",
    hoverGradient:
      "bg-gradient-to-r from-gray-700 via-gray-500 to-gray-900 bg-[length:200%_200%] animate-gradient-wave",
    textColor: textColor,
  },
};

const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  username,
  href,
}) => {
  const config = platformConfig[platform];

  const classNames = {
    link: `group min-w-[230px] w-fit flex gap-2 px-4 py-2 rounded-full ${config.baseGradient} hover:${config.hoverGradient} transition-all duration-400 hover:shadow-xl`,
    platform: `font-medium text-lg capitalize ${config.textColor} transition-colors duration-400`,
    username: `font-medium ${config.textColor} transition-colors duration-400`,
  };

  return (
    <LinkButton href={href} className={classNames.link}>
      <div className={`w-50 gap-4 flex justify-between`}>
        <span className={classNames.platform}>{platform}</span>
        <span className={classNames.username}>{username}</span>
      </div>
    </LinkButton>
  );
};

export default SocialButton;
