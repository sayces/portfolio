import React from "react";
import { useAuth } from "@/shared/context/AuthContext";
import { useContent } from "@/shared/context/ContentContext";
import HeaderView from "@/shared/components/Header/HeaderView";
import HeaderEditForm from "@/shared/components/Header/HeaderEditForm";

const classNames = {
  header:
    "max-w-4xl mx-auto mb-12 flex items-center gap-6 justify-between relative",
  loginWrapper: "flex items-center gap-4",
  button: "px-4 py-2 text-sm rounded-full font-medium transition-colors",
  buttonAuth: "bg-gray-700 text-white hover:bg-gray-800",
};

const Header: React.FC = () => {
  const { user, isOwner } = useAuth();
  const { content, isEditing, toggleEditing, saveContent } = useContent();

  const handleSave = async () => {
    await saveContent();
    toggleEditing();
  };

  return (
    <header className={classNames.header}>
      {isEditing ? (
        <HeaderEditForm />
      ) : (
        <HeaderView
          name={content.name}
          position={content.position}
          photo_src={content.photo_src}
          photoAlt="Sasha"
        />
      )}

      <div className={classNames.loginWrapper}>
        {user && !isEditing && (
          <p>
            Welcome back,{" "}
            <strong>{user.user_metadata?.user_name || user.email}</strong>!
          </p>
        )}

        {isOwner && (
          <div className="flex items-center gap-3">
            <button
              onClick={isEditing ? handleSave : toggleEditing}
              className={`${classNames.button} ${
                isEditing
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isEditing ? "Save" : "Edit"}
            </button>

            {isEditing && (
              <button
                onClick={toggleEditing}
                className={`${classNames.button} bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-full`}
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
