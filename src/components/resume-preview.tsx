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

const RESUME_WIDTH = 794; // A4 width at 96 DPI
const RESUME_HEIGHT = 1123; // A4 height at 96 DPI

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
        
        // On mobile (narrow screens), we want to fit to width to keep it readable
        // and allow vertical scrolling. On desktop, we fit to both to keep it in view.
        const isMobile = window.innerWidth < 1024 || containerWidth < 700;
        
        // Use a smaller padding to maximize space
        const padding = isMobile ? 16 : 40;
        const widthScale = (containerWidth - padding) / RESUME_WIDTH;
        const heightScale = (containerHeight - padding) / RESUME_HEIGHT;
        
        const nextScale = isMobile 
          ? Math.min(widthScale, 1.1) 
          : Math.min(widthScale, heightScale, 1);

        setScale(Math.max(nextScale, 0.1));
      }
    };

    // Initial scale calculation
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
    <div
      ref={containerRef}
      className="w-full h-full flex flex-col items-center overflow-y-auto overflow-x-hidden p-2 sm:p-4 bg-muted/30"
    >
      <div 
        className="relative transition-transform duration-200"
        style={{
          width: RESUME_WIDTH,
          height: RESUME_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'top center',
          marginBottom: -RESUME_HEIGHT * (1 - scale) + 20,
        }}
      >
        <Card
          className="printable-area aspect-[210/297] w-[794px] h-[1123px] overflow-hidden shadow-2xl bg-white mx-auto"
        >
          {renderTemplate()}
        </Card>
      </div>
    </div>
  );
}
