
import React from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { MessageCircle, Sparkles, BookOpen, Globe, Calculator } from 'lucide-react';

const QuickStartCards = () => {
  const suggestions = [
    {
      icon: BookOpen,
      title: "Study in France",
      description: "Tell me about university requirements and application process",
      color: "bg-blue-50 hover:bg-blue-100 border-blue-200"
    },
    {
      icon: Globe,
      title: "Visa Information",
      description: "What documents do I need for a French student visa?",
      color: "bg-green-50 hover:bg-green-100 border-green-200"
    },
    {
      icon: Calculator,
      title: "Living Costs",
      description: "How much does it cost to live as a student in Paris?",
      color: "bg-purple-50 hover:bg-purple-100 border-purple-200"
    },
    {
      icon: MessageCircle,
      title: "Language Learning",
      description: "Tips for learning French before moving to France",
      color: "bg-orange-50 hover:bg-orange-100 border-orange-200"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${suggestion.color}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Icon className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{suggestion.title}</h3>
                <p className="text-sm text-gray-600">{suggestion.description}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const AskMeAnythingPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Ask Me Anything</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Your AI-powered assistant for studying in France. Get instant answers about visas, 
          universities, living costs, language learning, and more.
        </p>
      </div>

      <QuickStartCards />
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            <span className="font-medium text-gray-900">Chat Assistant</span>
            <div className="flex-1"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-500">Online</span>
          </div>
        </div>
        
        <div className="p-6">
          <ChatInterface />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          💡 Pro tip: Be specific in your questions for more detailed and helpful responses
        </p>
      </div>
    </div>
  );
};
