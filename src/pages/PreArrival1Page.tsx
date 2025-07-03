
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, ArrowLeft, FileText, CheckCircle2, Circle, User, Phone, Mail } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

interface CheckboxItemProps {
  id: string;
  text: string;
  checked: boolean;
  onChange: () => void;
}

const CheckboxItem: React.FC<CheckboxItemProps> = ({ id, text, checked, onChange }) => (
  <div className="flex items-center space-x-2">
    <button
      onClick={onChange}
      className="flex items-center justify-center w-5 h-5 border-2 border-blue-500 rounded"
    >
      {checked ? <CheckCircle2 className="w-4 h-4 text-blue-500" /> : <Circle className="w-4 h-4 text-gray-400" />}
    </button>
    <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {text}
    </label>
  </div>
);

interface PreArrival1PageProps {
  onBack: () => void;
  onComplete: () => void;
  isCompleted: boolean;
  profile: {
    name: string;
    email: string;
    about: string;
    memberSince: string;
    photo: string;
    age: string;
    prevEducation: string;
    workExperience: string;
  };
}

export const PreArrival1Page: React.FC<PreArrival1PageProps> = ({ onBack, onComplete, isCompleted, profile }) => {
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [visaDialogOpen, setVisaDialogOpen] = useState(false);
  const [visaFormData, setVisaFormData] = useState({
    appointmentType: 'visa',
    preferredDate: '',
    preferredTime: '',
    location: '',
    fullName: profile.name || '',
    email: profile.email || '',
    phone: '',
    passportNumber: '',
    nationality: '',
    purpose: '',
    documents: [] as string[],
    specialRequests: ''
  });

  const checklistItems = [
    { id: 'passport', text: 'Valid passport (at least 6 months remaining)' },
    { id: 'visa', text: 'Student visa application submitted' },
    { id: 'acceptance', text: 'University acceptance letter' },
    { id: 'financial', text: 'Financial proof documents' },
    { id: 'insurance', text: 'Health insurance coverage' },
    { id: 'accommodation', text: 'Accommodation arrangements' },
    { id: 'flight', text: 'Flight booking confirmation' },
    { id: 'documents', text: 'All required documents translated' }
  ];

  const handleItemChange = (id: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = Math.round((completedCount / checklistItems.length) * 100);

  const handleCompleteModule = () => {
    if (completedCount === checklistItems.length) {
      onComplete();
      toast("Pre-Arrival Module 1 completed! You earned a key.");
    } else {
      toast("Please complete all items before finishing the module.");
    }
  };

  const handleVisaSchedule = () => {
    console.log('Visa appointment scheduled:', visaFormData);
    toast("Visa appointment scheduled successfully!");
    setVisaDialogOpen(false);
  };

  const handleVisaFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVisaFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const appointmentTypes = [
    { value: 'visa', label: 'Student Visa Application' },
    { value: 'renewal', label: 'Visa Renewal' },
    { value: 'consultation', label: 'Visa Consultation' }
  ];

  const locations = [
    { value: 'paris', label: 'French Consulate - Paris' },
    { value: 'lyon', label: 'French Consulate - Lyon' },
    { value: 'marseille', label: 'French Consulate - Marseille' }
  ];

  const availableDocuments = [
    'Passport',
    'University Acceptance Letter',
    'Financial Proof',
    'Health Insurance',
    'Accommodation Proof',
    'Academic Transcripts',
    'Language Proficiency Certificate'
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" onClick={onBack} className="mr-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Checklist
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pre-Arrival Preparation - Part 1</h1>
          <p className="text-gray-600">Essential documents and visa requirements</p>
        </div>
      </div>

      {isCompleted && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle2 className="h-5 w-5 text-green-600 mr-2" />
            <span className="text-green-800 font-medium">Module Completed!</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-gray-500">{completedCount}/{checklistItems.length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                {checklistItems.map((item) => (
                  <CheckboxItem
                    key={item.id}
                    id={item.id}
                    text={item.text}
                    checked={checkedItems[item.id] || false}
                    onChange={() => handleItemChange(item.id)}
                  />
                ))}
              </div>

              <div className="mt-6 pt-4 border-t">
                <Button
                  onClick={handleCompleteModule}
                  disabled={completedCount !== checklistItems.length || isCompleted}
                  className="w-full"
                >
                  {isCompleted ? 'Module Completed' : 'Complete Module'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Visa Appointment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Schedule your visa appointment at the French consulate.
              </p>
              <Button onClick={() => setVisaDialogOpen(true)} className="w-full">
                Schedule Appointment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Apply for your visa at least 3 months before departure</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Get all documents translated by certified translators</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <span>Book accommodation before visa application</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Visa Scheduler Dialog */}
      <Dialog open={visaDialogOpen} onOpenChange={setVisaDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Visa Appointment</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="appointmentType">Appointment Type</Label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  value={visaFormData.appointmentType}
                  onChange={handleVisaFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {appointmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="location">Consulate Location</Label>
                <select
                  id="location"
                  name="location"
                  value={visaFormData.location}
                  onChange={handleVisaFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Location</option>
                  {locations.map(location => (
                    <option key={location.value} value={location.value}>
                      {location.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="preferredDate">Preferred Date</Label>
                <Input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={visaFormData.preferredDate}
                  onChange={handleVisaFormChange}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <Label htmlFor="preferredTime">Preferred Time</Label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={visaFormData.preferredTime}
                  onChange={handleVisaFormChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={visaFormData.fullName}
                  onChange={handleVisaFormChange}
                  placeholder="As per passport"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={visaFormData.email}
                  onChange={handleVisaFormChange}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={visaFormData.phone}
                  onChange={handleVisaFormChange}
                  placeholder="+1 234 567 8900"
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={visaFormData.nationality}
                  onChange={handleVisaFormChange}
                  placeholder="Your nationality"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="passportNumber">Passport Number</Label>
              <Input
                id="passportNumber"
                name="passportNumber"
                value={visaFormData.passportNumber}
                onChange={handleVisaFormChange}
                placeholder="Enter passport number"
              />
            </div>

            <div>
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Input
                id="purpose"
                name="purpose"
                value={visaFormData.purpose}
                onChange={handleVisaFormChange}
                placeholder="e.g., Higher Education, Master's Program"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setVisaDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleVisaSchedule}>
                Schedule Appointment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
