
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Bell, Calendar, AlertTriangle, CheckCircle, Clock, Trash2, UploadCloud, File as FileIcon, X, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';

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

  const [importantDocs, setImportantDocs] = useState<ImportantDoc[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [showAddImportantDialog, setShowAddImportantDialog] = useState(false);
  const [editDocId, setEditDocId] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ submissionDate: string; expiryDate: string }>({
    submissionDate: '',
    expiryDate: '',
  });

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

    setDocuments([newDoc, ...documents]);
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

    setImportantDocs((prev) => [doc, ...prev]);
    toast.success("Important document uploaded!");
    setShowAddImportantDialog(false);
    setNewImportantDoc({ name: "", description: "", file: null, fileUrl: null });
  };

  const handleDeleteImportantDoc = (id: string) => {
    setImportantDocs(docs => docs.filter(doc => doc.id !== id));
    toast.success("Important document deleted!");
  };

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

  const handleSuggestionClick = (suggestion: { name: string; type: string }) => {
    setNewDocument({
      ...newDocument,
      name: suggestion.name,
      type: suggestion.type,
    });
    setIsAddDialogOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FileText className="h-8 w-8 mr-3 text-blue-600" />
          Documents & Renewals
        </h1>
        <p className="text-lg text-gray-600">
          Track your important documents, keep digital copies, and stay on top of renewal deadlines.
        </p>
      </div>

      {/* Document Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Add Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {docSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-left h-auto p-3"
              >
                <div>
                  <div className="font-medium text-sm">{suggestion.name}</div>
                  <div className="text-xs text-gray-500">{suggestion.type}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Renewal Documents */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Renewal Documents</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Document
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Document Name</Label>
                    <Input
                      id="name"
                      value={newDocument.name}
                      onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                      placeholder="e.g., Student Visa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Input
                      id="type"
                      value={newDocument.type}
                      onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
                      placeholder="e.g., Immigration"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="submission">Submission Date</Label>
                    <Input
                      id="submission"
                      type="date"
                      value={newDocument.submissionDate}
                      onChange={(e) => setNewDocument({ ...newDocument, submissionDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      value={newDocument.expiryDate}
                      onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="renewal">Renewal Process (one step per line)</Label>
                  <Textarea
                    id="renewal"
                    value={newDocument.renewalProcess}
                    onChange={(e) => setNewDocument({ ...newDocument, renewalProcess: e.target.value })}
                    placeholder="Step 1&#10;Step 2&#10;Step 3"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newDocument.notes}
                    onChange={(e) => setNewDocument({ ...newDocument, notes: e.target.value })}
                    placeholder="Additional notes..."
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDocument}>
                    Add Document
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {documents.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <h3 className="text-lg font-semibold">{doc.name}</h3>
                      <p className="text-sm text-gray-500">{doc.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleNotification(doc.id)}
                      className={doc.notificationEnabled ? 'text-blue-600' : 'text-gray-400'}
                    >
                      <Bell className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteDocument(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Submission Date</p>
                    <p className="text-sm text-gray-600">{new Date(doc.submissionDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Expiry Date</p>
                    <p className="text-sm text-gray-600">{new Date(doc.expiryDate).toLocaleDateString()}</p>
                  </div>
                </div>

                {doc.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                    <p className="text-sm text-gray-600">{doc.notes}</p>
                  </div>
                )}

                {doc.renewalProcess.length > 0 && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Renewal Process</p>
                    <ol className="text-sm text-gray-600 space-y-1">
                      {doc.renewalProcess.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="font-medium mr-2">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Important Documents */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Important Documents</h2>
          <Dialog open={showAddImportantDialog} onOpenChange={setShowAddImportantDialog}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Important Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Important Document</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="imp-name">Document Name</Label>
                  <Input
                    id="imp-name"
                    value={newImportantDoc.name}
                    onChange={(e) => setNewImportantDoc({ ...newImportantDoc, name: e.target.value })}
                    placeholder="Document name"
                  />
                </div>
                <div>
                  <Label htmlFor="imp-desc">Description</Label>
                  <Textarea
                    id="imp-desc"
                    value={newImportantDoc.description}
                    onChange={(e) => setNewImportantDoc({ ...newImportantDoc, description: e.target.value })}
                    placeholder="Brief description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="imp-file">Upload File</Label>
                  <Input
                    id="imp-file"
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const fileUrl = URL.createObjectURL(file);
                        setNewImportantDoc({ ...newImportantDoc, file, fileUrl });
                      }
                    }}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddImportantDialog(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddImportantDoc}>
                    Add Document
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {importantDocs.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No important documents uploaded yet</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {importantDocs.map((doc) => (
              <Card key={doc.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <FileIcon className="h-5 w-5 text-blue-600" />
                      <h3 className="font-semibold truncate">{doc.name}</h3>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteImportantDoc(doc.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {doc.description && (
                    <p className="text-sm text-gray-600 mb-3">{doc.description}</p>
                  )}
                  {doc.file && (
                    <p className="text-xs text-gray-500">
                      File: {doc.file.name}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsPage;
