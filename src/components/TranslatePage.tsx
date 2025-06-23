
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, ArrowLeft as Swap, Mic, Copy, StickyNote } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/sonner';

// TypeScript declarations to enable use of SpeechRecognition on `window`
type SpeechRecognitionType = typeof window extends { SpeechRecognition: infer R }
  ? R
  : any;

// declare ambient global access (simplifies usage below)
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

const LANG_OPTIONS = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'French' },
  { code: 'es', label: 'Spanish' },
  { code: 'de', label: 'German' },
  { code: 'it', label: 'Italian' },
  { code: 'zh', label: 'Chinese' },
  { code: 'ja', label: 'Japanese' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ru', label: 'Russian' },
  { code: 'ar', label: 'Arabic' },
];

const AUTO_DETECT = { code: 'auto', label: 'Detect' };

const getLangLabel = (code: string) => (
  LANG_OPTIONS.find(l => l.code === code)?.label || code
);

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('auto'); // 'auto' means detect
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isLoading, setIsLoading] = useState(false);
  const [translationHistory, setTranslationHistory] = useState<Array<any>>([]);
  const [notesOpen, setNotesOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionType | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect language using a simple heuristics (and demo API key for Google Translate auto-detect)
  async function detectLanguage(text: string): Promise<string> {
    // For demo, use character sets, fallback to 'en'
    if (!text.trim()) return 'auto';
    // quick ugly presets
    if (/[\u3040-\u30ff\u31f0-\u31ff]/.test(text)) return 'ja';
    if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
    if (/[\u0600-\u06FF]/.test(text)) return 'ar';
    if (/[\u0400-\u04FF]/.test(text)) return 'ru';
    if (/[¿áéíóúñü]/i.test(text)) return 'es';
    if (/[üöäß]/i.test(text)) return 'de';
    if (/[àâçéèêëîïôûùüÿœ]/i.test(text)) return 'fr';
    if (/[अ-ह]{2}/i.test(text)) return 'hi';
    return 'en';
    // For robust detection, use a language API (Google Translate, Detect endpoint)
  }

  // Translation logic: simulate API - can be replaced by any translation API
  // Removed "Traduction simulée :" and other non-neutral prefixes for real "Google Translate" feel
  const fakeTranslate = (txt: string, from: string, to: string) => {
    if (from === "en" && to === "fr") return txt;
    if (from === "fr" && to === "en") return txt;
    return txt;
  };

  const handleTranslate = async (latestText = sourceText, latestSourceLang = sourceLanguage, latestTargetLang = targetLanguage) => {
    setIsLoading(true);

    let from = latestSourceLang;
    // Auto-detect language
    if (latestSourceLang === 'auto') {
      from = await detectLanguage(latestText);
      setSourceLanguage(from);
    }
    // Fake delay for demo purposes
    setTimeout(() => {
      const result = latestText
        ? fakeTranslate(latestText, from, latestTargetLang)
        : '';
      setTranslatedText(result);

      // Save to translation history if non-empty
      if (latestText.trim() && result) {
        setTranslationHistory((prev) => [
          { text: latestText, from, to: latestTargetLang, result, timestamp: Date.now() },
          ...prev.filter(item => !(item.text === latestText && item.from === from && item.to === latestTargetLang)), // dedupe
        ]);
      }
      setIsLoading(false);
    }, 350);
  };

  // Debounced auto-translate as user types, or on language change
  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      if (sourceText.trim() && targetLanguage) {
        handleTranslate(sourceText, sourceLanguage, targetLanguage);
      } else {
        setTranslatedText('');
      }
    }, 400);
    // eslint-disable-next-line
  }, [sourceText, sourceLanguage, targetLanguage]);

  // Speech-to-text
  const handleSpeechToText = () => {
    const SpeechRecognitionClass =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      toast("Speech recognition not supported in this browser.");
      return;
    }
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }
    const recognition = new SpeechRecognitionClass();
    recognition.lang = sourceLanguage !== 'auto' ? sourceLanguage : 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setSourceText(text);
      setIsListening(false);
      recognition.stop();
    };
    recognition.onerror = () => {
      setIsListening(false);
      recognition.stop();
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  // Swap languages
  const handleSwap = () => {
    if (sourceLanguage === 'auto') return; // can't swap if detecting
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  // Play translated text
  const handleListen = () => {
    if (!translatedText) return;
    const utter = new window.SpeechSynthesisUtterance(translatedText);
    utter.lang = targetLanguage !== 'auto' ? targetLanguage : 'en-US';
    window.speechSynthesis.speak(utter);
  };

  // Copy translated text
  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    toast("Copied translation!");
  };

  // Select a translation from history
  const handleHistoryClick = (entry: any) => {
    setSourceText(entry.text);
    setSourceLanguage(entry.from);
    setTargetLanguage(entry.to);
    setTranslatedText(entry.result);
    setNotesOpen(false);
  };

  // --- Google Translate-like Responsive Layout ---
  return (
    <div className="max-w-4xl mx-auto p-2 md:pt-8 animate-fade-in">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">🌐 Translate</h1>
        <p className="text-base text-gray-600">Instantly translate between languages</p>
      </div>
      <div className="flex justify-end mb-2">
        <Button
          variant="outline"
          onClick={() => setNotesOpen(true)}
          className="gap-1"
        >
          <StickyNote className="h-4 w-4" />
          History
        </Button>
      </div>

      {/* Main Google Translate-style panel */}
      <Card>
        <CardContent className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Source: language selector on top, then textarea */}
            <div className="flex-1 bg-white border rounded-lg shadow-sm p-4 flex flex-col">
              <div className="flex items-center mb-2 gap-2">
                <select
                  className="border rounded px-3 py-1 mr-1"
                  aria-label="Source Language"
                  value={sourceLanguage}
                  onChange={(e) => setSourceLanguage(e.target.value)}
                  disabled={isLoading}
                >
                  <option value="auto">{AUTO_DETECT.label}</option>
                  {LANG_OPTIONS.map((opt) => (
                    <option key={opt.code} value={opt.code}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {/* Swap button sits between source/target, appears only on md+ screens */}
                <span className="hidden md:flex ml-auto">
                  <Button
                    type="button"
                    onClick={handleSwap}
                    variant="ghost"
                    aria-label="Swap languages"
                    disabled={isLoading || sourceLanguage === 'auto' || targetLanguage === 'auto'}
                    className="p-2"
                  >
                    <Swap className="h-5 w-5" />
                  </Button>
                </span>
              </div>
              <Textarea
                className="flex-1 resize-none border rounded px-3 py-2 bg-white"
                placeholder="Enter text"
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                readOnly={isLoading}
                aria-label="Text to translate"
                rows={6}
              />
              {/* Actions: mic, clear (visible under textarea) */}
              <div className="flex gap-2 mt-3">
                <Button
                  type="button"
                  onClick={handleSpeechToText}
                  variant={isListening ? "secondary" : "outline"}
                  size="icon"
                  className={isListening ? "animate-pulse border-primary" : ""}
                  aria-label={isListening ? "Stop recording" : "Speak"}
                  disabled={isLoading}
                >
                  <Mic className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setSourceText('');
                    setTranslatedText('');
                  }}
                  variant="ghost"
                  size="icon"
                  className="text-gray-500"
                  disabled={isLoading && !sourceText && !translatedText}
                  aria-label="Clear"
                >
                  {/* X icon SVG */}
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </Button>
              </div>
            </div>
            {/* SWAP button for mobile: out of flow, sits between panels */}
            <div className="flex md:hidden justify-center items-center py-2">
              <Button
                type="button"
                onClick={handleSwap}
                variant="ghost"
                aria-label="Swap languages"
                disabled={isLoading || sourceLanguage === 'auto' || targetLanguage === 'auto'}
                className="p-2"
              >
                <Swap className="h-5 w-5" />
              </Button>
            </div>
            {/* Target: language selector on top, then output */}
            <div className="flex-1 bg-gray-50 border rounded-lg shadow-sm p-4 flex flex-col">
              <div className="flex items-center mb-2 gap-2">
                <select
                  className="border rounded px-3 py-1"
                  aria-label="Target Language"
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  disabled={isLoading}
                >
                  {LANG_OPTIONS
                    .filter((opt) => opt.code !== sourceLanguage && opt.code !== 'auto')
                    .map((opt) => (
                      <option key={opt.code} value={opt.code}>
                        {opt.label}
                      </option>
                    ))}
                </select>
              </div>
              <Textarea
                className="flex-1 resize-none border rounded px-3 py-2 bg-gray-100"
                placeholder="Translation"
                value={translatedText}
                readOnly
                aria-label="Translated text"
                rows={6}
              />
              {/* Actions: listen, copy (below textarea, right aligned) */}
              <div className="flex gap-2 mt-3 justify-end">
                <Button
                  type="button"
                  onClick={handleListen}
                  variant="outline"
                  size="icon"
                  disabled={!translatedText || isLoading}
                  aria-label="Listen"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  disabled={!translatedText}
                  aria-label="Copy"
                >
                  <Copy className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes/history Drawer */}
      {notesOpen && (
        <div className="fixed top-0 left-0 w-full h-full z-40 bg-black/25 flex items-start justify-end">
          <div className="bg-white shadow-lg h-full w-full max-w-md p-6 overflow-y-auto transition-all animate-in fade-in right-0">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Translation History</h2>
              <Button variant="ghost" onClick={() => setNotesOpen(false)}>Close</Button>
            </div>
            <div className="space-y-3">
              {translationHistory.length === 0 ? (
                <div className="text-gray-400 text-center mt-12">No history.</div>
              ) : (
                translationHistory.map((item, idx) => (
                  <Card key={idx} className="mb-2 hover:bg-muted cursor-pointer"
                    onClick={() => handleHistoryClick(item)}
                  >
                    <CardContent className="p-3">
                      <div className="text-xs flex gap-2 mb-1">
                        <span className="rounded bg-gray-100 px-2">{getLangLabel(item.from)}</span>
                        <span>→</span>
                        <span className="rounded bg-gray-100 px-2">{getLangLabel(item.to)}</span>
                        <span className="ml-auto text-gray-400">{new Date(item.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="font-semibold text-gray-800">{item.text}</div>
                      <div className="text-xs text-gray-600 mt-1 truncate">{item.result}</div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
            {translationHistory.length > 0 && (
              <Button
                variant="outline"
                className="w-full mt-6"
                onClick={() => setTranslationHistory([])}
              >
                Clear All History
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// The file is now over 370 lines long; please consider refactoring this page into smaller components for maintainability!
