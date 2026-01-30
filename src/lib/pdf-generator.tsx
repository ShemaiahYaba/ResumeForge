import { pdf } from '@react-pdf/renderer';
import type { ResumeData } from './types';
import { ProfessionalPDFTemplate } from '@/components/pdf-templates/professional-pdf-template';
import { ExecutivePDFTemplate } from '@/components/pdf-templates/executive-pdf-template';
import React from 'react';

export async function generateResumePDF(resumeData: ResumeData): Promise<Blob> {
  // Select the appropriate PDF template based on resume template selection
  const PDFTemplate = resumeData.template === 'professional' 
    ? ProfessionalPDFTemplate 
    : ExecutivePDFTemplate;

  // Generate the PDF document
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