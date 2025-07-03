import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { FileText, Plus, Bell, Calendar, AlertTriangle, CheckCircle, Clock, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      notes: 'Remember to bring original documents and copies'
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
      notes: 'Keep proof of previous permits'
    }
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    submissionDate: '',
    expiryDate: '',
    renewalProcess: '',
    notes: ''
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
      notificationEnabled: true
    };

    setDocuments([...documents, newDoc]);
    setIsAddDialogOpen(false);
    setNewDocument({ name: '', type: '', submissionDate: '', expiryDate: '', renewalProcess: '', notes: '' });
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

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <FileText className="h-8 w-8 mr-3 text-blue-600" />
          Documents & Renewals
        </h1>
        <p className="text-lg text-gray-600">
          Track your important documents and stay updated on renewal deadlines
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {documents.map((doc) => (
          <Card key={doc.id} className={`border-l-4 ${
            doc.status === 'valid' ? 'border-l-green-500' :
            doc.status === 'expiring' ? 'border-l-orange-500' :
            'border-l-red-500'
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
                  
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Renewal Process:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {doc.renewalProcess.map((step, index) => (
                        <li key={index} className="text-sm text-gray-600">{step}</li>
                      ))}
                    </ul>
                  </div>

                  {doc.notes && (
                    <div className="mt-4 bg-gray-50 p-3 rounded-md">
                      <h4 className="font-medium text-gray-900 mb-1">Notes:</h4>
                      <p className="text-sm text-gray-600">{doc.notes}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={doc.notificationEnabled ? 'text-blue-600' : 'text-gray-400'}
                    onClick={() => toggleNotification(doc.id)}
                  >
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600"
                    onClick={() => deleteDocument(doc.id)}
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
        ))}
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                onChange={(e) => setNewDocument({ ...newDocument, name: e.target.value })}
                placeholder="e.g., Student Visa"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">Document Type</Label>
              <Input
                id="type"
                value={newDocument.type}
                onChange={(e) => setNewDocument({ ...newDocument, type: e.target.value })}
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
                onChange={(e) => setNewDocument({ ...newDocument, submissionDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="date"
                value={newDocument.expiryDate}
                onChange={(e) => setNewDocument({ ...newDocument, expiryDate: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="renewalProcess">Renewal Process (one step per line)</Label>
              <Textarea
                id="renewalProcess"
                value={newDocument.renewalProcess}
                onChange={(e) => setNewDocument({ ...newDocument, renewalProcess: e.target.value })}
                placeholder="Step 1&#10;Step 2&#10;Step 3"
                className="h-32"
              />
            </div>
            <div>
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                value={newDocument.notes}
                onChange={(e) => setNewDocument({ ...newDocument, notes: e.target.value })}
                placeholder="Add any important notes or reminders..."
                className="h-20"
              />
            </div>
            <div className="flex justify-end gap-2">
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
  );
};