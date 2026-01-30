export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  location: string;
  bullets: { id: string; text: string }[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  graduationDate: string;
  gpa: string;
};

export type Skill = {
  id: string;
  name: string;
};

export type SkillCategory = {
  id: string;
  name: string;
  skills: Skill[];
};

// Updated to include the new templates
export type Template = 'onyx' | 'sapphire' | 'professional' | 'executive';

export type ResumeData = {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  template: Template;
};