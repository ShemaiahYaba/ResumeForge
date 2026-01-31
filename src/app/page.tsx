'use client';

import { useState, useEffect, useCallback } from 'react';
import { Download, Loader2, Save, Share2, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import type { ResumeData } from '@/lib/types';
import { initialData } from '@/lib/data';
import { generateAndDownloadPDF } from '@/lib/pdf-generator';
import ResumeForm from '@/components/resume-form';
import ResumePreview from '@/components/resume-preview';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function Home() {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleSave = useCallback(
    (data: ResumeData) => {
      setIsSaving(true);
      try {
        localStorage.setItem('resumeData', JSON.stringify(data));
        setLastSaved(new Date());
        toast({
          title: "Saved!",
          description: "Your resume has been saved locally.",
        });
      } catch (error) {
        console.error("Failed to save to localStorage", error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem saving your resume.",
        });
      } finally {
        setTimeout(() => setIsSaving(false), 1000);
      }
    },
    [toast]
  );

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('resumeData');
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      } else {
        setResumeData(initialData);
      }
    } catch (error) {
      console.error("Failed to load from localStorage", error);
      setResumeData(initialData);
    }
  }, []);

  useEffect(() => {
    if (!resumeData) return;

    const handler = setTimeout(() => {
      handleSave(resumeData);
    }, 2000);

    return () => {
      clearTimeout(handler);
    };
  }, [resumeData, handleSave]);

  const handleDownloadPDF = async () => {
    if (!resumeData) return;
    
    setIsGeneratingPDF(true);
    try {
      await generateAndDownloadPDF(resumeData);
      toast({
        title: "Success!",
        description: "Your resume PDF has been downloaded.",
      });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      toast({
        variant: "destructive",
        title: "PDF Generation Failed",
        description: "There was a problem generating your PDF. Please try again.",
      });
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (!resumeData) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="no-print sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
        <h1 className="text-xl font-bold text-primary flex items-center gap-2">
          <Share2 className="w-6 h-6"/>
          ResumeForge
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Saving...</span>
              </>
            ) : (
              lastSaved && <span className="hidden sm:inline">Saved {lastSaved.toLocaleTimeString()}</span>
            )}
          </div>
          <Button variant="outline" onClick={() => handleSave(resumeData)} disabled={isSaving}>
            <Save className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Save Now</span>
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Print</span>
          </Button>
          <Button onClick={handleDownloadPDF} disabled={isGeneratingPDF}>
            {isGeneratingPDF ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline ml-2">Generating...</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline ml-2">Download PDF</span>
              </>
            )}
          </Button>
        </div>
      </header>
      <main className="flex-1 grid h-[calc(100vh-4rem)] w-full max-w-[1400px] mx-auto grid-cols-1 gap-4 p-4 md:grid-cols-2 md:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(360px,860px)] lg:items-start">
        <div className="no-print h-full overflow-y-auto lg:max-w-3xl pb-24 lg:pb-0">
          <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
        </div>
        <div className="print-container hidden lg:flex items-start justify-center lg:sticky lg:top-20 lg:self-start">
          <ResumePreview resumeData={resumeData} />
        </div>
      </main>
      <footer className="no-print fixed bottom-0 z-10 flex h-16 w-full items-center justify-center border-t bg-background/80 px-4 backdrop-blur-sm lg:hidden">
        <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Eye className="h-4 w-4" />
                <span className="ml-2">See Preview</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] h-[85vh] flex flex-col">
              <DialogHeader>
                <DialogTitle>Resume Preview</DialogTitle>
              </DialogHeader>
              <div className="flex-1 overflow-auto p-4 flex justify-center items-start">
                <ResumePreview resumeData={resumeData} />
              </div>
            </DialogContent>
          </Dialog>
      </footer>
    </div>
  );
}
