
import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const faqData: Record<string, string> = {
  'visa': 'For a student visa to France, you need: acceptance letter, financial proof (€615/month), passport, photos, and health insurance. Apply through Campus France first.',
  'accommodation': 'Housing options include CROUS (university housing), private apartments, and homestays. CROUS is cheapest but limited. Book early!',
  'bank account': 'To open a bank account: residence proof, student card, passport, and initial deposit. Popular banks: BNP Paribas, Société Générale, LCL.',
  'caf': 'CAF provides housing aid (APL). Apply online after arriving with: lease agreement, bank details, and residence permit. Aid is €100-200/month.',
  'health insurance': 'Students under 28 get free French social security. Complement with mutuelle (additional insurance) for better coverage.',
  'transport': 'Student transport passes offer discounts. In Paris: Navigo student pass. Other cities have similar student rates.',
  'work permit': 'EU students can work freely. Non-EU students can work 20h/week (964h/year) with student residence permit.',
  'language': 'Basic French helps daily life. Many programs in English exist. Take French classes for better integration.',
};

export function QAPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your French education assistant. Ask me anything about studying in France, visas, accommodation, or student life!',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [keyword, response] of Object.entries(faqData)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }
    
    return 'I\'m here to help with questions about studying in France! Try asking about: visas, accommodation, bank accounts, CAF, health insurance, transport, work permits, or language requirements.';
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(input),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Ask Me Anything</h1>
        <p className="text-gray-600">Get instant answers to your French education questions</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isBot
                  ? 'bg-blue-100 text-blue-900'
                  : 'bg-green-500 text-white'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                {message.isBot ? (
                  <Bot size={16} />
                ) : (
                  <User size={16} />
                )}
                <span className="text-xs opacity-75">
                  {message.isBot ? 'Assistant' : 'You'}
                </span>
              </div>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about visas, accommodation, CAF, banking..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
