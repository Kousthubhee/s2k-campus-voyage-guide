
import { useState } from 'react';
import { Calendar, ExternalLink, Filter } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: string;
  readTime: string;
  link?: string;
  featured: boolean;
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'New Student Visa Requirements for 2024',
    summary: 'Campus France announces updated requirements for student visa applications, including new financial thresholds and documentation.',
    date: 'March 15, 2024',
    category: 'Visa Updates',
    readTime: '3 min read',
    featured: true,
    link: 'https://campusfrance.org'
  },
  {
    id: '2',
    title: 'CAF Housing Aid Increases by 5%',
    summary: 'The French government announces an increase in student housing assistance rates effective April 2024.',
    date: 'March 12, 2024',
    category: 'Housing',
    readTime: '2 min read',
    featured: true
  },
  {
    id: '3',
    title: 'New Business School Rankings Released',
    summary: 'Financial Times releases 2024 European Business School rankings with several French schools in top positions.',
    date: 'March 10, 2024',
    category: 'Education',
    readTime: '4 min read',
    featured: false
  },
  {
    id: '4',
    title: 'Student Work Permit Hours Extended',
    summary: 'Non-EU students can now work up to 24 hours per week during their studies, up from the previous 20-hour limit.',
    date: 'March 8, 2024',
    category: 'Work Rights',
    readTime: '2 min read',
    featured: false
  },
  {
    id: '5',
    title: 'Free French Language Courses for International Students',
    summary: 'Universities across France announce new initiatives offering free French language courses to international students.',
    date: 'March 5, 2024',
    category: 'Language',
    readTime: '3 min read',
    featured: false
  }
];

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  const categories = ['All', 'Visa Updates', 'Housing', 'Education', 'Work Rights', 'Language'];
  
  const filteredNews = selectedCategory === 'All' 
    ? newsItems 
    : newsItems.filter(item => item.category === selectedCategory);

  const featuredNews = newsItems.filter(item => item.featured);
  const regularNews = filteredNews.filter(item => !item.featured);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Stay Updated</h1>
        <p className="text-gray-600">Latest news and updates for international students in France</p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Filter size={20} className="text-gray-500" />
          <span className="font-medium text-gray-700">Filter by category:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Featured News */}
      {selectedCategory === 'All' && featuredNews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured News</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredNews.map((item) => (
              <div key={item.id} className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start justify-between mb-4">
                  <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">{item.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{item.summary}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar size={16} />
                    {item.date}
                  </div>
                  {item.link && (
                    <a 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Read More <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Regular News */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {selectedCategory === 'All' ? 'Latest Updates' : `${selectedCategory} News`}
        </h2>
        <div className="space-y-6">
          {regularNews.map((item) => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                  {item.category}
                </span>
                <span className="text-sm text-gray-500">{item.readTime}</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed">{item.summary}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar size={16} />
                  {item.date}
                </div>
                {item.link && (
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    Read More <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Stay in the Loop</h2>
        <p className="text-gray-600 mb-6">Get the latest updates delivered directly to your inbox</p>
        <div className="max-w-md mx-auto flex gap-2">
          <input 
            type="email" 
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
