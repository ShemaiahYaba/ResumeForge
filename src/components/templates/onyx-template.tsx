"use client";

import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const OnyxTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
  };
  
  return (
    <div className="p-10 text-gray-800 bg-white font-sans text-sm">
      <header className="text-center mb-8 border-b-2 border-gray-300 pb-4">
        <h1 className="text-4xl font-bold text-gray-900 tracking-wider">{personalInfo.name}</h1>
        <div className="flex justify-center items-center space-x-4 mt-3 text-gray-600">
          {personalInfo.email && <div className="flex items-center gap-1.5"><Mail size={14} /><span>{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-1.5"><Phone size={14} /><span>{personalInfo.phone}</span></div>}
          {personalInfo.address && <div className="flex items-center gap-1.5"><MapPin size={14} /><span>{personalInfo.address}</span></div>}
        </div>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-3 text-gray-800">Summary</h2>
        <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-3 text-gray-800">Experience</h2>
        {experience.map(exp => (
          <div key={exp.id} className="mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
            <div className="flex justify-between items-baseline">
                <p className="font-medium text-gray-700">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.location}</p>
            </div>
            <p className="text-xs text-gray-500 mb-2">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
            <ul className="list-disc list-outside ml-5 text-gray-700 space-y-1">
              {exp.bullets.map(bullet => (
                <li key={bullet.id}>{bullet.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-3 text-gray-800">Education</h2>
        {education.map(edu => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
                <p className="text-xs text-gray-500">{formatDate(edu.graduationDate)}</p>
            </div>
            <p className="font-medium text-gray-700">{edu.degree} in {edu.fieldOfStudy}</p>
            {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold border-b-2 border-gray-200 pb-2 mb-3 text-gray-800">Skills</h2>
        {skills.map(category => (
          <div key={category.id} className="mb-3">
            <h3 className="font-semibold text-gray-800 mr-2 inline">{category.name}:</h3>
            <p className="inline text-gray-700">
              {category.skills.map(skill => skill.name).join(', ')}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OnyxTemplate;
