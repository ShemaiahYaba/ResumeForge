"use client";

import type { ResumeData } from '@/lib/types';
import OnyxTemplate from './templates/onyx-template';
import SapphireTemplate from './templates/sapphire-template';
import ProfessionalTemplate from './templates/professional-template';
import ExecutiveTemplate from './templates/executive-template';
import { Card } from '@/components/ui/card';

type ResumePreviewProps = {
  resumeData: ResumeData;
};

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'onyx':
        return <OnyxTemplate data={resumeData} />;
      case 'sapphire':
        return <SapphireTemplate data={resumeData} />;
      case 'professional':
        return <ProfessionalTemplate data={resumeData} />;
      case 'executive':
        return <ExecutiveTemplate data={resumeData} />;
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