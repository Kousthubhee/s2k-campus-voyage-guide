
import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  modulesMeta,
  allTopics,
  studentFavorites,
  usefulLinks,
  newsMediaRecommendations,
  frenchEvents
} from "./french-integration/fiData";

interface FrenchIntegrationPageProps {
  onBack?: () => void;
}

interface FrenchIntegrationModuleCardProps {
  moduleKey: string;
  icon: React.ComponentType<any>;
  title: string;
  topicCount: number;
  description: string;
  onClick?: () => void;
}

const FrenchIntegrationModuleCard: React.FC<FrenchIntegrationModuleCardProps> = ({
  moduleKey,
  icon: Icon,
  title,
  topicCount,
  description,
  onClick,
}) => (
  <button
    className={cn(
      "relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card shadow-sm h-full w-full transition hover:shadow-md hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-primary",
      "outline-none"
    )}
    tabIndex={0}
    onClick={onClick}
    aria-label={`${title}: Start Learning`}
    type="button"
  >
    <div className="flex justify-center items-center w-full pt-8">
      <div className="bg-primary/10 rounded-xl w-20 h-20 flex items-center justify-center mb-5">
        <Icon className="text-[2.1rem] text-foreground" size={34} />
      </div>
    </div>
    <div className="flex-1 flex flex-col px-6 pb-5 gap-2">
      <span className="font-bold text-lg text-primary mt-1 text-left">{title}</span>
      <span className="text-sm text-foreground text-left">{description}</span>
      <div className="flex justify-between items-end mt-6">
        <span className="inline-block rounded-full bg-primary/20 text-primary px-3 py-1 text-xs font-semibold select-none">
          {topicCount} Topics
        </span>
        <span className="flex items-center gap-1 ml-auto">
          <span className="bg-primary hover:bg-primary/80 text-primary-foreground font-semibold px-4 py-1.5 rounded-lg text-sm transition-all">
            Start
          </span>
          <ArrowRight className="ml-1 w-4 h-4 text-muted-foreground" />
        </span>
      </div>
    </div>
  </button>
);

const ModuleDetailView = ({ moduleKey, onBack }: { moduleKey: string; onBack: () => void }) => {
  const module = modulesMeta.find(m => m.key === moduleKey);
  const topics = allTopics[moduleKey] || [];

  if (!module) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Integration Hub
          </Button>
          
          <div className="bg-card rounded-2xl p-8 shadow-sm border border-border">
            <div className="flex items-center mb-6">
              <div className="bg-primary/10 rounded-xl w-16 h-16 flex items-center justify-center mr-6">
                <module.icon className="text-primary" size={28} />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-primary mb-2">
                  {module.title}
                </h1>
                <p className="text-lg text-foreground">
                  {module.description}
                </p>
              </div>
            </div>
            
            <div className="text-center bg-primary/10 rounded-lg p-4">
              <span className="text-2xl font-bold text-primary">
                {module.topicCount}
              </span>
              <span className="text-foreground ml-2">Topics to Explore</span>
            </div>
          </div>
        </div>

        {/* Topics Content */}
        <div className="bg-card rounded-2xl shadow-sm border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-2xl font-semibold text-primary">Learning Topics</h2>
            <p className="text-foreground mt-2">Expand each section to learn more</p>
          </div>
          
          <div className="p-6">
            <Accordion type="single" collapsible className="w-full">
              {topics.map((topic, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-center">
                      <span className="bg-primary/20 text-primary rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold mr-4">
                        {index + 1}
                      </span>
                      <span className="font-semibold text-primary">{topic.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-12 pt-4 pb-2">
                      <div className="prose prose-sm max-w-none text-foreground">
                        {topic.content}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-8 bg-primary rounded-2xl p-8 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Ready for More Resources?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Continue exploring other integration modules or check out our additional resources and community links.
          </p>
          <Button size="lg" variant="secondary" className="bg-card text-primary hover:bg-card/80" onClick={onBack}>
            Explore More Modules
          </Button>
        </div>
      </div>
    </div>
  );
};

export const FrenchIntegrationPage = ({ onBack }: FrenchIntegrationPageProps) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleModuleClick = (moduleKey: string) => {
    console.log(`Starting module ${moduleKey}`);
    setSelectedModule(moduleKey);
  };

  const handleBackToChecklist = () => {
    if (onBack) {
      onBack();
    }
  };

  if (selectedModule) {
    return (
      <ModuleDetailView 
        moduleKey={selectedModule} 
        onBack={() => setSelectedModule(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            className="mb-4"
            onClick={handleBackToChecklist}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Checklist
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary mb-4">
              French Integration Hub
            </h1>
            <p className="text-xl text-foreground max-w-3xl mx-auto">
              Master the essentials of living in France with our comprehensive integration modules. 
              From language basics to cultural nuances, we'll help you feel at home.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-lg p-6 text-center shadow-sm border border-border">
            <div className="text-2xl font-bold text-primary mb-2">
              {modulesMeta.length}
            </div>
            <div className="text-foreground">Integration Modules</div>
          </div>
          <div className="bg-card rounded-lg p-6 text-center shadow-sm border border-border">
            <div className="text-2xl font-bold text-primary mb-2">
              {modulesMeta.reduce((sum, module) => sum + module.topicCount, 0)}
            </div>
            <div className="text-foreground">Learning Topics</div>
          </div>
          <div className="bg-card rounded-lg p-6 text-center shadow-sm border border-border">
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <div className="text-foreground">Free Content</div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modulesMeta.map((module) => (
            <FrenchIntegrationModuleCard
              key={module.key}
              moduleKey={module.key}
              icon={module.icon}
              title={module.title}
              topicCount={module.topicCount}
              description={module.description}
              onClick={() => handleModuleClick(module.key)}
            />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-primary rounded-2xl p-8 text-center text-primary-foreground">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Your Integration Journey?</h2>
          <p className="text-primary-foreground/80 mb-6 max-w-2xl mx-auto">
            Begin with any module that interests you most. Our adaptive learning system will track your progress 
            and suggest the best path forward based on your goals and current level.
          </p>
          <Button size="lg" variant="secondary" className="bg-card text-primary hover:bg-card/80">
            Start Learning Now
          </Button>
        </div>
      </div>
    </div>
  );
};
