"use client";

import * as React from 'react';
import type { Education } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type EducationFormProps = {
  education: Education[];
  onUpdate: (data: Education[]) => void;
};

export default function EducationForm({ education, onUpdate }: EducationFormProps) {
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null);

  const updateEducation = (index: number, newEducation: Partial<Education>) => {
    const newEducationList = [...education];
    newEducationList[index] = { ...newEducationList[index], ...newEducation };
    onUpdate(newEducationList);
  };

  const addEducation = () => {
    const newEducationList = [...education, {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      graduationDate: '',
      gpa: '',
    }];
    onUpdate(newEducationList);
  };

  const removeEducation = (index: number) => {
    const newEducationList = education.filter((_, i) => i !== index);
    onUpdate(newEducationList);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    setDraggedItem(id);
    e.currentTarget.classList.add('dragging');
  };

  const handleDragEnter = (id: string) => {
    if (draggedItem !== id) {
      setDragOverItem(id);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('dragging');
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDrop = () => {
    if (!draggedItem || !dragOverItem || draggedItem === dragOverItem) return;

    const dragIndex = education.findIndex(item => item.id === draggedItem);
    const dropIndex = education.findIndex(item => item.id === dragOverItem);

    if (dragIndex === -1 || dropIndex === -1) return;

    const reorderedEducation = [...education];
    const [removed] = reorderedEducation.splice(dragIndex, 1);
    reorderedEducation.splice(dropIndex, 0, removed);
    onUpdate(reorderedEducation);
  };

  return (
    <div className="space-y-6 p-1">
      {education.map((edu, index) => (
        <Card
          key={edu.id}
          draggable
          onDragStart={(e) => handleDragStart(e, edu.id)}
          onDragEnter={() => handleDragEnter(edu.id)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          className={cn(
            'relative cursor-grab',
            dragOverItem === edu.id && 'drag-over'
          )}
        >
          <GripVertical className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <CardContent className="pt-6 pl-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor={`school-${edu.id}`}>School/University</Label>
                <Input id={`school-${edu.id}`} value={edu.school} onChange={(e) => updateEducation(index, { school: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`degree-${edu.id}`}>Degree</Label>
                <Input id={`degree-${edu.id}`} value={edu.degree} onChange={(e) => updateEducation(index, { degree: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`fieldOfStudy-${edu.id}`}>Field of Study</Label>
                <Input id={`fieldOfStudy-${edu.id}`} value={edu.fieldOfStudy} onChange={(e) => updateEducation(index, { fieldOfStudy: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                <Input id={`startDate-${edu.id}`} type="month" value={edu.startDate} onChange={(e) => updateEducation(index, { startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`graduationDate-${edu.id}`}>Graduation Date</Label>
                <Input id={`graduationDate-${edu.id}`} type="month" value={edu.graduationDate} onChange={(e) => updateEducation(index, { graduationDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`gpa-${edu.id}`}>GPA (Optional)</Label>
                <Input id={`gpa-${edu.id}`} value={edu.gpa} onChange={(e) => updateEducation(index, { gpa: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="destructive" size="sm" onClick={() => removeEducation(index)}>
                Remove Education
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addEducation} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Education
      </Button>
    </div>
  );
}
