import React from "react";
import LinkButton from "./LinkButton";

type SocialPlatform = "instagram" | "telegram" | "github" | "linkedin";

interface SocialButtonProps {
  platform: SocialPlatform;
  username: string;
  href: string;
}

const platformNeonColors: Record<SocialPlatform, string> = {
  instagram: "#e6683c #cc2366 #bc1888",
  telegram: "#229ed9 #3ec2f3",
  github: "#333 #666 #999",
  linkedin: "#0a66c2 #0077b5 #005a9e",
};

const SocialButton: React.FC<SocialButtonProps> = ({
  platform,
  username,
  href,
}) => {
  const colors = platformNeonColors[platform].split(" ");

  return (
    <div
      className="gradient-animated-border rounded-full flex justify-center w-full md:w-fit min-w-60 saturate-40 group"
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
        className="bg-white transition-all duration-300"
      >
        <div
          className={`justify-between items-baseline flex w-full gap-2`}
        >
          <span className=" text-md capitalize shadow-xl">{platform}</span>
          <span className="drop-shadow-2xl truncate">{username}</span>
        </div>
      </LinkButton>
    </div>
  );
};

export default SocialButton;
