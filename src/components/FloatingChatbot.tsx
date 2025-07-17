
import { useState } from 'react';

interface FloatingChatbotProps {
  currentModule?: string;
}

export function FloatingChatbot({ currentModule = 'general' }: FloatingChatbotProps) {
  // Chatbot is disabled - return null to hide it completely
  return null;
}
