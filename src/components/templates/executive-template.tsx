"use client";

import type { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

type TemplateProps = {
  data: ResumeData;
};

const ExecutiveTemplate = ({ data }: TemplateProps) => {
  const { personalInfo, experience, education, skills, certifications, references } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    return `${month}/${year}`;
  };

  const formatYearRange = (startDate: string, endDate: string | null) => {
    if (!startDate) return '';
    const startYear = new Date(startDate).getUTCFullYear();
    const endYear = endDate ? new Date(endDate).getUTCFullYear() : 'Present';
    return `${startYear} - ${endYear}`;
  }

  const headerStyle = {
    background: 'linear-gradient(to right, #d8609c, #a059a4)',
  };

  const primaryColor = '#d8609c';
  const dividerColor = '#1f2937';

  const formatLinkedIn = (value?: string) => {
    if (!value) return '';
    const trimmed = value.trim();
    const withoutScheme = trimmed.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
    if (withoutScheme.includes('linkedin.com')) return withoutScheme;
    return `linkedin.com/in/${withoutScheme}`;
  };

  return (
    <div className="bg-white font-sans text-sm">
      {/* Header */}
      <header style={headerStyle} className="text-white text-center p-8">
        <h1 className="text-4xl font-bold uppercase tracking-wider">{personalInfo.name}</h1>
        {personalInfo.title && (
          <p className="text-lg uppercase tracking-wide mt-2">{personalInfo.title}</p>
        )}
      </header>

      <div className="flex">
        {/* Left Column */}
        <div className="w-[38%] p-8 border-r-2" style={{ borderColor: dividerColor }}>
          {/* Contact */}
          <section className="mb-8">
            <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-4">Contact</h2>
            <div className="space-y-3 text-xs">
              {personalInfo.phone && <p className="flex items-start gap-3"><Phone size={14} className="mt-[1px]" /> {personalInfo.phone}</p>}
              {personalInfo.email && <p className="flex items-start gap-3"><Mail size={14} className="mt-[1px]" /> {personalInfo.email}</p>}
              {personalInfo.address && <p className="flex items-start gap-3"><MapPin size={14} className="mt-[1px]" /> {personalInfo.address}</p>}
              {personalInfo.linkedin && <p className="flex items-start gap-3"><Linkedin size={14} className="mt-[1px]" /> {formatLinkedIn(personalInfo.linkedin)}</p>}
              {personalInfo.website && <p className="flex items-start gap-3"><Globe size={14} className="mt-[1px]" /> {personalInfo.website}</p>}
            </div>
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section className="mb-8">
              <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-4">Education</h2>
              {education.map(edu => (
                <div key={edu.id} className="text-xs mb-4">
                  <p className="font-bold uppercase">{edu.school}</p>
                  {edu.location && <p className="uppercase">{edu.location}</p>}
                  <p className="italic mt-1">{edu.degree}</p>
                  <p className="text-gray-600 mt-1">{formatYearRange(edu.startDate, edu.graduationDate)}</p>
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-4">Relevant Skills</h2>
              <ul className="list-disc list-inside text-xs space-y-1">
                {skills.flatMap(cat => cat.skills).map(skill => <li key={skill.id}>{skill.name}</li>)}
              </ul>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section>
              <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-4">Certifications</h2>
              <ul className="list-disc list-inside text-xs space-y-1">
                {certifications.map(cert => <li key={cert.id}>{cert.name}</li>)}
              </ul>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="w-[62%] p-8">
          {/* Professional Summary */}
          {personalInfo.summary && (
            <section className="mb-8">
              <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-3">Professional Summary</h2>
              <p className="text-xs leading-relaxed text-gray-700">{personalInfo.summary}</p>
            </section>
          )}

          {/* Professional Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-4">Professional Experience</h2>
              {experience.map(exp => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-baseline gap-4">
                    <p className="font-bold text-sm">{exp.company}{exp.location ? ` - ${exp.location}` : ''}</p>
                    <p className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'PRESENT'}
                    </p>
                  </div>
                  <p className="italic font-semibold text-sm mb-2">{exp.title}</p>
                  <ul className="list-disc list-outside pl-5 space-y-1 text-xs text-gray-700">
                    {exp.bullets.map(bullet => <li key={bullet.id}>{bullet.text}</li>)}
                  </ul>
                </div>
              ))}
            </section>
          )}
          
          {/* References */}
          {references && references.length > 0 && (
            <section>
              <h2 style={{ color: primaryColor }} className="text-lg font-bold uppercase mb-4">Reference</h2>
              <div className="grid grid-cols-2 gap-6 text-xs">
                {references.map(ref => (
                  <div key={ref.id}>
                    <p className="font-bold">{ref.name}</p>
                    <p>{ref.title}</p>
                    <p>Phone: {ref.phone}</p>
                    <p>Email: {ref.email}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
