import React from 'react';

const classNames = {
  main: 'min-h-screen bg-white py-8 px-4 md:px-8 font-sans text-gray-800 antialiased',
};

const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={classNames.main}>
      {children}
    </div>
  );
};

export default MainContainer;