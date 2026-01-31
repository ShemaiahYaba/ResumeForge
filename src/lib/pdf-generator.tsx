import { pdf } from '@react-pdf/renderer';
import type { ResumeData } from './types';
import { ProfessionalPDFTemplate } from '@/components/pdf-templates/professional-pdf-template';
import { ExecutivePDFTemplate } from '@/components/pdf-templates/executive-pdf-template';
import { ChronologicalPDFTemplate } from '@/components/pdf-templates/chronological-pdf-template';
import { TraditionalPDFTemplate } from '@/components/pdf-templates/traditional-pdf-template';
import { AcademicPDFTemplate } from '@/components/pdf-templates/academic-pdf-template';
import { CreativePDFTemplate } from '@/components/pdf-templates/creative-pdf-template';
import React from 'react';

export async function generateResumePDF(resumeData: ResumeData): Promise<Blob> {
  let PDFTemplate = ProfessionalPDFTemplate;

  switch (resumeData.template) {
    case 'executive':
      PDFTemplate = ExecutivePDFTemplate;
      break;
    case 'chronological':
      PDFTemplate = ChronologicalPDFTemplate;
      break;
    case 'traditional':
      PDFTemplate = TraditionalPDFTemplate;
      break;
    case 'academic':
      PDFTemplate = AcademicPDFTemplate;
      break;
    case 'creative':
      PDFTemplate = CreativePDFTemplate;
      break;
    case 'professional':
    default:
      PDFTemplate = ProfessionalPDFTemplate;
      break;
  }

  const doc = <PDFTemplate data={resumeData} />;
  
  // Convert to blob
  const blob = await pdf(doc).toBlob();
  
  return blob;
}

export function downloadPDF(blob: Blob, filename: string = 'resume.pdf') {
  // Create download link
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  
  // Trigger download
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function generateAndDownloadPDF(
  resumeData: ResumeData, 
  filename?: string
): Promise<void> {
  try {
    const blob = await generateResumePDF(resumeData);
    const name = filename || `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
    downloadPDF(blob, name);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
}
