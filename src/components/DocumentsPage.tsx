import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  FileText, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Bell,
  BellOff
} from 'lucide-react';

interface Document {
  id: string;
  title: string;
  type: string;
  status: 'Valid' | 'Expiring' | 'Expired';
  submittedDate?: string;
  expiryDate?: string;
  renewalProcess: string[];
  notes?: string;
  notificationEnabled: boolean;
}

export function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      title: 'Student Visa',
      type: 'Visa',
      status: 'Valid',
      submittedDate: '11/6/2024',
      expiryDate: '11/6/2025',
      renewalProcess: [
        'Start renewal process 3 months before expiry',
        'Book appointment at prefecture',
        'Gather required documents: passport, proof of enrollment, etc.',
        'Pay renewal fees',
        'Submit application at prefecture'
      ],
      notes: 'Remember to bring original documents and copies',
      notificationEnabled: true
    },
    {
      id: '2',
      title: 'Residence Permit',
      type: 'Permit',
      status: 'Expiring',
      submittedDate: '7/8/2024',
      expiryDate: '5/1/2025',
      renewalProcess: [
        'Begin renewal 2 months before expiry',
        'Gather required documents',
        'Schedule prefecture appointment',
        'Submit renewal application'
      ],
      notes: 'Keep proof of previous permits',
      notificationEnabled: true
    }
  ]);

  const toggleNotification = (id: string) => {
    setDocuments(docs => 
      docs.map(doc => 
        doc.id === id 
          ? { ...doc, notificationEnabled: !doc.notificationEnabled }
          : doc
      )
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Valid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expiring':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Expired':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid':
        return <CheckCircle className="h-4 w-4" />;
      case 'Expiring':
        return <Clock className="h-4 w-4" />;
      case 'Expired':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Documents & Renewals</h1>
          <p className="text-gray-600 mt-2">Track your important documents and stay updated on renewal deadlines</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Add Document
        </Button>
      </div>

      {/* Documents Grid */}
      <div className="grid gap-6">
        {documents.map((document) => (
          <Card key={document.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-semibold">{document.title}</CardTitle>
                    <p className="text-sm text-gray-500">{document.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    className={`${getStatusColor(document.status)} flex items-center gap-1 px-2 py-1`}
                  >
                    {getStatusIcon(document.status)}
                    {document.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleNotification(document.id)}
                    className="h-8 w-8"
                  >
                    {document.notificationEnabled ? (
                      <Bell className="h-4 w-4 text-blue-600" />
                    ) : (
                      <BellOff className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                {document.submittedDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Submitted:</span>
                    <span className="font-medium">{document.submittedDate}</span>
                  </div>
                )}
                {document.expiryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Expires:</span>
                    <span className="font-medium">{document.expiryDate}</span>
                  </div>
                )}
              </div>

              {/* Renewal Process */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Renewal Process:</h4>
                <ul className="space-y-1">
                  {document.renewalProcess.map((step, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="text-blue-600 font-medium">{index + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Notes */}
              {document.notes && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">Notes:</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">{document.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}