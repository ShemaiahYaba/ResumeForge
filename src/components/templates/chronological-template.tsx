'use client';

import type { ResumeData } from '@/lib/types';

type TemplateProps = {
  data: ResumeData;
};

const ChronologicalTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, languages } = data;

  const formatDate = (date: string | null | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  const formatYear = (date: string | null | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      timeZone: 'UTC',
    });
  };

  const primaryColor = '#90C373'; // A shade of green from the image

  const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <section className="mb-6">
      <h2
        className="text-xs font-bold uppercase inline-block px-2 py-1 mb-3 text-white"
        style={{ backgroundColor: primaryColor }}
      >
        {title}
      </h2>
      {children}
    </section>
  );

  return (
    <div className="bg-white p-8 font-sans text-gray-800 text-[10pt]">
      <header className="flex justify-between items-start mb-4 pb-4 border-b-2" style={{ borderColor: primaryColor }}>
        <div>
          <h1 className="text-4xl font-extrabold tracking-wide uppercase">{personalInfo.name}</h1>
          <p className="text-md font-semibold tracking-widest" style={{ color: primaryColor }}>
            {personalInfo.title ? personalInfo.title.toUpperCase() : "CHRONOLOGICAL RESUME"}
          </p>
        </div>
        <div className="text-right text-xs whitespace-nowrap">
          <p>{personalInfo.address}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <p>{personalInfo.linkedin}</p>
        </div>
      </header>

      <main>
        {personalInfo.summary && (
          <Section title="Summary">
            <p className="text-xs leading-relaxed">{personalInfo.summary}</p>
          </Section>
        )}

        {education.length > 0 && (
          <Section title="Education">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-xs mb-2">
                <div>
                  <p className="font-bold" style={{ color: primaryColor }}>{edu.degree}</p>
                  <p className="italic">{edu.school}</p>
                  {edu.gpa && <p className="font-bold mt-1">GPA: {edu.gpa}</p>}
                </div>
                <p className="text-gray-600 font-semibold">
                  {formatYear(edu.startDate)} - {formatYear(edu.graduationDate)}
                </p>
              </div>
            ))}
          </Section>
        )}

        {experience.length > 0 && (
          <Section title="Relevant Experience">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4 text-xs">
                <div className="flex justify-between items-baseline mb-1">
                    <div>
                        <p className="font-bold" style={{ color: primaryColor }}>{exp.company}</p>
                        <p className="italic font-semibold">{exp.title}</p>
                    </div>
                    <p className="text-gray-600 font-semibold">
                        {formatDate(exp.startDate)} – {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                    </p>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1">
                  {exp.bullets.map((bullet) => (
                    <li key={bullet.id}>{bullet.text}</li>
                  ))}
                </ul>
              </div>
            ))}
          </Section>
        )}

        {skills.length > 0 && (
          <Section title="Skills">
            <ul className="list-disc list-outside pl-4 space-y-1 text-xs">
              {skills.flatMap(cat => cat.skills).map((skill) => (
                <li key={skill.id}>{skill.name}</li>
              ))}
            </ul>
          </Section>
        )}

        {certifications && certifications.length > 0 && (
            <Section title="Certifications">
                 <ul className="list-disc list-outside pl-4 space-y-1 text-xs">
                    {certifications.map(cert => <li key={cert.id}>{cert.name}</li>)}
                </ul>
            </Section>
        )}

        {languages && languages.length > 0 && (
            <Section title="Languages">
                 <ul className="list-disc list-outside pl-4 space-y-1 text-xs">
                    {languages.map(lang => (
                      <li key={lang.id}>
                        {lang.name}
                        {lang.fluency ? ` — ${lang.fluency}` : ''}
                      </li>
                    ))}
                </ul>
            </Section>
        )}
      </main>
    </div>
  );
};

export default ChronologicalTemplate;
