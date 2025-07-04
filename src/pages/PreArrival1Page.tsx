// 🔁 FULL UPDATED COMPONENT CODE
// Includes dynamic links per process step for each checklist item

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, CheckCircle, Calendar, ChevronDown, FileText, Info } from 'lucide-react';
import { ReminderButton } from "@/components/ReminderButton";
import { VisaSchedulerDialog } from "@/components/VisaSchedulerDialog";
import { PageTitle } from "@/components/PageTitle";
import { CheckboxItem } from "@/components/CheckboxItem";
import { DocumentUploadButton } from "@/components/DocumentUploadButton";
import { useAuth } from '@/hooks/useAuth';

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

export const PreArrival1Page = ({ onBack, onComplete, isCompleted, profile }: PreArrival1PageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [reminders, setReminders] = useState<{ [id: string]: string }>({});
  const [appointments, setAppointments] = useState<{ [id: string]: { date: string; location: string } }>({});
  const [documentChecks, setDocumentChecks] = useState<{ [key: string]: boolean }>({});
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: boolean }>({});
  const { user } = useAuth();

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const personalizedDocs = (userProfile: ProfileType | null) => {
    const alerts: string[] = [];
    if (userProfile) {
      if (userProfile.age && Number(userProfile.age) >= 23) {
        alerts.push("You are 23 or older, so extra experience and/or gap year documentation may be required.");
      }
      if (userProfile.workExperience && userProfile.workExperience.trim().toLowerCase() !== 'n/a' && userProfile.workExperience.trim().toLowerCase() !== 'no') {
        alerts.push("You reported work experience, so supporting documents are required for some steps.");
      }
    } else {
      alerts.push("Sign in to get personalized guidance based on your profile.");
    }
    return alerts;
  };
  const personalizationAlerts = personalizedDocs(profile);

  const checklistItems = [
    {
      id: 'campus-france',
      title: "Campus France Registration",
      description: "Complete your Campus France application and interview - MANDATORY first step",
      urgency: "high",
      timeline: "3-4 months before departure",
      documents: ["Degree certificate", "Transcript", "Passport copy"],
      process: [
        "Create an account on Etudes en France portal",
        "Fill out personal information and academic history",
        "Upload all required documents"
      ],
      links: [
        "https://www.campusfrance.org/fr",
        "https://etudes-en-france.com",
        "https://upload-docs.example.com"
      ]
    }
  ];

  const handleDocumentCheck = (itemId: string, docIndex: number, checked: boolean) => {
    const key = `${itemId}-${docIndex}`;
    setDocumentChecks(prev => ({ ...prev, [key]: checked }));
  };

  const handleDocumentUpload = (itemId: string, docIndex: number, fileName: string) => {
    const key = `${itemId}-${docIndex}`;
    setUploadedDocs(prev => ({ ...prev, [key]: true }));
  };

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const allStepsCompleted = completedSteps.length === checklistItems.length;

  return (
    <div className="max-w-4xl mx-auto">
      <Button variant="outline" onClick={onBack} className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Checklist
      </Button>

      <PageTitle>✈️ Pre-Arrival Checklist (Part 1)</PageTitle>

      {personalizationAlerts.length > 0 && (
        <div className="bg-blue-50 border p-3 rounded-lg text-blue-900 mt-4">
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

      <div className="space-y-4 mt-6">
        {checklistItems.map((item, index) => {
          const isStepCompleted = completedSteps.includes(item.id);
          const isOpen = openSections.includes(item.id);

          return (
            <Card key={index} className="border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 mt-1 ${isStepCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
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
                  <Collapsible open={isOpen} onOpenChange={() => toggleSection(item.id)}>
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
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-3">🔄 Step-by-Step Process:</h4>
                        <ol className="space-y-2">
                          {item.process.map((step, stepIndex) => {
                            const stepLink = item.links?.[stepIndex];
                            return (
                              <li key={stepIndex} className="text-sm text-green-800 flex items-start">
                                <span className="mr-3 font-bold text-green-600 bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                  {stepIndex + 1}
                                </span>
                                <span className="flex-1">
                                  {step}
                                  {stepLink && (
                                    <a
                                      href={stepLink}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline hover:text-blue-800 ml-2"
                                    >
                                      [Open link]
                                    </a>
                                  )}
                                </span>
                              </li>
                            );
                          })}
                        </ol>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
