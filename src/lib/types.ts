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
  endDate: string | null;
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
  gpa?: string;
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

export type Reference = {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
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

export type Template = 'professional' | 'executive' | 'chronological' | 'traditional' | 'academic' | 'creative';

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
  references?: Reference[];
  template: Template;
};
