
import React from 'react';
import { useRef, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Image } from 'lucide-react';
import { ProfileEditExtra } from './ProfileEditExtra';
import { useToast } from '@/hooks/use-toast';

interface ProfileType {
  name: string;
  email: string;
  about: string;
  memberSince: string;
  photo: string;
  age: string;
  prevEducation: string;
  workExperience: string;
}

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  profile: ProfileType;
  onSave: (profile: ProfileType) => void;
}

const defaultProfilePhoto = "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=facearea&w=256&h=256&facepad=3&q=80";

export function ProfileEditDialog({ open, onOpenChange, profile, onSave }: ProfileEditDialogProps) {
  const [editingProfile, setEditingProfile] = useState(profile);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Reset editing fields when dialog is reopened
  React.useEffect(() => {
    if (open) setEditingProfile(profile);
  }, [open, profile]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setEditingProfile(prev => ({
          ...prev,
          photo: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    onSave(editingProfile);
    onOpenChange(false);
    toast({
      title: "Profile updated",
      description: "Your profile changes were saved.",
      variant: "default",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <img
                src={editingProfile.photo || defaultProfilePhoto}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="absolute right-1 bottom-1 bg-white hover:bg-gray-100 border shadow"
                onClick={() => fileInputRef.current?.click()}
                aria-label="Change photo"
              >
                <Image className="w-4 h-4 text-blue-600" />
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <Label htmlFor="edit-name" className="font-semibold">Name</Label>
              <Input
                id="edit-name"
                value={editingProfile.name}
                placeholder="Enter your name"
                onChange={e => setEditingProfile({ ...editingProfile, name: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="edit-email" className="font-semibold">Email</Label>
              <Input
                id="edit-email"
                value={editingProfile.email}
                placeholder="Enter your email"
                onChange={e => setEditingProfile({ ...editingProfile, email: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="edit-about" className="font-semibold">About</Label>
            <Input
              id="edit-about"
              value={editingProfile.about}
              placeholder="Enter something about yourself"
              onChange={e => setEditingProfile({ ...editingProfile, about: e.target.value })}
              className="mt-1"
            />
            <div className="text-xs text-gray-400 ml-1 mt-1">Short bio, e.g., your study goals or interests</div>
          </div>
          <div className="py-2">
            <ProfileEditExtra
              age={editingProfile.age}
              prevEducation={editingProfile.prevEducation}
              workExperience={editingProfile.workExperience}
              onChange={fields => setEditingProfile(prev => ({ ...prev, ...fields }))}
            />
          </div>
        </div>
        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} className="font-semibold">Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
