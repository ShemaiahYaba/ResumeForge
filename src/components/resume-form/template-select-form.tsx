"use client";

import * as React from 'react';
import Image from 'next/image';
import type { Template } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

type TemplateSelectFormProps = {
  currentTemplate: Template;
  onTemplateChange: (template: Template) => void;
};

const templates: { id: Template, name: string, imageId: string }[] = [
    { id: 'onyx', name: 'Onyx', imageId: 'template-onyx' },
    { id: 'sapphire', name: 'Sapphire', imageId: 'template-sapphire' },
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
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
            >
              {placeholder && (
                <Card className="mb-2 overflow-hidden">
                    <Image
                        src={placeholder.imageUrl}
                        alt={placeholder.description}
                        width={300}
                        height={424}
                        data-ai-hint={placeholder.imageHint}
                        className="object-cover transition-transform hover:scale-105"
                    />
                </Card>
              )}
              <span className="font-semibold">{template.name}</span>
            </Label>
          </div>
        );
      })}
    </RadioGroup>
  );
}
