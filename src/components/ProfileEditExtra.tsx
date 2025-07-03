
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProfileEditExtraProps {
  age: string | number;
  prevEducation: string;
  workExperience: string;
  onChange: (fields: { age?: string; prevEducation?: string; workExperience?: string }) => void;
}

export const ProfileEditExtra = ({
  age,
  prevEducation,
  workExperience,
  onChange,
}: ProfileEditExtraProps) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="edit-age">Age</Label>
      <Input
        id="edit-age"
        type="number"
        min="15"
        max="80"
        value={age}
        placeholder="e.g. 23"
        onChange={e => onChange({ age: e.target.value })}
      />
    </div>
    <div>
      <Label htmlFor="edit-prev-education">Previous Education</Label>
      <Input
        id="edit-prev-education"
        value={prevEducation}
        placeholder="e.g. Bachelor of Science"
        onChange={e => onChange({ prevEducation: e.target.value })}
      />
    </div>
    <div>
      <Label htmlFor="edit-work-experience">Work Experience (if any)</Label>
      <Input
        id="edit-work-experience"
        value={workExperience}
        placeholder="e.g. 2 years at XYZ Company or N/A"
        onChange={e => onChange({ workExperience: e.target.value })}
      />
    </div>
  </div>
);
