import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Bell, Calendar, AlertTriangle, CheckCircle, Clock, Trash2, UploadCloud, File as FileIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from '@/components/ui/sonner';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Info, Edit } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import { DocumentCard } from "./documents/DocumentCard";
import { DocumentEditDialog } from "./documents/DocumentEditDialog";
import { DocumentAddDialog } from "./documents/DocumentAddDialog";
import { DocumentSuggestions } from "./documents/DocumentSuggestions";
import { ImportantDocCard } from "./documents/ImportantDocCard";
import { ImportantDocAddDialog } from "./documents/ImportantDocAddDialog";

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

interface ImportantDoc {
  id: string;
  name: string;
  description: string;
  file?: File | null;
  fileUrl?: string | null;
}

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Student Visa',
      type: 'Immigration',
      submissionDate: '2024-01-15',
      expiryDate: '2025-01-14',
      status: 'valid',
      renewalProcess: [
        'Start renewal process 2 months before expiry',
        'Book appointment at prefecture',
        'Prepare required documents (passport, proof of enrollment, etc.)',
        'Pay renewal fees',
        'Submit application at prefecture'
      ],
      notificationEnabled: true,
      notes: 'Remember to bring original documents and copies',
      file: null,
      fileUrl: null,
    },
    {
      id: '2',
      name: 'Residence Permit',
      type: 'Immigration',
      submissionDate: '2024-01-20',
      expiryDate: '2024-05-15',
      status: 'expiring',
      renewalProcess: [
        'Begin renewal 2 months before expiry',
        'Gather required documents',
        'Schedule prefecture appointment',
        'Submit renewal application'
      ],
      notificationEnabled: true,
      notes: 'Keep proof of previous permits',
      file: null,
      fileUrl: null,
    },
    {
      id: '3',
      name: 'Housing Guarantee',
      type: 'Housing',
      submissionDate: '2024-02-10',
      expiryDate: '2025-02-09',
      status: 'valid',
      renewalProcess: [
        'Contact the guarantee service one month before expiry',
        'Provide updated tenancy agreement',
        'Submit renewal forms online',
        'Receive and store new guarantee document'
      ],
      notificationEnabled: true,
      notes: 'Vital for renting apartments; check with landlord for specific requirements.',
      file: null,
      fileUrl: null,
    },
    {
      id: '4',
      name: 'Housing Insurance',
      type: 'Insurance',
      submissionDate: '2024-02-12',
      expiryDate: '2025-02-11',
      status: 'valid',
      renewalProcess: [
        'Renew automatically with insurance provider unless cancelled',
        'Update payment details if needed',
        'Download new insurance certificate'
      ],
      notificationEnabled: true,
      notes: 'Keep receipts and certificates for your landlord and personal records.',
      file: null,
      fileUrl: null,
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    submissionDate: '',
    expiryDate: '',
    renewalProcess: '',
    notes: '',
    file: null as null | File,
    fileUrl: null as null | string,
  });

  const [editDocId, setEditDocId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ submissionDate: string; expiryDate: string }>({
    submissionDate: '',
    expiryDate: '',
  });

  const [importantDocs, setImportantDocs] = useState<ImportantDoc[]>([]);
  const [showAddImportantDialog, setShowAddImportantDialog] = useState(false);
  const [newImportantDoc, setNewImportantDoc] = useState<{ name: string; description: string; file: null | File; fileUrl: null | string }>({
    name: "",
    description: "",
    file: null,
    fileUrl: null,
  });

  const calculateStatus = (expiryDate: string): 'valid' | 'expiring' | 'expired' => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const monthsUntilExpiry = (expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30);

    if (monthsUntilExpiry < 0) return 'expired';
    if (monthsUntilExpiry < 2) return 'expiring';
    return 'valid';
  };

  const handleAddDocument = () => {
    if (!newDocument.name || !newDocument.type || !newDocument.submissionDate || !newDocument.expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    const status = calculateStatus(newDocument.expiryDate);
    const newDoc: Document = {
      id: Date.now().toString(),
      ...newDocument,
      status,
      renewalProcess: newDocument.renewalProcess.split('\n').filter(step => step.trim()),
      notificationEnabled: true,
      file: newDocument.file || null,
      fileUrl: newDocument.fileUrl || null,
    };

    setDocuments([...documents, newDoc]);
    setIsAddDialogOpen(false);
    setNewDocument({ name: '', type: '', submissionDate: '', expiryDate: '', renewalProcess: '', notes: '', file: null, fileUrl: null });
    toast.success('Document added successfully');
  };

  const deleteDocument = (docId: string) => {
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast.success('Document deleted successfully');
  };

  const toggleNotification = (docId: string) => {
    setDocuments(documents.map(doc => {
      if (doc.id === docId) {
        const newState = !doc.notificationEnabled;
        toast(newState ? 'Notifications enabled' : 'Notifications disabled');
        return { ...doc, notificationEnabled: newState };
      }
      return doc;
    }));
  };

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

  // --- Document file actions ---
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setDocuments(docs => docs.map(doc => doc.id === docId ? { ...doc, file, fileUrl } : doc));
    toast.success('File uploaded successfully');
  };

  const handleRemoveFile = (docId: string) => {
    setDocuments(docs => docs.map(doc => doc.id === docId ? { ...doc, file: null, fileUrl: null } : doc));
  };

  // --- New document dialog file upload ---
  const handleNewDocFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only PDF, JPG, or PNG files are allowed.");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setNewDocument(nd => ({ ...nd, file, fileUrl }));
  };
  const handleRemoveNewDocFile = () => setNewDocument(nd => ({ ...nd, file: null, fileUrl: null }));

  // Handler to open edit dialog and preload dates
  const openEditDialog = (doc: Document) => {
    setEditDocId(doc.id);
    setEditValues({
      submissionDate: doc.submissionDate,
      expiryDate: doc.expiryDate,
    });
  };

  const closeEditDialog = () => {
    setEditDocId(null);
    setEditValues({ submissionDate: '', expiryDate: '' });
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValues({ ...editValues, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = () => {
    if (!editValues.submissionDate || !editValues.expiryDate) {
      toast.error("Both dates are required");
      return;
    }
    setDocuments(docs =>
      docs.map(doc => {
        if (doc.id === editDocId) {
          const status = calculateStatus(editValues.expiryDate);
          return {
            ...doc,
            submissionDate: editValues.submissionDate,
            expiryDate: editValues.expiryDate,
            status,
          };
        }
        return doc;
      })
    );
    toast.success("Dates updated");
    closeEditDialog();
  };

  const handleAddImportantDoc = () => {
    if (!newImportantDoc.name || !newImportantDoc.file) {
      toast.error("Please provide at least a name and a file for the document.");
      return;
    }
    const doc: ImportantDoc = {
      id: Date.now().toString(),
      name: newImportantDoc.name,
      description: newImportantDoc.description,
      file: newImportantDoc.file,
      fileUrl: newImportantDoc.fileUrl,
    };
    setImportantDocs((prev) => [...prev, doc]);
    toast.success("Important document uploaded!");
    setShowAddImportantDialog(false);
    setNewImportantDoc({ name: "", description: "", file: null, fileUrl: null });
  };

  const handleImportantFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only PDF, JPG, or PNG files are allowed.");
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    setNewImportantDoc(nd => ({ ...nd, file, fileUrl }));
  };

  const handleDeleteImportantDoc = (id: string) => {
    setImportantDocs(docs => docs.filter(doc => doc.id !== id));
    toast.success("Important document deleted!");
  };

  // Suggestions for documents (update as requested)
  const docSuggestions = [
    { name: "Residence Permit", type: "Immigration" },
    { name: "Student Visa", type: "Immigration" },
    { name: "Health Insurance", type: "Insurance" },
    { name: "Housing Guarantee", type: "Housing" },
    { name: "CAF Attestation", type: "Housing/CAF" },
    { name: "Birth Certificate", type: "Identity" },
    { name: "Bank Proof (RIB)", type: "Finance" },
    { name: "Enrollment Certificate", type: "Education" },
    { name: "OFII Certificate", type: "Immigration" },
    { name: "Social Security Number (SSN)", type: "Social Security" }
  ];

  // Function to use suggestion for regular documents
  const handleSuggestionClick = (suggestion: { name: string; type: string }) => {
    setNewDocument({
      ...newDocument,
      name: suggestion.name,
      type: suggestion.type,
    });
    setIsAddDialogOpen(true);
  };

  // Function to use suggestion for important docs
  const handleImportantSuggestionClick = (suggestion: { name: string; type: string }) => {
    setNewImportantDoc({
      ...newImportantDoc,
      name: suggestion.name,
      description: suggestion.type,
    });
    setShowAddImportantDialog(true);
  };

  const [showSensitiveInfoAlert, setShowSensitiveInfoAlert] = useState(true);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FileText className="h-8 w-8 mr-3 text-blue-600" />
          Documents & Renewals
        </h1>
        <p className="text-lg text-gray-600">
          Track your important documents, keep digital copies, and stay on top of renewal deadlines.
        </p>
      </div>
      <Tabs defaultValue="renewal" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="renewal">Documents to Renew</TabsTrigger>
          <TabsTrigger value="all">All Important Documents</TabsTrigger>
        </TabsList>
        <TabsContent value="renewal">
          {showSensitiveInfoAlert && (
            <div className="mb-4">
              <div className="flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-yellow-900 text-sm font-medium relative">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0" />
                <span>
                  Do not add anything that contains sensitive information (such as government numbers, personal ID numbers, or confidential details).
                </span>
                <button
                  type="button"
                  onClick={() => setShowSensitiveInfoAlert(false)}
                  aria-label="Close"
                  className="absolute top-2 right-2 text-yellow-900 hover:text-red-500 transition"
                >
                  <span className="sr-only">Close warning</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          <DocumentSuggestions suggestions={docSuggestions} onClick={handleSuggestionClick} />
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Document
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {documents.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                onEdit={openEditDialog}
                onDelete={deleteDocument}
                onToggleNotification={toggleNotification}
                onFileChange={handleFileChange}
                onRemoveFile={handleRemoveFile}
              />
            ))}
          </div>
          <DocumentEditDialog
            open={!!editDocId}
            submissionDate={editValues.submissionDate}
            expiryDate={editValues.expiryDate}
            onChange={handleEditChange}
            onCancel={closeEditDialog}
            onSubmit={handleEditSubmit}
          />
          <DocumentAddDialog
            open={isAddDialogOpen}
            newDocument={newDocument}
            onChange={(field, value) => setNewDocument(nd => ({ ...nd, [field]: value }))}
            onFileChange={handleNewDocFileChange}
            onRemoveFile={handleRemoveNewDocFile}
            onCancel={() => setIsAddDialogOpen(false)}
            onSubmit={handleAddDocument}
          />
        </TabsContent>
        <TabsContent value="all">
          {/* Sensitive info warning */}
          <div className="mb-4">
            <div className="flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded text-yellow-900 text-sm font-medium">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Do not add anything that contains sensitive information (such as government numbers, personal ID numbers, or confidential details).
            </div>
          </div>
          <DocumentSuggestions suggestions={docSuggestions} onClick={handleImportantSuggestionClick} />
          <div className="mb-6 flex justify-end">
            <Button onClick={() => setShowAddImportantDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Upload Important Document
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {importantDocs.length === 0 ? (
              <div className="text-gray-500 italic">No important documents uploaded yet.</div>
            ) : (
              importantDocs.map((doc) => (
                <ImportantDocCard
                  key={doc.id}
                  doc={doc}
                  onDelete={handleDeleteImportantDoc}
                />
              ))
            )}
          </div>
          <ImportantDocAddDialog
            open={showAddImportantDialog}
            newDoc={newImportantDoc}
            onChange={(field, value) =>
              setNewImportantDoc(nd => ({ ...nd, [field]: value }))
            }
            onFileChange={handleImportantFileChange}
            onCancel={() => setShowAddImportantDialog(false)}
            onSubmit={handleAddImportantDoc}
            onRemoveFile={() =>
              setNewImportantDoc(nd => ({ ...nd, file: null, fileUrl: null }))
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DocumentsPage;
