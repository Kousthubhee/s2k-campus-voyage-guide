
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { File as FileIcon, X } from "lucide-react";

interface ImportantDocAddDialogProps {
  open: boolean;
  newDoc: {
    name: string;
    description: string;
    file: null | File;
    fileUrl: null | string;
  };
  onChange: (field: string, value: any) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onRemoveFile: () => void;
}

export const ImportantDocAddDialog: React.FC<ImportantDocAddDialogProps> = ({
  open,
  newDoc,
  onChange,
  onFileChange,
  onCancel,
  onSubmit,
  onRemoveFile,
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Important Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="important-doc-name">Document Name</Label>
            <Input
              id="important-doc-name"
              placeholder="e.g., Passport"
              value={newDoc.name}
              onChange={e => onChange("name", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="important-doc-desc">Description</Label>
            <Textarea
              id="important-doc-desc"
              placeholder="Brief description"
              className="h-16"
              value={newDoc.description}
              onChange={e => onChange("description", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="important-doc-file">Attach File (PDF, JPG, PNG)</Label>
            <Input
              id="important-doc-file"
              type="file"
              accept=".pdf, image/jpeg, image/png"
              onChange={onFileChange}
            />
            {newDoc.fileUrl && (
              <div className="my-2">
                {newDoc.file?.type?.startsWith("image") ? (
                  <img
                    src={newDoc.fileUrl as string}
                    alt={newDoc.name}
                    className="w-16 h-16 object-cover border rounded"
                  />
                ) : (
                  <a
                    href={newDoc.fileUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 underline text-blue-600"
                  >
                    <FileIcon className="h-5 w-5" />
                    {newDoc.file?.name ?? "View PDF"}
                  </a>
                )}
              </div>
            )}
            {newDoc.file && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemoveFile}
                className="text-red-600 mt-1"
              >
                <X className="h-4 w-4" />
                Remove
              </Button>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              Upload
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
