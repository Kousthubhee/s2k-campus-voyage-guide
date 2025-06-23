import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Link } from "react-router-dom";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'pass2kampus@gmail.com',
      description: 'Write to us anytime — for doubts, suggestions, or to say hello!'
    },
    {
      icon: Phone,
      title: 'Phone',
      value: 'Available on request',
      description: 'Contact details provided if needed'
    },
    {
      icon: MapPin,
      title: 'Location',
      value: 'Rouen, France',
      description: 'Our team is based in France'
    }
  ];

  const creators = [
    {
      name: 'Kousthubhee Krishna',
      role: 'Co-Founder & Developer',
      avatar: '👩‍🎓'
    },
    {
      name: 'Srivatsava',
      role: 'Co-Founder & Content Creator',
      avatar: '👨‍💻'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="sr-only">Contact Us</h1>
        <div className="flex items-center justify-center mb-2">
          <Phone className="h-8 w-8 mr-3 text-pink-600" />
          <span>
            <span className="font-calibri font-bold text-3xl text-gray-700">
              Contact Us
            </span>
          </span>
        </div>
        <p className="text-lg text-gray-600 mb-1">
          Have a doubt, suggestion, or just want to talk? We’d love to hear from you.<br />
          Reach out about anything — no question is too small, and feedback is always welcome!
        </p>
        <div className="mt-2 text-sm text-blue-700 italic">
          “We've lived the French student experience. Whatever's on your mind, let's connect.”
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-6">Reach Out to Us Directly</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Let us know what's on your mind"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message — ask, suggest, or simply say hello!"
                    className="h-32 resize-none"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <div className="text-xs text-gray-500 mt-1 text-center">
                  Your information is confidential and only used to help you with your journey. See our privacy policy for details.
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start">
                      <div className="bg-pink-100 p-2 rounded-lg mr-4">
                        <Icon className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{info.title}</div>
                        <div className="text-gray-700">{info.value}</div>
                        <div className="text-sm text-gray-500">{info.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                Meet the Team
              </h3>
              <p className="text-blue-700 mb-4">
                We’re passionate about helping students navigate life in France. No matter what you’re facing, just ask — we’re here for you!
              </p>
              <div className="space-y-3">
                {creators.map((creator, index) => (
                  <div key={index} className="flex items-start">
                    <div className="text-2xl mr-3">{creator.avatar}</div>
                    <div>
                      <div className="font-medium text-blue-900">{creator.name}</div>
                      <div className="text-sm text-blue-700">{creator.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
