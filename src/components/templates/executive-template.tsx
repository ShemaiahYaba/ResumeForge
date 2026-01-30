"use client";

import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

const ExecutiveTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, skills } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'UTC' });
  };

  return (
    <div className="flex h-full bg-white font-sans text-sm">
      {/* Left Sidebar - Dark */}
      <div className="w-[30%] bg-slate-800 text-gray-200 p-7 pt-10">
        {/* Contact */}
        <div className="mb-7">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-100 mb-3">Contact</h3>
          <div className="space-y-3">
            {personalInfo.phone && (
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Phone:</p>
                <p className="text-xs text-gray-100">{personalInfo.phone}</p>
              </div>
            )}
            {personalInfo.email && (
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Email:</p>
                <p className="text-xs text-gray-100">{personalInfo.email}</p>
              </div>
            )}
            {personalInfo.address && (
              <div>
                <p className="text-[10px] text-gray-400 mb-0.5">Location:</p>
                <p className="text-xs text-gray-100">{personalInfo.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-7">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-100 border-b-2 border-blue-500 pb-1.5 mb-3">
              Relevant Skills
            </h3>
            {skills.map((category) => (
              <div key={category.id} className="mb-2">
                {category.skills.map((skill) => (
                  <p key={skill.id} className="text-xs text-gray-300 mb-1">
                    {skill.name}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-7">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-100 border-b-2 border-blue-500 pb-1.5 mb-3">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="text-xs font-bold text-gray-100">{edu.school}</p>
                <p className="text-xs text-gray-300">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>
                {edu.graduationDate && (
                  <p className="text-[10px] text-gray-400">{formatDate(edu.graduationDate)}</p>
                )}
                {edu.gpa && (
                  <p className="text-[10px] text-gray-400">GPA: {edu.gpa}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-[70%] p-10 pt-10">
        {/* Header */}
        <header className="mb-8 border-b-3 border-blue-600 pb-4">
          <h1 className="text-3xl font-bold text-slate-800 uppercase tracking-wider mb-1">
            {personalInfo.name}
          </h1>
          <p className="text-sm text-gray-600 uppercase tracking-wide">
            {experience.length > 0 ? experience[0].title : 'Professional'}
          </p>
        </header>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-gray-300 pb-1 mb-3">
              Professional Summary
            </h2>
            <p className="text-xs leading-relaxed text-slate-700">{personalInfo.summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 border-b-2 border-gray-300 pb-1 mb-3">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-5">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-xs font-bold text-slate-800">{exp.title}</h3>
                  <p className="text-[10px] text-gray-600">
                    {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                  </p>
                </div>
                <p className="text-xs text-blue-600 mb-2">
                  {exp.company} – {exp.location}
                </p>
                <ul className="space-y-1">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet.id} className="text-xs text-slate-700 pl-3">
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

export default ExecutiveTemplate;