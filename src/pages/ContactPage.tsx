
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Globe, Users, ExternalLink } from 'lucide-react';
import { toast } from "@/components/ui/sonner";

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
    urgent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { value: 'general', label: 'General Inquiry', color: 'bg-blue-100 text-blue-800' },
    { value: 'technical', label: 'Technical Support', color: 'bg-red-100 text-red-800' },
    { value: 'visa', label: 'Visa Questions', color: 'bg-green-100 text-green-800' },
    { value: 'housing', label: 'Housing Support', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'academic', label: 'Academic Guidance', color: 'bg-purple-100 text-purple-800' },
    { value: 'emergency', label: 'Emergency', color: 'bg-red-100 text-red-800' }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      value: 'support@frenchstudentguide.com',
      action: 'mailto:support@frenchstudentguide.com',
      availability: '24/7'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Available 9 AM - 6 PM CET',
      action: '#',
      availability: 'Mon-Fri 9AM-6PM CET'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Call us for urgent matters',
      value: '+33 1 23 45 67 89',
      action: 'tel:+33123456789',
      availability: 'Mon-Fri 9AM-5PM CET'
    }
  ];

  const communityLinks = [
    {
      icon: Users,
      title: 'Discord Community',
      description: 'Join our active Discord server',
      link: '#',
      members: '2,500+ members'
    },
    {
      icon: Globe,
      title: 'FAQ Center',
      description: 'Find answers to common questions',
      link: '#',
      articles: '150+ articles'
    },
    {
      icon: MessageSquare,
      title: 'Community Forum',
      description: 'Connect with other students',
      link: '#',
      posts: '1,000+ discussions'
    }
  ];

  const officeLocations = [
    {
      city: 'Paris',
      address: '123 Rue de la République, 75001 Paris, France',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      phone: '+33 1 23 45 67 89'
    },
    {
      city: 'Lyon',
      address: '45 Place Bellecour, 69002 Lyon, France',
      hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
      phone: '+33 4 78 90 12 34'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast("Thank you! Your message has been sent successfully. We'll get back to you within 24 hours.");
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
        urgent: false
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const selectedCategory = categories.find(cat => cat.value === formData.category);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact & Support</h1>
        <p className="text-lg text-gray-600">
          We're here to help you succeed in your French education journey
        </p>
      </div>

      {/* Creators Section */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-blue-900 mb-4">Creators: Kousthubhee Krishna & Srivatsava</h2>
          <p className="text-blue-800 mb-6">
            We're passionate about helping students navigate their journey to study in France. 
            Our platform provides comprehensive guides, checklists, and support to make your 
            French education dreams a reality.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                K
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-900">Kousthubhee Krishna</h3>
                <p className="text-blue-700 font-medium">Co-Founder & Developer</p>
                <p className="text-blue-600 text-sm mt-1">Passionate about helping students navigate French education</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                S
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-900">Srivatsava</h3>
                <p className="text-blue-700 font-medium">Co-Founder & Content Creator</p>
                <p className="text-blue-600 text-sm mt-1">Passionate about helping students navigate French education</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mission Section */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Helping students navigate their journey to study in France</h2>
          <p className="text-gray-700 mb-4">
            Our mission is to provide comprehensive, reliable, and up-to-date information to 
            help international students successfully pursue their education in France.
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Made for students</h3>
            <p className="text-blue-800 text-sm">
              We understand the challenges of studying abroad and have created 
              this platform to make your journey smoother and more successful.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief description of your inquiry"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  {selectedCategory && (
                    <Badge className={`mt-2 ${selectedCategory.color}`}>
                      {selectedCategory.label}
                    </Badge>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please describe your question or issue in detail..."
                    rows={6}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="urgent"
                    name="urgent"
                    checked={formData.urgent}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                  />
                  <Label htmlFor="urgent" className="text-sm">
                    This is urgent (we'll prioritize your request)
                  </Label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Office Locations */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Office Locations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {officeLocations.map((office, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{office.city}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                        <span>{office.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 flex-shrink-0" />
                        <span>{office.hours}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 flex-shrink-0" />
                        <a href={`tel:${office.phone}`} className="text-blue-600 hover:underline">
                          {office.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3 mb-2">
                    <method.icon className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">{method.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                  <p className="text-sm font-medium text-blue-600">{method.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{method.availability}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Community Links */}
          <Card>
            <CardHeader>
              <CardTitle>Community & Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {communityLinks.map((link, index) => (
                <div key={index} className="p-3 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <link.icon className="h-4 w-4 text-purple-600" />
                      <h3 className="font-medium">{link.title}</h3>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{link.description}</p>
                  <p className="text-xs text-purple-600 font-medium">
                    {link.members || link.articles || link.posts}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Response Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Response Times
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">General Inquiries</span>
                  <Badge variant="outline">24 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Technical Support</span>
                  <Badge variant="outline">12 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Urgent Matters</span>
                  <Badge className="bg-red-100 text-red-800">2 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Emergencies</span>
                  <Badge className="bg-red-500 text-white">Immediate</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
