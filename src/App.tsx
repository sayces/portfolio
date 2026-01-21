import React from "react";
import "./index.css";

import Main from "./shared/components/Main/Main";
import Header from "./shared/components/Header/Header";
import Footer from "./shared/components/Footer";
import { useContent } from "./shared/context/ContentContext.tsx";

const App: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="min-h-screen bg-white py-8 px-4 md:px-8 font-sans text-gray-800 antialiased">
      <Header />
      <Main />
      <Footer email={content.email} phone={content.phone} />
    </section>
  );
};

export default App;
