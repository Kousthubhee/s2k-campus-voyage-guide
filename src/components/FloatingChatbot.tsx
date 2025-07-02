
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, ExternalLink } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
  category?: string;
}

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      text: "Hello! I'm your pasS2Kampus assistant. I can help you with questions about studying in France. Choose a category below or ask me anything!", 
      isUser: false 
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const categories = [
    {
      emoji: "📋",
      title: "Checklist",
      questions: [
        "What should I prepare before coming to France?",
        "What documents do I need for Campus France?",
        "How long does the visa process take?"
      ]
    },
    {
      emoji: "📑",
      title: "Documents & Renewals",
      questions: [
        "What documents are needed for visa renewal?",
        "How do I apply for a residence permit?",
        "When should I start my renewal process?"
      ]
    },
    {
      emoji: "🏡",
      title: "Community Hub",
      questions: [
        "How can I connect with other students?",
        "Are there student groups I can join?",
        "How do I find accommodation?"
      ]
    },
    {
      emoji: "📚",
      title: "Learn French",
      questions: [
        "Where can I find French language resources?",
        "What French level do I need for university?",
        "Are there free French courses available?"
      ]
    }
  ];

  const predefinedAnswers: { [key: string]: string } = {
    // Checklist answers
    "What should I prepare before coming to France?": "You should prepare: 1) Valid passport, 2) Student visa, 3) Campus France approval, 4) Proof of accommodation, 5) Health insurance, 6) Financial proof, 7) Academic transcripts, 8) Language certificates. Start this process 3-6 months before your intended arrival date.",
    
    "What documents do I need for Campus France?": "For Campus France you need: Academic transcripts, diplomas, CV, motivation letter, language certificates (French/English), passport copy, and photos. All documents must be translated into French by a certified translator.",
    
    "How long does the visa process take?": "The visa process typically takes 2-4 weeks after Campus France approval. However, during peak seasons (May-August), it can take up to 6-8 weeks. Apply as early as possible to avoid delays.",

    // Documents & Renewals answers
    "What documents are needed for visa renewal?": "For visa renewal you need: Current passport, current visa/residence permit, proof of enrollment, academic transcripts, proof of accommodation, health insurance, financial proof (bank statements), and recent photos.",
    
    "How do I apply for a residence permit?": "Apply at your local Prefecture within 2 months of arrival. You'll need: passport, visa, proof of enrollment, accommodation proof, health insurance, photos, and the OFII form. Book an appointment online in advance.",
    
    "When should I start my renewal process?": "Start your renewal process 2-3 months before your current permit expires. This gives you enough time to gather documents and get an appointment at the Prefecture.",

    // Community Hub answers
    "How can I connect with other students?": "You can connect through: University student associations, international student groups, Facebook groups for your city, ESN (Erasmus Student Network), language exchange programs, and student housing communities.",
    
    "Are there student groups I can join?": "Yes! Most universities have international student associations, subject-specific clubs, sports clubs, and cultural organizations. Check your university's student services or ask at the international office.",
    
    "How do I find accommodation?": "Options include: University residences (CROUS), private student residences, shared apartments, homestays. Use websites like CROUS, Studapart, Uniplaces, or local Facebook groups. Apply early as housing is competitive.",

    // Learn French answers
    "Where can I find French language resources?": "Free resources include: Alliance Française, local libraries, Duolingo, TV5MONDE, France Médias Monde, university language centers, and conversation exchange groups. Many universities also offer French courses for international students.",
    
    "What French level do I need for university?": "Most programs require B2 level minimum. Some competitive programs may require C1. You'll need to provide TCF, TEF, DELF, or DALF certificates. Check with your specific university for exact requirements.",
    
    "Are there free French courses available?": "Yes! Many universities offer free French courses for international students. Also check: local community centers, libraries, online platforms like FUN-MOOC, and volunteer organizations that offer language support."
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = inputValue.trim();
      setMessages(prev => [...prev, { text: userMessage, isUser: true }]);
      
      // Check if it's a predefined question
      const answer = predefinedAnswers[userMessage];
      
      setTimeout(() => {
        if (answer) {
          setMessages(prev => [...prev, { text: answer, isUser: false }]);
        } else {
          setMessages(prev => [...prev, { 
            text: "I do not have information on this. Please talk with an expert.", 
            isUser: false 
          }]);
        }
      }, 1000);
      
      setInputValue('');
    }
  };

  const handleQuestionClick = (question: string) => {
    setMessages(prev => [...prev, { text: question, isUser: true }]);
    
    const answer = predefinedAnswers[question];
    setTimeout(() => {
      setMessages(prev => [...prev, { text: answer, isUser: false }]);
    }, 1000);
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/33745736466', '_blank');
  };

  return (
    <div className="fixed bottom-8 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      ) : (
        <Card className="w-80 h-96 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">pasS2Kampus Assistant</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 flex flex-col h-full">
            <div className="flex-1 overflow-y-auto space-y-2 mb-3">
              {messages.map((message, index) => (
                <div key={index}>
                  <div
                    className={`p-2 rounded-lg text-xs ${
                      message.isUser
                        ? 'bg-blue-600 text-white ml-auto max-w-[80%]'
                        : 'bg-gray-100 text-gray-800 mr-auto max-w-[80%]'
                    }`}
                  >
                    {message.text}
                  </div>
                  
                  {/* Show category questions after initial message */}
                  {index === 0 && !message.isUser && (
                    <div className="mt-3 space-y-2">
                      {categories.map((category, catIndex) => (
                        <div key={catIndex} className="text-xs">
                          <div className="font-semibold text-gray-700 mb-1">
                            {category.emoji} {category.title}
                          </div>
                          {category.questions.map((question, qIndex) => (
                            <button
                              key={qIndex}
                              onClick={() => handleQuestionClick(question)}
                              className="block w-full text-left p-1 text-blue-600 hover:bg-blue-50 rounded text-xs mb-1"
                            >
                              • {question}
                            </button>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="space-y-2">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your question..."
                  className="text-xs"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  size="icon"
                  onClick={handleSendMessage}
                  className="h-8 w-8"
                >
                  <Send className="h-3 w-3" />
                </Button>
              </div>
              
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-2"
                size="sm"
              >
                📱 Chat with an expert on WhatsApp
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
