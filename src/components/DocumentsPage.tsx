
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Calendar, AlertTriangle, Edit, Trash2, Plus } from "lucide-react";

interface Document {
  id: string;
  name: string;
  category: string;
  submissionDate: string;
  expiryDate: string;
  status: "pending" | "submitted" | "approved" | "expired";
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

const sampleDocuments: Document[] = [
  {
    id: "1",
    name: "Passport",
    category: "Identity",
    submissionDate: "2024-01-15",
    expiryDate: "2029-01-15",
    status: "approved"
  },
  {
    id: "2",
    name: "Student Visa",
    category: "Visa",
    submissionDate: "2024-02-20",
    expiryDate: "2025-02-20",
    status: "approved"
  },
  {
    id: "3",
    name: "Health Insurance",
    category: "Insurance",
    submissionDate: "2024-03-01",
    expiryDate: "2024-12-31",
    status: "pending"
  },
  {
    id: "4",
    name: "Academic Transcripts",
    category: "Education",
    submissionDate: "2024-01-10",
    expiryDate: "2026-01-10",
    status: "submitted"
  }
];

export const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>(sampleDocuments);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    submissionDate: '',
    expiryDate: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "text-green-600 bg-green-50";
      case "submitted": return "text-blue-600 bg-blue-50";
      case "pending": return "text-yellow-600 bg-yellow-50";
      case "expired": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
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

  const handleEditDocument = (doc: Document) => {
    setEditingDoc(doc);
    setEditFormData({
      submissionDate: doc.submissionDate,
      expiryDate: doc.expiryDate
    });
    setEditDialogOpen(true);
  };

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditFormData(prev => ({
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

  const handleCancelEdit = () => {
    setEditDialogOpen(false);
    setEditingDoc(null);
    setEditFormData({ submissionDate: '', expiryDate: '' });
  };

  const upcomingRenewals = documents.filter(doc => 
    isDueSoon(doc.expiryDate) || isExpired(doc.expiryDate)
  );

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Documents & Renewals</h1>
        <p className="text-gray-600">Keep track of your important documents and renewal dates</p>
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
            </CardContent>
          </Card>
        ))}

        {/* Add New Document Card */}
        <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center h-full py-12">
            <Plus className="h-8 w-8 text-gray-400 mb-2" />
            <p className="text-gray-600 text-center">Add New Document</p>
            <p className="text-sm text-gray-500 text-center mt-1">Upload and track important documents</p>
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
                return diffDays <= 90; // Show renewals due in next 90 days
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

      {/* Edit Dialog */}
      <DocumentEditDialog
        open={editDialogOpen}
        submissionDate={editFormData.submissionDate}
        expiryDate={editFormData.expiryDate}
        onChange={handleEditFormChange}
        onCancel={handleCancelEdit}
        onSubmit={handleSaveEdit}
      />
    </div>
  );
};
