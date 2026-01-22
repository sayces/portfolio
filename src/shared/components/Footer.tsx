import { useState } from "react";
import SectionBlock from "./SectionBlock";
import SocialButton from "./Buttons/SocialButton";
import LoginButton from "./Buttons/AuthButton";
import { DownloadPDFButton } from "./Buttons/DownloadPDFButton";
import { useAuth } from "@/shared/context/AuthContext";

type FooterProps = {
  phone: string;
  email: string;
};

const Footer = ({ phone, email }: FooterProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { user } = useAuth();

  const formatPhone = (s: string) =>
    s.replace(/(\+7)(\d{3})(\d{3})(\d{2})(\d{2})/, "$1 ($2) $3-$4-$5");

  const classNames = {
    footer: "mt-16 pb-12",
    contactsContainer: "space-y-6",
    visibleContacts: "flex flex-col gap-2 text-md mb-4",
    contactLink:
      "underline decoration-2 decoration-blue-400/0 hover:decoration-blue-300/100 transition-all duration-200 w-fit",
    buttonWrapper:
      "socials-toggler my-4 flex justify-center bg-blue-400 rounded-full w-full md:w-fit min-w-60 group transition-all duration-300 ease-in-out",
    toggleButton:
      "flex flex-row m-0.5 group-active:mx-3 px-2 w-full items-center gap-2 text-blue-400 g rounded-full transition-all duration-200 ease-in-out bg-white cursor-pointer",
    toggleText:
      "flex flex-row w-full transition-all duration-300 ease-in-out whitespace-nowrap",
    chevron: `h-full transition-all duration-300 ease-in-out group-hover:text-blue-300 ${
      isExpanded ? "rotate-180" : "rotate-0"
    }`,
    socialsWrapper: `
      grid gap-4 mt-4
      transition-all duration-300 ease-in-out
      ${
        isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      }
    `,

    socialsList: "overflow-hidden flex flex-col gap-4",
    loginContainer: "flex flex-row justify-end gap-4 mt-4",
  };

  return (
    <footer className={classNames.footer}>
      <SectionBlock id="contact" title="Contact me via">
        <div className={classNames.visibleContacts}>
          <a href={`tel:${phone}`} className={classNames.contactLink}>
            🇷🇺 {formatPhone(phone)}
          </a>
          <a href={`mailto:${email}`} className={classNames.contactLink}>
            {email}
          </a>
        </div>
        <div className={classNames.socialsList}>
          <SocialButton
            platform="telegram"
            username="rnakarov"
            href="https://t.me/rnakarov"
          />
        </div>
        <div>
          <div className={classNames.buttonWrapper}>
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className={classNames.toggleButton}
            >
              <span className={`${classNames.toggleText}`}>
                {isExpanded ? "Hide" : "Show more contacts"}
              </span>
              <span className={classNames.chevron}>{"▼"}</span>
            </button>
          </div>

          <div className={classNames.socialsWrapper}>
            <div className={classNames.socialsList}>
              <SocialButton
                platform="linkedin"
                username="sayces"
                href="https://www.linkedin.com/in/sayces"
              />
              <SocialButton
                platform="instagram"
                username="rnakarov"
                href="https://instagram.com/rnakarov"
              />
              <SocialButton
                platform="github"
                username="sayces"
                href="https://github.com/sayces"
              />
            </div>
          </div>
        </div>
      </SectionBlock>
      <SectionBlock id="login" title="Login" className={"mb-0!"}>
        <div className={classNames.loginContainer}>
          <LoginButton provider="github" label="GitHub" />
          {!user && <DownloadPDFButton />}
        </div>
        
      </SectionBlock>
    </footer>
  );
};

export default Footer;
