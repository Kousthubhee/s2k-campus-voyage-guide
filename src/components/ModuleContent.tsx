
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ModuleContentProps {
  module: any;
  onBack: () => void;
  onComplete: (moduleId: string) => void;
  isCompleted: boolean;
  onToast?: (args: { title: string; description?: string; variant?: "default" | "destructive" }) => void;
}

export const ModuleContent = ({ module, onBack, onComplete, isCompleted, onToast }: ModuleContentProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const getModuleSteps = (moduleId: string) => {
    switch (moduleId) {
      case 'pre-arrival-1':
        return [
          { id: 'campus-france', title: 'Campus France Registration', description: 'Create account and submit application' },
          { id: 'vfs', title: 'VFS Appointment', description: 'Book and attend visa appointment' },
          { id: 'documents', title: 'Document Preparation', description: 'Gather all required documents' },
          { id: 'visa-fee', title: 'Visa Fee Payment', description: 'Pay visa processing fees' }
        ];
      case 'pre-arrival-2':
        return [
          { id: 'clothing', title: 'Climate-Appropriate Clothing', description: 'Pack clothes suitable for French weather' },
          { id: 'food-research', title: 'Food & Dietary Research', description: 'Learn about French cuisine and dietary options' },
          { id: 'cultural-prep', title: 'Cultural Preparation', description: 'Understand French customs and etiquette' },
          { id: 'language-basics', title: 'Basic French Learning', description: 'Learn essential French phrases' }
        ];
      case 'post-arrival':
        return [
          { id: 'bank-account', title: 'Open Bank Account', description: 'Set up French bank account' },
          { id: 'ssn-equivalent', title: 'Social Security Number', description: 'Obtain French social security number' },
          { id: 'insurance', title: 'Health Insurance', description: 'Enroll in French health insurance' },
          { id: 'caf', title: 'CAF Application', description: 'Apply for housing assistance (CAF)' },
          { id: 'phone-plan', title: 'Phone Plan', description: 'Set up French mobile phone plan' }
        ];
      default:
        return [
          { id: 'step1', title: 'Getting Started', description: 'Initial setup and preparation' },
          { id: 'step2', title: 'Main Process', description: 'Complete the main requirements' },
          { id: 'step3', title: 'Finalization', description: 'Wrap up and confirm completion' }
        ];
    }
  };

  const steps = getModuleSteps(module.id);

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
      if (onToast) {
        onToast({
          title: "Step Completed",
          description: "You have completed a step.",
        });
      }
    }
  };

  const handleModuleComplete = () => {
    onComplete(module.id);
    if (onToast) {
      onToast({
        title: "Module Completed",
        description: "All steps done. You earned a key!",
        variant: "default",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
      </div>

      <div className={`bg-gradient-to-r ${module.color} rounded-lg p-8 text-white mb-8`}>
        <div className="flex items-center mb-4">
          <div className="text-6xl mr-4">{module.icon}</div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
            <p className="text-xl opacity-90">{module.description}</p>
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-4 bg-white bg-opacity-20 p-3 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span>Module Completed! You earned a key 🗝️</span>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const isStepCompleted = completedSteps.includes(step.id);
          
          return (
            <Card key={step.id} className={`${isStepCompleted ? 'ring-2 ring-green-500' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                      isStepCompleted 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {isStepCompleted ? <CheckCircle className="h-4 w-4" /> : index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{step.title}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!isStepCompleted && (
                      <Button 
                        size="sm"
                        onClick={() => handleStepComplete(step.id)}
                      >
                        Mark Complete
                      </Button>
                    )}
                    {isStepCompleted && (
                      <span className="text-green-600 text-sm font-medium">Completed</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        {completedSteps.length === steps.length && !isCompleted && (
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-6">
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  All Steps Completed!
                </h3>
                <p className="text-green-700 mb-4">
                  Great job! You've finished all steps in this module.
                </p>
                <Button 
                  onClick={handleModuleComplete}
                  className="bg-green-600 hover:bg-green-700"
                >
                 Module Completed! You earned a key 🗝️
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-4 text-sm text-gray-500">
          Progress: {completedSteps.length} of {steps.length} steps completed
        </div>
      </div>
    </div>
  );
};
