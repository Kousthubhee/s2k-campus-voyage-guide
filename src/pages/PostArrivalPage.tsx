
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ArrowLeft, CheckCircle, Calendar, ChevronDown, FileText, Clock, Info, Bell, Plus, X } from 'lucide-react';
import { ReminderButton } from "@/components/ReminderButton";
import { PageTitle } from "@/components/PageTitle";
import { CheckboxItem } from "@/components/CheckboxItem";
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useModuleProgress } from '@/hooks/useModuleProgress';

import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

interface PostArrivalPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

interface ReminderItem {
  date: string;
  note: string;
}

const glossaryItems = [
  { term: "RIB", explanation: "Relevé d'Identité Bancaire – Your official French bank details, required for many payments." },
  { term: "Attestation de Séjour", explanation: "Proof of residence permit, usually your visa or OFII-stamped passport." },
  { term: "CAF", explanation: "Caisse d'Allocations Familiales – French body that distributes housing and family aid, including student housing allowances." },
  { term: "Numéro de Sécurité Sociale", explanation: "Your French Social Security Number, necessary for healthcare and some official registrations." },
  { term: "Assurance Maladie", explanation: "French public health insurance (Ameli.fr)." },
];

const GlossaryPopover = ({
  term,
  explanation,
}: {
  term: string;
  explanation: string;
}) => (
  <span className="relative group cursor-help underline decoration-dotted">
    {term}
    <span className="hidden group-hover:block absolute z-10 left-1/2 -translate-x-1/2 bg-white border border-gray-200 shadow-lg text-xs text-gray-900 px-3 py-1 rounded whitespace-pre w-60 mt-2">
      {explanation}
    </span>
  </span>
);

const tasks = [
  {
    id: 'bank-account',
    title: "Open Bank Account",
    description: "Required for rent, CAF, and daily transactions",
    urgency: "high",
    timeline: "Within first week",
    documents: [
      "Passport",
      "Visa or Attestation de Séjour",
      "University acceptance letter",
      "Proof of accommodation",
      "RIB (for further processes)"
    ],
    process: [
      "Choose a French bank.",
      "Book an appointment (optional) or walk in with your documents.",
      "Provide proof of address and RIB for setup.",
      "Receive your RIB and set up online banking."
    ],
    faqs: [
      {
        q: "What is a RIB?",
        a: "A RIB is your French bank account information (Relevé d'Identité Bancaire). You'll get it once your account is set up.",
      },
      {
        q: "Do I need an appointment?",
        a: "Many banks accept walk-ins, but scheduling one can save time—especially during busy periods.",
      },
    ],
    links: [
      { label: "MaFrenchBank (easy for students)", url: "https://www.mafrenchbank.fr/" },
      { label: "BNP Paribas", url: "https://mabanque.bnpparibas/" },
      { label: "Societe Generale", url: "https://www.societegenerale.fr/" }
    ]
  },
  {
    id: 'social-security',
    title: "Apply for Social Security Number",
    description: "Essential for healthcare and official procedures",
    urgency: "high",
    timeline: "Within first 2 weeks",
    documents: [
      "Passport",
      "Visa/Attestation de Séjour",
      "Birth certificate (translated into French)",
      "University enrollment certificate",
      "Proof of accommodation"
    ],
    process: [
      "Create Ameli account and register online.",
      "Upload passport, visa, birth certificate (translated), and university attestation.",
      "Wait for temporary number and documents approval.",
      "Receive permanent Numéro de Sécurité Sociale."
    ],
    faqs: [
      {
        q: "How long does it take to get a number?",
        a: "It can take several weeks. You may get a temporary number first.",
      },
      {
        q: "Where do I apply?",
        a: "You register online at Ameli.fr. Double-check all your documents before submitting.",
      },
    ],
    links: [
      { label: "Ameli – Health Insurance (official)", url: "https://etudiant-etranger.ameli.fr/#/" }
    ]
  },
  {
    id: 'health-insurance',
    title: "Register for Health Insurance",
    description: "Student health insurance (LMDE, SMERRA, or public)",
    urgency: "medium",
    timeline: "Within first month",
    documents: [
      "Social Security Number (from Ameli)",
      "Passport",
      "Proof of enrollment",
      "Bank account RIB"
    ],
    process: [
      "Choose mutual/complémentaire health insurance (LMDE, SMERRA, etc.)",
      "Register using your Numéro de Sécurité Sociale from Ameli.",
      "Upload proof of income or student status if necessary."
    ],
    faqs: [
      {
        q: "Do I need complémentaire insurance?",
        a: "Yes, it covers costs not paid by Assurance Maladie.",
      },
      {
        q: "What providers are common?",
        a: "LMDE and SMERRA are major student providers.",
      },
    ],
    links: [
      { label: "LMDE (student insurance)", url: "https://www.lmde.fr/" },
      { label: "SMERRA", url: "https://www.smerra.fr/" }
    ]
  },
  {
    id: 'caf',
    title: "Apply for CAF (Housing Allowance)",
    description: "Financial assistance for accommodation costs",
    urgency: "medium",
    timeline: "After securing accommodation",
    documents: [
      "Rental contract or Attestation d'hébergement",
      "Proof of student status",
      "RIB (French bank account details)",
      "Passport",
      "Visa or Attestation de Séjour"
    ],
    process: [
      "Secure a rental contract.",
      "Collect your RIB from your French bank.",
      "Register for CAF on www.caf.fr with your housing and identity information.",
      "Upload all required paperwork.",
      "Wait for approval and payments to begin."
    ],
    faqs: [
      {
        q: "How much will I get?",
        a: "It depends on your rent, status, and location. Use the estimator on the CAF site.",
      },
      {
        q: "How long does payment take?",
        a: "Usually 1-2 months after your application is approved.",
      },
    ],
    links: [
      { label: "CAF Official Site", url: "https://www.caf.fr/" }
    ]
  }
];

const processOrder = [
  "Open Bank Account",
  "Apply for Social Security Number",
  "Register for Health Insurance",
  "Apply for CAF (Housing Allowance)"
];

export const PostArrivalPage = ({ onBack, onComplete, isCompleted }: PostArrivalPageProps) => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const [reminders, setReminders] = useState<{ [id: string]: ReminderItem[] }>({});
  const [documentChecks, setDocumentChecks] = useState<{ [key: string]: boolean }>({});
  const [showReminderDialog, setShowReminderDialog] = useState<string | null>(null);
  const [newReminderDate, setNewReminderDate] = useState('');
  const [newReminderNote, setNewReminderNote] = useState('');
  const { toast } = useToast();
  
  // Use the module progress hook for persistence
  const { completions, markModuleComplete, markModuleIncomplete, isModuleComplete, loading } = useModuleProgress();
  
  // Get completed steps from the hook
  const completedSteps = completions
    .filter(c => tasks.some(task => task.id === c.module_id))
    .map(c => c.module_id);

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleStepComplete = async (stepId: string) => {
    if (!isModuleComplete(stepId)) {
      await markModuleComplete(stepId);
    }
  };

  const handleStepIncomplete = async (stepId: string) => {
    if (isModuleComplete(stepId)) {
      await markModuleIncomplete(stepId);
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

  const handleDocumentCheck = (taskId: string, docIndex: number, checked: boolean) => {
    const key = `${taskId}-${docIndex}`;
    setDocumentChecks(prev => ({ ...prev, [key]: checked }));
  };

  // Confetti and toast when all are completed
  const allStepsCompleted = completedSteps.length >= tasks.length;

  const handleCompleteModule = () => {
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    toast({
      title: "Congrats!",
      description: "You have completed all required official processes!",
      variant: "default",
    });
    onComplete();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading your progress...</div>
      </div>
    );
  }

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
            🏠 Post-Arrival Checklist
          </PageTitle>
          <p className="text-base text-gray-600 font-calibri">
            Bank account, SSN, insurance, CAF, and more
          </p>
          <div className="mt-4">
            <div className="flex justify-center gap-2 flex-wrap">
              {processOrder.map((proc, idx) => (
                <div 
                  key={proc}
                  className={`px-4 py-2 rounded-full text-xs font-semibold border shadow transition-all 
                    ${isModuleComplete(tasks[idx]?.id)
                      ? "bg-green-100 border-green-400 text-green-700"
                      : "bg-white border-gray-300 text-gray-600"
                    }
                  `}
                >
                  {idx+1}. {proc}
                  {isModuleComplete(tasks[idx]?.id) && <CheckCircle className="h-4 w-4 inline ml-1 text-green-500" />}
                </div>
              ))}
            </div>
            <div className="text-xs mt-2 text-gray-500">
              Follow this recommended order for the smoothest experience.
            </div>
          </div>
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
        {tasks.map((task, index) => {
          const isStepCompleted = isModuleComplete(task.id);
          const isOpen = openSections.includes(task.id);
          const taskReminders = reminders[task.id] || [];

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
                      <CardTitle className="text-lg">{task.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{task.description}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    task.urgency === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.urgency === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {task.urgency} priority
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-2" />
                    Timeline: {task.timeline}
                  </div>

                  {/* Reminders Section */}
                  {taskReminders.length > 0 && (
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2 flex items-center">
                        <Bell className="h-4 w-4 mr-2" />
                        Your Reminders
                      </h4>
                      <div className="space-y-2">
                        {taskReminders.map((reminder, reminderIndex) => (
                          <div key={reminderIndex} className="flex items-center justify-between bg-white p-2 rounded border">
                            <div className="flex-1">
                              <div className="text-sm font-medium">{reminder.date}</div>
                              <div className="text-xs text-gray-600">{reminder.note}</div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteReminder(task.id, reminderIndex)}
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
                    onOpenChange={() => toggleSection(task.id)}
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
                          {task.documents.map((doc, docIndex) => {
                            const docKey = `${task.id}-${docIndex}`;
                            return (
                              <div key={docIndex} className="flex items-center p-3 border rounded-lg bg-white">
                                <CheckboxItem
                                  id={`${task.id}-doc-${docIndex}`}
                                  checked={documentChecks[docKey] || false}
                                  onCheckedChange={(checked) => handleDocumentCheck(task.id, docIndex, checked)}
                                  className="text-blue-800 flex-1"
                                >
                                  {doc}
                                </CheckboxItem>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900 mb-3">🔄 Step-by-Step Process:</h4>
                        <ol className="space-y-2">
                          {task.process.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-green-800 flex items-start">
                              <span className="mr-3 font-bold text-green-600 bg-green-200 rounded-full w-6 h-6 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                {stepIndex + 1}
                              </span>
                              <span>
                                {step}
                                {glossaryItems
                                  .filter((t) => step.includes(t.term))
                                  .map((t) => (
                                    <span key={t.term} className="ml-1">
                                      <GlossaryPopover
                                        term={t.term}
                                        explanation={t.explanation}
                                      />
                                    </span>
                                  ))}
                              </span>
                            </li>
                          ))}
                        </ol>
                      </div>

                      {/* FAQ Section */}
                      {task.faqs.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3">❓ FAQ:</h4>
                          <div className="space-y-3">
                            {task.faqs.map((faq, faqIndex) => (
                              <div key={faqIndex} className="text-sm">
                                <div className="font-medium text-gray-800 mb-1">{faq.q}</div>
                                <div className="text-gray-600">{faq.a}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Links Section */}
                      {task.links.length > 0 && (
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3">🔗 Helpful Links:</h4>
                          <div className="space-y-1">
                            {task.links.map((link, linkIndex) => (
                              <div key={linkIndex}>
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-700 hover:underline text-sm"
                                >
                                  {link.label}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowReminderDialog(task.id)}
                      className="flex items-center gap-1"
                    >
                      <Plus className="h-4 w-4" />
                      Add Reminder
                    </Button>
                    {!isStepCompleted ? (
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(task.id)}
                      >
                        Mark Complete
                      </Button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-green-600 text-sm font-medium">Completed ✓</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStepIncomplete(task.id)}
                          className="text-red-500 hover:text-red-700 text-xs"
                        >
                          Undo
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
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

      {allStepsCompleted && !isCompleted && (
        <Card className="mt-8 bg-green-50 border-green-200">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              All Official Processes Completed!
            </h3>
            <p className="text-green-700 mb-4">
              Great job! You've finished all urgent official processes.
            </p>
            <Button 
              onClick={handleCompleteModule}
              className="bg-green-600 hover:bg-green-700"
            >
              Complete Module & Earn Key 🗝️
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="mt-6 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Info className="h-4 w-4 mr-1 text-blue-600" />
            Official Reminders & Hints
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Always carry original documents + photocopies</li>
            <li>• Some processes may take several weeks - start early</li>
            <li>• Ask your university's international office for guidance</li>
            <li>• Keep receipts and confirmation numbers for all applications</li>
            <li>• If confused about a French term, hover over it for a quick explanation</li>
          </ul>
        </CardContent>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Progress: {completedSteps.length} of {tasks.length} official processes completed
      </div>
    </div>
  );
};
