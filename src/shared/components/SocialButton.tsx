import React from "react";
import LinkButton from "./LinkButton";

type SocialPlatform = "instagram" | "telegram" | "github";

interface SocialButtonProps {
  platform: SocialPlatform;
  username: string;
  href: string;
}

const platformNeonColors: Record<SocialPlatform, string> = {
  instagram: "#e6683c #cc2366 #bc1888",
  telegram: "#229ed9 #3ec2f3",
  github: "#333 #666 #999",
};

const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  username,
  href,
}) => {
  const colors = platformNeonColors[platform].split(" ");

  return (
    <div
      className="gradient-animated-border rounded-full w-full md:w-fit saturate-40"
      style={
        {
          "--color1": colors[0],
          "--color2": colors[1] || colors[0],
          "--color3": colors[2] || colors[1] || colors[0],
        } as React.CSSProperties
      }
    >
      <LinkButton
        href={href}
        className="bg-white m-1 hover:mx-3 px-4 py-2 transition-all duration-400"
      >
        <div className="justify-between flex w-full min-w-50 gap-2">
          <span className="font-semibold text-lg capitalize text-black drop-shadow-2xl">
            {platform}
          </span>
          <span className="font-medium text-black drop-shadow-2xl truncate">
            {username}
          </span>
        </div>
      </LinkButton>
    </div>
  );
};

export default SocialButton;
