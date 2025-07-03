
import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Calendar, AlertTriangle, FileText, CreditCard, Shield, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckboxItem } from '@/components/CheckboxItem';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface VisaSchedulerDialogProps {
  appointment: { date: string; location: string } | null;
  onSet: (info: { date: string; location: string }) => void;
}

const VisaSchedulerDialog = ({ appointment, onSet }: VisaSchedulerDialogProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(appointment?.date || "");
  const [location, setLocation] = useState(appointment?.location || "");
  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
        onClick={() => setOpen(true)}
      >
        <Calendar className="h-4 w-4" /> {appointment ? "View/Edit Appointment" : "Schedule Visa Appointment"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Visa Appointment Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Date</label>
              <Input type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="VFS Center location" />
            </div>
          </div>
          <DialogFooter>
            <Button
              size="sm"
              onClick={() => { if (date && location) onSet({ date, location }); setOpen(false); }}
              disabled={!date || !location}
            >
              Save Appointment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface PreArrival1PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  profile?: any;
}

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  estimatedTime: string;
  links?: { title: string; url: string }[];
  tips?: string[];
}

const tasks: Task[] = [
  {
    id: 'passport-check',
    title: 'Verify Passport Validity',
    description: 'Ensure your passport is valid for at least 6 months beyond your intended stay',
    priority: 'high',
    category: 'Documentation',
    estimatedTime: '5 minutes',
    tips: [
      'Check expiration date carefully',
      'Ensure you have at least 2 blank pages',
      'Consider renewing if expiring within 12 months'
    ]
  },
  {
    id: 'visa-research',
    title: 'Research Visa Requirements',
    description: 'Understand which type of visa you need based on your study program and duration',
    priority: 'high',
    category: 'Visa',
    estimatedTime: '2-3 hours',
    links: [
      { title: 'Campus France Visa Guide', url: 'https://campusfrance.org' },
      { title: 'French Consulate', url: 'https://france-visas.gouv.fr' }
    ]
  },
  {
    id: 'financial-proof',
    title: 'Prepare Financial Documentation',
    description: 'Gather bank statements and proof of financial resources for visa application',
    priority: 'high',
    category: 'Financial',
    estimatedTime: '1-2 weeks',
    tips: [
      'Need to show €615 per month for living expenses',
      'Bank statements should be recent (within 3 months)',
      'Consider opening a blocked account if required'
    ]
  },
  {
    id: 'health-insurance',
    title: 'Arrange Health Insurance',
    description: 'Obtain comprehensive health insurance that covers your entire stay in France',
    priority: 'high',
    category: 'Healthcare',
    estimatedTime: '1-3 days',
    links: [
      { title: 'Student Health Insurance Options', url: '#' }
    ]
  },
  {
    id: 'academic-documents',
    title: 'Prepare Academic Transcripts',
    description: 'Get official transcripts, diplomas, and academic records translated if necessary',
    priority: 'medium',
    category: 'Documentation',
    estimatedTime: '1-2 weeks',
    tips: [
      'Translations must be done by certified translators',
      'Get multiple copies - you\'ll need them for various applications',
      'Apostille may be required for some documents'
    ]
  },
  {
    id: 'language-test',
    title: 'French Language Proficiency Test',
    description: 'Take required French language tests (DELF, DALF, TCF) if needed for your program',
    priority: 'medium',
    category: 'Academic',
    estimatedTime: '2-6 months preparation',
    links: [
      { title: 'DELF/DALF Information', url: '#' },
      { title: 'TCF Test Centers', url: '#' }
    ]
  }
];

export const PreArrival1Page = ({ onBack, onComplete, isCompleted, profile }: PreArrival1PageProps) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [visaAppointment, setVisaAppointment] = useState<{ date: string; location: string } | null>(null);

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const completionPercentage = Math.round((completedTasks.length / tasks.length) * 100);
  const allTasksCompleted = completedTasks.length === tasks.length;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Documentation': return <FileText className="h-4 w-4" />;
      case 'Visa': return <Shield className="h-4 w-4" />;
      case 'Financial': return <CreditCard className="h-4 w-4" />;
      case 'Healthcare': return <AlertTriangle className="h-4 w-4" />;
      case 'Academic': return <Plane className="h-4 w-4" />;
      default: return <CheckCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Checklist
        </Button>
        {isCompleted && (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="h-4 w-4 mr-1" />
            Completed
          </Badge>
        )}
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Pre-Arrival Phase 1: Essential Documents & Visa
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Complete these crucial tasks before applying for your French student visa. 
          This phase focuses on gathering required documents and understanding visa requirements.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Progress</h3>
            <span className="text-2xl font-bold text-blue-600">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-xl font-bold text-gray-900">{completedTasks.length}</div>
              <div className="text-sm text-gray-600">Tasks Completed</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{tasks.length - completedTasks.length}</div>
              <div className="text-sm text-gray-600">Tasks Remaining</div>
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{tasks.filter(t => t.priority === 'high').filter(t => completedTasks.includes(t.id)).length}</div>
              <div className="text-sm text-gray-600">High Priority Done</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Visa Appointment Scheduler */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Visa Appointment
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 mb-2">
                Once you've completed the documentation tasks, schedule your visa appointment.
              </p>
              {visaAppointment && (
                <div className="text-sm text-green-700">
                  <strong>Scheduled:</strong> {new Date(visaAppointment.date).toLocaleDateString()} at {visaAppointment.location}
                </div>
              )}
            </div>
            <VisaSchedulerDialog 
              appointment={visaAppointment}
              onSet={setVisaAppointment}
            />
          </div>
        </CardContent>
      </Card>

      {/* Tasks List */}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Essential Tasks</h2>
        
        {tasks.map((task) => (
          <Card key={task.id} className={`transition-all duration-200 ${
            completedTasks.includes(task.id) ? 'bg-green-50 border-green-200' : 'hover:shadow-md'
          }`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <CheckboxItem
                  id={task.id}
                  label=""
                  checked={completedTasks.includes(task.id)}
                  onChange={() => handleTaskToggle(task.id)}
                />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getCategoryIcon(task.category)}
                    <h3 className={`font-semibold ${
                      completedTasks.includes(task.id) ? 'text-green-800' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </h3>
                    <Badge className={getPriorityColor(task.priority)}>
                      {task.priority}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {task.estimatedTime}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  
                  {task.tips && (
                    <div className="mb-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">💡 Tips:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {task.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span>•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {task.links && (
                    <div className="flex flex-wrap gap-2">
                      {task.links.map((link, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          asChild
                          className="text-xs"
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.title}
                          </a>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Completion Action */}
      <Card className="text-center">
        <CardContent className="p-6">
          {allTasksCompleted ? (
            <div>
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Congratulations! Phase 1 Complete
              </h3>
              <p className="text-gray-600 mb-4">
                You've completed all essential pre-arrival documentation tasks. 
                You're now ready to proceed to Phase 2.
              </p>
              {!isCompleted && (
                <Button onClick={onComplete} size="lg" className="mr-4">
                  Mark Phase 1 as Complete
                </Button>
              )}
              <Button variant="outline" onClick={onBack}>
                Return to Checklist
              </Button>
            </div>
          ) : (
            <div>
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Keep Going!
              </h3>
              <p className="text-gray-600">
                Complete all tasks above to finish Phase 1 and earn your first key.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
