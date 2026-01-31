'use client';

import * as React from 'react';
import Image from 'next/image';
import type { Template } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

type TemplateSelectFormProps = {
  currentTemplate: Template;
  onTemplateChange: (template: Template) => void;
};

const templates: { id: Template; name: string; imageId: string; description: string }[] = [
  { 
    id: 'professional', 
    name: 'Professional', 
    imageId: 'template-professional',
    description: 'Clean sidebar layout with blue accents'
  },
  { 
    id: 'executive', 
    name: 'Executive', 
    imageId: 'template-executive',
    description: 'Modern dark sidebar design'
  },
  {
    id: 'chronological',
    name: 'Chronological',
    imageId: 'template-chronological',
    description: 'A classic single-column resume design'
  },
];

export default function TemplateSelectForm({ currentTemplate, onTemplateChange }: TemplateSelectFormProps) {
  return (
    <RadioGroup
      value={currentTemplate}
      onValueChange={(value: Template) => onTemplateChange(value)}
      className="grid grid-cols-2 gap-4 pt-2"
    >
      {templates.map(template => {
        const placeholder = PlaceHolderImages.find(p => p.id === template.imageId);
        return (
          <div key={template.id}>
            <RadioGroupItem value={template.id} id={template.id} className="peer sr-only" />
            <Label
              htmlFor={template.id}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
            >
              {placeholder ? (
                <Card className="mb-2 overflow-hidden w-full">
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    width={300}
                    height={424}
                    data-ai-hint={placeholder.imageHint}
                    className="object-cover transition-transform hover:scale-105 w-full h-auto"
                  />
                </Card>
              ) : (
                <div className="mb-2 w-full h-40 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-500 text-sm">{template.name}</span>
                </div>
              )}
              <div className="text-center">
                <span className="font-semibold block">{template.name}</span>
                <span className="text-xs text-muted-foreground">{template.description}</span>
              </div>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}