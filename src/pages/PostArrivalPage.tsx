import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, CreditCard, Home, Shield, FileText, Info } from 'lucide-react';
import { ReminderButton } from "@/components/ReminderButton";
import { PageTitle } from "@/components/PageTitle";
import { PostArrivalTaskCards } from '@/components/PostArrivalTaskCards';
import { CheckboxItem } from "@/components/CheckboxItem";
import { MiniChatbot } from "@/components/MiniChatbot";
import confetti from "canvas-confetti";
import { useToast } from "@/hooks/use-toast";

interface PostArrivalPageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
}

const glossaryItems = [
  { term: "RIB", explanation: "Relevé d'Identité Bancaire – Your official French bank details, required for many payments." },
  { term: "Attestation de Séjour", explanation: "Proof of residence permit, usually your visa or OFII-stamped passport." },
  { term: "CAF", explanation: "Caisse d'Allocations Familiales – French body that distributes housing and family aid, including student housing allowances." },
  { term: "Numéro de Sécurité Sociale", explanation: "Your French Social Security Number, necessary for healthcare and some official registrations." },
  { term: "Assurance Maladie", explanation: "French public health insurance (Ameli.fr)." },
];

const tasks = [
  {
    id: 'bank-account',
    title: "Open Bank Account",
    description: "Required for rent, CAF, and daily transactions",
    icon: <span className="inline text-blue-700">📄</span>,
    timeline: "Within first week",
    priority: "urgent" as const,
    steps: [
      { id: "bank-1", description: "Choose a French bank." },
      { id: "bank-2", description: "Book an appointment (optional) or walk in with your documents." },
      { id: "bank-3", description: "Provide proof of address and RIB for setup." },
      { id: "bank-4", description: "Receive your RIB and set up online banking." },
    ],
    documents: [
      "Passport",
      "Visa or Attestation de Séjour",
      "University acceptance letter",
      "Proof of accommodation",
      "RIB (for further processes)"
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
    ],
    glossary: glossaryItems,
  },
  {
    id: 'social-security',
    title: "Apply for Social Security Number",
    description: "Essential for healthcare and official procedures",
    icon: <span className="inline text-green-700">🆔</span>,
    timeline: "Within first 2 weeks",
    priority: "urgent" as const,
    steps: [
      { id: "ssn-1", description: "Create Ameli account and register online." },
      { id: "ssn-2", description: "Upload passport, visa, birth certificate (translated), and university attestation." },
      { id: "ssn-3", description: "Wait for temporary number and documents approval." },
      { id: "ssn-4", description: "Receive permanent Numéro de Sécurité Sociale." },
    ],
    documents: [
      "Passport",
      "Visa/Attestation de Séjour",
      "Birth certificate (translated into French)",
      "University enrollment certificate",
      "Proof of accommodation"
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
    ],
    glossary: glossaryItems,
  },
  {
    id: 'health-insurance',
    title: "Register for Health Insurance",
    description: "Student health insurance (LMDE, SMERRA, or public)",
    icon: <span className="inline text-indigo-600">🛡️</span>,
    timeline: "Within first month",
    priority: "high" as const,
    steps: [
      { id: "ins-1", description: "Choose mutual/complémentaire health insurance (LMDE, SMERRA, etc.)" },
      { id: "ins-2", description: "Register using your Numéro de Sécurité Sociale from Ameli." },
      { id: "ins-3", description: "Upload proof of income or student status if necessary." },
    ],
    documents: [
      "Social Security Number (from Ameli)",
      "Passport",
      "Proof of enrollment",
      "Bank account RIB"
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
    ],
    glossary: glossaryItems,
  },
  {
    id: 'caf',
    title: "Apply for CAF (Housing Allowance)",
    description: "Financial assistance for accommodation costs",
    icon: <span className="inline text-orange-700">🏠</span>,
    timeline: "After securing accommodation",
    priority: "high" as const,
    steps: [
      { id: "caf-1", description: "Secure a rental contract." },
      { id: "caf-2", description: "Collect your RIB from your French bank." },
      { id: "caf-3", description: "Register for CAF on www.caf.fr with your housing and identity information." },
      { id: "caf-4", description: "Upload all required paperwork." },
      { id: "caf-5", description: "Wait for approval and payments to begin." },
    ],
    documents: [
      "Rental contract or Attestation d'hébergement",
      "Proof of student status",
      "RIB (French bank account details)",
      "Passport",
      "Visa or Attestation de Séjour"
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
    ],
    glossary: glossaryItems,
  }
];

const processOrder = [
  "Open Bank Account",
  "Apply for Social Security Number",
  "Register for Health Insurance",
  "Apply for CAF (Housing Allowance)"
];

export const PostArrivalPage = ({ onBack, onComplete, isCompleted }: PostArrivalPageProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [reminders, setReminders] = useState<{ [id: string]: string }>({});
  const [documentChecks, setDocumentChecks] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

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

  const handleDocumentCheck = (taskId: string, docIndex: number, checked: boolean) => {
    const key = `${taskId}-${docIndex}`;
    setDocumentChecks(prev => ({ ...prev, [key]: checked }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <MiniChatbot pageContext="Post-Arrival Checklist" />
      
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
                    ${completedSteps.includes(tasks[idx]?.id)
                      ? "bg-green-100 border-green-400 text-green-700"
                      : "bg-white border-gray-300 text-gray-600"
                    }
                  `}
                >
                  {idx+1}. {proc}
                  {completedSteps.includes(tasks[idx]?.id) && <CheckCircle className="h-4 w-4 inline ml-1 text-green-500" />}
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

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Urgent Official Processes</h2>
        <div className="bg-blue-50 rounded-xl p-3 mb-4 text-gray-700 text-sm">
          Complete the official steps below in order for a smooth start. Mark each process complete to track your progress!
        </div>
        <PostArrivalTaskCards
          tasks={tasks}
          completedSteps={completedSteps}
          setCompletedSteps={setCompletedSteps}
          reminders={reminders}
          setReminders={setReminders}
        />
      </div>

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="h-6 w-6 mr-3 text-green-600" />
            All Required Official Documents
            <Info className="h-4 w-4 ml-1 text-blue-400" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            You will need these documents at various stages. Always keep both originals and copies!
          </p>
          <div className="space-y-2">
            {[
              ...new Set(
                tasks
                  .flatMap((task) => task.documents)
                  .sort()
              ),
            ].map((doc, index) => (
              <CheckboxItem
                key={index}
                id={`document-${index}`}
                checked={documentChecks[`document-${index}`] || false}
                onCheckedChange={(checked) => setDocumentChecks(prev => ({ ...prev, [`document-${index}`]: checked }))}
                className="text-sm"
              >
                {doc}
              </CheckboxItem>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-blue-50">
        <CardContent className="p-6">
          <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
            <Info className="h-4 w-4 mr-1 text-blue-600" />
            Official Reminders & Hints
          </h3>
          <ul className="space-y-2 text-blue-800 text-sm">
            <li>• Always carry original documents + photocopies</li>
            <li>• Some processes may take several weeks - start early</li>
            <li>• Ask your university’s international office for guidance</li>
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

// NOTE: This file is getting large (over 217 lines). Consider refactoring it into smaller, maintainable components for future updates.
