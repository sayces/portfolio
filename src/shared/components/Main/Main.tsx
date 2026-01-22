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
  const { content, updateContentItem } = useContent();

  const handleUpdateTechStack = async (
    section: "experience" | "projects" | "education",
    idx: number,
    newTechStack: string[],
  ) => {
    await updateContentItem(section, idx, { tech_stack: newTechStack });
  };

  const handleRemoveTech = async (
    section: "experience" | "projects" | "education",
    idx: number,
    tech: string,
  ) => {
    const item = content[section][idx];
    const newTechStack = item.tech_stack.filter((t) => t !== tech);
    await handleUpdateTechStack(section, idx, newTechStack);
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
    await handleUpdateTechStack(section, idx, newTechStack);
  };

  const handleAddTech = async (
    section: "experience" | "projects" | "education",
    idx: number,
    tech: string,
  ) => {
    const item = content[section][idx];
    const newTechStack = [...item.tech_stack, tech];
    await handleUpdateTechStack(section, idx, newTechStack);
  };

  const handleUpdateDescription = async (
    section: "experience" | "projects" | "education",
    idx: number,
    description: string,
  ) => {
    await updateContentItem(section, idx, { description });
  };

  const handleUpdateActivities = async (
    section: "experience" | "projects" | "education",
    idx: number,
    activities: string[],
  ) => {
    await updateContentItem(section, idx, { activities });
  };

  const handleDeleteActivity = async (
    section: "experience" | "projects" | "education",
    idx: number,
    activityIndex: number,
  ) => {
    const item = content[section][idx];
    const newActivities = item.activities.filter((_, i) => i !== activityIndex);
    await updateContentItem(section, idx, { activities: newActivities });
  };

  const handleAddActivity = async (
    section: "experience" | "projects" | "education",
    idx: number,
  ) => {
    const item = content[section][idx];
    const newActivities = [...item.activities, "New activity"];
    await updateContentItem(section, idx, { activities: newActivities });
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
            key={exp.id || idx}
            uniqueId={`experience-${idx}`}
            sectionPath={`experience[${idx}]`}
            date={
              <EditableText
                field={`experience[${idx}].date_str`}
                initialValue={exp.date_str}
                className="text-lg font-semibold text-gray-700"
              />
            }
            title={
              <EditableText
                field={`experience[${idx}].title`}
                initialValue={exp.title}
                className="text-xl font-bold hover:underline"
              />
            }
            location={
              exp.location ? (
                <EditableText
                  field={`experience[${idx}].location`}
                  initialValue={exp.location}
                  className="text-gray-600"
                />
              ) : null
            }
            href={exp.href}
            techStack={exp.tech_stack}
            description={exp.description}
            activities={exp.activities}
            onRemoveTech={(tech) => handleRemoveTech("experience", idx, tech)}
            onRenameTech={(oldName, newName) =>
              handleRenameTech("experience", idx, oldName, newName)
            }
            onAddTech={(tech) => handleAddTech("experience", idx, tech)}
            onUpdateDescription={(desc) =>
              handleUpdateDescription("experience", idx, desc)
            }
            onUpdateActivities={(activities) =>
              handleUpdateActivities("experience", idx, activities)
            }
            onDeleteActivity={(activityIndex) =>
              handleDeleteActivity("experience", idx, activityIndex)
            }
            onAddActivity={() => handleAddActivity("experience", idx)}
          />
        ))}
      </SectionBlock>

      <SectionBlock id="projects" title="Side Projects">
        {content.projects.map((proj, idx) => (
          <ContentItem
            key={proj.id || idx}
            uniqueId={`project-${idx}`}
            sectionPath={`projects[${idx}]`}
            date={
              <EditableText
                field={`projects[${idx}].date_str`}
                initialValue={proj.date_str}
                className="text-gray-500"
              />
            }
            title={
              <EditableText
                field={`projects[${idx}].title`}
                initialValue={proj.title}
                className="font-medium hover:underline"
              />
            }
            href={proj.href}
            techStack={proj.tech_stack}
            description={proj.description}
            activities={proj.activities}
            onRemoveTech={(tech) => handleRemoveTech("projects", idx, tech)}
            onRenameTech={(oldName, newName) =>
              handleRenameTech("projects", idx, oldName, newName)
            }
            onAddTech={(tech) => handleAddTech("projects", idx, tech)}
            onUpdateDescription={(desc) =>
              handleUpdateDescription("projects", idx, desc)
            }
            onUpdateActivities={(activities) =>
              handleUpdateActivities("projects", idx, activities)
            }
            onDeleteActivity={(activityIndex) =>
              handleDeleteActivity("projects", idx, activityIndex)
            }
            onAddActivity={() => handleAddActivity("projects", idx)}
          />
        ))}
      </SectionBlock>

      <SectionBlock id="education" title="Education">
        {content.education.map((edu, idx) => (
          <ContentItem
            key={edu.id || idx}
            uniqueId={`education-${idx}`}
            sectionPath={`education[${idx}]`}
            date={
              <EditableText
                field={`education[${idx}].date_str`}
                initialValue={edu.date_str}
                className="text-gray-600"
              />
            }
            title={
              <EditableText
                field={`education[${idx}].title`}
                initialValue={edu.title}
                className="font-medium"
              />
            }
            location={
              edu.location ? (
                <EditableText
                  field={`education[${idx}].location`}
                  initialValue={edu.location}
                  className="text-gray-600"
                />
              ) : null
            }
            href={edu.href}
            techStack={edu.tech_stack}
            description={edu.description}
            activities={edu.activities}
            onRemoveTech={(tech) => handleRemoveTech("education", idx, tech)}
            onRenameTech={(oldName, newName) =>
              handleRenameTech("education", idx, oldName, newName)
            }
            onAddTech={(tech) => handleAddTech("education", idx, tech)}
            onUpdateDescription={(desc) =>
              handleUpdateDescription("education", idx, desc)
            }
            onUpdateActivities={(activities) =>
              handleUpdateActivities("education", idx, activities)
            }
            onDeleteActivity={(activityIndex) =>
              handleDeleteActivity("education", idx, activityIndex)
            }
            onAddActivity={() => handleAddActivity("education", idx)}
          />
        ))}
      </SectionBlock>
    </main>
  );
};

export default Main;
