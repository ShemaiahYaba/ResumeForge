'use client';
import type { ResumeData } from '@/lib/types';

export default function TraditionalTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills } = data;

  const sectionTitleClass = "text-lg font-bold text-[#b58a3f] border-b-2 border-[#b58a3f] pb-1 mb-4";

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-4xl font-bold text-[#b58a3f] tracking-wider">{personalInfo.name.toUpperCase()}</h1>
        {personalInfo.title && <h2 className="text-xl font-semibold text-gray-700 mt-1">{personalInfo.title.toUpperCase()}</h2>}
        <div className="flex justify-center items-center text-xs text-gray-500 mt-3 space-x-2">
          <span>{personalInfo.address}</span>
          <span className='text-[#b58a3f]'>|</span>
          <a href={`mailto:${personalInfo.email}`} className="hover:text-[#b58a3f]">{personalInfo.email}</a>
          <span className='text-[#b58a3f]'>|</span>
          <span>{personalInfo.phone}</span>
          <span className='text-[#b58a3f]'>|</span>
          <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#b58a3f]">{personalInfo.linkedin}</a>
        </div>
      </header>

      {/* Summary */}
      <section className="mb-6">
        <h3 className={sectionTitleClass}>SUMMARY</h3>
        <p className="text-sm">{personalInfo.summary}</p>
      </section>

      {/* Experience */}
      <section className="mb-6">
        <h3 className={sectionTitleClass}>PROFESSIONAL EXPERIENCE</h3>
        {experience.map((exp) => (
          <div key={exp.id} className="mb-4">
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-md">{exp.company}</h4>
              <span className="text-sm font-light text-gray-600">{exp.startDate} – {exp.endDate || 'Present'}</span>
            </div>
            <p className="text-md italic">{exp.title}</p>
            <ul className="list-disc list-inside mt-2 text-sm space-y-1 pl-2">
              {exp.bullets.map((bullet) => (
                <li key={bullet.id}>{bullet.text}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h3 className={sectionTitleClass}>EDUCATION</h3>
        {education.map((edu) => (
          <div key={edu.id}>
             <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-md">{edu.school}</h4>
              <span className="text-sm font-light text-gray-600">{edu.graduationDate}</span>
            </div>
            <p className="text-md">{edu.degree}</p>
          </div>
        ))}
      </section>

      {/* Additional Skills */}
      <section>
        <h3 className={sectionTitleClass}>ADDITIONAL SKILLS</h3>
        <ul className="list-disc list-inside text-sm columns-2">
            {skills.flatMap(category => category.skills).map(skill => (
                <li key={skill.id}>{skill.name}</li>
            ))}
        </ul>
      </section>
    </div>
  );
}
