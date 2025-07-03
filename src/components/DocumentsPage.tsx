import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, FileText, Clock, AlertCircle, Plus, Edit } from "lucide-react";
import { DocumentAddDialog } from "./documents/DocumentAddDialog";
import { DocumentEditDialog } from "./documents/DocumentEditDialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserDocument {
  id: string;
  name: string;
  type: string;
  submission_date: string | null;
  expiry_date: string | null;
  renewal_process: string[] | null;
  notes: string | null;
  file_name: string | null;
  file_url: string | null;
  status: string | null;
  notification_enabled: boolean | null;
  created_at: string;
  updated_at: string;
}

export const DocumentsPage = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<UserDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingDocument, setEditingDocument] = useState<UserDocument | null>(null);
  const [editDates, setEditDates] = useState({
    submissionDate: '',
    expiryDate: ''
  });

  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    submissionDate: '',
    expiryDate: '',
    renewalProcess: '',
    notes: '',
    file: null as File | null,
    fileUrl: null as string | null
  });

  useEffect(() => {
    if (user) {
      fetchDocuments();
    }
  }, [user]);

  const fetchDocuments = async () => {
    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDocuments(data || []);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to load documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewDocument(prev => ({
        ...prev,
        file,
        fileUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleRemoveFile = () => {
    if (newDocument.fileUrl) {
      URL.revokeObjectURL(newDocument.fileUrl);
    }
    setNewDocument(prev => ({
      ...prev,
      file: null,
      fileUrl: null
    }));
  };

  const handleSubmit = async () => {
    if (!user || !newDocument.name || !newDocument.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      let fileUrl = null;
      let fileName = null;

      if (newDocument.file) {
        const fileExt = newDocument.file.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('documents')
          .upload(filePath, newDocument.file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('documents')
          .getPublicUrl(filePath);

        fileUrl = publicUrl;
        fileName = newDocument.file.name;
      }

      const renewalSteps = newDocument.renewalProcess 
        ? newDocument.renewalProcess.split('\n').filter(step => step.trim())
        : [];

      const { error } = await supabase
        .from('user_documents')
        .insert({
          user_id: user.id,
          name: newDocument.name,
          type: newDocument.type,
          submission_date: newDocument.submissionDate || null,
          expiry_date: newDocument.expiryDate || null,
          renewal_process: renewalSteps,
          notes: newDocument.notes || null,
          file_url: fileUrl,
          file_name: fileName
        });

      if (error) throw error;

      toast.success('Document added successfully!');
      setShowAddDialog(false);
      setNewDocument({
        name: '',
        type: '',
        submissionDate: '',
        expiryDate: '',
        renewalProcess: '',
        notes: '',
        file: null,
        fileUrl: null
      });
      fetchDocuments();
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Failed to add document');
    }
  };

  const handleEditDocument = (document: UserDocument) => {
    setEditingDocument(document);
    setEditDates({
      submissionDate: document.submission_date || '',
      expiryDate: document.expiry_date || ''
    });
    setShowEditDialog(true);
  };

  const handleEditDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditDates(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveEdit = async () => {
    if (!editingDocument) return;

    try {
      const { error } = await supabase
        .from('user_documents')
        .update({
          submission_date: editDates.submissionDate || null,
          expiry_date: editDates.expiryDate || null
        })
        .eq('id', editingDocument.id);

      if (error) throw error;

      toast.success('Document updated successfully!');
      setShowEditDialog(false);
      setEditingDocument(null);
      fetchDocuments();
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document');
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (expiryDate: string | null) => {
    if (!expiryDate) return <Badge variant="secondary">No Expiry</Badge>;
    
    const daysUntil = getDaysUntilExpiry(expiryDate);
    
    if (daysUntil < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (daysUntil <= 30) {
      return <Badge variant="destructive">Expires Soon</Badge>;
    } else if (daysUntil <= 90) {
      return <Badge className="bg-yellow-500 hover:bg-yellow-600">Expiring</Badge>;
    } else {
      return <Badge className="bg-green-500 hover:bg-green-600">Valid</Badge>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const totalDocuments = documents.length;
  const expiringSoon = documents.filter(doc => 
    doc.expiry_date && getDaysUntilExpiry(doc.expiry_date) <= 30 && getDaysUntilExpiry(doc.expiry_date) >= 0
  ).length;
  const expired = documents.filter(doc => 
    doc.expiry_date && getDaysUntilExpiry(doc.expiry_date) < 0
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management</h1>
          <p className="text-gray-600 mt-2">Keep track of all your important documents and deadlines</p>
        </div>
        <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expiring Soon</p>
                <p className="text-2xl font-bold text-yellow-600">{expiringSoon}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expired</p>
                <p className="text-2xl font-bold text-red-600">{expired}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completion</p>
                <p className="text-2xl font-bold text-green-600">{Math.round((totalDocuments / 10) * 100)}%</p>
              </div>
              <div className="w-full">
                <Progress value={(totalDocuments / 10) * 100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{document.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusBadge(document.expiry_date)}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditDocument(document)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription>{document.type}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {document.submission_date && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    Submitted: {new Date(document.submission_date).toLocaleDateString()}
                  </div>
                )}
                {document.expiry_date && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Expires: {new Date(document.expiry_date).toLocaleDateString()}
                    {getDaysUntilExpiry(document.expiry_date) > 0 && (
                      <span className="text-xs text-gray-500">
                        ({getDaysUntilExpiry(document.expiry_date)} days)
                      </span>
                    )}
                  </div>
                )}
                {document.notes && (
                  <p className="text-sm text-gray-600 line-clamp-2">{document.notes}</p>
                )}
                {document.file_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="w-full"
                  >
                    <a href={document.file_url} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {documents.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
          <p className="text-gray-600 mb-4">Start by adding your first document to keep track of important paperwork.</p>
          <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Document
          </Button>
        </div>
      )}

      <DocumentAddDialog
        open={showAddDialog}
        newDocument={newDocument}
        onChange={(field, value) => setNewDocument(prev => ({ ...prev, [field]: value }))}
        onFileChange={handleFileChange}
        onRemoveFile={handleRemoveFile}
        onCancel={() => setShowAddDialog(false)}
        onSubmit={handleSubmit}
      />

      <DocumentEditDialog
        open={showEditDialog}
        submissionDate={editDates.submissionDate}
        expiryDate={editDates.expiryDate}
        onChange={handleEditDateChange}
        onCancel={() => setShowEditDialog(false)}
        onSubmit={handleSaveEdit}
      />
    </div>
  );
};

export default DocumentsPage;
