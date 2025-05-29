
import { useState } from 'react';
import { ArrowRightLeft, Volume2, Copy, Mic, MicOff } from 'lucide-react';

export function TranslatePage() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('fr');

  // Simple translation pairs for demonstration
  const translations: Record<string, Record<string, string>> = {
    'en-fr': {
      'hello': 'bonjour',
      'goodbye': 'au revoir',
      'please': 's\'il vous plaît',
      'thank you': 'merci',
      'excuse me': 'excusez-moi',
      'where is': 'où est',
      'how much': 'combien',
      'i need help': 'j\'ai besoin d\'aide',
      'do you speak english': 'parlez-vous anglais',
      'i don\'t understand': 'je ne comprends pas'
    },
    'fr-en': {
      'bonjour': 'hello',
      'au revoir': 'goodbye',
      's\'il vous plaît': 'please',
      'merci': 'thank you',
      'excusez-moi': 'excuse me',
      'où est': 'where is',
      'combien': 'how much',
      'j\'ai besoin d\'aide': 'i need help',
      'parlez-vous anglais': 'do you speak english',
      'je ne comprends pas': 'i don\'t understand'
    }
  };

  const commonPhrases = [
    { en: 'Hello, how are you?', fr: 'Bonjour, comment allez-vous?' },
    { en: 'Where is the bathroom?', fr: 'Où sont les toilettes?' },
    { en: 'How much does this cost?', fr: 'Combien ça coûte?' },
    { en: 'I would like...', fr: 'Je voudrais...' },
    { en: 'Excuse me', fr: 'Excusez-moi' },
    { en: 'Thank you very much', fr: 'Merci beaucoup' },
    { en: 'I don\'t speak French', fr: 'Je ne parle pas français' },
    { en: 'Can you help me?', fr: 'Pouvez-vous m\'aider?' }
  ];

  const translateText = (text: string) => {
    const langPair = `${sourceLang}-${targetLang}`;
    const translationMap = translations[langPair];
    
    if (translationMap) {
      const lowerText = text.toLowerCase().trim();
      const translation = translationMap[lowerText];
      if (translation) {
        setTranslatedText(translation);
        return;
      }
    }
    
    // Fallback message
    setTranslatedText('Translation not available for this phrase. Try using Google Translate for complex sentences.');
  };

  const handleTranslate = () => {
    if (sourceText.trim()) {
      translateText(sourceText);
    }
  };

  const swapLanguages = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window && text) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = sourceLang === 'fr' ? 'fr-FR' : 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSourceText(transcript);
        translateText(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
        alert('Speech recognition error. Please try again.');
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const insertPhrase = (phrase: { en: string; fr: string }) => {
    if (sourceLang === 'en') {
      setSourceText(phrase.en);
      setTranslatedText(phrase.fr);
    } else {
      setSourceText(phrase.fr);
      setTranslatedText(phrase.en);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Translate</h1>
        <p className="text-gray-600">Real-time translation between English and French</p>
      </div>

      {/* Main Translator */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
        {/* Language Selector */}
        <div className="bg-gray-50 p-4 border-b border-gray-200">
          <div className="flex items-center justify-center gap-4">
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
            
            <button
              onClick={swapLanguages}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
            >
              <ArrowRightLeft size={20} />
            </button>
            
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Source Text */}
          <div className="p-6 border-r border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">
                {sourceLang === 'en' ? 'English' : 'Français'}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={startListening}
                  className={`p-2 rounded-lg transition-colors ${
                    isListening
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
              </div>
            </div>
            
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Type or speak to translate..."
              className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            
            <div className="flex justify-between mt-4">
              <div className="flex gap-2">
                <button
                  onClick={() => speakText(sourceText, sourceLang)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={!sourceText}
                >
                  <Volume2 size={16} />
                </button>
                <button
                  onClick={() => copyToClipboard(sourceText)}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  disabled={!sourceText}
                >
                  <Copy size={16} />
                </button>
              </div>
              <button
                onClick={handleTranslate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={!sourceText.trim()}
              >
                Translate
              </button>
            </div>
          </div>

          {/* Translated Text */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">
                {targetLang === 'fr' ? 'Français' : 'English'}
              </h3>
            </div>
            
            <div className="w-full h-32 p-4 bg-gray-50 border border-gray-300 rounded-lg">
              <p className="text-gray-800">{translatedText}</p>
            </div>
            
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => speakText(translatedText, targetLang)}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={!translatedText}
              >
                <Volume2 size={16} />
              </button>
              <button
                onClick={() => copyToClipboard(translatedText)}
                className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                disabled={!translatedText}
              >
                <Copy size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Common Phrases */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Common Phrases</h2>
        <p className="text-gray-600 mb-6">Click on any phrase to use it in the translator</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commonPhrases.map((phrase, index) => (
            <div
              key={index}
              onClick={() => insertPhrase(phrase)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all"
            >
              <div className="text-sm font-medium text-gray-800 mb-1">
                {sourceLang === 'en' ? phrase.en : phrase.fr}
              </div>
              <div className="text-sm text-gray-600">
                {sourceLang === 'en' ? phrase.fr : phrase.en}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
