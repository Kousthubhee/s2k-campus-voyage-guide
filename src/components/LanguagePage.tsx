import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Languages, Play, Volume2, BookOpen, Award, Star, Check } from 'lucide-react';
import { useFavorites } from '../hooks/useFavorites';
import { FavoriteStar } from './FavoriteStar';

export const LanguagePage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [hideFrench, setHideFrench] = useState(false);
  const [hideEnglish, setHideEnglish] = useState(false);

  // --- Track completed lessons in state
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Persist phrase favorites
  const [favorites, toggleFavorite] = useFavorites("french-phrase-favs-v1");

  useEffect(() => {
    const synth = window.speechSynthesis;
    const loadVoices = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
    };
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const frenchVoice = voices.find(voice => voice.lang === 'fr-FR');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      if (frenchVoice) utterance.voice = frenchVoice;
      synth.cancel();
      synth.speak(utterance);
    }
  };

  const lessons = [
    {
      id: 'greetings',
      title: 'Greetings & Politeness',
      level: 'Beginner',
      duration: '10 min',
      phrases: [
        { french: 'Bonjour', english: 'Hello/Good morning', pronunciation: 'bon-ZHOOR' },
        { french: 'Bonsoir', english: 'Good evening', pronunciation: 'bon-SWAHR' },
        { french: 'S\'il vous plaît', english: 'Please', pronunciation: 'see voo PLAY' },
        { french: 'Merci beaucoup', english: 'Thank you very much', pronunciation: 'mer-SEE bo-KOO' },
        { french: 'Excusez-moi', english: 'Excuse me', pronunciation: 'ex-ku-ZAY mwah' }
      ]
    },
    {
      id: 'university',
      title: 'University Life',
      level: 'Intermediate',
      duration: '15 min',
      phrases: [
        { french: 'Où est la bibliothèque?', english: 'Where is the library?', pronunciation: 'oo ay la bee-blee-oh-TEHK' },
        { french: 'J\'ai un cours à 14h', english: 'I have a class at 2 PM', pronunciation: 'zhay uh koor ah ka-TORZ ur' },
        { french: 'Pouvez-vous répéter?', english: 'Can you repeat?', pronunciation: 'poo-vay voo ray-pay-TAY' },
        { french: 'Je ne comprends pas', english: 'I don\'t understand', pronunciation: 'zhuh nuh kom-prahn pah' }
      ]
    },
    {
      id: 'daily-life',
      title: 'Daily Life & Shopping',
      level: 'Intermediate',
      duration: '12 min',
      phrases: [
        { french: 'Combien ça coûte?', english: 'How much does it cost?', pronunciation: 'kom-bee-AHN sah koot' },
        { french: 'Où est le supermarché?', english: 'Where is the supermarket?', pronunciation: 'oo ay luh su-per-mar-SHAY' },
        { french: 'L\'addition, s\'il vous plaît', english: 'The check, please', pronunciation: 'lah-dee-see-YOHN see voo PLAY' },
        { french: 'Je voudrais...', english: 'I would like...', pronunciation: 'zhuh voo-DRAY' }
      ]
    },
    {
      id: 'bureaucracy',
      title: 'Bureaucracy & Administration',
      level: 'Advanced',
      duration: '20 min',
      phrases: [
        { french: 'J\'ai besoin d\'un rendez-vous', english: 'I need an appointment', pronunciation: 'zhay buh-ZWAHN duhn rahn-day VOO' },
        { french: 'Où puis-je obtenir ce document?', english: 'Where can I get this document?', pronunciation: 'oo pwee zhuh ob-tuh-NEER suh do-ku-MAHN' },
        { french: 'Mon numéro de sécurité sociale', english: 'My social security number', pronunciation: 'mohn nu-may-ROH duh say-ku-ree-TAY so-see-AHL' },
        { french: 'Quels documents sont nécessaires?', english: 'What documents are necessary?', pronunciation: 'kel do-ku-MAHN sohn nay-say-SAIR' }
      ]
    }
  ];

  const tips = [
    'Practice pronunciation daily for 10-15 minutes',
    'Use hand gestures - French people are expressive!',
    'Don\'t be afraid to make mistakes',
    'Listen to French music and podcasts',
    'Practice with native speakers when possible'
  ];

  // Helper: each phrase gets a unique id for favoriting
  const getPhraseId = (lessonId: string, index: number) => `${lessonId}-${index}`;

  // Find favorite phrases for "Favorites" section
  const favoriteSet = favorites;

  // Helper for progress percentage
  const completedCount = completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Check if selected lesson is completed
  const isLessonCompleted = selectedLesson && completedLessons.includes(selectedLesson.id);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Languages className="h-8 w-8 mr-3 text-indigo-600" />
          Learn French
        </h1>
        <p className="text-lg text-gray-600">
          Essential French phrases for your studies and daily life in France
        </p>
      </div>
      
      {/* --- Favorites Section at the top (show if any) --- */}
      {favoriteSet.size > 0 && (
        <Card className="mb-8 border-yellow-300 bg-yellow-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold flex items-center mb-4">
              <Star className="h-5 w-5 text-yellow-400 mr-2" />
              Favorite Phrases
            </h3>
            <ul className="flex flex-wrap gap-4">
              {Array.from(favoriteSet).map(favId => {
                // locate phrase
                let phrase, lessonTitle;
                for (const lesson of lessons) {
                  const idx = lesson.phrases.findIndex((_, i) => getPhraseId(lesson.id, i) === favId);
                  if (idx >= 0) {
                    phrase = lesson.phrases[idx];
                    lessonTitle = lesson.title;
                    break;
                  }
                }
                if (!phrase) return null;
                return (
                  <li key={favId} className="border rounded px-3 py-2 bg-white shadow-sm">
                    <div className="flex items-center mb-1">
                      <FavoriteStar isActive={true} onClick={() => toggleFavorite(favId)} />
                      <span className="font-semibold text-gray-900 mr-2">
                        {phrase.french}
                      </span>
                      <span className="ml-auto text-xs text-gray-500">{lessonTitle}</span>
                    </div>
                    <div className="text-sm text-gray-700">{phrase.english}</div>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* --- Hide/Reveal toggles when viewing lesson --- */}
      {selectedLesson && (
        <div className="flex gap-2 justify-end mb-4">
          <Button
            size="sm"
            variant={hideFrench ? "default" : "outline"}
            onClick={() => setHideFrench(x => !x)}
          >
            {hideFrench ? "Show French" : "Hide French"}
          </Button>
          <Button
            size="sm"
            variant={hideEnglish ? "default" : "outline"}
            onClick={() => setHideEnglish(x => !x)}
          >
            {hideEnglish ? "Show English" : "Hide English"}
          </Button>
        </div>
      )}

      {/* --- Lessons Display --- */}
      {selectedLesson ? (
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => setSelectedLesson(null)} className="mr-4">
              ← Back to Lessons
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedLesson.title}</h2>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <span className="mr-4">{selectedLesson.level}</span>
                <span>{selectedLesson.duration}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {selectedLesson.phrases.map((phrase, index) => {
              const phraseId = getPhraseId(selectedLesson.id, index);
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                      <div className="flex items-center">
                        <FavoriteStar
                          isActive={favoriteSet.has(phraseId)}
                          onClick={() => toggleFavorite(phraseId)}
                        />
                        <div>
                          <div className="text-lg font-semibold text-gray-900 mb-1">
                            {!hideFrench ? phrase.french : <span className="text-gray-400 italic">[hidden]</span>}
                          </div>
                          <div className="text-sm text-gray-500">
                            {!hideFrench ? `[${phrase.pronunciation}]` : <span className="text-gray-400 italic">[hidden]</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-700">
                        {!hideEnglish ? phrase.english : <span className="text-gray-400 italic">[hidden]</span>}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => speakText(phrase.french)}>
                          <Volume2 className="h-4 w-4 mr-2" />
                          Listen
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-2" />
                          Practice
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Award className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Lesson Complete!
              </h3>
              <p className="text-green-700 mb-4">
                Great job! You've learned {selectedLesson.phrases.length} essential phrases.
              </p>
              <Button
                className="bg-green-600 hover:bg-green-700"
                disabled={isLessonCompleted}
                onClick={() => {
                  if (selectedLesson && !isLessonCompleted) {
                    setCompletedLessons((prev) => [...prev, selectedLesson.id]);
                  }
                }}
              >
                {isLessonCompleted ? (
                  <span className="flex items-center">
                    <Check className="h-4 w-4 mr-2" /> Marked Complete
                  </span>
                ) : (
                  "Mark as Complete"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lessons.map((lesson) => (
                <Card 
                  key={lesson.id} 
                  className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedLesson(lesson)}
                >
                  <CardContent className="p-6">
                    <div className="h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs px-2 py-1 rounded ${
                        lesson.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        lesson.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {lesson.level}
                      </span>
                      <span className="text-sm text-gray-500">{lesson.duration}</span>
                    </div>
                    
                    <Button className="w-full" size="sm">
                      Start Lesson
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Learning Tips</h3>
                <div className="space-y-3">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start">
                      <div className="text-indigo-600 mr-2 mt-0.5">💡</div>
                      <span className="text-sm text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Your Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Lessons Completed</span>
                    <span className="font-semibold">{completedCount} / {totalLessons}</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div className="bg-indigo-600 h-2 rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <div className="text-sm text-gray-500">
                    {completedCount === 0
                      ? "Complete lessons to track your progress"
                      : `You've completed ${completedCount} lesson${completedCount > 1 ? 's' : ''}!`}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
