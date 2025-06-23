
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, AlertTriangle, CheckCircle, Clock, Trash2, UploadCloud, File as FileIcon, X, Bell, Edit, Info } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";

interface Document {
  id: string;
  name: string;
  type: string;
  submissionDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  renewalProcess: string[];
  notificationEnabled: boolean;
  notes?: string;
  file?: File | null;
  fileUrl?: string | null;
}

interface DocumentCardProps {
  doc: Document;
  onEdit: (doc: Document) => void;
  onDelete: (id: string) => void;
  onToggleNotification: (id: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  onRemoveFile: (id: string) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'valid':
      return 'text-green-600';
    case 'expiring':
      return 'text-orange-600';
    case 'expired':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'valid':
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case 'expiring':
      return <Clock className="h-5 w-5 text-orange-600" />;
    case 'expired':
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    default:
      return null;
  }
};

export const DocumentCard: React.FC<DocumentCardProps> = ({
  doc,
  onEdit,
  onDelete,
  onToggleNotification,
  onFileChange,
  onRemoveFile,
}) => {
  return (
    <Card className={`border-l-4 ${
      doc.status === 'valid'
        ? "border-l-green-500"
        : doc.status === 'expiring'
        ? "border-l-orange-500"
        : "border-l-red-500"
    }`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-900 mr-3">{doc.name}</h3>
              {getStatusIcon(doc.status)}
            </div>
            <p className="text-sm text-gray-600 mb-2">Type: {doc.type}</p>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Submitted: {new Date(doc.submissionDate).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Expires: {new Date(doc.expiryDate).toLocaleDateString()}
              </div>
            </div>
            <Accordion type="single" collapsible className="mb-2">
              <AccordionItem value="renewal">
                <AccordionTrigger className="font-medium text-gray-900">
                  Renewal Process
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc list-inside space-y-1">
                    {doc.renewalProcess.map((step, idx) => (
                      <li key={idx} className="text-sm text-gray-600">{step}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {doc.notes && (
              <Accordion type="single" collapsible className="mb-2">
                <AccordionItem value="notes">
                  <AccordionTrigger className="font-medium text-gray-900">
                    Notes
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{doc.notes}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            )}
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor={`file-input-${doc.id}`}>Document Scan / File:</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        tabIndex={0}
                        role="button"
                        aria-label="Info about document scan upload"
                      >
                        <Info className="h-4 w-4 text-blue-600 cursor-pointer" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-xs">
                      Attach a scan or photo of your document for easy access and as backup proof.
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <input
                  id={`file-input-${doc.id}`}
                  type="file"
                  accept=".pdf, image/jpeg, image/png"
                  className="hidden"
                  onChange={(e) => onFileChange(e, doc.id)}
                />
                <label htmlFor={`file-input-${doc.id}`} style={{ margin: 0 }}>
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <UploadCloud className="h-4 w-4 mr-1" /> Upload
                    </span>
                  </Button>
                </label>
                {doc.file && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveFile(doc.id)}
                    className="text-red-600"
                  >
                    <X className="h-4 w-4" /> Remove
                  </Button>
                )}
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
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600"
              onClick={() => onEdit(doc)}
              aria-label="Edit dates"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={doc.notificationEnabled ? "text-blue-600" : "text-gray-400"}
              onClick={() => onToggleNotification(doc.id)}
            >
              <Bell className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600"
              onClick={() => onDelete(doc.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
            Status: {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
