import React from "react";
import "./index.css";

import Main from "./shared/components/Main";
import Header from "./shared/components/Header";
import Footer from "./shared/components/Footer";

const App: React.FC = () => {
  return (
    <section className="min-h-screen bg-white py-8 px-4 md:px-8 font-sans text-gray-800 antialiased">
      <Header
        name="Sasha Makarov"
        position="Frontend/Fullstack developer"
        photoSrc="./profile_photo.jpg"
        photoAlt="Sasha Makarov"
      />
      <Main
        about="A creative web developer with a strong passion for coding with
          experience in a commercial project. I specialize in creating clean,
          responsive interfaces and strong functionality using React +
          TypeScript. I'm looking for a part-time job or a junior+ position to
          grow in the team."
      ></Main>
      <Footer email="sayces@mail.ru" phone="+79997174837" />
    </section>
  );
};

export default App;
