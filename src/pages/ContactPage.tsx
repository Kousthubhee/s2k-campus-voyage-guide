
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Clock, Send, MessageSquare, Globe, Heart } from 'lucide-react';

export const ContactPage = () => {
  const [formData, setFormData] = React.useState({
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
    console.log('Form submitted:', formData);
    // Here you would typically send the form data to your backend
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      value: 'pass2kampus@gmail.com',
      action: 'mailto:pass2kampus@gmail.com'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat with our support team',
      value: 'Available 24/7',
      action: '#'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      value: '+33 745736466',
      action: 'tel:+33745736466'
    },
    {
      icon: Globe,
      title: 'Help Center',
      description: 'Browse our knowledge base',
      value: 'Visit Help Center',
      action: '#'
    }
  ];

  const supportHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM CET' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM CET' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions about studying in France? Need help with your application? 
          Our dedicated support team is here to help you succeed.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Contact Form */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                />
              </div>
              
              <Button type="submit" className="w-full" size="lg">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Methods & Support Hours */}
        <div className="space-y-6">
          {/* Contact Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <method.icon className="h-5 w-5 text-blue-600 mt-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900">{method.title}</h4>
                    <p className="text-xs text-gray-500 mb-1">{method.description}</p>
                    <a 
                      href={method.action}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {method.value}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Support Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Support Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {supportHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{schedule.day}</span>
                    <span className="text-sm font-medium text-gray-900">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Emergency Support:</strong> For urgent matters, our emergency hotline is available 24/7.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Creator Information */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardContent className="p-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <Heart className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900">Creators: Kousthubhee Krishna & Srivatsava</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-blue-600 mb-6">
              We're passionate about helping students navigate their journey to study in France. Our platform provides comprehensive guides, checklists, and support to make your French education dreams a reality.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">👩‍🎓</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Kousthubhee Krishna</h3>
                    <p className="text-blue-600">Co-Founder & Developer</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Passionate about helping students navigate French education</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="text-4xl mr-4">👨‍🎨</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Srivatsava</h3>
                    <p className="text-blue-600">Co-Founder & Content Creator</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Passionate about helping students navigate French education</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Helping students navigate their journey to study in France</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our mission is to provide comprehensive, reliable, and up-to-date information to help international students successfully pursue their education in France.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Made for students</strong> - We understand the challenges of studying abroad and have created this platform to make your journey smoother and more successful.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
