"use client";

import type { Reference } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type ReferencesFormProps = {
  references: Reference[];
  onUpdate: (data: Reference[]) => void;
};

export default function ReferencesForm({ references, onUpdate }: ReferencesFormProps) {
  const updateReference = (index: number, newReference: Partial<Reference>) => {
    const nextReferences = [...references];
    nextReferences[index] = { ...nextReferences[index], ...newReference };
    onUpdate(nextReferences);
  };

  const addReference = () => {
    onUpdate([
      ...references,
      {
        id: `ref-${Date.now()}`,
        name: "",
        title: "",
        phone: "",
        email: "",
      },
    ]);
  };

  const removeReference = (index: number) => {
    onUpdate(references.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-1">
      {references.map((reference, index) => (
        <Card key={reference.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`reference-name-${reference.id}`}>Name</Label>
                <Input
                  id={`reference-name-${reference.id}`}
                  value={reference.name}
                  onChange={(e) => updateReference(index, { name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`reference-title-${reference.id}`}>Title</Label>
                <Input
                  id={`reference-title-${reference.id}`}
                  value={reference.title}
                  onChange={(e) => updateReference(index, { title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`reference-phone-${reference.id}`}>Phone</Label>
                <Input
                  id={`reference-phone-${reference.id}`}
                  value={reference.phone}
                  onChange={(e) => updateReference(index, { phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`reference-email-${reference.id}`}>Email</Label>
                <Input
                  id={`reference-email-${reference.id}`}
                  type="email"
                  value={reference.email}
                  onChange={(e) => updateReference(index, { email: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeReference(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Reference
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addReference} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Reference
      </Button>
    </div>
  );
}
