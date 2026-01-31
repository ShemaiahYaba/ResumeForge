import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personalInfo: {
    name: 'EMILY CARTER',
    title: 'Graphic Designer',
    phone: '+123-456-7890',
    email: 'hello@reallygreatsite.com',
    website: 'www.reallygreatsite.com',
    address: '123 Anywhere St, Any City, ST 12345',
    linkedin: '',
    summary: 'Creative and detail-oriented Graphic Designer with experience producing visually compelling digital and print assets for marketing, branding, and social media. Skilled in translating concepts into clean, engaging designs while meeting deadlines and brand guidelines. Collaborative team player with strong visual storytelling skills.',
    profileImageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
  },
  experience: [
    {
      id: `exp-${Date.now()}-1`,
      company: 'Brightwave Creative Agency',
      title: 'Graphic Designer',
      startDate: '2022',
      endDate: 'Present',
      location: '',
      bullets: [
        { id: `bullet-${Date.now()}-1`, text: 'Designed digital and print marketing materials including social media graphics, flyers, brochures, and web assets' },
        { id: `bullet-${Date.now()}-2`, text: 'Collaborated with marketing and content teams to develop visual concepts aligned with brand strategy' },
        { id: `bullet-${Date.now()}-3`, text: 'Created design systems and templates to ensure brand consistency across platforms' },
        { id: `bullet-${Date.now()}-4`, text: 'Delivered multiple projects simultaneously while meeting tight deadlines' },
        { id: `bullet-${Date.now()}-5`, text: 'Revised designs based on client and stakeholder feedback' },
      ],
    },
    {
      id: `exp-${Date.now()}-2`,
      company: 'Urban Media Studio',
      title: 'Junior Graphic Designer',
      startDate: '2020',
      endDate: '2022',
      location: '',
      bullets: [
        { id: `bullet-${Date.now()}-6`, text: 'Assisted senior designers with branding, logo development, and campaign visuals' },
        { id: `bullet-${Date.now()}-7`, text: 'Designed promotional graphics for social media, email campaigns, and presentations' },
        { id: `bullet-${Date.now()}-8`, text: 'Prepared final artwork files for print and digital distribution' },
        { id: `bullet-${Date.now()}-9`, text: 'Maintained organized design files and asset libraries' },
        { id: `bullet-${Date.now()}-10`, text: 'Supported creative brainstorming sessions and concept development' },
      ],
    },
  ],
  education: [
    {
      id: `edu-${Date.now()}`,
      school: 'University of California, Los Angeles',
      degree: 'Bachelor of Fine Arts (BFA) in Graphic Design',
      fieldOfStudy: '',
      startDate: '2016',
      graduationDate: '2020',
      location: 'Los Angeles',
      gpa: '3.9/4.0',
    },
  ],
  skills: [
    {
      id: `skillcat-${Date.now()}-1`,
      name: 'SKILLS',
      skills: [
        { id: `skill-${Date.now()}-1`, name: 'Figma & Canva' },
        { id: `skill-${Date.now()}-2`, name: 'Branding & Visual Identity' },
        { id: `skill-${Date.now()}-3`, name: 'Social Media Graphics' },
        { id: `skill-${Date.now()}-4`, name: 'Adobe Photoshop' },
        { id: `skill-${Date.now()}-5`, name: 'Basic Motion Graphics' },
      ],
    },
  ],
  certifications: [
    {
      id: `cert-${Date.now()}-1`,
      name: 'Adobe Certified Professional (Graphic Design & Illustration)',
      issuer: '',
      date: '',
    },
    {
      id: `cert-${Date.now()}-2`,
      name: 'Google UX Design Fundamentals (Optional placeholder)',
      issuer: '',
      date: '',
    },
  ],
  languages: [],
  publications: [],
  researchExperience: [],
  professionalMemberships: [],
  references: [],
  template: 'creative',
};
