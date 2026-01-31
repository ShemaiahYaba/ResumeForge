"use client";

import type { ProfessionalMembership } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type ProfessionalMembershipsFormProps = {
  professionalMemberships: ProfessionalMembership[];
  onUpdate: (data: ProfessionalMembership[]) => void;
};

export default function ProfessionalMembershipsForm({
  professionalMemberships,
  onUpdate,
}: ProfessionalMembershipsFormProps) {
  const updateMembership = (
    index: number,
    newMembership: Partial<ProfessionalMembership>,
  ) => {
    const nextMemberships = [...professionalMemberships];
    nextMemberships[index] = {
      ...nextMemberships[index],
      ...newMembership,
    };
    onUpdate(nextMemberships);
  };

  const addMembership = () => {
    onUpdate([
      ...professionalMemberships,
      {
        id: `membership-${Date.now()}`,
        organization: "",
      },
    ]);
  };

  const removeMembership = (index: number) => {
    onUpdate(professionalMemberships.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-1">
      {professionalMemberships.map((membership, index) => (
        <Card key={membership.id}>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <Label htmlFor={`membership-org-${membership.id}`}>
                Organization
              </Label>
              <Input
                id={`membership-org-${membership.id}`}
                value={membership.organization}
                onChange={(e) =>
                  updateMembership(index, { organization: e.target.value })
                }
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeMembership(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Membership
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addMembership} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Membership
      </Button>
    </div>
  );
}
