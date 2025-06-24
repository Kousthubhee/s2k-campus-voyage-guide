import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, CheckCircle, Calendar, ChevronDown, FileText, Clock, Info } from 'lucide-react';
import { ReminderButton } from "@/components/ReminderButton";
import { VisaSchedulerDialog } from "@/components/VisaSchedulerDialog";
import { PageTitle } from "@/components/PageTitle";
import { CheckboxItem } from "@/components/CheckboxItem";
import { MiniChatbot } from "@/components/MiniChatbot";

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
  profile: ProfileType | null; // Made profile nullable
}

export const PreArrival1Page = ({ onBack, onComplete, isCompleted, profile }: PreArrival1PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [reminders, setReminders] = useState<{ [id: string]: string }>({});
  const [appointments, setAppointments] = useState<{ [id: string]: { date: string; location: string } }>({});
  const [documentChecks, setDocumentChecks] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Personalized guidance detection with null checks:
  const personalizedDocs = (userProfile: ProfileType | null) => {
    const alerts: string[] = [];
    if (userProfile) {
      if (userProfile.age && Number(userProfile.age) >= 23) {
        alerts.push("You are 23 or older, so extra experience and/or gap year documentation may be required.");
      }
      if (userProfile.workExperience && userProfile.workExperience.trim() && userProfile.workExperience.trim().toLowerCase() !== 'n/a' && userProfile.workExperience.trim().toLowerCase() !== 'no') {
        alerts.push("You reported work experience, so supporting documents are required for some steps.");
      }
    }
    return alerts;
  };
  const personalizationAlerts = personalizedDocs(profile);

  // IMPORTANT LOGIC: Based on profile, adjust document lists.
  const checklistItems = [
    {
      id: 'campus-france',
      title: "Campus France Registration",
      description: "Complete your Campus France application and interview",
      urgency: "high",
      timeline: "3-4 months before departure",
      documents: (() => {
        // Always required
        const docs = [
          "Degree/diploma certificates (original + copy)",
          "Resume (CV)",
          "Cover letter",
          "Admission letter",
          "Passport copy",
          "Photograph",
          "Campus France fee payment receipt"
        ];
        // Only require Experience Letter & Gap justification if age > 23 or gap-year/experience data
        if (profile && ((profile.age && Number(profile.age) >= 23) || (profile.workExperience && profile.workExperience.trim() && profile.workExperience.trim().toLowerCase() !== 'n/a' && profile.workExperience.trim().toLowerCase() !== 'no'))) {
          docs.splice(3,0,"Experience letter (if applicable)");
        }
        if (profile && profile.age && Number(profile.age) >= 23) {
          docs.push("Gap year justification (if any)");
        }
        return docs;
      })(),
      process: [
        "Create account on Etudes en France portal",
        "Upload documents and submit application",
        "Attend Campus France interview",
        "Receive registration number and NOC"
      ]
    },
    {
      id: 'vfs',
      title: "VFS Visa Application",
      description: "Submit visa documents and attend biometric appointment",
      urgency: "high",
      timeline: "2-3 months before departure",
      documents: (() => {
        const docs = [
          "Visa application form (signed)",
          "Passport + copy",
          "2 passport-size photos",
          "Campus France registration number + NOC",
          "Admission letter",
          "Tuition fee payment proof",
          "Proof of accommodation",
          "Proof of financial means",
          "Cover letter",
          "Travel insurance (3 months)",
          "Flight booking (dummy or real)",
          "SOP, expense sheet, CA statement (optional)"
        ];
        // Require extra docs for older or gap/experience applicants
        if (profile && ((profile.age && Number(profile.age) >= 23) || (profile.workExperience && profile.workExperience.trim() && profile.workExperience.trim().toLowerCase() !== 'n/a' && profile.workExperience.trim().toLowerCase() !== 'no'))) {
          docs.splice(3, 0, "Experience letter (if applicable)");
        }
        if (profile && profile.age && Number(profile.age) >= 23) {
          docs.push("Gap year justification (if any)");
        }
        return docs;
      })(),
      process: [
        "Gather all documents",
        "Book VFS appointment",
        "Submit documents + attend biometrics",
        "Await visa decision"
      ]
    },
    {
      id: 'documents',
      title: "Document Translation",
      description: "Get official translations of academic documents",
      urgency: "medium",
      timeline: "2 months before departure",
      documents: [
        "Academic certificates",
        "Transcripts",
        "Experience letters",
        "Any non-English/French documents"
      ],
      process: [
        "Identify documents needing translation",
        "Use certified translator",
        "Receive signed and stamped translations"
      ]
    },
    {
      id: 'insurance',
      title: "Travel Insurance",
      description: "Purchase comprehensive travel and health insurance",
      urgency: "medium",
      timeline: "1 month before departure",
      documents: [
        "Passport copy",
        "Insurance certificate with name, dates, and coverage"
      ],
      process: [
        "Purchase 3-month comprehensive travel insurance",
        "Attach policy document to visa file"
      ]
    },
    {
      id: 'flight',
      title: "Flight Booking",
      description: "Book your flight to France",
      urgency: "low",
      timeline: "1 month before departure",
      documents: [
        "Dummy or confirmed flight ticket"
      ],
      process: [
        "For visa: get refundable or dummy ticket",
        "After visa approval: book actual ticket"
      ]
    }
  ];

  const handleDocumentCheck = (itemId: string, docIndex: number, checked: boolean) => {
    const key = `${itemId}-${docIndex}`;
    setDocumentChecks(prev => ({ ...prev, [key]: checked }));
  };

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const allStepsCompleted = completedSteps.length === checklistItems.length;

  return (
    <div className="max-w-4xl mx-auto">
      <MiniChatbot pageContext="Pre-Arrival Checklist (Part 1)" />
      
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
            Campus France, VFS, and essential preparations
          </p>
          {personalizationAlerts.length > 0 && (
            <div className="mx-auto max-w-xl mt-4 mb-2 bg-blue-50 border border-blue-300 text-blue-900 text-sm rounded-lg p-3">
              <div className="font-semibold mb-1 flex items-center">
                <Info className="inline h-4 w-4 mr-2 text-blue-500" />
                Personalized Guidance
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

          // Identify if extra documents were shown due to age/experience
          let extraDocs: string[] = [];
          if (profile && item.documents.some((d: string) => d.toLowerCase().includes("experience letter"))) {
            if (
              (profile.age && Number(profile.age) >= 23) ||
              (profile.workExperience && profile.workExperience.trim() && profile.workExperience.trim().toLowerCase() !== 'n/a' && profile.workExperience.trim().toLowerCase() !== 'no')
            ) {
              extraDocs.push("Experience Letter");
            }
          }
          if (profile && item.documents.some((d: string) => d.toLowerCase().includes("gap year justification"))) {
            if (profile.age && Number(profile.age) >= 23) {
              extraDocs.push("Gap year justification");
            }
          }

          return (
            <Card key={index} className={`border-l-4 border-l-blue-500 ${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
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
                      {extraDocs.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="inline-flex items-center px-3 py-0.5 bg-yellow-50 border border-yellow-300 rounded-full text-xs text-yellow-800 font-medium">
                            Personalized: Requires {extraDocs.join(", ")}
                          </span>
                          <span className="text-xs text-blue-500">(Based on your profile)</span>
                        </div>
                      )}
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
                  <Collapsible 
                    open={isOpen} 
                    onOpenChange={() => toggleSection(item.id)}
                  >
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm" className="w-full justify-between">
                        <span className="flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          View Details
                        </span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </Button>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent className="mt-4 space-y-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">📋 Documents Required:</h4>
                        <div className="space-y-2">
                          {item.documents.map((doc, docIndex) => (
                            <CheckboxItem
                              key={docIndex}
                              id={`${item.id}-doc-${docIndex}`}
                              checked={documentChecks[`${item.id}-${docIndex}`] || false}
                              onCheckedChange={(checked) => handleDocumentCheck(item.id, docIndex, checked)}
                              className="text-blue-800"
                            >
                              {doc}
                              {extraDocs.includes(doc.split(" (")[0]) && (
                                <span className="ml-2 px-2 inline rounded bg-yellow-100 text-yellow-700 text-xs font-medium">Personalized</span>
                              )}
                            </CheckboxItem>
                          ))}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-2">🔄 Process:</h4>
                        <ol className="space-y-1">
                          {item.process.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-green-800 flex items-start">
                              <span className="mr-2 font-medium">{stepIndex + 1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <ReminderButton
                      date={reminders[item.id]}
                      onSet={dt => setReminders(rem => ({ ...rem, [item.id]: dt }))}
                    />
                    {isVisaStep && (
                      <VisaSchedulerDialog
                        appointment={appointments[item.id] || null}
                        onSet={val => setAppointments(a => ({ ...a, [item.id]: val }))}
                      />
                    )}
                    {!isStepCompleted && (
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(item.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Steps Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've finished all steps in this module.
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
