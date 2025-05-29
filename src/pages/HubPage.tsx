
import { useState } from 'react';
import { Users, MessageCircle, Share2, Heart, Clock } from 'lucide-react';

interface Post {
  id: string;
  author: string;
  avatar: string;
  title: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  category: string;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Sarah M.',
    avatar: '👩‍🎓',
    title: 'Just arrived in Lyon! Any tips for the first week?',
    content: 'Hey everyone! I just arrived in Lyon for my MBA at emlyon. Looking for advice on the best places to shop for essentials and maybe some friendly faces to grab coffee with!',
    timestamp: '2 hours ago',
    likes: 12,
    comments: 8,
    category: 'Arrival'
  },
  {
    id: '2',
    author: 'Ahmed K.',
    avatar: '👨‍💼',
    title: 'CAF application approved! Here\'s what helped me',
    content: 'Finally got my CAF housing aid approved after 2 months. Key tips: have all documents translated, follow up regularly, and be patient. Happy to help others with questions!',
    timestamp: '5 hours ago',
    likes: 24,
    comments: 15,
    category: 'Housing'
  },
  {
    id: '3',
    author: 'Priya S.',
    avatar: '👩‍🔬',
    title: 'Best student discounts in Paris?',
    content: 'Studying at Sciences Po and looking to save money. What are the best student discounts for transport, food, and entertainment in Paris?',
    timestamp: '1 day ago',
    likes: 18,
    comments: 22,
    category: 'Money'
  },
  {
    id: '4',
    author: 'Luis R.',
    avatar: '👨‍🎓',
    title: 'French bank account success story',
    content: 'Opened my account at BNP Paribas yesterday. Took my passport, student card, and housing proof. Process was smooth, got my card in 5 days. Ask me anything!',
    timestamp: '2 days ago',
    likes: 31,
    comments: 12,
    category: 'Banking'
  }
];

export function HubPage() {
  const [posts] = useState<Post[]>(samplePosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Arrival', 'Housing', 'Banking', 'Money', 'Social'];

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Hub</h1>
        <p className="text-gray-600">Connect with fellow students and share your experiences</p>
      </div>

      {/* Categories */}
      <div className="mb-6">
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

      {/* New Post Button */}
      <div className="mb-6">
        <button className="w-full bg-green-50 border-2 border-dashed border-green-300 rounded-lg p-4 text-green-700 hover:bg-green-100 transition-colors">
          <div className="flex items-center justify-center gap-2">
            <Share2 size={20} />
            <span className="font-medium">Share your experience with the community</span>
          </div>
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
            {/* Post Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{post.avatar}</div>
                <div>
                  <h3 className="font-semibold text-gray-800">{post.author}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock size={14} />
                    {post.timestamp}
                  </div>
                </div>
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Post Content */}
            <div className="mb-4">
              <h4 className="font-semibold text-gray-800 mb-2">{post.title}</h4>
              <p className="text-gray-600 leading-relaxed">{post.content}</p>
            </div>

            {/* Post Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors">
                <Heart size={16} />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                <MessageCircle size={16} />
                <span className="text-sm">{post.comments} comments</span>
              </button>
              <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors ml-auto">
                <Share2 size={16} />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Community Stats */}
      <div className="mt-12 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Community Stats</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">89</div>
            <div className="text-sm text-gray-600">Posts This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">324</div>
            <div className="text-sm text-gray-600">Questions Answered</div>
          </div>
        </div>
      </div>
    </div>
  );
}
