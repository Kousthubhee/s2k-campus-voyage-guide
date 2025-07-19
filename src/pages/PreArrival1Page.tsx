import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, CheckCircle, Calendar, ChevronDown, FileText, Clock, Info, Bell, Plus, X } from 'lucide-react';
import { ReminderButton } from "@/components/ReminderButton";
import { VisaSchedulerDialog } from "@/components/VisaSchedulerDialog";
import { PageTitle } from "@/components/PageTitle";
import { CheckboxItem } from "@/components/CheckboxItem";
import { EnhancedDocumentUploadButton } from "@/components/EnhancedDocumentUploadButton";
import { DocumentPreviewDialog } from "@/components/DocumentPreviewDialog";
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileType {
  name: string;
  email: string;
  about: string;
  memberSince: string;
  photo: string;
  age: string;
  prevEducation: string;
  workExperience: string;
}

interface PreArrival1PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  profile: ProfileType | null;
}

interface ReminderItem {
  date: string;
  note: string;
}

interface UploadedDocument {
  name: string;
  url: string;
  type: string;
}

interface PageProgress {
  completedSteps: string[];
  documentUploads: { [key: string]: UploadedDocument[] };
  documentChecks: { [key: string]: boolean };
}

export const PreArrival1Page = ({ onBack, onComplete, isCompleted, profile }: PreArrival1PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [reminders, setReminders] = useState<{ [id: string]: ReminderItem[] }>({});
  const [appointments, setAppointments] = useState<{ [id: string]: { date: string; location: string } }>({});
  const [documentChecks, setDocumentChecks] = useState<{ [key: string]: boolean }>({});
  const [documentUploads, setDocumentUploads] = useState<{ [key: string]: UploadedDocument[] }>({});
  const [showReminderDialog, setShowReminderDialog] = useState<string | null>(null);
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderNote, setNewReminderNote] = useState('');
  const [previewDocument, setPreviewDocument] = useState<UploadedDocument | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`preArrival1Progress_${user?.id || 'guest'}`);
    if (savedProgress) {
      try {
        const progress: PageProgress = JSON.parse(savedProgress);
        setCompletedSteps(progress.completedSteps || []);
        setDocumentUploads(progress.documentUploads || {});
        setDocumentChecks(progress.documentChecks || {});
      } catch (error) {
        console.error('Error loading progress:', error);
      }
    }
  }, [user]);

  // Load existing documents from Supabase on mount
  useEffect(() => {
    const loadExistingDocuments = async () => {
      if (!user) return;

      try {
        const { data: documents, error } = await supabase
          .from('user_documents')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error loading documents:', error);
          return;
        }

        if (documents && documents.length > 0) {
          const documentsByType: { [key: string]: UploadedDocument[] } = {};
          
          // Process documents and get signed URLs
          for (const doc of documents) {
            try {
              // Get signed URL for each document
              const { data: signedUrlData, error: urlError } = await supabase.storage
                .from('documents')
                .createSignedUrl(doc.file_url || '', 3600); // 1 hour expiry

              if (urlError) {
                console.error('Error creating signed URL for', doc.file_name, ':', urlError);
                continue;
              }

              const uploadedDoc: UploadedDocument = {
                name: doc.file_name || doc.name,
                url: signedUrlData.signedUrl,
                type: doc.file_name?.split('.').pop()?.toLowerCase() === 'pdf' ? 'application/pdf' : 'image/jpeg'
              };

              // Group by document type
              if (!documentsByType[doc.type]) {
                documentsByType[doc.type] = [];
              }
              documentsByType[doc.type].push(uploadedDoc);
            } catch (docError) {
              console.error('Error processing document:', doc.file_name, docError);
            }
          }

          setDocumentUploads(documentsByType);
        }
      } catch (error) {
        console.error('Error loading existing documents:', error);
      }
    };

    loadExistingDocuments();
  }, [user]);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    const progress: PageProgress = {
      completedSteps,
      documentUploads,
      documentChecks
    };
    localStorage.setItem(`preArrival1Progress_${user?.id || 'guest'}`, JSON.stringify(progress));
  }, [completedSteps, documentUploads, documentChecks, user]);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Personalized guidance detection with null checks for both logged in and non-logged in users
  const personalizedDocs = (userProfile: ProfileType | null) => {
    const alerts: string[] = [];
    if (userProfile) {
      if (userProfile.age && Number(userProfile.age) >= 23) {
        alerts.push("You are 23 or older, so extra experience and/or gap year documentation may be required.");
      }
      if (userProfile.workExperience && userProfile.workExperience.trim() && userProfile.workExperience.trim().toLowerCase() !== 'n/a' && userProfile.workExperience.trim().toLowerCase() !== 'no') {
        alerts.push("You reported work experience, so supporting documents are required for some steps.");
      }
    } else {
      // For non-logged in users, show general guidance
      alerts.push("Sign in to get personalized guidance based on your profile.");
    }
    return alerts;
  };
  const personalizationAlerts = personalizedDocs(profile);

  // Checklist items with comprehensive processes (removed accommodation-note)
  const checklistItems = [
  {
    id: 'campus-france',
    title: "Campus France Registration",
    description: "Complete your Campus France application and interview - MANDATORY first step",
    urgency: "high",
    timeline: "3-4 months before departure",
    documents: (() => {
      const docs = [
        "Degree/diploma certificates (original + copy)",
        "Academic transcripts (all years)",
        "Resume (CV) in French or English",
        "Cover letter explaining study motivation",
        "Admission letter from French institution",
        "Passport copy (all pages)",
        "Recent passport-size photographs (35mm x 45mm)",
        "Campus France fee payment receipt",
        "Language proficiency certificate (if required)"
      ];
      if (profile && ((profile.age && Number(profile.age) >= 23) || (profile.workExperience && profile.workExperience.trim().toLowerCase() !== 'n/a' && profile.workExperience.trim().toLowerCase() !== 'no'))) {
        docs.splice(4, 0, "Experience letters from employers");
        docs.push("Gap year explanation letter (if applicable)");
      }
      return docs;
    })(),
    process: [
      "Create account on Etudes en France portal (www.campusfrance.org) https://www.campusfrance.org/fr",
      "Fill out personal information and academic history",
      "Upload all required documents in PDF format",
      "Pay Campus France processing fee (varies by country)",
      "Submit complete application online",
      "Wait for appointment scheduling email",
      "Attend Campus France interview at nearest center",
      "Receive Campus France registration number and NOC (No Objection Certificate)"
    ]
  },

  {
    id: 'vfs',
    title: "VFS Visa Application",
    description: "Submit visa documents and attend biometric appointment at VFS Global center",
    urgency: "high",
    timeline: "2-3 months before departure (after Campus France approval)",
    documents: (() => {
      const docs = [
        "Long-stay visa application form (filled and signed)",
        "Passport (valid for 3+ months beyond stay) + all pages copy",
        "2 recent passport-size photos (35mm x 45mm, white background)",
        "Campus France registration number + NOC certificate",
        "Original admission letter from French institution",
        "Tuition fee payment proof or fee exemption certificate",
        "Proof of accommodation in France",
        "Proof of financial means (bank statements, scholarship letters)",
        "Detailed cover letter explaining study plans",
        "Travel insurance (minimum 3 months, 30,000€ coverage)",
        "Flight booking confirmation (can be dummy ticket)",
        "Birth certificate (original + copy)",
        "SOP (Statement of Purpose), expense calculation sheet, CA statement (recommended)"
      ];
      if (profile && ((profile.age && Number(profile.age) >= 23) || (profile.workExperience && profile.workExperience.trim().toLowerCase() !== 'n/a' && profile.workExperience.trim().toLowerCase() !== 'no'))) {
        docs.splice(5, 0, "Work experience certificates and letters");
        docs.push("Explanation letter for career gap (if applicable)");
      }
      return docs;
    })(),
    process: [
      "Gather all required documents (check VFS website for latest requirements)",
      "Book VFS appointment online at vfsglobal.com",
      "Pay visa application fee online",
      "Visit VFS center on appointment date with original documents",
      "Submit documents and provide biometric data (fingerprints + photo)",
      "Receive tracking number for application status",
      "Wait for visa processing (typically 15-20 working days)",
      "Collect passport with visa or opt for courier delivery"
    ]
  },

  {
    id: 'documents',
    title: "Document Translation & Legalization",
    description: "Get official translations and apostille/attestation of academic documents",
    urgency: "medium",
    timeline: "2-3 months before departure",
    documents: [
      "Academic certificates and transcripts",
      "Birth certificate",
      "Experience letters and employment certificates",
      "Medical certificates (if required)",
      "Police clearance certificate (if required)",
      "Any non-English/French official documents"
    ],
    process: [
      "Identify all documents needing translation",
      "Get apostille/attestation from respective authorities",
      "Use certified translator recognized by French authorities",
      "Ensure translations are signed and stamped",
      "Keep both originals and translated copies",
      "Get additional copies as backup"
    ]
  },

  {
    id: 'insurance',
    title: "Travel & Health Insurance",
    description: "Purchase comprehensive travel and health insurance as per Schengen requirements",
    urgency: "medium",
    timeline: "1-2 months before departure",
    documents: [
      "Passport copy for insurance application",
      "Insurance certificate with full name and dates",
      "Coverage details showing minimum 30,000€ medical coverage",
      "Policy document in English or French"
    ],
    process: [
      "Research Schengen-compliant insurance providers",
      "Purchase policy with minimum 30,000€ medical coverage",
      "Ensure coverage includes repatriation and emergency evacuation",
      "Get policy certificate with your exact name as in passport",
      "Keep digital and physical copies of insurance documents",
      "Consider extending coverage beyond initial 3 months"
    ]
  },

  {
    id: 'flight',
    title: "Flight Booking & Travel Arrangements",
    description: "Book flights and arrange travel logistics for departure",
    urgency: "low",
    timeline: "1 month before departure",
    documents: [
      "Flight booking confirmation",
      "Travel itinerary",
      "Airport transfer arrangements"
    ],
    process: [
      "For visa application: book refundable ticket or get dummy ticket",
      "After visa approval: book confirmed flight tickets",
      "Arrange airport pickup or public transport to accommodation",
      "Plan arrival during weekdays for easier administrative tasks",
      "Inform institution about arrival date and time",
      "Keep all travel documents easily accessible during journey"
    ]
  },

  {
    id: 'preparation',
    title: "Pre-Departure Preparation",
    description: "Final preparations before traveling to France",
    urgency: "medium",
    timeline: "2-4 weeks before departure",
    documents: [
      "All original documents in organized folder",
      "Digital copies on cloud storage",
      "Emergency contact list",
      "Institution contact details",
      "Accommodation confirmation"
    ],
    process: [
      "Inform bank about international travel to avoid card blocks",
      "Get international roaming plan or French SIM card info",
      "Research about your destination city and nearest services",
      "Pack essential items and documents in carry-on luggage",
      "Exchange some currency to Euros for initial expenses",
      "Download offline maps and translation apps",
      "Prepare for cultural orientation and language basics"
    ]
  }
];

  const handleDocumentCheck = (itemId: string, docIndex: number, checked: boolean) => {
    const key = `${itemId}-${docIndex}`;
    setDocumentChecks(prev => ({ ...prev, [key]: checked }));
  };

  const handleDocumentUpload = (itemId: string, docIndex: number, documents: UploadedDocument[]) => {
    const key = `${itemId}-${docIndex}`;
    setDocumentUploads(prev => ({ ...prev, [key]: documents }));
    
    // Auto-check the checkbox when documents are uploaded
    if (documents.length > 0) {
      setDocumentChecks(prev => ({ ...prev, [key]: true }));
    }
  };

  const handleStepComplete = (stepId: string, isCompleted: boolean) => {
    if (isCompleted) {
      if (!completedSteps.includes(stepId)) {
        setCompletedSteps([...completedSteps, stepId]);
      }
    } else {
      setCompletedSteps(completedSteps.filter(id => id !== stepId));
    }
  };

  const handleAddReminder = (itemId: string) => {
    if (newReminderDate && newReminderNote) {
      setReminders(prev => ({
        ...prev,
        [itemId]: [...(prev[itemId] || []), { date: newReminderDate, note: newReminderNote }]
      }));
      setNewReminderDate('');
      setNewReminderNote('');
      setShowReminderDialog(null);
    }
  };

  const handleDeleteReminder = (itemId: string, index: number) => {
    setReminders(prev => ({
      ...prev,
      [itemId]: prev[itemId]?.filter((_, i) => i !== index) || []
    }));
  };

  const handlePreviewDocument = (document: UploadedDocument) => {
    setPreviewDocument(document);
  };

  const allStepsCompleted = completedSteps.length === checklistItems.length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <div className="text-center mb-8">
          <PageTitle>
            ✈️ Pre-Arrival Checklist (Part 1)
          </PageTitle>
          <p className="text-base text-gray-600 font-calibri">
            Campus France, VFS, and essential preparations for studying in France
          </p>
          {personalizationAlerts.length > 0 && (
            <div className="mx-auto max-w-xl mt-4 mb-2 bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg p-3">
              <div className="font-semibold mb-1 flex items-center">
                <Info className="inline h-4 w-4 mr-2 text-blue-500" />
                {user ? 'Personalized Guidance' : 'General Guidance'}
              </div>
              <ul className="list-disc ml-5">
                {personalizationAlerts.map((alert, i) => (
                  <li key={i}>{alert}</li>
                ))}
              </ul>
            </div>
          )}
          {isCompleted && (
            <div className="mt-4 bg-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                <span className="text-green-800 font-medium">Module Completed! You earned a key 🗝️</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {checklistItems.map((item, index) => {
          const isStepCompleted = completedSteps.includes(item.id);
          const isOpen = openSections.includes(item.id);
          const isVisaStep = item.id === "vfs";
          const itemReminders = reminders[item.id] || [];

          return (
            <div key={index}>
              {/* Important Note Before VFS - Static Info Block */}
              {item.id === "vfs" && (
                <Card className="mb-4 border-l-4 border-l-blue-500 bg-blue-50">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <Info className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">
                          Important Note Before VFS Visa Application
                        </h4>
                        <p className="text-blue-800">
                          It is highly recommended to book accommodation and flight tickets before applying for your visa. 
                          Avoid using platforms like Airbnb, as temporary bookings might lead to rejection or additional scrutiny.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className={`border-l-4 border-l-blue-500 ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${
                        isStepCompleted 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <p className="text-gray-600 mt-1">{item.description}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.urgency === 'high' 
                        ? 'bg-red-100 text-red-800' 
                        : item.urgency === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {item.urgency} priority
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      Timeline: {item.timeline}
                    </div>

                    {/* Reminders Section */}
                    {itemReminders.length > 0 && (
                      <div className="bg-yellow-50 p-3 rounded-lg">
                        <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                          <Bell className="h-4 w-4 mr-2" />
                          Your Reminders
                        </h4>
                        <div className="space-y-2">
                          {itemReminders.map((reminder, reminderIndex) => (
                            <div key={reminderIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                              <div className="flex-1">
                                <div className="text-sm font-medium">{reminder.date}</div>
                                <div className="text-xs text-gray-600">{reminder.note}</div>
                              </div>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDeleteReminder(item.id, reminderIndex)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Collapsible 
                      open={isOpen} 
                      onOpenChange={() => toggleSection(item.id)}
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="outline" size="sm" className="w-full justify-between">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-2" />
                            View Detailed Process & Documents
                          </span>
                          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </Button>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent className="mt-4 space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-900 mb-3">📋 Required Documents:</h4>
                          <div className="space-y-3">
                            {item.documents.map((doc, docIndex) => {
                              const docKey = `${item.id}-${docIndex}`;
                              const uploadedDocs = documentUploads[docKey] || [];
                              return (
                                <div key={docIndex} className="space-y-2">
                                  <div className="flex items-center justify-between p-3 border rounded-lg bg-white">
                                    <div className="flex items-center flex-1">
                                      <CheckboxItem
                                        id={`${item.id}-doc-${docIndex}`}
                                        checked={documentChecks[docKey] || false}
                                        onCheckedChange={(checked) => handleDocumentCheck(item.id, docIndex, checked)}
                                        className="text-blue-800 mr-3"
                                      >
                                        {doc}
                                      </CheckboxItem>
                                    </div>
                                    {/* Show upload button for all steps except preparation */}
                                    {item.id !== 'preparation' && (
                                      <EnhancedDocumentUploadButton
                                        documentType={docKey}
                                        onUploadComplete={(documents) => handleDocumentUpload(item.id, docIndex, documents)}
                                        uploadedDocuments={uploadedDocs}
                                        onPreview={handlePreviewDocument}
                                      />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-3">🔄 Step-by-Step Process:</h4>
                          <ol className="space-y-2">
                            {item.process.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-sm text-green-800 flex items-start">
                                <span className="mr-3 font-bold text-green-600 bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                <span>{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowReminderDialog(item.id)}
                        className="flex items-center gap-1"
                      >
                        <Plus className="h-4 w-4" />
                        Add Reminder
                      </Button>
                      {isVisaStep && (
                        <VisaSchedulerDialog
                          appointment={appointments[item.id] || null}
                          onSet={val => setAppointments(a => ({ ...a, [item.id]: val }))}
                        />
                      )}
                      <Button 
                        size="sm"
                        variant={isStepCompleted ? "default" : "outline"}
                        onClick={() => handleStepComplete(item.id, !isStepCompleted)}
                        className={isStepCompleted ? "bg-green-600 hover:bg-green-700 text-white" : "border-green-600 text-green-600 hover:bg-green-50"}
                      >
                        {isStepCompleted ? "✓ Completed" : "Mark Complete"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Add Reminder Dialog */}
      <Dialog open={showReminderDialog !== null} onOpenChange={() => setShowReminderDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Reminder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="reminder-date">Date</label>
              <Input
                id="reminder-date"
                type="date"
                value={newReminderDate}
                onChange={e => setNewReminderDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="reminder-note">Note</label>
              <Input
                id="reminder-note"
                type="text"
                placeholder="Add a note for this reminder..."
                value={newReminderNote}
                onChange={e => setNewReminderNote(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => showReminderDialog && handleAddReminder(showReminderDialog)}
              disabled={!newReminderDate || !newReminderNote}
            >
              Add Reminder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Preview Dialog */}
      <DocumentPreviewDialog
        isOpen={previewDocument !== null}
        onClose={() => setPreviewDocument(null)}
        document={previewDocument}
      />

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Steps Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Congratulations! You've completed all the essential pre-arrival steps for studying in France.
            </p>
            <Button 
              onClick={onComplete}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {checklistItems.length} steps completed
      </div>
    </div>
  );
};
