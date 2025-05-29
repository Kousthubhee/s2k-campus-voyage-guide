
import { useState } from 'react';
import { Play, Pause, Volume2, Book, Award, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  level: string;
  duration: string;
  category: string;
  completed: boolean;
  locked: boolean;
}

const lessons: Lesson[] = [
  { id: '1', title: 'Basic Greetings', level: 'Beginner', duration: '10 min', category: 'Conversation', completed: true, locked: false },
  { id: '2', title: 'Introducing Yourself', level: 'Beginner', duration: '15 min', category: 'Conversation', completed: true, locked: false },
  { id: '3', title: 'Numbers 1-20', level: 'Beginner', duration: '12 min', category: 'Vocabulary', completed: false, locked: false },
  { id: '4', title: 'Days of the Week', level: 'Beginner', duration: '8 min', category: 'Vocabulary', completed: false, locked: false },
  { id: '5', title: 'Asking for Directions', level: 'Intermediate', duration: '20 min', category: 'Conversation', completed: false, locked: true },
  { id: '6', title: 'At the Restaurant', level: 'Intermediate', duration: '18 min', category: 'Conversation', completed: false, locked: true },
];

const phrases = [
  { french: 'Bonjour', english: 'Hello/Good morning', audio: true },
  { french: 'Comment allez-vous?', english: 'How are you? (formal)', audio: true },
  { french: 'Je ne parle pas français', english: "I don't speak French", audio: true },
  { french: 'Parlez-vous anglais?', english: 'Do you speak English?', audio: true },
  { french: 'Où est la gare?', english: 'Where is the train station?', audio: true },
  { french: 'Combien ça coûte?', english: 'How much does it cost?', audio: true },
];

export function LanguagePage() {
  const [activeTab, setActiveTab] = useState<'lessons' | 'phrases' | 'progress'>('lessons');
  const [playingPhrase, setPlayingPhrase] = useState<string | null>(null);

  const completedLessons = lessons.filter(l => l.completed).length;
  const progressPercentage = (completedLessons / lessons.length) * 100;

  const playPronunciation = (french: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(french);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.8;
      
      setPlayingPhrase(french);
      utterance.onend = () => setPlayingPhrase(null);
      
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Learn French</h1>
        <p className="text-gray-600">Master basic French for your student life in France</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Your Progress</h2>
          <div className="flex items-center gap-2">
            <Award className="text-yellow-500" size={20} />
            <span className="text-sm font-medium text-gray-700">{completedLessons} lessons completed</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-white rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-lg font-bold text-gray-800">{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-2">
          {[
            { id: 'lessons', label: 'Lessons', icon: Book },
            { id: 'phrases', label: 'Essential Phrases', icon: Volume2 },
            { id: 'progress', label: 'Progress', icon: Award }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'lessons' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`bg-white rounded-xl border p-6 transition-all duration-200 ${
                lesson.locked
                  ? 'border-gray-200 opacity-50'
                  : lesson.completed
                  ? 'border-green-200 bg-green-50'
                  : 'border-blue-200 hover:shadow-lg cursor-pointer hover:scale-105'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`font-bold mb-1 ${lesson.completed ? 'text-green-800' : 'text-gray-800'}`}>
                    {lesson.title}
                  </h3>
                  <div className="flex gap-2 mb-2">
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                      {lesson.level}
                    </span>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                      {lesson.category}
                    </span>
                  </div>
                </div>
                {lesson.completed && (
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock size={14} />
                {lesson.duration}
              </div>

              {lesson.locked ? (
                <div className="text-center py-4">
                  <div className="text-gray-400 mb-2">🔒</div>
                  <p className="text-sm text-gray-500">Complete previous lessons to unlock</p>
                </div>
              ) : (
                <button
                  className={`w-full py-2 rounded-lg font-medium transition-colors ${
                    lesson.completed
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {lesson.completed ? 'Review' : 'Start Lesson'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'phrases' && (
        <div className="space-y-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Essential French Phrases</h2>
            <p className="text-gray-600">Click the speaker icon to hear pronunciation</p>
          </div>
          
          {phrases.map((phrase, index) => (
            <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-lg font-semibold text-gray-800 mb-1">{phrase.french}</div>
                  <div className="text-gray-600">{phrase.english}</div>
                </div>
                <button
                  onClick={() => playPronunciation(phrase.french)}
                  className={`ml-4 p-3 rounded-full transition-colors ${
                    playingPhrase === phrase.french
                      ? 'bg-green-500 text-white'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                >
                  {playingPhrase === phrase.french ? <Pause size={20} /> : <Play size={20} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Learning Statistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{completedLessons}</div>
                <div className="text-gray-600">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{phrases.length}</div>
                <div className="text-gray-600">Phrases Learned</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {Math.round(completedLessons * 15)}
                </div>
                <div className="text-gray-600">Minutes Practiced</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'First Steps', description: 'Complete your first lesson', earned: completedLessons >= 1 },
                { title: 'Conversation Starter', description: 'Complete 3 conversation lessons', earned: completedLessons >= 3 },
                { title: 'Vocabulary Builder', description: 'Learn 20 new words', earned: false },
                { title: 'Pronunciation Pro', description: 'Practice 50 phrases', earned: false },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`text-2xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                      🏆
                    </div>
                    <div>
                      <h4 className={`font-semibold ${achievement.earned ? 'text-yellow-800' : 'text-gray-500'}`}>
                        {achievement.title}
                      </h4>
                      <p className={`text-sm ${achievement.earned ? 'text-yellow-700' : 'text-gray-400'}`}>
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
