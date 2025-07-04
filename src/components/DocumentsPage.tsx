import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Calendar, AlertTriangle, Edit, Trash2, Plus, Upload, Shield, Eye, Clock, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useUserPlan } from "@/hooks/useUserPlan";
import { useToast } from "@/hooks/use-toast";

interface Document {
  id: string;
  name: string;
  category: string;
  submissionDate: string;
  expiryDate: string;
  status: "pending" | "submitted" | "approved" | "expired";
  verification_status?: "not_submitted" | "pending" | "verified" | "rejected";
  requires_verification?: boolean;
}

interface DocumentEditDialogProps {
  open: boolean;
  submissionDate: string;
  expiryDate: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const DocumentEditDialog: React.FC<DocumentEditDialogProps> = ({
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

interface AddProcessDialogProps {
  open: boolean;
  formData: {
    name: string;
    category: string;
    submissionDate: string;
    expiryDate: string;
    status: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const AddProcessDialog: React.FC<AddProcessDialogProps> = ({
  open,
  formData,
  onChange,
  onCancel,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={o => !o && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Process</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="process-name">Process Name</Label>
            <Input
              id="process-name"
              name="name"
              type="text"
              value={formData.name}
              onChange={onChange}
              placeholder="e.g., Student Visa, Health Insurance"
              required
            />
          </div>
          <div>
            <Label htmlFor="process-category">Category</Label>
            <select
              id="process-category"
              name="category"
              value={formData.category}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select Category</option>
              <option value="Identity">Identity</option>
              <option value="Visa">Visa</option>
              <option value="Insurance">Insurance</option>
              <option value="Education">Education</option>
              <option value="Financial">Financial</option>
              <option value="Housing">Housing</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label htmlFor="process-submission-date">Submission Date</Label>
            <Input
              id="process-submission-date"
              name="submissionDate"
              type="date"
              value={formData.submissionDate}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="process-expiry-date">Expiry Date</Label>
            <Input
              id="process-expiry-date"
              name="expiryDate"
              type="date"
              value={formData.expiryDate}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="process-status">Status</Label>
            <select
              id="process-status"
              name="status"
              value={formData.status}
              onChange={onChange}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onSubmit}>
              Add Process
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Passport",
    category: "Identity",
    submissionDate: "2024-01-15",
    expiryDate: "2029-01-15",
    status: "approved",
    verification_status: "verified",
    requires_verification: true
  },
  {
    id: "2",
    name: "Student Visa",
    category: "Visa",
    submissionDate: "2024-02-20",
    expiryDate: "2025-02-20",
    status: "approved",
    verification_status: "pending",
    requires_verification: true
  },
  {
    id: "3",
    name: "Health Insurance",
    category: "Insurance",
    submissionDate: "2024-03-01",
    expiryDate: "2024-12-31",
    status: "pending",
    verification_status: "not_submitted",
    requires_verification: false
  },
];

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [editFormData, setEditFormData] = useState({
    submissionDate: '',
    expiryDate: ''
  });
  const [addFormData, setAddFormData] = useState({
    name: '',
    category: '',
    submissionDate: '',
    expiryDate: '',
    status: 'pending'
  });

  const { data: userPlan } = useUserPlan();
  const { toast } = useToast();
  const isPaidUser = userPlan?.plan_type === 'paid';

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-50";
      case "submitted": return "text-blue-600 bg-blue-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "expired": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "text-green-600 bg-green-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "rejected": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle className="h-4 w-4" />;
      case "pending": return <Clock className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved": return "✓";
      case "submitted": return "📤";
      case "pending": return "⏳";
      case "expired": return "⚠️";
      default: return "📄";
    }
  };

  const isDueSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    const diffTime = expiry.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays > 0;
  };

  const isExpired = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const now = new Date();
    return expiry < now;
  };

  const handleUploadDocument = (doc: Document) => {
    if (!isPaidUser) {
      toast({
        title: "Upgrade Required",
        description: "Document verification is available for paid users only.",
        variant: "default",
      });
      return;
    }
    setSelectedDoc(doc);
    setUploadDialogOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDoc) {
      // Simulate file upload
      setDocuments(prev => prev.map(doc => 
        doc.id === selectedDoc.id 
          ? { ...doc, verification_status: 'pending' as const }
          : doc
      ));
      setUploadDialogOpen(false);
      toast({
        title: "Document Uploaded",
        description: "Your document has been submitted for verification.",
      });
    }
  };

  const handleEditDocument = (doc: Document) => {
    setEditingDoc(doc);
    setEditFormData({
      submissionDate: doc.submissionDate,
      expiryDate: doc.expiryDate
    });
    setEditDialogOpen(true);
  };

  const handleDeleteDocument = (docId: string) => {
    if (confirm('Are you sure you want to delete this document?')) {
      setDocuments(prev => prev.filter(doc => doc.id !== docId));
      console.log('Document deleted:', docId);
    }
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setAddFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveEdit = () => {
    if (!editingDoc) return;
    
    setDocuments(prev => prev.map(doc => 
      doc.id === editingDoc.id 
        ? { ...doc, ...editFormData }
        : doc
    ));
    
    setEditDialogOpen(false);
    setEditingDoc(null);
    console.log('Document updated:', { id: editingDoc.id, ...editFormData });
  };

  const handleAddProcess = () => {
    if (!addFormData.name || !addFormData.category || !addFormData.submissionDate || !addFormData.expiryDate) {
      alert('Please fill in all fields');
      return;
    }

    const newDocument: Document = {
      id: Date.now().toString(),
      name: addFormData.name,
      category: addFormData.category,
      submissionDate: addFormData.submissionDate,
      expiryDate: addFormData.expiryDate,
      status: addFormData.status as Document['status'],
      verification_status: 'not_submitted',
      requires_verification: false
    };

    setDocuments(prev => [...prev, newDocument]);
    setAddDialogOpen(false);
    setAddFormData({
      name: '',
      category: '',
      submissionDate: '',
      expiryDate: '',
      status: 'pending'
    });
    console.log('New process added:', newDocument);
  };

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setEditingDoc(null);
    setEditFormData({ submissionDate: '', expiryDate: '' });
  };

  const handleCancelAdd = () => {
    setAddDialogOpen(false);
    setAddFormData({
      name: '',
      category: '',
      submissionDate: '',
      expiryDate: '',
      status: 'pending'
    });
  };

  const upcomingRenewals = documents.filter(doc => 
    isDueSoon(doc.expiryDate) || isExpired(doc.expiryDate)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Documents & Renewals</h1>
            <p className="text-gray-600">Keep track of your important documents and renewal dates</p>
          </div>
          {!isPaidUser && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800">Upgrade to Pro</p>
                    <p className="text-sm text-blue-600">Get document verification & expert review</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Alerts for upcoming renewals */}
      {upcomingRenewals.length > 0 && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <h3 className="font-semibold text-yellow-800">Renewal Alerts</h3>
            </div>
            <div className="space-y-1">
              {upcomingRenewals.map(doc => (
                <p key={doc.id} className="text-sm text-yellow-700">
                  <strong>{doc.name}</strong> {isExpired(doc.expiryDate) ? 'has expired' : 'expires soon'} 
                  ({new Date(doc.expiryDate).toLocaleDateString()})
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <CardTitle className="text-lg">{doc.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditDocument(doc)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteDocument(doc.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Category</span>
                <span className="text-sm font-medium">{doc.category}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(doc.status)}`}>
                  {getStatusIcon(doc.status)} {doc.status}
                </span>
              </div>

              {/* Verification Status */}
              {doc.requires_verification && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verification</span>
                  <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${getVerificationStatusColor(doc.verification_status || 'not_submitted')}`}>
                    {getVerificationIcon(doc.verification_status || 'not_submitted')}
                    {doc.verification_status || 'not_submitted'}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Submitted</span>
                <span className="text-sm">{new Date(doc.submissionDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Expires</span>
                <span className={`text-sm ${isDueSoon(doc.expiryDate) || isExpired(doc.expiryDate) ? 'text-red-600 font-semibold' : ''}`}>
                  {new Date(doc.expiryDate).toLocaleDateString()}
                </span>
              </div>

              {/* Upload Button for Verification */}
              {doc.requires_verification && doc.verification_status === 'not_submitted' && (
                <Button
                  onClick={() => handleUploadDocument(doc)}
                  className="w-full mt-2"
                  variant={isPaidUser ? "default" : "outline"}
                  disabled={!isPaidUser}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isPaidUser ? 'Upload for Verification' : 'Upgrade to Upload'}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Add New Process Card */}
        <Card 
          className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => setAddDialogOpen(true)}
        >
          <CardContent className="flex flex-col items-center justify-center h-full py-12">
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 text-center">Add New Process</p>
            <p className="text-sm text-gray-500 text-center mt-1">Track a new document renewal process</p>
          </CardContent>
        </Card>
      </div>

      {/* Renewal Calendar Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Renewals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {documents
              .filter(doc => {
                const expiry = new Date(doc.expiryDate);
                const now = new Date();
                const diffTime = expiry.getTime() - now.getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays <= 90;
              })
              .sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime())
              .map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-gray-600">{doc.category}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-medium ${isExpired(doc.expiryDate) ? 'text-red-600' : isDueSoon(doc.expiryDate) ? 'text-yellow-600' : 'text-green-600'}`}>
                      {new Date(doc.expiryDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {isExpired(doc.expiryDate) ? 'Expired' : 
                       Math.ceil((new Date(doc.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + ' days left'}
                    </p>
                  </div>
                </div>
              ))}
            {documents.filter(doc => {
              const expiry = new Date(doc.expiryDate);
              const now = new Date();
              const diffTime = expiry.getTime() - now.getTime();
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 90;
            }).length === 0 && (
              <p className="text-gray-500 text-center py-4">No upcoming renewals in the next 90 days</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <DocumentEditDialog
        open={editDialogOpen}
        submissionDate={editFormData.submissionDate}
        expiryDate={editFormData.expiryDate}
        onChange={handleEditFormChange}
        onCancel={handleCancelEdit}
        onSubmit={handleSaveEdit}
      />

      <AddProcessDialog
        open={addDialogOpen}
        formData={addFormData}
        onChange={handleAddFormChange}
        onCancel={handleCancelAdd}
        onSubmit={handleAddProcess}
      />

      {/* Upload Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Document for Verification</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Upload your {selectedDoc?.name} for professional verification by our team.
            </p>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
              >
                Click to upload document
              </label>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, JPG, PNG (Max 10MB)
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
