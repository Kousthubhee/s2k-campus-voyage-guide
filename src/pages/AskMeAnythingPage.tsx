
import React from 'react';
import { ChatInterface } from '@/components/ChatInterface';

export const AskMeAnythingPage = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Ask Me Anything</h1>
        <p className="text-gray-600">
          Get instant answers to your questions about studying in France, visa requirements, 
          living costs, and more from our AI assistant.
        </p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <ChatInterface />
      </div>
    </div>
  );
};
