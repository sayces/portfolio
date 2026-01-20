import { useState } from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { supabase } from "@/supabase/client";

type Provider = "github" | "google" | "discord" | "twitter" | "facebook";

interface AuthButtonProps {
  provider: Provider;
  label?: string;
}

export default function AuthButton({
  provider,
  label = "Staff only",
}: AuthButtonProps) {
  const { user, signOut: contextSignOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (user) {
      // Есть сессия → выходим полностью
      setLoading(true);
      await contextSignOut();
      setLoading(false);
      return;
    }

    // Нет сессии → логинимся через выбранный provider
    setLoading(true);
    try {
      const redirectTo = `${window.location.origin}/portfolio/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo,
          // queryParams: { prompt: "select_account" }, // опционально — заставляет выбирать аккаунт
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error(`Login with ${provider} error:`, error);
      setLoading(false);
    }
  };

  const buttonText = user ? "Logout" : label;
  const isDisabled = loading;

  const buttonClass =
    "flex flex-row items-center justify-between gap-2 text-sm text-nowrap disabled:opacity-60 disabled:cursor-not-allowed px-2 rounded-full font-medium transition-all duration-200 ease-in-out cursor-pointer bg-white duration-300 items-baseline w-full items-baseline rounded-full w-full m-0.5 gap-2 group-active:mx-3";

  const classNames = {
    buttonWrapper:
      "rounded-full flex justify-center w-full md:w-fit min-w-30 saturate-40 group",
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
