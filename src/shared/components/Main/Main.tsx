import React from "react";
import SectionBlock from "../SectionBlock";
import ContentItem from "../ContentItem";
import EditableText from "../EditableUI/EditableText";
import { useContent } from "@/shared/context/ContentContext";
import { supabase } from "@/lib/supabase/client";

const classNames = {
  main: "",
  sectionTitle: "text-2xl font-bold mb-6 text-gray-800",
  aboutText: "text-lg text-gray-700 leading-relaxed",
};

const Main: React.FC = () => {
  const { content, updateNested } = useContent();

  const handleRemoveTech = async (
    section: "experience" | "projects" | "education",
    idx: number,
    tech: string,
  ) => {
    const item = content[section][idx];
    const newTechStack = item.tech_stack.filter((t) => t !== tech);

    // Локально
    await updateNested(`${section}.${idx}.tech_stack`, newTechStack);

    if (!item.id) return; // на всякий случай

    // В БД — только по id
    const { error } = await supabase
      .from(section)
      .update({ tech_stack: newTechStack })
      .eq("id", item.id);

    if (error) {
      console.error(`Error updating ${section}:`, error);
    }
  };

  const handleRenameTech = async (
    section: "experience" | "projects" | "education",
    idx: number,
    oldName: string,
    newName: string,
  ) => {
    const item = content[section][idx];
    const newTechStack = item.tech_stack.map((t) =>
      t === oldName ? newName : t,
    );

    // Локально
    await updateNested(`${section}.${idx}.tech_stack`, newTechStack);

    if (!item.id) return;

    // В БД — по id
    const { error } = await supabase
      .from(section)
      .update({ tech_stack: newTechStack })
      .eq("id", item.id);

    if (error) {
      console.error(`Error updating ${section}:`, error);
    }
  };

  const handleAddTech = async (
    section: "experience" | "projects" | "education",
    idx: number,
    tech: string,
  ) => {
    const item = content[section][idx];
    const newTechStack = [...item.tech_stack, tech];

    // Локально
    await updateNested(`${section}.${idx}.tech_stack`, newTechStack);

    if (!item.id) return;

    // В БД — по id
    const { error } = await supabase
      .from(section)
      .update({ tech_stack: newTechStack })
      .eq("id", item.id);

    if (error) {
      console.error(`Error updating ${section}:`, error);
    }
  };

  return (
    <main className={classNames.main}>
      <SectionBlock id="about" title="About me">
        <EditableText
          field="about"
          initialValue={content.about}
          className={classNames.aboutText}
          multiline
          placeholder="Tell about yourself..."
        />
      </SectionBlock>

      <SectionBlock id="experience" title="Work Experience">
        {content.experience.map((exp, idx) => (
          <ContentItem
            key={idx}
            uniqueId={`experience-${idx}`}
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
                  multiline
                />
              ) : null
            }
            activities={exp.activities}
            onRemoveTech={(tech) => handleRemoveTech("experience", idx, tech)}
            onRenameTech={(oldName, newName) =>
              handleRenameTech("experience", idx, oldName, newName)
            }
            onAddTech={(tech) => handleAddTech("experience", idx, tech)}
          />
        ))}
      </SectionBlock>

      <SectionBlock id="projects" title="Side Projects">
        {content.projects.map((proj, idx) => (
          <ContentItem
            key={idx}
            uniqueId={`project-${idx}`}
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
            onRemoveTech={(tech) => handleRemoveTech("projects", idx, tech)}
            onRenameTech={(oldName, newName) =>
              handleRenameTech("projects", idx, oldName, newName)
            }
            onAddTech={(tech) => handleAddTech("projects", idx, tech)}
          />
        ))}
      </SectionBlock>

      <SectionBlock id="education" title="Education">
        {content.education.map((edu, idx) => (
          <ContentItem
            key={idx}
            uniqueId={`education-${idx}`}
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
            onRemoveTech={(tech) => handleRemoveTech("education", idx, tech)}
            onRenameTech={(oldName, newName) =>
              handleRenameTech("education", idx, oldName, newName)
            }
            onAddTech={(tech) => handleAddTech("education", idx, tech)}
          />
        ))}
      </SectionBlock>
    </main>
  );
};

export default Main;
