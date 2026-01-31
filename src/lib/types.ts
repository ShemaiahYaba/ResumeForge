export type PersonalInfo = {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  summary: string;
};

export type Experience = {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string | null; // Can be null if it's the current job
  location: string;
  bullets: { id: string; text: string }[];
};

export type Education = {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  graduationDate: string;
  gpa?: string; // GPA is optional
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

export type Certification = {
  id: string;
  name: string;
  issuer: string;
  date: string;
};

export type Language = {
  id: string;
  name: string;
  fluency: string;
};

export type Template = 'onyx' | 'sapphire' | 'professional' | 'executive' | 'chronological';

export type ResumeData = {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  certifications?: Certification[]; // Optional array of certifications
  languages?: Language[]; // Optional array of languages
  template: Template;
};