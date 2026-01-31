export type PersonalInfo = {
  name: string;
  title?: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  summary: string;
  profileImageUrl?: string;
  website?: string;
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
  location?: string;
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

export type Publication = {
  id: string;
  title: string;
  authors: string;
  journal: string;
};

export type ResearchExperience = {
    id: string;
    activity: string;
};

export type ProfessionalMembership = {
    id: string;
    organization: string;
};

export type Template = 'onyx' | 'sapphire' | 'professional' | 'executive' | 'chronological' | 'traditional' | 'academic' | 'creative';

export type ResumeData = {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: SkillCategory[];
  certifications?: Certification[];
  languages?: Language[];
  publications?: Publication[];
  researchExperience?: ResearchExperience[];
  professionalMemberships?: ProfessionalMembership[];
  template: Template;
};