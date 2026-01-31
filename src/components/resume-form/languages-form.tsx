"use client";

import type { Language } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type LanguagesFormProps = {
  languages: Language[];
  onUpdate: (data: Language[]) => void;
};

export default function LanguagesForm({ languages, onUpdate }: LanguagesFormProps) {
  const updateLanguage = (index: number, newLanguage: Partial<Language>) => {
    const nextLanguages = [...languages];
    nextLanguages[index] = { ...nextLanguages[index], ...newLanguage };
    onUpdate(nextLanguages);
  };

  const addLanguage = () => {
    onUpdate([
      ...languages,
      {
        id: `lang-${Date.now()}`,
        name: "",
        fluency: "",
      },
    ]);
  };

  const removeLanguage = (index: number) => {
    onUpdate(languages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-1">
      {languages.map((language, index) => (
        <Card key={language.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`language-name-${language.id}`}>Language</Label>
                <Input
                  id={`language-name-${language.id}`}
                  value={language.name}
                  onChange={(e) => updateLanguage(index, { name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`language-fluency-${language.id}`}>Fluency</Label>
                <Input
                  id={`language-fluency-${language.id}`}
                  value={language.fluency}
                  onChange={(e) => updateLanguage(index, { fluency: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeLanguage(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Language
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addLanguage} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Language
      </Button>
    </div>
  );
}
