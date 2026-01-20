import React from "react";
import ProfilePhoto from "@/shared/components/ProfilePhoto"; // Импорт из shared
import { useAuth } from "@/shared/context/AuthContext";

interface HeaderProps {
  name: string;
  position: string;
  photoSrc: string;
  photoAlt: string;
}

const classNames = {
  header: "max-w-4xl mx-auto mb-12 flex items-center gap-6 justify-between",
  wrapper: "flex items-center gap-6",
  name: "text-3xl font-bold",
  position: "text-xl text-gray-500",
  loginWrapper: "flex items-center gap-4",
};

const Header: React.FC<HeaderProps> = ({
  name,
  position,
  photoSrc,
  photoAlt,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <header className={classNames.header}>
      <div className={classNames.wrapper}>
        <ProfilePhoto src={photoSrc} alt={photoAlt} />
        <div>
          <h1 className={classNames.name}>{name}</h1>
          <p className={classNames.position}>{position}</p>
        </div>
      </div>
      {user && (
        <div className={classNames.loginWrapper}>
          <p className="">
            Welcome back,{" "}
            <strong>{user.user_metadata?.user_name || user.email}</strong>!
          </p>
          
        </div>
      )}
    </header>
  );
};

export default Header;
