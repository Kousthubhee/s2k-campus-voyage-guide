import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { DocumentCard } from '@/components/documents/DocumentCard';
import { DocumentAddDialog } from '@/components/documents/DocumentAddDialog';
import { DocumentEditDialog } from '@/components/documents/DocumentEditDialog';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

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

export function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingDoc, setEditingDoc] = useState<Document | null>(null);
  const [editDates, setEditDates] = useState({ submissionDate: '', expiryDate: '' });
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    submissionDate: '',
    expiryDate: '',
    renewalProcess: '',
    notes: '',
    file: null as File | null,
    fileUrl: null as string | null,
  });

  // Load documents from database
  useEffect(() => {
    if (user) {
      loadDocuments();
    }
  }, [user]);

  const loadDocuments = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const formattedDocs = data?.map(doc => ({
        id: doc.id,
        name: doc.name,
        type: doc.type,
        submissionDate: doc.submission_date || '',
        expiryDate: doc.expiry_date || '',
        status: doc.status as 'valid' | 'expiring' | 'expired',
        renewalProcess: doc.renewal_process || [],
        notificationEnabled: doc.notification_enabled ?? true,
        notes: doc.notes || '',
        fileUrl: doc.file_url || null,
        file: null,
      })) || [];

      setDocuments(formattedDocs);
    } catch (error) {
      console.error('Error loading documents:', error);
      toast.error('Failed to load documents');
    }
  };

  const handleAddDocument = async () => {
    if (!user || !newDocument.name || !newDocument.type) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      const renewalSteps = newDocument.renewalProcess
        .split('\n')
        .filter(step => step.trim())
        .map(step => step.trim());

      const documentData = {
        user_id: user.id,
        name: newDocument.name,
        type: newDocument.type,
        submission_date: newDocument.submissionDate || null,
        expiry_date: newDocument.expiryDate || null,
        renewal_process: renewalSteps,
        notes: newDocument.notes || null,
        status: 'valid',
        notification_enabled: true,
      };

      const { data, error } = await supabase
        .from('user_documents')
        .insert(documentData)
        .select()
        .single();

      if (error) throw error;

      toast.success('Document added successfully');
      setShowAddDialog(false);
      setNewDocument({
        name: '',
        type: '',
        submissionDate: '',
        expiryDate: '',
        renewalProcess: '',
        notes: '',
        file: null,
        fileUrl: null,
      });
      loadDocuments();
    } catch (error) {
      console.error('Error adding document:', error);
      toast.error('Failed to add document');
    }
  };

  const handleEditDocument = (doc: Document) => {
    setEditingDoc(doc);
    setEditDates({
      submissionDate: doc.submissionDate,
      expiryDate: doc.expiryDate,
    });
    setShowEditDialog(true);
  };

  const handleSaveEditedDocument = async () => {
    if (!editingDoc) return;

    try {
      const { error } = await supabase
        .from('user_documents')
        .update({
          submission_date: editDates.submissionDate || null,
          expiry_date: editDates.expiryDate || null,
        })
        .eq('id', editingDoc.id);

      if (error) throw error;

      toast.success('Document updated successfully');
      setShowEditDialog(false);
      setEditingDoc(null);
      loadDocuments();
    } catch (error) {
      console.error('Error updating document:', error);
      toast.error('Failed to update document');
    }
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Document deleted successfully');
      loadDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const handleToggleNotification = async (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (!doc) return;

    try {
      const { error } = await supabase
        .from('user_documents')
        .update({ notification_enabled: !doc.notificationEnabled })
        .eq('id', id);

      if (error) throw error;

      setDocuments(docs =>
        docs.map(d =>
          d.id === id ? { ...d, notificationEnabled: !d.notificationEnabled } : d
        )
      );
    } catch (error) {
      console.error('Error toggling notification:', error);
      toast.error('Failed to update notification setting');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, docId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setDocuments(docs =>
        docs.map(doc =>
          doc.id === docId ? { ...doc, file, fileUrl } : doc
        )
      );
    }
  };

  const handleRemoveFile = (docId: string) => {
    setDocuments(docs =>
      docs.map(doc =>
        doc.id === docId ? { ...doc, file: null, fileUrl: null } : doc
      )
    );
  };

  const handleNewDocumentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setNewDocument(prev => ({ ...prev, file, fileUrl }));
    }
  };

  const handleRemoveNewDocumentFile = () => {
    setNewDocument(prev => ({ ...prev, file: null, fileUrl: null }));
  };

  const handleNewDocumentChange = (field: string, value: any) => {
    setNewDocument(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents & Renewals</h1>
          <p className="text-gray-600 mt-2">Track your important documents and stay updated on renewal deadlines</p>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => setShowAddDialog(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-6">
        {documents.map((document) => (
          <DocumentCard
            key={document.id}
            doc={document}
            onEdit={handleEditDocument}
            onDelete={handleDeleteDocument}
            onToggleNotification={handleToggleNotification}
            onFileChange={handleFileChange}
            onRemoveFile={handleRemoveFile}
          />
        ))}
        
        {documents.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No documents added yet. Click "Add Document" to get started.
          </div>
        )}
      </div>

      {/* Add Document Dialog */}
      <DocumentAddDialog
        open={showAddDialog}
        newDocument={newDocument}
        onChange={handleNewDocumentChange}
        onFileChange={handleNewDocumentFileChange}
        onRemoveFile={handleRemoveNewDocumentFile}
        onCancel={() => setShowAddDialog(false)}
        onSubmit={handleAddDocument}
      />

      {/* Edit Document Dialog */}
      <DocumentEditDialog
        open={showEditDialog}
        submissionDate={editDates.submissionDate}
        expiryDate={editDates.expiryDate}
        onChange={(e) => setEditDates(prev => ({ ...prev, [e.target.name]: e.target.value }))}
        onCancel={() => setShowEditDialog(false)}
        onSubmit={handleSaveEditedDocument}
      />
    </div>
  );
}