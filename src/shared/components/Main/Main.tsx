import React from "react";
import SectionBlock from "../SectionBlock";
import ContentItem from "../ContentItem";
import EditableText from "../EditableUI/EditableText";
import { useContent } from "@/shared/context/ContentContext";

const classNames = {
  main: "",
  sectionTitle: "text-2xl font-bold mb-6 text-gray-800",
  aboutText: "text-lg text-gray-700 leading-relaxed",
};

const Main: React.FC = () => {
  const { content } = useContent();

  return (
    <main className={classNames.main}>
      <SectionBlock id="about" title="About me">
        <EditableText
          field="about"
          initialValue={content.about}
          className={classNames.aboutText}
          multiline
          placeholder="Расскажите о себе..."
        />
      </SectionBlock>

      <SectionBlock id="experience" title="Work Experience">
        {content.experience.map((exp, idx) => (
          <ContentItem
            key={idx}
            date={
              <EditableText
                field={`experience.${idx}.date_str`}
                initialValue={exp.date_str}
                className="text-lg font-semibold text-gray-700"
              />
            }
            title={
              <EditableText
                field={`experience.${idx}.title`}
                initialValue={exp.title}
                className="text-xl font-bold hover:underline"
              />
            }
            location={
              exp.location ? (
                <EditableText
                  field={`experience.${idx}.location`}
                  initialValue={exp.location}
                  className="text-gray-600"
                />
              ) : null
            }
            href={exp.href}
            techStack={exp.tech_stack}
            description={
              exp.description ? (
                <EditableText
                  field={`experience.${idx}.description`}
                  initialValue={exp.description}
                  className="text-gray-600 mt-2"
                />
              ) : null
            }
            activities={exp.activities}
          />
        ))}
      </SectionBlock>

      <SectionBlock id="projects" title="Side Projects">
        {content.projects.map((proj, idx) => (
          <ContentItem
            key={idx}
            date={
              <EditableText
                field={`projects.${idx}.date_str`}
                initialValue={proj.date_str}
                className="text-gray-500"
              />
            }
            title={
              <EditableText
                field={`projects.${idx}.title`}
                initialValue={proj.title}
                className="font-medium hover:underline"
              />
            }
            href={proj.href}
            techStack={proj.tech_stack}
          />
        ))}
      </SectionBlock>

      <SectionBlock id="education" title="Education">
        {content.education.map((edu, idx) => (
          <ContentItem
            key={idx}
            date={
              <EditableText
                field={`education.${idx}.date_str`}
                initialValue={edu.date_str}
                className="text-gray-600"
              />
            }
            title={
              <EditableText
                field={`education.${idx}.title`}
                initialValue={edu.title}
                className="font-medium"
              />
            }
            location={
              edu.location ? (
                <EditableText
                  field={`education.${idx}.location`}
                  initialValue={edu.location}
                  className="text-gray-600"
                />
              ) : null
            }
            href={edu.href}
            techStack={edu.tech_stack}
          />
        ))}
      </SectionBlock>
    </main>
  );
};

export default Main;