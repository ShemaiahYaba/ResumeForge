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
    const month = date.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  return (
    <div className="flex h-full bg-white font-sans">
      {/* Left Sidebar - Dark */}
      <div className="w-[28%] bg-[#2d3e50] text-white p-8 pt-12">
        {/* Contact Section */}
        <div className="mb-8">
          <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white">
            Contact
          </h3>
          <div className="space-y-3 text-[10px]">
            {personalInfo.phone && (
              <div>
                <p className="text-gray-400 mb-0.5">Phone:</p>
                <p className="text-white">{personalInfo.phone}</p>
              </div>
            )}
            {personalInfo.email && (
              <div>
                <p className="text-gray-400 mb-0.5">Email:</p>
                <p className="text-white break-words">{personalInfo.email}</p>
              </div>
            )}
            {personalInfo.address && (
              <div>
                <p className="text-gray-400 mb-0.5">Location:</p>
                <p className="text-white">{personalInfo.address}</p>
              </div>
            )}
          </div>
        </div>

        {/* Relevant Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white">
              Relevant Skills
            </h3>
            <div className="space-y-2">
              {skills.flatMap((category) => 
                category.skills.map((skill) => (
                  <p key={skill.id} className="text-[10px] text-gray-300 leading-relaxed">
                    {skill.name}
                  </p>
                ))
              )}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-4 text-white">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="text-[11px] font-bold text-white mb-1">
                  {edu.school}
                </p>
                <p className="text-[10px] text-gray-300 mb-1">
                  {edu.degree}
                </p>
                {edu.fieldOfStudy && (
                  <p className="text-[10px] text-gray-300 mb-1">
                    {edu.fieldOfStudy}
                  </p>
                )}
                <p className="text-[10px] text-gray-400">
                  {edu.graduationDate && formatDate(edu.graduationDate)}
                </p>
                {edu.gpa && (
                  <p className="text-[10px] text-gray-400">
                    GPA: {edu.gpa}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Right Side */}
      <div className="w-[72%] p-12 pt-16">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[28px] font-bold text-gray-900 uppercase tracking-wide mb-1">
            {personalInfo.name}
          </h1>
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
            {experience.length > 0 ? experience[0].title : 'Professional'}
          </p>
          <div className="mt-3 pt-3 border-t-2 border-gray-300"></div>
        </header>

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Professional Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-4">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="mb-2">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                    <p className="text-[10px] text-gray-600 whitespace-nowrap ml-4">
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-[#3b7ea1]">
                    {exp.company} {exp.location && `– ${exp.location}`}
                  </p>
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet.id} className="text-xs text-gray-700 leading-relaxed pl-4 relative">
                      <span className="absolute left-0">•</span>
                      {bullet.text}
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