import React from "react";
import SectionBlock from "./SectionBlock";
import ContentItem from "./ContentItem";

const classNames = {
  main: "",
};

type MainProps = {
  about: string;
  children?: React.ReactNode;
};

const Main: React.FC<MainProps> = ({ about, children }) => {
  return (
    <main className={classNames.main}>
      <SectionBlock id="about" title="About me">
        <p className="text-lg text-gray-600 leading-relaxed">
          {about}
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
      {children}
    </main>
  );
};

export default Main;
