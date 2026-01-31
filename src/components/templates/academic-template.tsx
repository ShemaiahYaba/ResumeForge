'use client';
import type { ResumeData, Publication, ProfessionalMembership, ResearchExperience } from '@/lib/types';

// Define the props for the AcademicTemplate component
export default function AcademicTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, education, publications, researchExperience, professionalMemberships } = data;

  const sectionTitleClass = "text-lg font-bold text-[#2d5a9d] border-b-2 border-[#2d5a9d] pb-1 mb-4";

  return (
    <div className="p-8 bg-white text-gray-800 font-sans text-sm">
      {/* Header */}
      <header className="grid grid-cols-2 gap-x-8 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-[#2d5a9d] tracking-wider">{personalInfo.name.toUpperCase()}</h1>
          {personalInfo.title && <h2 className="text-xl font-semibold text-gray-700 mt-1">{personalInfo.title.toUpperCase()}</h2>}
        </div>
        <div className="text-sm space-y-1 text-right">
            <p><strong>Phone:</strong> {personalInfo.phone}</p>
            <p><strong>Email:</strong> <a href={`mailto:${personalInfo.email}`} className="hover:text-[#2d5a9d]">{personalInfo.email}</a></p>
            <p><strong>Address:</strong> {personalInfo.address}</p>
            <p><strong>LinkedIn:</strong> <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#2d5a9d]">{personalInfo.linkedin}</a></p>
        </div>
      </header>

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h3 className={sectionTitleClass}>EDUCATION</h3>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <h4 className="font-bold text-md">{edu.degree}</h4>
              <p className="italic">{edu.fieldOfStudy}</p>
              <p>{edu.school}</p>
              <p className="text-gray-500 text-xs">{edu.startDate} &ndash; {edu.graduationDate}</p>
            </div>
          ))}
        </section>
      )}

      {/* Publications */}
      {publications && publications.length > 0 && (
        <section className="mb-6">
          <h3 className={sectionTitleClass}>PUBLICATIONS</h3>
          {publications.map((pub: Publication) => (
            <div key={pub.id} className="mb-3">
              <p className='font-bold'>"{pub.title.toUpperCase()}"</p>
              <p>{pub.authors}</p>
              <p className="italic">{pub.journal}</p>
            </div>
          ))}
        </section>
      )}

      {/* Research Experience */}
      {researchExperience && researchExperience.length > 0 && (
        <section className="mb-6">
          <h3 className={sectionTitleClass}>RESEARCH EXPERIENCE</h3>
          <ul className="list-disc list-inside space-y-1">
            {researchExperience.map((exp: ResearchExperience) => (
              <li key={exp.id}>{exp.activity}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Professional Memberships */}
      {professionalMemberships && professionalMemberships.length > 0 && (
        <section>
          <h3 className={sectionTitleClass}>PROFESSIONAL MEMBERSHIPS</h3>
          <ul className="list-disc list-inside space-y-1">
            {professionalMemberships.map((mem: ProfessionalMembership) => (
              <li key={mem.id}>{mem.organization}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
