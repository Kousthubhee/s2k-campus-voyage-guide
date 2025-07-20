
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  CheckSquare, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Languages,
  ArrowRight,
  Star,
  Globe,
  Award,
  Clock,
  Shield,
  Sparkles,
  Heart,
  Brain,
  Package,
  Link,
  Luggage,
  Video,
  GraduationCap
} from 'lucide-react';

interface HomePageProps {
  onGetStarted: () => void;
  onPageNavigation: (page: string) => void;
}

export const HomePage = ({ onGetStarted, onPageNavigation }: HomePageProps) => {
  const features = [
    {
      icon: CheckSquare,
      title: "Complete Checklist",
      description: "Step-by-step guidance through your entire French education journey",
      color: "text-blue-600"
    },
    {
      icon: MessageSquare,
      title: "AI Assistant",
      description: "Get instant answers to all your questions about studying in France",
      color: "text-cyan-600"
    },
    {
      icon: Users,
      title: "Community Hub",
      description: "Connect with fellow international students and share experiences",
      color: "text-green-600"
    },
    {
      icon: Languages,
      title: "French Learning",
      description: "Practice and improve your French language skills",
      color: "text-purple-600"
    },
    {
      icon: BookOpen,
      title: "Stay Updated",
      description: "Latest news, updates, and important information",
      color: "text-orange-600"
    },
    {
      icon: Globe,
      title: "School Insights",
      description: "Comprehensive information about French universities and programs",
      color: "text-red-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Universities", icon: Award },
    { number: "50+", label: "Cities", icon: Globe },
    { number: "24/7", label: "AI Support", icon: Clock },
    { number: "100%", label: "Secure", icon: Shield }
  ];

  const trustReasons = [
    {
      icon: Brain,
      title: "Built by students who've lived it",
      color: "text-blue-600"
    },
    {
      icon: Package,
      title: "Based on packing regrets, visa errors, and city-wise hacks",
      color: "text-orange-600"
    },
    {
      icon: MessageSquare,
      title: "100+ Indian students shared input to help others avoid costly mistakes",
      color: "text-green-600"
    },
    {
      icon: Link,
      title: "Free to use. No agents. No forms. Just smart guidance.",
      color: "text-purple-600"
    }
  ];

  const journeySnapshots = [
    {
      icon: Luggage,
      title: "What I packed for Rouen — and wish I didn't",
      color: "text-blue-600"
    },
    {
      icon: Video,
      title: "Finding housing in France: CROUS vs. private tips",
      color: "text-green-600"
    },
    {
      icon: GraduationCap,
      title: "Applying for CAF without a French guarantor—my steps",
      color: "text-purple-600"
    }
  ];

  const testimonials = [
    {
      name: "Arjun Sharma",
      role: "Master's Student at Sorbonne",
      content: "pasS2Kampus made my transition to French university life so much smoother. The checklist helped me stay organized!",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Engineering Student at INSA Lyon",
      content: "The expert guidance helped me with all my visa questions instantly. Couldn't have done it without this platform!",
      rating: 5
    },
    {
      name: "Ravi Kumar",
      role: "Business Student at HEC Paris",
      content: "The community feature helped me connect with other students before I even arrived in France.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Hero Section */}
      <section className="px-4 py-16 md:py-24 min-h-screen flex items-center">
        <div className="max-w-6xl mx-auto text-center w-full">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            <Heart className="h-4 w-4 mr-2 text-red-500" />
            Built by Indian Students, for Indian Students
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            Welcome to{" "}
            <span className="text-gray-900">
              pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-3xl mx-auto italic">
            From university search to settling as a student in France, powered by real experience, not just advice.
          </p>
          
          <p className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto italic">
            "Everything here is based on what we wish we knew."
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all"
              onClick={onGetStarted}
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-6 hover:bg-green-50 border-green-200 text-green-700 hover:text-green-800 transition-all"
              onClick={() => window.open('https://wa.me/33745736466', '_blank')}
            >
              Talk to an Expert
              <MessageSquare className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and resources to make your French education journey successful
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 mb-4 ${feature.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Students Trust Us Section */}
      <section className="px-4 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Students Trust Us</h2>
            <p className="text-xl text-gray-600">
              Real insights from students who've walked the path before you
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {trustReasons.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center ${reason.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <p className="text-lg font-medium text-gray-900">{reason.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Live Journey Snapshots Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Journey Snapshots</h2>
            <p className="text-xl text-gray-600">
              Real stories and practical tips from students currently in France
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {journeySnapshots.map((snapshot, index) => {
              const Icon = snapshot.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-0 shadow-md cursor-pointer group">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 mb-4 ${snapshot.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <p className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      "{snapshot.title}"
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
            <p className="text-xl text-gray-600">
              Join thousands of successful international students
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 pb-24">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0 text-white">
            <CardContent className="py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of students who have successfully navigated their French education journey with pasS2Kampus
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-50 shadow-lg"
                onClick={onGetStarted}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
