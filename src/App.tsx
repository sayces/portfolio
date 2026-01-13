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
        position="Frontend/Fullstack developer"
        photoSrc="./profile_photo.jpg"
        photoAlt="Sasha Makarov"
      />
      <SectionBlock id="about" title="About me">
        <p className="text-lg text-gray-600 leading-relaxed">
          A creative web developer with a strong passion for coding with
          experience in a commercial project. I specialize in creating clean,
          responsive interfaces and strong functionality using React +
          TypeScript. I'm looking for a part-time job or a junior+ position to
          grow in the team.
        </p>
      </SectionBlock>
      <SectionBlock id="experience" title="Work Experience">
        <ContentItem
          date="2024"
          title="Sarawan Delivery"
          location="Moscow, Russia"
          href="https://sarawan.ru"
          techStack={[
            "Next.js",
            "TypeScript",
            "Tailwind CSS",
            "Leaflet",
            "React Hook Form",
            "RTK Query",
            "Redux",
            "Git Pull Requests",
          ]}
          description="A courier service web application with order tracking and management features."
          activities={[
            "developing a reusable website UI from scratch",
            "deployment on Vercel",
            "creating a route map for couriers using Leaflet library",
            
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
          techStack={[
            "Assembly",
            "Docker Compose",
            "Dockerfile",
            "Computer Architecture",
          ]}
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
          techStack={[
            "React",
            "JavaScript",
            "SCSS",
            "BEM",
            "Rest API",
            "React Router",
          ]}
        />
      </SectionBlock>
      <SectionBlock id="education" title="Education">
        <ContentItem
          date="2018 — 2023"
          title="Operating Systems and Programming"
          location="Moscow"
          href="https://collegetsaritsyno.mskobr.ru"
          techStack={[
            "Figma",
            "Python",
            "HTML",
            "CSS",
            "JavaScript",
            "SQL",
            "MySQL",
            "GridCSS",
            "Flexbox",
            "Algorithms",
          ]}
        />
      </SectionBlock>
      <Footer />
    </MainContainer>
  );
};

export default App;
