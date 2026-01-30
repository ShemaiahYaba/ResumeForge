"use client";

import * as React from 'react';
import type { Experience } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GripVertical, Plus, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

type ExperienceFormProps = {
  experience: Experience[];
  onUpdate: (data: Experience[]) => void;
};

export default function ExperienceForm({ experience, onUpdate }: ExperienceFormProps) {
  const [draggedItem, setDraggedItem] = React.useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = React.useState<string | null>(null);

  const updateExperience = (index: number, newExperience: Partial<Experience>) => {
    const newExperienceList = [...experience];
    newExperienceList[index] = { ...newExperienceList[index], ...newExperience };
    onUpdate(newExperienceList);
  };

  const addExperience = () => {
    const newExperienceList = [...experience, {
      id: `exp-${Date.now()}`,
      company: '',
      title: '',
      startDate: '',
      endDate: '',
      location: '',
      bullets: [{ id: `bullet-${Date.now()}`, text: '' }],
    }];
    onUpdate(newExperienceList);
  };

  const removeExperience = (index: number) => {
    const newExperienceList = experience.filter((_, i) => i !== index);
    onUpdate(newExperienceList);
  };

  const addBullet = (expIndex: number) => {
    const newExperienceList = [...experience];
    newExperienceList[expIndex].bullets.push({ id: `bullet-${Date.now()}`, text: '' });
    onUpdate(newExperienceList);
  };

  const updateBullet = (expIndex: number, bulletIndex: number, text: string) => {
    const newExperienceList = [...experience];
    newExperienceList[expIndex].bullets[bulletIndex].text = text;
    onUpdate(newExperienceList);
  };

  const removeBullet = (expIndex: number, bulletIndex: number) => {
    const newExperienceList = [...experience];
    newExperienceList[expIndex].bullets = newExperienceList[expIndex].bullets.filter((_, i) => i !== bulletIndex);
    onUpdate(newExperienceList);
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

    const dragIndex = experience.findIndex(item => item.id === draggedItem);
    const dropIndex = experience.findIndex(item => item.id === dragOverItem);

    if (dragIndex === -1 || dropIndex === -1) return;

    const reorderedExperience = [...experience];
    const [removed] = reorderedExperience.splice(dragIndex, 1);
    reorderedExperience.splice(dropIndex, 0, removed);
    onUpdate(reorderedExperience);
  };

  return (
    <div className="space-y-6 p-1">
      {experience.map((exp, expIndex) => (
        <Card
          key={exp.id}
          draggable
          onDragStart={(e) => handleDragStart(e, exp.id)}
          onDragEnter={() => handleDragEnter(exp.id)}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDrop={handleDrop}
          className={cn(
            'relative cursor-grab',
            dragOverItem === exp.id && 'drag-over'
          )}
        >
          <GripVertical className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <CardContent className="pt-6 pl-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`company-${exp.id}`}>Company</Label>
                <Input id={`company-${exp.id}`} value={exp.company} onChange={(e) => updateExperience(expIndex, { company: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`title-${exp.id}`}>Title</Label>
                <Input id={`title-${exp.id}`} value={exp.title} onChange={(e) => updateExperience(expIndex, { title: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                <Input id={`startDate-${exp.id}`} type="month" value={exp.startDate} onChange={(e) => updateExperience(expIndex, { startDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                <Input id={`endDate-${exp.id}`} type="month" value={exp.endDate} onChange={(e) => updateExperience(expIndex, { endDate: e.target.value })} placeholder="Or 'Present'" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor={`location-${exp.id}`}>Location</Label>
                <Input id={`location-${exp.id}`} value={exp.location} onChange={(e) => updateExperience(expIndex, { location: e.target.value })} />
              </div>
              <div className="md:col-span-2 space-y-4">
                <Label>Accomplishments/Responsibilities</Label>
                {exp.bullets.map((bullet, bulletIndex) => (
                  <div key={bullet.id} className="flex items-center gap-2">
                    <Textarea
                      value={bullet.text}
                      onChange={(e) => updateBullet(expIndex, bulletIndex, e.target.value)}
                      placeholder={`Bullet point ${bulletIndex + 1}`}
                      className="min-h-[60px]"
                    />
                    <Button variant="ghost" size="icon" onClick={() => removeBullet(expIndex, bulletIndex)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={() => addBullet(expIndex)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Bullet Point
                </Button>
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button variant="destructive" size="sm" onClick={() => removeExperience(expIndex)}>
                Remove Experience
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addExperience} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Experience
      </Button>
    </div>
  );
}
