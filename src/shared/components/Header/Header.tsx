import React from "react";
import ProfilePhoto from "@/shared/components/ProfilePhoto";
import EditableText from "@/shared/components/EditableUI/EditableText";
import { useAuth } from "@/shared/context/AuthContext";
import { useContent } from "@/shared/context/ContentContext";

const Header: React.FC = () => {
  const { user } = useAuth();
  const { content } = useContent();

  return (
    <header className="max-w-4xl mx-auto mb-12 flex items-center gap-6 justify-between">
      <div className="flex items-center gap-6">
        <ProfilePhoto src={content.photo_src} alt="Avatar" />

        <div>
          <EditableText
            field="name"
            initialValue={content.name}
            as="h1"
            className="text-3xl font-bold"
            placeholder="Your name"
          />
          <EditableText
            field="position"
            initialValue={content.position}
            className="text-xl text-gray-500"
            placeholder="Position"
          />
        </div>
      </div>
      {user && (
        <p className="text-green-700 text-sm">
          {user.user_metadata?.user_name || user.email}
        </p>
      )}
    </header>
  );
};

export default Header;
