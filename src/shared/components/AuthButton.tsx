import { useState } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { signInWithProvider, signOut, supabase } from "@/supabase/client";

type Provider = "github" | "google" | "discord" | "twitter" | "facebook";

interface AuthButtonProps {
  provider: Provider;
  label?: string;
}

export default function AuthButton({
  provider,
  label = "Staff only",
}: AuthButtonProps) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);

    try {
      if (user) {
        await signOut();
      } else {
        await signInWithProvider(provider);
      }
    } catch (error) {
      console.error(`Auth error with ${provider}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const buttonText = user ? "Logout" : label;
  const isDisabled = loading;

  const buttonClass =
    "flex flex-row items-center justify-end gap-2 text-sm text-nowrap disabled:opacity-60 disabled:cursor-not-allowed px-2 rounded-full font-medium transition-all duration-200 ease-in-out cursor-pointer bg-white duration-300 items-baseline w-full items-baseline rounded-full w-full m-0.5 gap-2 group-active:mx-3";

  const classNames = {
    buttonWrapper:
      "rounded-full flex justify-center w-full md:w-fit min-w-25 saturate-40 group",
    signOutButton: `text-red-800 hover:text-red-900 bg-red-800`,
    singInButton: `text-blue-800 hover:text-blue-900 bg-blue-800`,
  };

  return (
    <div
      className={`${classNames.buttonWrapper} not-only:${user ? classNames.signOutButton : classNames.singInButton}`}
    >
      <button
        onClick={handleClick}
        disabled={isDisabled}
        className={`${buttonClass}`}
      >
        {loading ? "Processing..." : buttonText}
      </button>
    </div>
  );
}