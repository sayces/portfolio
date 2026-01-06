import React from "react";
import "./index.css";

import MainContainer from "./shared/components/MainContainer";
import Header from "./shared/components/Header";
import SectionBlock from "./shared/components/SectionBlock";
import ContentItem from "./shared/components/ContentItem";
import Footer from "./shared/components/Footer";

const App: React.FC = () => {
  return (
    <MainContainer>
      <Header
        name="Sasha Makarov"
        position="Frontend developer"
        photoSrc="/your-photo.jpg"
        photoAlt="Sasha Makarov"
      />
      <SectionBlock id="about" title="About">
        <p className="text-lg text-gray-600 leading-relaxed">
          A practical and creative junior frontend developer with experience in
          a commercial project. I specialize in creating clean, responsive React
          interfaces with TypeScript. I'm looking for a part-time job or a
          junior+/middle position to grow in the team.
        </p>
      </SectionBlock>
      <SectionBlock id="experience" title="Work Experience">
        <ContentItem
          date="2025"
          title="Sarawan Delivery"
          location="Moscow, Russia"
          href="https://sarawan.ru"
          techStack={[
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "REST API",
            "Leaflet",
            "React Hook Form",
            "RTK Query",
            "Redux",
          ]}
        />
      </SectionBlock>
      <SectionBlock id="projects" title="Side Projects">
        <ContentItem
          date="Staged"
          title="Chemistry 2"
          href="https://github.com/sayces/chemistry2"
          techStack={["Next.js", "TypeScript", "Tailwind CSS"]}
        />
        <ContentItem
          date="Staged"
          title="Simple coding"
          href="https://github.com/sayces/simple-coding"
          techStack={["Assembly", "Docker Compose", "Dockerfile", "Computer Architecture"]}
        />
        
        <ContentItem
          date="2024"
          title="DOM Skills"
          href="https://github.com/sayces/dom-skills"
          techStack={["JavaScript", "HTML", "DOM"]}
        />
        <ContentItem
          date="2023"
          title="Chemistry"
          href="https://github.com/sayces/chemistry"
          techStack={["React", "JavaScript", "SCSS", "BEM"]}
        />

      </SectionBlock>
      <SectionBlock id="education" title="Education">
        <ContentItem
          date="2018 — 2023"
          title="Operating Systems and Programming"
          location="Moscow"
          href="https://collegetsaritsyno.mskobr.ru"
          techStack={["Figma", "Python", "HTML", "CSS", "JavaScript", "SQL", "MySQL", "GridCSS", "Flexbox", "Algorithms"]}
        />
      </SectionBlock>
      <Footer />
    </MainContainer>
  );
};

export default App;
