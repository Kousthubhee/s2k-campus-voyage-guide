import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Shield, 
  FileText, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  MessageSquare, 
  User,
  Calendar,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { useDocumentReviews, useCreateDocumentReview, useUpdateDocumentReview } from '@/hooks/useDocumentReviews';
import { useToast } from '@/hooks/use-toast';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  document: any;
  onSubmitReview: (status: string, notes: string) => void;
}

const ReviewDialog: React.FC<ReviewDialogProps> = ({ open, onClose, document, onSubmitReview }) => {
  const [status, setStatus] = useState<'approved' | 'rejected' | 'needs_revision'>('approved');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    onSubmitReview(status, notes);
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Review Document: {document?.user_documents?.name || 'Unknown'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Document Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Document Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Type:</span> {document?.user_documents?.type || 'N/A'}
              </div>
              <div>
                <span className="font-medium">User ID:</span> {document?.user_documents?.user_id || 'N/A'}
              </div>
              <div>
                <span className="font-medium">Submitted:</span> {new Date(document?.created_at || '').toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Document Preview */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Document preview would appear here</p>
            <Button variant="outline" className="mt-2">
              <Eye className="h-4 w-4 mr-2" />
              View Full Document
            </Button>
          </div>

          {/* Review Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Review Decision</label>
              <div className="flex gap-2">
                <Button
                  variant={status === 'approved' ? 'default' : 'outline'}
                  onClick={() => setStatus('approved')}
                  className="flex-1"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
                <Button
                  variant={status === 'needs_revision' ? 'default' : 'outline'}
                  onClick={() => setStatus('needs_revision')}
                  className="flex-1"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  Needs Revision
                </Button>
                <Button
                  variant={status === 'rejected' ? 'destructive' : 'outline'}
                  onClick={() => setStatus('rejected')}
                  className="flex-1"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Notes</label>
              <Textarea
                placeholder="Add feedback or instructions for the user..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Review
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const AdminDashboard = () => {
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: documentReviews = [], isLoading, refetch } = useDocumentReviews();
  const createReview = useCreateDocumentReview();
  const updateReview = useUpdateDocumentReview();
  const { toast } = useToast();

  const handleReviewDocument = (document: any) => {
    setSelectedDocument(document);
    setReviewDialogOpen(true);
  };

  const handleSubmitReview = async (status: string, notes: string) => {
    if (!selectedDocument) return;

    try {
      if (selectedDocument.id) {
        // Update existing review
        await updateReview.mutateAsync({
          id: selectedDocument.id,
          status: status as any,
          review_notes: notes,
        });
      } else {
        // Create new review
        await createReview.mutateAsync({
          document_id: selectedDocument.document_id,
          status: status as any,
          review_notes: notes,
        });
      }

      toast({
        title: "Review Submitted",
        description: "Document review has been saved successfully.",
      });

      refetch();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'needs_revision': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'needs_revision': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const filteredReviews = documentReviews.filter(review => {
    const matchesFilter = filterStatus === 'all' || review.status === filterStatus;
    const matchesSearch = !searchTerm || 
      review.user_documents?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.user_documents?.user_id?.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: documentReviews.length,
    pending: documentReviews.filter(r => r.status === 'pending').length,
    approved: documentReviews.filter(r => r.status === 'approved').length,
    rejected: documentReviews.filter(r => r.status === 'rejected').length,
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
        <p className="text-gray-600">Manage document verification and user reviews</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Documents</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents or users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filterStatus === 'approved' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('approved')}
              >
                Approved
              </Button>
              <Button
                variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('rejected')}
              >
                Rejected
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Document Reviews</span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.user_documents?.name || 'Unknown Document'}
                      </h4>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {review.user_documents?.user_id || 'Unknown User'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(review.status)} flex items-center gap-1`}>
                      {getStatusIcon(review.status)}
                      {review.status.replace('_', ' ')}
                    </Badge>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReviewDocument(review)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                      {review.review_notes && (
                        <Button variant="outline" size="sm">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                
                {review.review_notes && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">{review.review_notes}</p>
                  </div>
                )}
              </div>
            ))}
            
            {filteredReviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No documents found matching your criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <ReviewDialog
        open={reviewDialogOpen}
        onClose={() => setReviewDialogOpen(false)}
        document={selectedDocument}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};
