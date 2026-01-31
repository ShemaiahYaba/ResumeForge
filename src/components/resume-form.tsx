"use client";

import * as React from "react";
import type { ResumeData, Template } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Badge,
  BookOpen,
  Briefcase,
  GraduationCap,
  Languages,
  Microscope,
  Palette,
  User,
  Users,
} from "lucide-react";

import PersonalInfoForm from "./resume-form/personal-info-form";
import ExperienceForm from "./resume-form/experience-form";
import EducationForm from "./resume-form/education-form";
import SkillsForm from "./resume-form/skills-form";
import TemplateSelectForm from "./resume-form/template-select-form";
import PublicationsForm from "./resume-form/publications-form";
import ResearchExperienceForm from "./resume-form/research-experience-form";
import ProfessionalMembershipsForm from "./resume-form/professional-memberships-form";
import LanguagesForm from "./resume-form/languages-form";
import ReferencesForm from "./resume-form/references-form";

type ResumeFormProps = {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData | null>>;
};

export default function ResumeForm({
  resumeData,
  setResumeData,
}: ResumeFormProps) {
  const handleUpdate = <K extends keyof ResumeData>(
    key: K,
    value: ResumeData[K],
  ) => {
    setResumeData((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["item-1", "item-2"]}
      className="w-full"
    >
      <AccordionItem value="item-5">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Palette className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Template</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <TemplateSelectForm
            currentTemplate={resumeData.template}
            onTemplateChange={(template: Template) =>
              handleUpdate("template", template)
            }
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <PersonalInfoForm
            personalInfo={resumeData.personalInfo}
            onUpdate={(newInfo) => handleUpdate("personalInfo", newInfo)}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Briefcase className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Work Experience</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ExperienceForm
            experience={resumeData.experience}
            onUpdate={(newExp) => handleUpdate("experience", newExp)}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <GraduationCap className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Education</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <EducationForm
            education={resumeData.education}
            onUpdate={(newEdu) => handleUpdate("education", newEdu)}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Badge className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Skills</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <SkillsForm
            skills={resumeData.skills}
            onUpdate={(newSkills) => handleUpdate("skills", newSkills)}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Publications</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <PublicationsForm
            publications={resumeData.publications ?? []}
            onUpdate={(newPublications) =>
              handleUpdate("publications", newPublications)
            }
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Microscope className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Research Experience</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ResearchExperienceForm
            researchExperience={resumeData.researchExperience ?? []}
            onUpdate={(newResearchExperience) =>
              handleUpdate("researchExperience", newResearchExperience)
            }
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-8">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Professional Memberships</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ProfessionalMembershipsForm
            professionalMemberships={resumeData.professionalMemberships ?? []}
            onUpdate={(newMemberships) =>
              handleUpdate("professionalMemberships", newMemberships)
            }
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-9">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">Languages</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <LanguagesForm
            languages={resumeData.languages ?? []}
            onUpdate={(newLanguages) => handleUpdate("languages", newLanguages)}
          />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-10">
        <AccordionTrigger>
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold">References</h3>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ReferencesForm
            references={resumeData.references ?? []}
            onUpdate={(newReferences) =>
              handleUpdate("references", newReferences)
            }
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
