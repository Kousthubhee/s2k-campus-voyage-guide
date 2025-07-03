
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  BookOpen, 
  Users, 
  MapPin, 
  Briefcase, 
  Utensils, 
  Home, 
  Building2, 
  FileText,
  Languages,
  GraduationCap
} from "lucide-react";

interface FrenchIntegrationModuleCardProps {
  icon: React.ComponentType<any>; // Accept anything (LucideProps etc)
  title: string;
  topicCount: number;
  description: string;
  onClick?: () => void;
}

const FrenchIntegrationModuleCard: React.FC<FrenchIntegrationModuleCardProps> = ({
  icon: Icon,
  title,
  topicCount,
  description,
  onClick,
}) => (
  <button
    className={cn(
      "relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#e6ecf4] bg-[#f6faff] shadow-sm h-full w-full transition hover:shadow-md hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-indigo-400",
      "outline-none"
    )}
    tabIndex={0}
    onClick={onClick}
    aria-label={`${title}: Start Learning`}
    type="button"
  >
    <div className="flex justify-center items-center w-full pt-8">
      <div className="bg-blue-50 rounded-xl w-20 h-20 flex items-center justify-center mb-5">
        {/* Pass correct Lucide icon props */}
        <Icon className="text-[2.1rem] text-gray-700" size={34} />
      </div>
    </div>
    <div className="flex-1 flex flex-col px-6 pb-5 gap-2">
      <span className="font-bold text-lg text-gray-900 mt-1 text-left">{title}</span>
      <span className="text-sm text-gray-600 text-left">{description}</span>
      <div className="flex justify-between items-end mt-6">
        <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold select-none">
          Available
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <span className="bg-gray-900 hover:bg-gray-700 text-white font-semibold px-4 py-1.5 rounded-lg text-sm transition-all">
            Start
          </span>
          <ArrowRight className="ml-1 w-4 h-4 text-gray-400" />
        </span>
      </div>
    </div>
  </button>
);

const integrationModules = [
  {
    id: 1,
    icon: Languages,
    title: "French Language Basics",
    topicCount: 12,
    description: "Essential French phrases and vocabulary for daily life in France"
  },
  {
    id: 2,
    icon: Users,
    title: "Cultural Integration",
    topicCount: 8,
    description: "Understanding French culture, etiquette, and social norms"
  },
  {
    id: 3,
    icon: MapPin,
    title: "Navigation & Transport",
    topicCount: 6,
    description: "Getting around French cities using public transportation"
  },
  {
    id: 4,
    icon: Briefcase,
    title: "Professional Life",
    topicCount: 10,
    description: "Work culture, job search, and professional networking in France"
  },
  {
    id: 5,
    icon: Utensils,
    title: "Food & Dining",
    topicCount: 7,
    description: "French cuisine, dining etiquette, and food culture"
  },
  {
    id: 6,
    icon: Home,
    title: "Daily Life Skills",
    topicCount: 9,
    description: "Shopping, utilities, healthcare, and daily routines"
  },
  {
    id: 7,
    icon: Building2,
    title: "Administrative Tasks",
    topicCount: 11,
    description: "Dealing with French bureaucracy and administrative procedures"
  },
  {
    id: 8,
    icon: FileText,
    title: "Legal & Rights",
    topicCount: 5,
    description: "Understanding your rights and legal obligations in France"
  },
  {
    id: 9,
    icon: GraduationCap,
    title: "Academic Life",
    topicCount: 8,
    description: "Navigating French higher education system and student life"
  }
];

export const FrenchIntegrationPage = () => {
  const handleModuleClick = (moduleId: number) => {
    console.log(`Starting module ${moduleId}`);
    // Add navigation or module start logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              French Integration Hub
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master the essentials of living in France with our comprehensive integration modules. 
              From language basics to cultural nuances, we'll help you feel at home.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {integrationModules.length}
            </div>
            <div className="text-gray-600">Integration Modules</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {integrationModules.reduce((sum, module) => sum + module.topicCount, 0)}
            </div>
            <div className="text-gray-600">Learning Topics</div>
          </div>
          <div className="bg-white rounded-lg p-6 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 mb-2">100%</div>
            <div className="text-gray-600">Free Content</div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrationModules.map((module) => (
            <FrenchIntegrationModuleCard
              key={module.id}
              icon={module.icon}
              title={module.title}
              topicCount={module.topicCount}
              description={module.description}
              onClick={() => handleModuleClick(module.id)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Integration Journey?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Begin with any module that interests you most. Our adaptive learning system will track your progress 
            and suggest the best path forward based on your goals and current level.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
            Start Learning Now
          </Button>
        </div>
      </div>
    </div>
  );
};
