
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { X, Info, File as FileIcon } from "lucide-react";

interface DocumentAddDialogProps {
  open: boolean;
  newDocument: {
    name: string;
    type: string;
    submissionDate: string;
    expiryDate: string;
    renewalProcess: string;
    notes: string;
    file: null | File;
    fileUrl: null | string;
  };
  onChange: (field: string, value: any) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
  onCancel: () => void;
  onSubmit: () => void;
}

export const DocumentAddDialog: React.FC<DocumentAddDialogProps> = ({
  open,
  newDocument,
  onChange,
  onFileChange,
  onRemoveFile,
  onCancel,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Document</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Document Name</Label>
            <Input
              id="name"
              value={newDocument.name}
              onChange={(e) => onChange("name", e.target.value)}
              placeholder="e.g., Student Visa"
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Document Type</Label>
            <Input
              id="type"
              value={newDocument.type}
              onChange={(e) => onChange("type", e.target.value)}
              placeholder="e.g., Immigration"
              required
            />
          </div>
          <div>
            <Label htmlFor="submissionDate">Submission Date</Label>
            <Input
              id="submissionDate"
              type="date"
              value={newDocument.submissionDate}
              onChange={(e) => onChange("submissionDate", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="expiryDate">Expiry Date</Label>
            <Input
              id="expiryDate"
              type="date"
              value={newDocument.expiryDate}
              onChange={(e) => onChange("expiryDate", e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="renewalProcess">Renewal Process (one step per line)</Label>
            <Textarea
              id="renewalProcess"
              value={newDocument.renewalProcess}
              onChange={(e) => onChange("renewalProcess", e.target.value)}
              placeholder="Step 1&#10;Step 2&#10;Step 3"
              className="h-32"
            />
          </div>
          <div>
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              value={newDocument.notes}
              onChange={(e) => onChange("notes", e.target.value)}
              placeholder="Add any important notes or reminders..."
              className="h-20"
            />
          </div>
          <div>
            <Label htmlFor="new-doc-file" className="flex items-center gap-2">
              Attach File (PDF, JPG, PNG)
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span tabIndex={0}>
                      <Info className="h-4 w-4 text-blue-600 cursor-pointer" aria-label="Info about file upload"/>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs">
                    Attach a scan or photo of your document for easy access and as backup proof.
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <div className="flex items-center gap-2 mb-2">
              <Input
                id="new-doc-file"
                type="file"
                accept=".pdf, image/jpeg, image/png"
                className="block"
                onChange={onFileChange}
              />
              {newDocument.file && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onRemoveFile}
                  className="text-red-600"
                >
                  <X className="h-4 w-4" />
                  Remove
                </Button>
              )}
            </div>
            {newDocument.fileUrl && (
              <div className="my-2">
                {newDocument.file?.type?.startsWith("image") ? (
                  <img
                    src={newDocument.fileUrl as string}
                    alt={newDocument.name}
                    className="w-16 h-16 object-cover border rounded"
                  />
                ) : (
                  <a
                    href={newDocument.fileUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 underline text-blue-600"
                  >
                    <FileIcon className="h-5 w-5" />
                    {newDocument.file?.name ?? "View PDF"}
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              Add Document
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
