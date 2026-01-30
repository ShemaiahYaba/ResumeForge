"use client";

import type { PersonalInfo } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type PersonalInfoFormProps = {
  personalInfo: PersonalInfo;
  onUpdate: (data: PersonalInfo) => void;
};

export default function PersonalInfoForm({ personalInfo, onUpdate }: PersonalInfoFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdate({ ...personalInfo, [e.target.name]: e.target.value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-1">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={personalInfo.name} onChange={handleChange} placeholder="John Doe" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} placeholder="john.doe@email.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="123-456-7890" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" value={personalInfo.address} onChange={handleChange} placeholder="City, State" />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea id="summary" name="summary" value={personalInfo.summary} onChange={handleChange} placeholder="A brief summary about you..." className="min-h-[100px]" />
      </div>
    </div>
  );
}
