"use client";

import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

const ProfessionalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', timeZone: 'UTC' });
  };

  return (
    <div className="flex h-full bg-white text-gray-800 font-sans text-sm">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-gray-50 p-8">
        {/* Contact Info */}
        <div className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">Contact</h3>
          <div className="space-y-1">
            {personalInfo.phone && (
              <p className="text-xs text-gray-600">{personalInfo.phone}</p>
            )}
            {personalInfo.email && (
              <p className="text-xs text-gray-600">{personalInfo.email}</p>
            )}
            {personalInfo.address && (
              <p className="text-xs text-gray-600">{personalInfo.address}</p>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">Skills</h3>
            {skills.map((category) => (
              <div key={category.id} className="mb-3">
                <h4 className="text-xs font-semibold mb-1 text-gray-800">{category.name}</h4>
                <ul className="space-y-0.5">
                  {category.skills.map((skill) => (
                    <li key={skill.id} className="text-xs text-gray-600">
                      • {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wide mb-2 text-gray-800">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3">
                <p className="text-xs font-semibold text-gray-800">{edu.degree}</p>
                <p className="text-xs text-gray-600">{edu.school}</p>
                {edu.graduationDate && (
                  <p className="text-xs text-gray-500">{formatDate(edu.graduationDate)}</p>
                )}
                {edu.gpa && (
                  <p className="text-xs text-gray-500">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[65%] p-10">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">{personalInfo.name}</h1>
          <p className="text-base text-blue-600">
            {experience.length > 0 ? experience[0].title : 'Professional'}
          </p>
        </header>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 border-b-2 border-blue-600 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 border-b-2 border-blue-600 pb-1 mb-3">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <h3 className="text-xs font-bold text-gray-800">{exp.title}</h3>
                <p className="text-xs text-blue-600">{exp.company}</p>
                <p className="text-xs text-gray-500 mb-2">
                  {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                </p>
                <ul className="space-y-1">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet.id} className="text-xs text-gray-700 pl-3">
                      • {bullet.text}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;