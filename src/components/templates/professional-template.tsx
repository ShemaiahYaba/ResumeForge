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
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.toLocaleDateString('en-US', { year: 'numeric', timeZone: 'UTC' });
    return `${month} ${year}`;
  };

  return (
    <div className="flex h-full bg-white font-sans">
      {/* Left Sidebar - Light Gray */}
      <div className="w-[35%] bg-[#f5f5f5] p-8 pt-12">
        {/* Skills Section */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-gray-800">
              Skills
            </h3>
            <div className="space-y-4">
              {skills.map((category) => (
                <div key={category.id}>
                  <h4 className="text-xs font-semibold mb-2 text-gray-700">{category.name}</h4>
                  <div className="space-y-1">
                    {category.skills.map((skill) => (
                      <p key={skill.id} className="text-xs text-gray-600 leading-relaxed">
                        {skill.name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-gray-800">
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-4">
                <p className="text-xs font-bold text-gray-800 mb-1">
                  {edu.degree}
                </p>
                <p className="text-[11px] font-semibold text-gray-700 mb-1">
                  {edu.school}
                </p>
                <p className="text-[11px] text-gray-600">
                  {edu.graduationDate && formatDate(edu.graduationDate)}
                  {edu.gpa && ` • ${edu.gpa} GPA`}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content - Right Side */}
      <div className="w-[65%] p-12 pt-16">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[32px] font-bold text-gray-900 uppercase tracking-wide mb-2">
            {personalInfo.name}
          </h1>
          
          {/* Contact Info Row */}
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-gray-700 mb-3">
            {personalInfo.address && <p>{personalInfo.address}</p>}
            {personalInfo.phone && <p>{personalInfo.phone}</p>}
            {personalInfo.email && <p>{personalInfo.email}</p>}
          </div>
        </header>

        {/* Professional Experience */}
        {experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-4 pb-1 border-b border-gray-300">
              Professional Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="mb-6">
                <div className="mb-2">
                  <h3 className="text-sm font-bold text-gray-900">{exp.title}</h3>
                  <div className="flex justify-between items-baseline">
                    <p className="text-xs font-semibold text-gray-700 uppercase">
                      {exp.company}
                    </p>
                    <p className="text-xs text-gray-600">
                      {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </p>
                  </div>
                  {exp.location && (
                    <p className="text-xs text-gray-600">{exp.location}</p>
                  )}
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

        {/* Professional Summary */}
        {personalInfo.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-800 mb-4 pb-1 border-b border-gray-300">
              Professional Summary
            </h2>
            <p className="text-xs text-gray-700 leading-relaxed">
              {personalInfo.summary}
            </p>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProfessionalTemplate;