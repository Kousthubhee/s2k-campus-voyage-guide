
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface PredefinedQuestion {
  category: string;
  emoji: string;
  questions: string[];
}

const moduleQuestions: Record<string, PredefinedQuestion[]> = {
  'pre-arrival-1': [
    {
      category: "Pre-Arrival Part 1",
      emoji: "✈️",
      questions: [
        "What documents do I need for university admission?",
        "How do I apply for a student visa?",
        "What is Campus France process?",
        "How do I book VFS appointment?",
        "What financial proof do I need?",
        "How long does visa processing take?"
      ]
    }
  ],
  'pre-arrival-2': [
    {
      category: "Packing Assistant",
      emoji: "🎒",
      questions: [
        "What clothes should I pack for France?",
        "What food items can I bring?",
        "What electronics should I pack?",
        "How to prepare culturally for France?",
        "What medicines can I bring?",
        "What books and study materials to pack?"
      ]
    }
  ],
  'post-arrival': [
    {
      category: "Post-Arrival",
      emoji: "🏠",
      questions: [
        "How do I open a French bank account?",
        "What is SSN and how to apply?",
        "How do I get health insurance?",
        "What is CAF and how to apply?",
        "How do I get a French phone number?",
        "How do I register for university?"
      ]
    }
  ],
  'documents': [
    {
      category: "Documents & Renewals",
      emoji: "📑",
      questions: [
        "What documents are needed for visa renewal?",
        "How do I renew my residence permit?",
        "What paperwork is required for CAF applications?",
        "How do I get my documents translated?",
        "When should I start renewal process?",
        "How to track document expiry dates?"
      ]
    }
  ],
  'general': [
    {
      category: "General Help",
      emoji: "💬",
      questions: [
        "What should I prepare before coming to France?",
        "How can I connect with other students?",
        "Where can I find French language resources?",
        "How do I find accommodation in France?",
        "What are the visa requirements?",
        "How do I adapt to French culture?"
      ]
    }
  ]
};

const generateAnswer = (question: string, currentModule?: string): string => {
  const lowerQuestion = question.toLowerCase();
  
  // Checklist answers
  if (lowerQuestion.includes('prepare before coming') || lowerQuestion.includes('pre-arrival')) {
    return "Before coming to France, you should: 1) Secure your student visa through Campus France, 2) Find accommodation (CROUS or private), 3) Arrange health insurance, 4) Open a French bank account, 5) Learn basic French, and 6) prepare financial proof (€615/month). Our checklist module guides you through each step!";
  }
  
  if (lowerQuestion.includes('documents') && lowerQuestion.includes('admission')) {
    return "For university admission, you typically need: Academic transcripts, diploma certificates, language proficiency tests (DELF/DALF or IELTS/TOEFL), motivation letter, CV, passport copy, and financial proof. Requirements vary by program and university.";
  }
  
  if (lowerQuestion.includes('student visa')) {
    return "To apply for a student visa: 1) Get accepted by a French institution, 2) Register on Campus France, 3) Gather required documents (passport, photos, financial proof, health insurance, acceptance letter), 4) Schedule visa appointment, 5) Pay fees. Processing takes 2-4 weeks.";
  }
  
  if (lowerQuestion.includes('accommodation')) {
    return "Accommodation options include: CROUS university housing (cheapest, €150-400/month), private apartments (€400-800/month), homestays, and student residences. Apply early as demand is high, especially in Paris!";
  }
  
  if (lowerQuestion.includes('financial preparations')) {
    return "Financial preparations: Prove €615/month for visa, open French bank account (BNP Paribas, Société Générale recommended), get international student insurance, budget for deposits, and consider part-time work options (20h/week allowed for non-EU students).";
  }
  
  // Documents & Renewals answers
  if (lowerQuestion.includes('visa renewal') || lowerQuestion.includes('residence permit')) {
    return "For visa/residence permit renewal: Apply 2-3 months before expiry, provide updated enrollment certificate, financial proof, housing proof, health insurance, passport photos, and current residence permit. Visit your local prefecture.";
  }
  
  if (lowerQuestion.includes('caf')) {
    return "For CAF housing aid: Apply online at caf.fr after arrival, provide lease agreement, bank RIB, residence permit copy, and enrollment certificate. Aid ranges €100-200/month and takes 2-3 months to process.";
  }
  
  if (lowerQuestion.includes('documents translated')) {
    return "Document translation: Use certified translators (traducteur assermenté) for official documents. Costs €20-50 per page. Some universities accept official English documents. Check with your institution first.";
  }
  
  if (lowerQuestion.includes('bank account')) {
    return "To open a bank account: Bring passport, residence proof, student card, and initial deposit (€10-300). Popular banks: BNP Paribas, Société Générale, LCL. Many offer student packages with reduced fees.";
  }
  
  if (lowerQuestion.includes('student card')) {
    return "Student cards are issued by your university after enrollment. They provide discounts on transport, meals, entertainment, and cultural activities. Keep it with you at all times for student benefits!";
  }
  
  // Ask Me Anything answers
  if (lowerQuestion.includes('what can i ask') || lowerQuestion.includes('ai assistant')) {
    return "You can ask me about: French education system, visa processes, accommodation, banking, health insurance, student life, language learning, cultural integration, and practical daily life tips. I'm here to guide your French education journey!";
  }
  
  if (lowerQuestion.includes('ai help') || lowerQuestion.includes('how does ai')) {
    return "I help by providing instant answers about studying in France, guiding you through complex processes like visa applications, offering practical tips for student life, and connecting you with relevant resources on our platform.";
  }
  
  if (lowerQuestion.includes('visa questions')) {
    return "Yes! I can help with student visa applications, renewal processes, required documents, timelines, Campus France procedures, and common visa issues. Feel free to ask specific questions about your visa situation.";
  }
  
  if (lowerQuestion.includes('topics') && lowerQuestion.includes('assist')) {
    return "I assist with: Visa & immigration, university applications, accommodation, banking & finance, health insurance, French language learning, cultural integration, student discounts, part-time work, and general student life in France.";
  }
  
  if (lowerQuestion.includes('accurate') && lowerQuestion.includes('information')) {
    return "My information is based on official French education policies and current regulations. However, rules can change, so I recommend verifying critical information with official sources like Campus France or your institution.";
  }
  
  if (lowerQuestion.includes('personalized advice')) {
    return "I provide general guidance based on common situations. For personalized advice specific to your situation, consider consulting with our experts via WhatsApp or speaking with your institution's international office.";
  }
  
  // Community Hub answers
  if (lowerQuestion.includes('connect with other students')) {
    return "Connect with students through our Community Hub! Join discussion forums, participate in Q&A sessions, share experiences, and find study partners. Many students also use Facebook groups and Discord servers for their cities.";
  }
  
  if (lowerQuestion.includes('study groups')) {
    return "Find study groups through: University bulletin boards, student associations, Facebook groups, our Community Hub, and apps like StudyBuddy. Many universities also organize study sessions during exam periods.";
  }
  
  if (lowerQuestion.includes('student events')) {
    return "Student events are posted on: University websites, student association pages, Facebook events, our Community Hub, and apps like Eventbrite. Follow your local student organizations for regular updates!";
  }
  
  if (lowerQuestion.includes('roommates')) {
    return "Find roommates through: University housing services, Facebook groups (search '[City] students'), leboncoin.fr, appartager.com, our Community Hub, and student WhatsApp groups. Always meet potential roommates first!";
  }
  
  if (lowerQuestion.includes('community discussions')) {
    return "Participate in our Community Hub discussions, join city-specific Facebook groups, attend university social events, and engage in study groups. Being active in discussions helps build your network!";
  }
  
  if (lowerQuestion.includes('networking opportunities')) {
    return "Networking opportunities include: Student association events, career fairs, academic conferences, alumni meetups, professional workshops, and international student gatherings. Check your university's career services!";
  }
  
  // Learn French answers
  if (lowerQuestion.includes('french language resources')) {
    return "French resources: Duolingo, Babbel, Alliance Française courses, university language centers, TV5Monde, RFI Savoirs, French podcasts, language exchange apps like Tandem, and local conversation groups.";
  }
  
  if (lowerQuestion.includes('improve french skills')) {
    return "Improve French through: Daily practice with apps, watching French movies/series with subtitles, reading French news, joining conversation groups, finding language exchange partners, and taking formal classes.";
  }
  
  if (lowerQuestion.includes('online french courses')) {
    return "Online French courses: Alliance Française online, Coursera French courses, edX language programs, Babbel, Busuu, and university-specific language platforms. Many are free or offer student discounts!";
  }
  
  if (lowerQuestion.includes('level of french') && lowerQuestion.includes('university')) {
    return "French level requirements vary: English-taught programs may require basic French (A2), French-taught programs typically require B2-C1. Check specific program requirements. Most universities offer preparatory French courses.";
  }
  
  if (lowerQuestion.includes('french learning apps')) {
    return "Recommended apps: Duolingo (free basics), Babbel (structured lessons), Busuu (conversation practice), HelloTalk (language exchange), Conjugueur (verb conjugations), and Le Figaro (news reading).";
  }
  
  if (lowerQuestion.includes('practice french conversation')) {
    return "Practice conversation through: Language exchange meetups, Tandem app partnerships, university conversation clubs, Alliance Française events, cafés polyglottes, and volunteering with French organizations.";
  }
  
  // Check if question is about different module
  if (currentModule !== 'general') {
    if ((lowerQuestion.includes('post-arrival') || lowerQuestion.includes('bank') || lowerQuestion.includes('ssn')) && currentModule !== 'post-arrival') {
      return "You'll find this information in the Post-Arrival module. Navigate to Checklist > Post-Arrival Checklist to learn about bank accounts, SSN, CAF, and more!";
    }
    if ((lowerQuestion.includes('packing') || lowerQuestion.includes('clothes') || lowerQuestion.includes('food')) && currentModule !== 'pre-arrival-2') {
      return "This information is available in the Packing Assistant module. Go to Checklist > Packing Assistant for detailed packing guides!";
    }
    if ((lowerQuestion.includes('visa') || lowerQuestion.includes('campus france')) && currentModule !== 'pre-arrival-1') {
      return "Visa and Campus France information is in Pre-Arrival Part 1 module. Check Checklist > Pre-Arrival Checklist (Part 1) for complete visa guidance!";
    }
    if ((lowerQuestion.includes('renewal') || lowerQuestion.includes('document')) && currentModule !== 'documents') {
      return "Document renewal information is in the Documents & Renewals section. Navigate to Documents & Renewals page for tracking and renewal processes!";
    }
  }

  return "I don't have that information currently. Please check with our expert on WhatsApp for personalized assistance!";
};

interface FloatingChatbotProps {
  currentModule?: string;
}

export function FloatingChatbot({ currentModule = 'general' }: FloatingChatbotProps) {
  // TEMPORARILY DISABLED - will return null
  return null;

  // Original code is preserved below but not rendered
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your pasS2Kampus AI assistant. Choose a category below or ask me anything about studying in France!',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const currentQuestions = moduleQuestions[currentModule] || moduleQuestions['general'];

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: generateAnswer(inputValue, currentModule),
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
      
      setInputValue('');
      setShowCategories(false);
    }
  };

  const handlePredefinedQuestion = (question: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAnswer(question, currentModule),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
    
    setShowCategories(false);
  };

  const resetChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! I\'m your pasS2Kampus AI assistant. Choose a category below or ask me anything about studying in France!',
        isUser: false,
        timestamp: new Date()
      }
    ]);
    setShowCategories(true);
    setSelectedCategory(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-blue-600 hover:bg-blue-700 animate-pulse"
          size="icon"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      ) : (
        <Card className="w-96 h-[500px] shadow-xl border-2 border-blue-200">
          <CardHeader className="pb-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                pasS2Kampus AI Assistant
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetChat}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  ↻
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[calc(500px-80px)]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {showCategories && (
                  <div className="space-y-2 mt-4">
                    <div className="text-sm font-medium text-gray-600 mb-3">
                      {currentModule !== 'general' ? `${currentModule.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Questions:` : 'Choose a category:'}
                    </div>
                    {currentQuestions.map((category) => (
                      <div key={category.category} className="space-y-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedCategory(
                            selectedCategory === category.category ? null : category.category
                          )}
                          className="w-full justify-between text-left h-auto p-2"
                        >
                          <span className="flex items-center gap-2">
                            <span>{category.emoji}</span>
                            <span className="font-medium">{category.category}</span>
                          </span>
                          {selectedCategory === category.category ? 
                            <ChevronUp className="h-4 w-4" /> : 
                            <ChevronDown className="h-4 w-4" />
                          }
                        </Button>
                        
                        {selectedCategory === category.category && (
                          <div className="space-y-1 ml-4">
                            {category.questions.map((question, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePredefinedQuestion(question)}
                                className="w-full justify-start text-left h-auto p-2 text-xs hover:bg-blue-50"
                              >
                                {question}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollArea>
            
            <div className="p-3 border-t bg-gray-50 space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about studying in France..."
                  className="text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="h-9 w-9 bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <Button
                onClick={() => window.open('https://wa.me/33745736466', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2"
                size="sm"
              >
                📱 Chat with an expert on WhatsApp
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
