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
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
  };

  const formatMonthYear = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const month = date.toLocaleDateString('en-US', { month: 'long', timeZone: 'UTC' });
    const year = date.getFullYear();
    return `${month} ${year}`;
  }

  const primaryColor = '#b59458'; // Gold
  const secondaryColor = '#434E60'; // Dark Slate Blue

  return (
    <div className="bg-white p-10 font-serif text-[10.5pt] leading-normal">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-[0.2em]" style={{ color: primaryColor }}>
          {personalInfo.name}
        </h1>
        {personalInfo.jobTitle && (
          <p className="text-xl font-light tracking-[0.1em] text-gray-600 mt-2">
            {personalInfo.jobTitle}
          </p>
        )}
        <div className="mt-6 border-t border-gray-300 pt-4">
          <div className="flex justify-center items-center text-xs text-gray-500 space-x-6">
              {personalInfo.phone && <p>{personalInfo.phone}</p>}
              {personalInfo.email && <p>{personalInfo.email}</p>}
              {personalInfo.website && <p>{personalInfo.website}</p>}
              {personalInfo.address && <p>{personalInfo.address}</p>}
              {personalInfo.linkedin && <p>linkedin.com/in/{personalInfo.linkedin}</p>}
              {personalInfo.twitter && <p>twitter.com/{personalInfo.twitter}</p>}
          </div>
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="text-center italic text-gray-600 text-sm mb-8 px-4">
          <p>{personalInfo.summary}</p>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mt-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold uppercase" style={{ color: secondaryColor }}>{exp.company}</h3>
                  <p className="text-sm text-gray-500 italic">{exp.title}</p>
                </div>
                <div className="text-right text-xs text-gray-500 min-w-[120px]">
                  <p>{exp.location}</p>
                  <p>{formatMonthYear(exp.startDate)} - {exp.endDate ? formatMonthYear(exp.endDate) : 'Present'}</p>
                </div>
              </div>
              <ul className="mt-2 list-disc list-outside pl-5 space-y-1 text-sm text-gray-700">
                {exp.bullets.map((bullet) => (
                  <li key={bullet.id}>{bullet.text}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mt-4 flex justify-between items-start">
              <div>
                <p className="font-bold" style={{ color: secondaryColor }}>{edu.degree}</p>
                <p className="text-sm text-gray-500 italic">{edu.school}{edu.location ? `, ${edu.location}` : ''}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>{edu.gpa ? `${edu.gpa} GPA` : ''}</p>
                <p>{edu.graduationDate ? formatDate(edu.graduationDate) : ''}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest pb-2 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
            Skills
          </h2>
          <div className="mt-2 text-sm text-gray-700">
            {skills.map((category) => (
              <ul key={category.id} className="list-disc list-outside pl-5">
                {category.skills.map((skill) => (
                  <li key={skill.id}>{skill.name}</li>
                ))}
              </ul>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProfessionalTemplate;
