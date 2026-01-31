import type { ResumeData } from './types';

export const initialData: ResumeData = {
  personalInfo: {
    name: 'Jordan Brown',
    email: 'jordanbrown@email.com',
    phone: '(555) 456-7821',
    address: '152 Dallas, TX',
    linkedin: 'linkedin.com/in/jordanbrown',
    summary: 'Early-career Sales Manager with progressive experience in sales support, client engagement, and team coordination. Demonstrates strong communication skills, goal-oriented mindset, and the ability to support revenue growth while learning sales strategy and leadership fundamentals.',
  },
  experience: [
    {
      id: `exp-${Date.now()}-1`,
      company: 'Summit Edge Consulting',
      title: 'Junior Sales Manager',
      startDate: '2024-09',
      endDate: null,
      location: 'Dallas, TX',
      bullets: [
        { id: `bullet-${Date.now()}-1`, text: 'Support sales strategy execution under senior management guidance' },
        { id: `bullet-${Date.now()}-2`, text: 'Assist in onboarding and training new sales team members' },
        { id: `bullet-${Date.now()}-3`, text: 'Monitor sales activities and contribute to performance reports' },
        { id: `bullet-${Date.now()}-4`, text: 'Maintain client relationships and handle basic account management' },
        { id: `bullet-${Date.now()}-5`, text: 'Participate in setting and tracking monthly sales goals' },
      ],
    },
    {
      id: `exp-${Date.now()}-2`,
      company: 'BrightPath Retail Group',
      title: 'Sales Associate',
      startDate: '2022-06',
      endDate: '2024-08',
      location: 'Dallas, TX',
      bullets: [
        { id: `bullet-${Date.now()}-6`, text: 'Assisted customers with product selection and inquiries' },
        { id: `bullet-${Date.now()}-7`, text: 'Supported daily sales floor operations and inventory checks' },
        { id: `bullet-${Date.now()}-8`, text: 'Met individual sales targets through effective communication' },
        { id: `bullet-${Date.now()}-9`, text: 'Maintained accurate transaction records and customer data' },
        { id: `bullet-${Date.now()}-10`, text: 'Collaborated with team members to improve customer experience' },
      ],
    },
  ],
  education: [
    {
      id: `edu-${Date.now()}`,
      school: 'University of Texas at Dallas',
      degree: 'Bachelor of Science in Business Administration',
      fieldOfStudy: 'Business Administration',
      startDate: '2018-08',
      graduationDate: '2022-05',
      gpa: '3.79/4.00',
    },
  ],
  skills: [
    {
      id: `skillcat-${Date.now()}-1`,
      name: 'Sales & CRM',
      skills: [
        { id: `skill-${Date.now()}-1`, name: 'Sales Coordination & Support' },
        { id: `skill-${Date.now()}-2`, name: 'Client Relationship Management' },
        { id: `skill-${Date.now()}-3`, name: 'Lead Tracking & Follow-Ups' },
        { id: `skill-${Date.now()}-4`, name: 'CRM Software (Placeholder)' },
        { id: `skill-${Date.now()}-5`, name: 'Sales Reporting' },
      ],
    },
  ],
  certifications: [
      {
          id: `cert-${Date.now()}-1`,
          name: 'Customer Relationship Management (CRM) Training - Placeholder',
          issuer: 'CRM Solutions',
          date: '2023-05',
      },
      {
          id: `cert-${Date.now()}-2`,
          name: 'Sales Management Essentials - Placeholder',
          issuer: 'Management Experts',
          date: '2024-02',
      },
  ],
  languages: [
      {
          id: `lang-${Date.now()}-1`,
          name: 'English',
          fluency: 'Native / Fluent',
      },
      {
          id: `lang-${Date.now()}-2`,
          name: 'Spanish',
          fluency: 'Conversational',
      },
  ],
  template: 'chronological',
};