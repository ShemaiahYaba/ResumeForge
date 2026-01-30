"use client";

import type { SkillCategory, Skill } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type SkillsFormProps = {
  skills: SkillCategory[];
  onUpdate: (data: SkillCategory[]) => void;
};

export default function SkillsForm({ skills, onUpdate }: SkillsFormProps) {

  const updateCategoryName = (catIndex: number, name: string) => {
    const newSkills = [...skills];
    newSkills[catIndex].name = name;
    onUpdate(newSkills);
  };

  const addCategory = () => {
    onUpdate([...skills, {
      id: `skillcat-${Date.now()}`,
      name: 'New Category',
      skills: [],
    }]);
  };

  const removeCategory = (catIndex: number) => {
    onUpdate(skills.filter((_, i) => i !== catIndex));
  };
  
  const addSkill = (catIndex: number) => {
    const newSkills = [...skills];
    newSkills[catIndex].skills.push({ id: `skill-${Date.now()}`, name: 'New Skill' });
    onUpdate(newSkills);
  };

  const updateSkillName = (catIndex: number, skillIndex: number, name: string) => {
    const newSkills = [...skills];
    newSkills[catIndex].skills[skillIndex].name = name;
    onUpdate(newSkills);
  };

  const removeSkill = (catIndex: number, skillIndex: number) => {
    const newSkills = [...skills];
    newSkills[catIndex].skills = newSkills[catIndex].skills.filter((_, i) => i !== skillIndex);
    onUpdate(newSkills);
  };

  return (
    <div className="space-y-6 p-1">
      {skills.map((category, catIndex) => (
        <Card key={category.id}>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex-grow">
                     <Input 
                        value={category.name} 
                        onChange={(e) => updateCategoryName(catIndex, e.target.value)}
                        className="text-lg font-semibold border-0 shadow-none focus-visible:ring-0 p-0"
                     />
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={() => removeCategory(catIndex)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                    {category.skills.map((skill, skillIndex) => (
                        <div key={skill.id} className="flex items-center gap-1 bg-secondary rounded-full pl-3">
                            <Input
                                value={skill.name}
                                onChange={(e) => updateSkillName(catIndex, skillIndex, e.target.value)}
                                className="h-6 border-0 bg-transparent text-sm p-0 focus-visible:ring-0"
                            />
                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={() => removeSkill(catIndex, skillIndex)}>
                                <Trash2 className="h-3 w-3 text-destructive/80" />
                            </Button>
                        </div>
                    ))}
                </div>
                <Button variant="outline" size="sm" onClick={() => addSkill(catIndex)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Skill
                </Button>
            </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addCategory} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Skill Category
      </Button>
    </div>
  );
}
