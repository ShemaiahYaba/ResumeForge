'use client';
import type { ResumeData } from '@/lib/types';
import Image from 'next/image';

// Define the props for the CreativeTemplate component
export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personalInfo, experience, education, skills, certifications } = data;

  const sectionTitleClass = "text-lg font-bold text-gray-800 uppercase tracking-wider mb-4";

  return (
    <div className="flex font-sans text-sm bg-white">
      {/* Left Column */}
      <div className="w-1/3 bg-yellow-50 p-8 space-y-8">
        {personalInfo.profileImageUrl && (
            <div className="flex justify-center">
                <Image
                    src={personalInfo.profileImageUrl}
                    alt={personalInfo.name}
                    width={128}
                    height={128}
                    className="rounded-full"
                />
            </div>
        )}

        <section>
          <h3 className="text-yellow-500 font-bold text-lg mb-3 uppercase tracking-wider">Contact</h3>
          <div className="space-y-2 text-gray-700 text-xs">
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.email}</p>
            {personalInfo.website && <p>{personalInfo.website}</p>}
            <p>{personalInfo.address}</p>
          </div>
        </section>

        <section>
          <h3 className="text-yellow-500 font-bold text-lg mb-3 uppercase tracking-wider">Professional Profile</h3>
          <p className="text-gray-700 text-xs">{personalInfo.summary}</p>
        </section>

        <section>
          <h3 className="text-yellow-500 font-bold text-lg mb-3 uppercase tracking-wider">Skills</h3>
          <ul className="list-disc list-inside text-gray-700 text-xs space-y-1">
            {skills.map(skillCategory => skillCategory.skills.map(skill => <li key={skill.id}>{skill.name}</li>))}
          </ul>
        </section>
      </div>

      {/* Right Column */}
      <div className="w-2/3 p-8">
        <header className="mb-8">
          <h1 className="text-5xl font-extrabold text-yellow-400 uppercase">{personalInfo.name.split(' ')[0]}</h1>
          <h1 className="text-5xl font-extrabold text-yellow-400 uppercase">{personalInfo.name.split(' ').slice(1).join(' ')}</h1>
          {personalInfo.title && <h2 className="text-xl font-semibold text-gray-600 mt-2">{personalInfo.title}</h2>}
        </header>

        <main>
            {experience && experience.length > 0 && (
            <section className="mb-8">
                <h3 className={sectionTitleClass}>Experience</h3>
                {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                    <h4 className="font-bold text-md text-gray-800">{exp.company} - {exp.title}</h4>
                    <p className="text-gray-500 text-xs mb-2">{exp.startDate} &ndash; {exp.endDate}</p>
                    <ul className="list-disc list-inside text-xs space-y-1">
                        {exp.bullets.map(bullet => <li key={bullet.id}>{bullet.text}</li>)}
                    </ul>
                </div>
                ))}
            </section>
            )}

            {education && education.length > 0 && (
            <section className="mb-8">
                <h3 className={sectionTitleClass}>Education</h3>
                {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                    <h4 className="font-bold text-md">{edu.degree} in {edu.fieldOfStudy}</h4>
                    <p className="italic">{edu.school} - {edu.location}</p>
                    <p className="text-gray-500 text-xs">{edu.startDate} &ndash; {edu.graduationDate}</p>
                    {edu.gpa && <p className="text-gray-500 text-xs">GPA: {edu.gpa}</p>}
                </div>
                ))}
            </section>
            )}

            {certifications && certifications.length > 0 && (
            <section>
                <h3 className={sectionTitleClass}>Certifications</h3>
                <ul className="list-disc list-inside text-xs space-y-1">
                    {certifications.map(cert => <li key={cert.id}>{cert.name}</li>)}
                </ul>
            </section>
            )}
        </main>
      </div>
    </div>
  );
}
