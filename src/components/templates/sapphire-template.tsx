"use client";

import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const SapphireTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
  };
  
  const primaryColor = 'text-blue-800';
  const secondaryColor = 'text-gray-700';

  return (
    <div className="bg-white flex font-sans text-sm h-full">
      {/* Left Column */}
      <div className="w-1/3 bg-gray-100 p-8 text-gray-800">
        <header className="text-center mb-10">
          <h1 className={`text-3xl font-bold ${primaryColor}`}>{personalInfo.name}</h1>
        </header>

        <section className="mb-8">
          <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1 ${primaryColor}`}>Contact</h2>
          <div className="space-y-2 text-xs">
            {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={14} className={primaryColor} /><span>{personalInfo.phone}</span></div>}
            {personalInfo.email && <div className="flex items-center gap-2"><Mail size={14} className={primaryColor} /><span>{personalInfo.email}</span></div>}
            {personalInfo.address && <div className="flex items-center gap-2"><MapPin size={14} className={primaryColor} /><span>{personalInfo.address}</span></div>}
          </div>
        </section>

        <section className="mb-8">
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1 ${primaryColor}`}>Education</h2>
            {education.map(edu => (
            <div key={edu.id} className="mb-4 text-xs">
                <h3 className="text-sm font-semibold">{edu.degree}</h3>
                <p className="font-medium">{edu.school}</p>
                <p>{edu.fieldOfStudy}</p>
                <p className="text-gray-500">{formatDate(edu.graduationDate)}</p>
                {edu.gpa && <p className="text-gray-500">GPA: {edu.gpa}</p>}
            </div>
            ))}
        </section>
        
        <section>
            <h2 className={`text-lg font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1 ${primaryColor}`}>Skills</h2>
            {skills.map(category => (
            <div key={category.id} className="mb-4">
                <h3 className="font-semibold mb-1 text-sm">{category.name}</h3>
                <ul className="flex flex-wrap gap-1.5">
                {category.skills.map(skill => (
                    <li key={skill.id} className="bg-blue-200 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">{skill.name}</li>
                ))}
                </ul>
            </div>
            ))}
        </section>
      </div>
      
      {/* Right Column */}
      <div className="w-2/3 p-8">
        <section className="mb-8">
            <h2 className={`text-xl font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1 ${primaryColor}`}>Summary</h2>
            <p className={`${secondaryColor} leading-relaxed`}>{personalInfo.summary}</p>
        </section>

        <section>
          <h2 className={`text-xl font-bold uppercase tracking-wider mb-3 border-b-2 border-gray-300 pb-1 ${primaryColor}`}>Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <p className="text-xs font-medium text-gray-500">{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</p>
              </div>
              <div className="flex justify-between items-baseline mb-2">
                <p className="font-semibold text-base text-blue-700">{exp.company}</p>
                <p className="text-xs text-gray-500">{exp.location}</p>
              </div>
              <ul className="list-disc list-outside ml-4 ${secondaryColor} space-y-1.5 text-xs">
                {exp.bullets.map(bullet => (
                  <li key={bullet.id}>{bullet.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default SapphireTemplate;
