import React from 'react';
import ProfilePhoto from './ProfilePhoto'; // Импорт из shared

interface HeaderProps {
  name: string;
  position: string;
  photoSrc: string;
  photoAlt: string;
}

const classNames = {
  header: 'max-w-4xl mx-auto mb-12 flex items-center gap-6',
  name: 'text-3xl font-bold',
  position: 'text-xl text-gray-500',
};

const Header: React.FC<HeaderProps> = ({ name, position, photoSrc, photoAlt }) => {
  return (
    <header className={classNames.header}>
      <ProfilePhoto src={photoSrc} alt={photoAlt} />
      <div>
        <h1 className={classNames.name}>{name}</h1>
        <p className={classNames.position}>{position}</p>
      </div>
    </header>
  );
};

export default Header;