
import { useState } from 'react';
import { Send, Bot, User, FileUp, Bookmark, Clipboard, Tag, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  file?: string;
  fileName?: string;
  isBookmarked?: boolean;
  tags?: string[];
  showRating?: boolean;
}

interface QAMessageItemProps {
  id: number;
  type: "user" | "bot";
  message: string;
  file?: string;
  fileName?: string;
  isBookmarked?: boolean;
  toggleBookmark?: () => void;
  tags?: string[];
  showRating?: boolean;
  onRate?: (val: "up" | "down") => void;
  onShare?: () => void;
}

const QAMessageItem: React.FC<QAMessageItemProps> = ({
  type,
  message,
  file,
  fileName,
  isBookmarked,
  toggleBookmark,
  tags,
  showRating,
  onRate,
  onShare,
}) => {
  const [clipboardCopied, setClipboardCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(message);
    setClipboardCopied(true);
    setTimeout(() => setClipboardCopied(false), 1500);
    if (onShare) onShare();
  }

  return (
    <div className={`flex ${type === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex items-start max-w-xs lg:max-w-md ${type === "user" ? "flex-row-reverse" : ""}`}>
        <div className={`p-2 rounded-full ${type === "user" ? "bg-blue-600 text-white ml-2" : "bg-gray-200 text-gray-600 mr-2"}`}>
          {type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>
        <div className={`p-3 rounded-lg ${type === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"}`}>
          <div className="flex items-center justify-between">
            {tags && tags.length > 0 && (
              <div className="flex gap-1 mb-1">
                {tags.map((tag) => (
                  <span className="text-xxs bg-purple-100 text-purple-700 px-2 py-0.5 rounded" key={tag}>
                    <Tag className="inline h-3 w-3 mr-1 align-text-top" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {toggleBookmark && (
              <button
                onClick={toggleBookmark}
                className="ml-2 text-yellow-500 hover:text-yellow-600"
                title={isBookmarked ? "Bookmarked" : "Save this Answer"}
                type="button"
              >
                <Bookmark fill={isBookmarked ? "#FFD700" : "none"} className="h-5 w-5" />
              </button>
            )}
          </div>
          {message}
          {/* Show preview if message has file */}
          {file && (
            <div className="mt-2">
              {file.startsWith("data:image") ? (
                <img src={file} alt={fileName || ""} className="h-24 max-w-full rounded border" />
              ) : (
                <div className="flex items-center gap-1 text-sm text-blue-800">
                  <FileUp className="h-4 w-4" />
                  {fileName}
                </div>
              )}
            </div>
          )}
          <div className="flex gap-2 mt-2 items-center">
            <button
              onClick={handleCopy}
              className="flex items-center text-gray-500 hover:text-blue-700 text-xs"
              title={clipboardCopied ? "Copied!" : "Copy Answer"}
              type="button"
            >
              <Clipboard className="h-4 w-4 mr-1" />
              {clipboardCopied ? "Copied!" : "Share"}
            </button>
            {showRating && (
              <>
                <button onClick={() => onRate?.("up")} className="text-green-600 text-xs ml-2" type="button">
                  <ThumbsUp className="inline h-4 w-4" /> Helpful
                </button>
                <button onClick={() => onRate?.("down")} className="text-red-500 text-xs ml-1" type="button">
                  <ThumbsDown className="inline h-4 w-4" /> Not Helpful
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

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
          <QAMessageItem
            key={message.id}
            id={parseInt(message.id)}
            type={message.isBot ? "bot" : "user"}
            message={message.text}
            file={message.file}
            fileName={message.fileName}
            isBookmarked={message.isBookmarked}
            tags={message.tags}
            showRating={message.showRating}
            onRate={(val) => console.log(`Rated ${message.id}: ${val}`)}
            onShare={() => console.log(`Shared ${message.id}`)}
          />
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
