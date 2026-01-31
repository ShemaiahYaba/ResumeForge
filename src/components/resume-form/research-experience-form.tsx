"use client";

import type { ResearchExperience } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type ResearchExperienceFormProps = {
  researchExperience: ResearchExperience[];
  onUpdate: (data: ResearchExperience[]) => void;
};

export default function ResearchExperienceForm({
  researchExperience,
  onUpdate,
}: ResearchExperienceFormProps) {
  const updateResearch = (
    index: number,
    newResearch: Partial<ResearchExperience>,
  ) => {
    const nextResearch = [...researchExperience];
    nextResearch[index] = { ...nextResearch[index], ...newResearch };
    onUpdate(nextResearch);
  };

  const addResearch = () => {
    onUpdate([
      ...researchExperience,
      {
        id: `research-${Date.now()}`,
        activity: "",
      },
    ]);
  };

  const removeResearch = (index: number) => {
    onUpdate(researchExperience.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-1">
      {researchExperience.map((research, index) => (
        <Card key={research.id}>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor={`research-activity-${research.id}`}>
                Activity/Project
              </Label>
              <Input
                id={`research-activity-${research.id}`}
                value={research.activity}
                onChange={(e) =>
                  updateResearch(index, { activity: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeResearch(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Research
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addResearch} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Research
      </Button>
    </div>
  );
}
