
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRightLeft, Volume2, Copy, Languages } from 'lucide-react';
import { toast } from "sonner";

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ko', name: 'Korean' },
];

export const TranslatePage = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: sourceText,
          sourceLanguage,
          targetLanguage,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed with status: ${response.status}`);
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
      toast("Translation Complete - Text translated successfully!");
    } catch (error: any) {
      console.error('Translation error:', error);
      toast("Translation Error - Failed to translate text.");
    } finally {
      setIsTranslating(false);
    }
  };

  const handleTextToSpeech = () => {
    if (!translatedText) {
      toast("No Text to Speak - Please translate some text first.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLanguage;
    speechSynthesis.speak(utterance);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    toast("Text Copied - Translated text copied to clipboard!");
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          <Languages className="inline-block h-6 w-6 mr-2 text-blue-600 align-middle" />
          Universal Translator
        </h1>
        <p className="text-base text-gray-600 font-calibri">
          Translate text between different languages instantly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Source Text Card */}
        <Card>
          <CardHeader>
            <CardTitle>Source Text</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              placeholder="Enter text to translate"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="min-h-[150px]"
            />
          </CardContent>
        </Card>

        {/* Translated Text Card */}
        <Card>
          <CardHeader>
            <CardTitle>
              Translated Text
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Textarea
              readOnly
              placeholder="Translated text will appear here"
              value={translatedText}
              className="min-h-[150px]"
            />
            <div className="flex justify-end space-x-2 mt-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleTextToSpeech}
                disabled={isTranslating || !translatedText}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Speak
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleCopy}
                disabled={isTranslating || !translatedText}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <Button
          onClick={handleSwapLanguages}
          variant="outline"
        >
          <ArrowRightLeft className="h-4 w-4 mr-2" />
          Swap Languages
        </Button>
        <Button
          onClick={handleTranslate}
          disabled={isTranslating}
        >
          {isTranslating ? (
            <>
              Translating...
            </>
          ) : (
            <>
              <ArrowRightLeft className="h-4 w-4 mr-2" />
              Translate
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
