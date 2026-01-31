"use client";

import type { Publication } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";

type PublicationsFormProps = {
  publications: Publication[];
  onUpdate: (data: Publication[]) => void;
};

export default function PublicationsForm({
  publications,
  onUpdate,
}: PublicationsFormProps) {
  const updatePublication = (
    index: number,
    newPublication: Partial<Publication>,
  ) => {
    const nextPublications = [...publications];
    nextPublications[index] = { ...nextPublications[index], ...newPublication };
    onUpdate(nextPublications);
  };

  const addPublication = () => {
    onUpdate([
      ...publications,
      {
        id: `pub-${Date.now()}`,
        title: "",
        authors: "",
        journal: "",
      },
    ]);
  };

  const removePublication = (index: number) => {
    onUpdate(publications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 p-1">
      {publications.map((publication, index) => (
        <Card key={publication.id}>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`publication-title-${publication.id}`}>
                  Title
                </Label>
                <Input
                  id={`publication-title-${publication.id}`}
                  value={publication.title}
                  onChange={(e) =>
                    updatePublication(index, { title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`publication-authors-${publication.id}`}>
                  Authors
                </Label>
                <Input
                  id={`publication-authors-${publication.id}`}
                  value={publication.authors}
                  onChange={(e) =>
                    updatePublication(index, { authors: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`publication-journal-${publication.id}`}>
                  Journal/Conference
                </Label>
                <Input
                  id={`publication-journal-${publication.id}`}
                  value={publication.journal}
                  onChange={(e) =>
                    updatePublication(index, { journal: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removePublication(index)}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Remove Publication
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="secondary" onClick={addPublication} className="w-full">
        <Plus className="mr-2 h-4 w-4" /> Add Publication
      </Button>
    </div>
  );
}
