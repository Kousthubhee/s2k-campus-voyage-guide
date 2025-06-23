
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface DocumentEditDialogProps {
  open: boolean;
  submissionDate: string;
  expiryDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const DocumentEditDialog: React.FC<DocumentEditDialogProps> = ({
  open,
  submissionDate,
  expiryDate,
  onChange,
  onCancel,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={o => !o && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Document Dates</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="edit-submission-date">Submission Date</Label>
            <Input
              id="edit-submission-date"
              name="submissionDate"
              type="date"
              value={submissionDate}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-expiry-date">Expiry Date</Label>
            <Input
              id="edit-expiry-date"
              name="expiryDate"
              type="date"
              value={expiryDate}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
