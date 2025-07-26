
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Volume2, Play, Check, BookOpen, MessageCircle, Coffee } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  category: 'basic' | 'food' | 'university' | 'shopping' | 'transport';
  difficulty: 1 | 2 | 3;
  completed: boolean;
  phrases: {
    french: string;
    english: string;
    pronunciation: string;
  }[];
}

export const FrenchLearningModule = () => {
  const [currentLesson, setCurrentLesson] = useState<string | null>(null);
  const [completedPhrases, setCompletedPhrases] = useState<Set<string>>(new Set());

  const lessons: Lesson[] = [
    {
      id: 'greetings',
      title: 'Greetings & Basics',
      category: 'basic',
      difficulty: 1,
      completed: false,
      phrases: [
        { french: 'Bonjour', english: 'Hello', pronunciation: 'bon-ZHOOR' },
        { french: 'Au revoir', english: 'Goodbye', pronunciation: 'oh ruh-VWAHR' },
        { french: 'Merci', english: 'Thank you', pronunciation: 'mer-SEE' },
        { french: 'Excusez-moi', english: 'Excuse me', pronunciation: 'ex-kew-zay-MWAH' },
        { french: 'Parlez-vous anglais?', english: 'Do you speak English?', pronunciation: 'par-lay voo ahn-GLEH' }
      ]
    },
    {
      id: 'university',
      title: 'University Life',
      category: 'university',
      difficulty: 2,
      completed: false,
      phrases: [
        { french: 'Je suis étudiant', english: 'I am a student', pronunciation: 'zhuh swee ay-tew-dee-AHN' },
        { french: 'Où est la bibliothèque?', english: 'Where is the library?', pronunciation: 'oo eh lah bee-blee-oh-TEHK' },
        { french: 'Mon cours commence à...', english: 'My class starts at...', pronunciation: 'mohn koor koh-mahnce ah' },
        { french: 'Je ne comprends pas', english: 'I don\'t understand', pronunciation: 'zhuh nuh kohn-prahn pah' }
      ]
    },
    {
      id: 'restaurant',
      title: 'Restaurant & Food',
      category: 'food',
      difficulty: 2,
      completed: false,
      phrases: [
        { french: 'Je voudrais...', english: 'I would like...', pronunciation: 'zhuh voo-DREH' },
        { french: 'L\'addition, s\'il vous plaît', english: 'The bill, please', pronunciation: 'lah-dee-see-OHN seel voo pleh' },
        { french: 'Je suis végétarien', english: 'I am vegetarian', pronunciation: 'zhuh swee vay-zhay-tah-ree-AHN' },
        { french: 'C\'est délicieux!', english: 'It\'s delicious!', pronunciation: 'seh day-lee-see-UH' }
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basic': return <MessageCircle className="h-4 w-4" />;
      case 'university': return <BookOpen className="h-4 w-4" />;
      case 'food': return <Coffee className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'university': return 'bg-purple-100 text-purple-800';
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'shopping': return 'bg-green-100 text-green-800';
      case 'transport': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const playPronunciation = (phrase: string) => {
    // In a real app, use Web Speech API or external service
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'fr-FR';
      speechSynthesis.speak(utterance);
    }
  };

  const markPhraseComplete = (lessonId: string, phraseIndex: number) => {
    const key = `${lessonId}-${phraseIndex}`;
    setCompletedPhrases(prev => new Set([...prev, key]));
  };

  const isPhraseCompleted = (lessonId: string, phraseIndex: number) => {
    return completedPhrases.has(`${lessonId}-${phraseIndex}`);
  };

  const getProgressPercentage = (lesson: Lesson) => {
    const completedCount = lesson.phrases.filter((_, index) => 
      isPhraseCompleted(lesson.id, index)
    ).length;
    return (completedCount / lesson.phrases.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🇫🇷</span>
            Essential French for Students
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Learn essential French phrases for daily life as a student in France. 
            Click on any phrase to hear pronunciation!
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">
                {lessons.filter(l => getProgressPercentage(l) === 100).length}
              </div>
              <div className="text-sm text-muted-foreground">Completed Lessons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{completedPhrases.size}</div>
              <div className="text-sm text-muted-foreground">Phrases Learned</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {lessons.reduce((sum, l) => sum + l.phrases.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Phrases</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lessons */}
      <div className="grid gap-6">
        {lessons.map(lesson => {
          const progressPercent = getProgressPercentage(lesson);
          const isExpanded = currentLesson === lesson.id;
          
          return (
            <Card key={lesson.id}>
              <CardHeader 
                className="cursor-pointer"
                onClick={() => setCurrentLesson(isExpanded ? null : lesson.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(lesson.category)}`}>
                      {getCategoryIcon(lesson.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{lesson.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">Level {lesson.difficulty}</Badge>
                        <Badge variant="outline">{lesson.phrases.length} phrases</Badge>
                        {progressPercent === 100 && (
                          <Badge className="bg-green-100 text-green-800">
                            <Check className="h-3 w-3 mr-1" />
                            Complete
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{Math.round(progressPercent)}%</div>
                    <Progress value={progressPercent} className="w-20 mt-1" />
                  </div>
                </div>
              </CardHeader>
              
              {isExpanded && (
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {lesson.phrases.map((phrase, index) => {
                      const isCompleted = isPhraseCompleted(lesson.id, index);
                      
                      return (
                        <div 
                          key={index} 
                          className={`p-4 rounded-lg border transition-all ${
                            isCompleted ? 'bg-green-50 border-green-200' : 'bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="space-y-1">
                              <div className="font-semibold text-lg">{phrase.french}</div>
                              <div className="text-muted-foreground">{phrase.english}</div>
                              <div className="text-sm text-primary font-mono">
                                [{phrase.pronunciation}]
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => playPronunciation(phrase.french)}
                              >
                                <Volume2 className="h-4 w-4" />
                              </Button>
                              {!isCompleted && (
                                <Button
                                  size="sm"
                                  onClick={() => markPhraseComplete(lesson.id, index)}
                                >
                                  <Check className="h-4 w-4" />
                                </Button>
                              )}
                              {isCompleted && (
                                <Badge variant="default" className="bg-green-500">
                                  <Check className="h-3 w-3 mr-1" />
                                  Learned
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Cultural Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            💡 Cultural Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-900">Greeting Etiquette</h4>
              <p className="text-sm text-blue-700">
                Always say "Bonjour" when entering shops or speaking to service staff. 
                It's considered polite and expected in French culture.
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <h4 className="font-semibold text-green-900">University Interactions</h4>
              <p className="text-sm text-green-700">
                Address professors as "Monsieur" or "Madame" followed by their last name. 
                French academic culture is more formal than many other countries.
              </p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <h4 className="font-semibold text-orange-900">Dining Culture</h4>
              <p className="text-sm text-orange-700">
                In France, lunch is typically between 12-2 PM and dinner after 7 PM. 
                Restaurants may close between meal times.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
