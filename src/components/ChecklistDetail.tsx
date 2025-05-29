
import { ChevronLeft } from 'lucide-react';

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  link?: string;
}

interface ChecklistDetailProps {
  moduleId: string;
  onBack: () => void;
  onItemToggle: (itemId: string) => void;
  completedItems: string[];
}

const checklistData: Record<string, { title: string; items: ChecklistItem[] }> = {
  'pre-arrival-1': {
    title: 'Pre-Arrival Checklist (Part 1)',
    items: [
      {
        id: 'campus-france',
        title: 'Campus France Registration',
        description: 'Complete your Campus France application and interview process',
        completed: false,
        link: 'https://www.campusfrance.org'
      },
      {
        id: 'vfs',
        title: 'VFS Visa Application',
        description: 'Submit your student visa application through VFS Global',
        completed: false,
        link: 'https://visa.vfsglobal.com'
      },
      {
        id: 'passport',
        title: 'Passport Validity Check',
        description: 'Ensure your passport is valid for at least 6 months',
        completed: false
      },
      {
        id: 'acceptance-letter',
        title: 'University Acceptance Letter',
        description: 'Obtain official acceptance letter from your chosen institution',
        completed: false
      },
      {
        id: 'financial-proof',
        title: 'Financial Documentation',
        description: 'Prepare bank statements and financial guarantee documents',
        completed: false
      }
    ]
  },
  'pre-arrival-2': {
    title: 'Pre-Arrival Checklist (Part 2)',
    items: [
      {
        id: 'accommodation',
        title: 'Accommodation Booking',
        description: 'Secure your housing in France (CROUS, private, or university housing)',
        completed: false
      },
      {
        id: 'health-insurance',
        title: 'Health Insurance',
        description: 'Arrange health insurance coverage for France',
        completed: false
      },
      {
        id: 'flight-booking',
        title: 'Flight Reservation',
        description: 'Book your flight tickets to France',
        completed: false
      },
      {
        id: 'packing',
        title: 'Packing Essentials',
        description: 'Pack appropriate clothing for French weather and essential items',
        completed: false
      },
      {
        id: 'currency',
        title: 'Currency Exchange',
        description: 'Exchange some money to Euros for initial expenses',
        completed: false
      }
    ]
  },
  'post-arrival': {
    title: 'Post-Arrival Checklist',
    items: [
      {
        id: 'bank-account',
        title: 'Open Bank Account',
        description: 'Open a French bank account for your financial needs',
        completed: false
      },
      {
        id: 'residence-permit',
        title: 'Residence Permit (Titre de Séjour)',
        description: 'Apply for your residence permit within 3 months of arrival',
        completed: false
      },
      {
        id: 'social-security',
        title: 'Social Security Number',
        description: 'Register for French social security system',
        completed: false
      },
      {
        id: 'caf',
        title: 'CAF Housing Aid',
        description: 'Apply for housing assistance (APL) through CAF',
        completed: false,
        link: 'https://www.caf.fr'
      },
      {
        id: 'phone-plan',
        title: 'Mobile Phone Plan',
        description: 'Get a French mobile phone plan',
        completed: false
      },
      {
        id: 'student-card',
        title: 'Student ID Card',
        description: 'Obtain your university student ID card',
        completed: false
      }
    ]
  },
  'local-insights': {
    title: 'Local Insights',
    items: [
      {
        id: 'transport',
        title: 'Public Transportation',
        description: 'Learn about local buses, metros, and transport passes',
        completed: false
      },
      {
        id: 'shopping',
        title: 'Grocery Shopping',
        description: 'Find nearby supermarkets and understand shopping hours',
        completed: false
      },
      {
        id: 'healthcare',
        title: 'Healthcare System',
        description: 'Understand how to access healthcare services in France',
        completed: false
      },
      {
        id: 'culture',
        title: 'Cultural Adaptation',
        description: 'Learn about French customs and social etiquette',
        completed: false
      },
      {
        id: 'emergency',
        title: 'Emergency Contacts',
        description: 'Save important emergency numbers and embassy contacts',
        completed: false
      }
    ]
  }
};

export function ChecklistDetail({ moduleId, onBack, onItemToggle, completedItems }: ChecklistDetailProps) {
  const checklist = checklistData[moduleId];

  if (!checklist) {
    return (
      <div className="p-6">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4">
          <ChevronLeft size={20} />
          Back to Checklist
        </button>
        <p>Checklist not found.</p>
      </div>
    );
  }

  const completedCount = checklist.items.filter(item => completedItems.includes(item.id)).length;
  const progressPercentage = (completedCount / checklist.items.length) * 100;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
        <ChevronLeft size={20} />
        Back to Checklist
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="s2k-gradient p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">{checklist.title}</h1>
          <div className="flex items-center gap-4">
            <div className="flex-1 bg-white bg-opacity-20 rounded-full h-2">
              <div 
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{completedCount}/{checklist.items.length}</span>
          </div>
        </div>

        {/* Items */}
        <div className="p-6">
          <div className="space-y-4">
            {checklist.items.map((item) => {
              const isCompleted = completedItems.includes(item.id);
              return (
                <div 
                  key={item.id}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    isCompleted 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => onItemToggle(item.id)}
                      className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isCompleted
                          ? 'border-green-500 bg-green-500'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {isCompleted && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm mt-1 ${isCompleted ? 'text-green-600' : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                      {item.link && (
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm underline mt-2 inline-block"
                        >
                          Visit Website →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
