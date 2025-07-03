
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { File as FileIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImportantDoc {
  id: string;
  name: string;
  description: string;
  file?: File | null;
  fileUrl?: string | null;
}

interface ImportantDocCardProps {
  doc: ImportantDoc;
  onDelete: (id: string) => void;
}

export const ImportantDocCard: React.FC<ImportantDocCardProps> = ({ doc, onDelete }) => (
  <Card>
    <CardContent className="p-5 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <FileIcon className="h-6 w-6 text-blue-500" />
        <div>
          <div className="font-semibold">{doc.name}</div>
          {doc.description && <div className="text-xs text-gray-500">{doc.description}</div>}
        </div>
      </div>
      {doc.fileUrl && (
        <div className="flex items-center gap-2">
          {doc.file?.type?.startsWith("image") ? (
            <img
              src={doc.fileUrl}
              alt={doc.name}
              className="w-16 h-16 object-cover border rounded"
            />
          ) : (
            <a
              href={doc.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 underline text-blue-600"
            >
              <FileIcon className="h-5 w-5" />
              {doc.file?.name ?? "View PDF"}
            </a>
          )}
        </div>
      )}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-red-600 w-fit"
        onClick={() => onDelete(doc.id)}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
    </CardContent>
  </Card>
);
