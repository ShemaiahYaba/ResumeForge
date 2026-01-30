import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personalInfo: {
    name: 'Your Name',
    email: 'your.email@example.com',
    phone: '123-456-7890',
    address: 'Your City, State',
    summary: 'A brief professional summary about you. Highlight your key skills, experience, and career goals. Keep it concise and impactful.',
  },
  experience: [
    {
      id: `exp-${Date.now()}`,
      company: 'Awesome Company Inc.',
      title: 'Software Engineer',
      startDate: '2022-01',
      endDate: '',
      location: 'San Francisco, CA',
      bullets: [
        { id: `bullet-${Date.now()}-1`, text: 'Developed and maintained web applications using React and Node.js.' },
        { id: `bullet-${Date.now()}-2`, text: 'Collaborated with cross-functional teams to define, design, and ship new features.' },
      ],
    },
  ],
  education: [
    {
      id: `edu-${Date.now()}`,
      school: 'University of Example',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      graduationDate: '2021-12',
      gpa: '3.8',
    },
  ],
  skills: [
    {
      id: `skillcat-${Date.now()}-1`,
      name: 'Programming Languages',
      skills: [
        { id: `skill-${Date.now()}-1`, name: 'JavaScript' },
        { id: `skill-${Date.now()}-2`, name: 'TypeScript' },
        { id: `skill-${Date.now()}-3`, name: 'Python' },
      ],
    },
    {
      id: `skillcat-${Date.now()}-2`,
      name: 'Frameworks & Libraries',
      skills: [
        { id: `skill-${Date.now()}-4`, name: 'React' },
        { id: `skill-${Date.now()}-5`, name: 'Next.js' },
        { id: `skill-${Date.now()}-6`, name: 'Node.js' },
      ],
    },
  ],
  template: 'professional', // Updated to use new template
};