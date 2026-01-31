'use client';

import type { ResumeData } from '@/lib/types';
import ProfessionalTemplate from './templates/professional-template';
import ExecutiveTemplate from './templates/executive-template';
import ChronologicalTemplate from './templates/chronological-template';
import TraditionalTemplate from './templates/traditional-template';
import AcademicTemplate from './templates/academic-template';
import CreativeTemplate from './templates/creative-template';
import { Card } from '@/components/ui/card';

type ResumePreviewProps = {
  resumeData: ResumeData;
};

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
      case 'chronological':
        return <ChronologicalTemplate data={resumeData} />;
      case 'traditional':
        return <TraditionalTemplate data={resumeData} />;
      case 'academic':
        return <AcademicTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      default:
        return <ProfessionalTemplate data={resumeData} />;
    }
  };

  return (
    // A4 aspect ratio: 1 / 1.414. Width is 8.5in, height 11in. Or 210mm/297mm
    <div className="w-full lg:w-auto lg:h-full flex justify-center items-start lg:sticky lg:top-20">
      <Card
        className="printable-area aspect-[210/297] w-full max-w-[840px] lg:w-[794px] h-auto lg:h-[1123px] overflow-hidden shadow-lg bg-white scale-95 lg:scale-100 origin-top"
      >
        {renderTemplate()}
      </Card>
    </div>
  );
}
