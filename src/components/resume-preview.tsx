'use client';

import { useState, useEffect, useRef } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const containerHeight = containerRef.current.clientHeight;
        const resumeWidth = 794; // A4 width at 96 DPI
        const resumeHeight = 1123; // A4 height at 96 DPI
        const widthScale = containerWidth / resumeWidth;
        const heightScale = containerHeight / resumeHeight;
        const nextScale = Math.min(widthScale, heightScale, 1);

        setScale(nextScale);
      }
    };

    // Initial scale calculation
    // Delay to ensure container has been rendered and has a width
    setTimeout(updateScale, 100);

    // Update scale on window resize
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, []);

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
    // This container is used to measure the available width
    <div
      ref={containerRef}
      className="w-full h-full flex justify-center items-start overflow-hidden"
    >
      {/* The Card is the resume itself, with a fixed A4 size */}
      <Card
        className="printable-area aspect-[210/297] w-[794px] h-[1123px] overflow-hidden shadow-lg bg-white"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top',
        }}
      >
        {renderTemplate()}
      </Card>
    </div>
  );
}
