
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Users, MessageSquare, Share2, Heart, Calendar, Video, Edit, Search, Award, Pin, Trash2 } from 'lucide-react';
import { QATab } from '../components/hub/QATab';
import { BlogsTab } from '../components/hub/BlogsTab';
import { ReelsTab } from '../components/hub/ReelsTab';
import { PollsTab } from '../components/hub/PollsTab';
import { EventsCard } from '../components/hub/EventsCard';
import { AchievementsCard } from '../components/hub/AchievementsCard';
import { StatsCard } from '../components/hub/StatsCard';
import { QuickHelpCard } from '../components/hub/QuickHelpCard';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { HubNoticeAlert } from '../components/hub/HubNoticeAlert';
import { HubTripPlanCard } from '../components/hub/HubTripPlanCard';
import { HubSearchFilterBar } from '../components/hub/HubSearchFilterBar';
import { HubTabNav } from '../components/hub/HubTabNav';
import { useHubPosts } from '@/hooks/useHubPosts';
import { useAuth } from '@/hooks/useAuth';

const CATEGORIES = ["All", "Arrival", "Housing", "Travel", "Poll", "General"];

export const HubPage = () => {
  const [activeTab, setActiveTab] = useState('qa');
  const [newPost, setNewPost] = useState('');
  const [newReel, setNewReel] = useState<string | null>(null);
  const [newReelCaption, setNewReelCaption] = useState('');
  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [pollQuestion, setPollQuestion] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const { posts, loading, createPost, updatePost, deletePost, likePost, voteOnPoll } = useHubPosts();
  const { user } = useAuth();

  const upcomingEvents = [
    { id: 1, title: 'Virtual Networking Event', date: 'Dec 15, 2024', time: '7:00 PM CET', attendees: 45 },
    { id: 2, title: 'French Language Exchange', date: 'Dec 18, 2024', time: '6:30 PM CET', attendees: 23 },
    { id: 3, title: 'Live Q&A: Visa Tips', date: 'Dec 20, 2024', time: '5:00 PM CET', attendees: 30 }
  ];

  // Phone number detection regex
  function containsPhoneNumber(text: string): boolean {
    return /(?:\+?\d[\d .-]{7,14})/.test(text);
  }

  function blockIfPhone(content: string): boolean {
    if (containsPhoneNumber(content)) {
      toast("Sharing personal contact info is not allowed.", {
        position: "top-center",
      });
      return true;
    }
    return false;
  }

  const handlePublishPost = async () => {
    if (!newPost.trim()) return;
    if (blockIfPhone(newPost)) return;

    await createPost({
      title: newPost.slice(0, 100),
      content: newPost,
      category: categoryFilter === "All" ? "General" : categoryFilter,
      type: 'qa'
    });

    setNewPost('');
    setActiveTab('qa');
  };

  const handlePublishBlog = async () => {
    if (!blogTitle.trim() || !blogContent.trim()) return;
    if (blockIfPhone(blogContent)) return;

    await createPost({
      title: blogTitle,
      content: blogContent,
      category: 'General',
      type: 'blog'
    });

    setBlogTitle('');
    setBlogContent('');
    setActiveTab('blogs');
  };

  const handlePublishReel = async () => {
    if (!newReel || !newReelCaption.trim()) return;
    if (blockIfPhone(newReelCaption)) return;

    await createPost({
      title: newReelCaption.slice(0, 100),
      content: newReelCaption,
      category: 'Travel',
      type: 'reel',
      media_url: newReel
    });

    setNewReel(null);
    setNewReelCaption('');
    setActiveTab('reels');
  };

  const handlePublishPoll = async () => {
    if (!pollQuestion.trim() || pollOptions.some(opt => !opt.trim())) return;

    await createPost({
      title: pollQuestion,
      content: pollQuestion,
      category: 'Poll',
      type: 'poll',
      poll_options: pollOptions.map(opt => ({ text: opt, votes: 0, voters: [] }))
    });

    setPollQuestion('');
    setPollOptions(['', '']);
    setActiveTab('polls');
  };

  const handleReelUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) setNewReel(URL.createObjectURL(file));
  };

  const addPollOption = () => setPollOptions([...pollOptions, '']);
  const updatePollOption = (index: number, value: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[index] = value;
    setPollOptions(updatedOptions);
  };

  // Filter posts based on type and search/category filters
  const qaPosts = posts.filter(post => {
    if (post.type !== 'qa') return false;
    if (categoryFilter !== "All" && post.category !== categoryFilter) return false;
    if (searchTerm.trim() && !post.content.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const blogs = posts.filter(post => {
    if (post.type !== 'blog') return false;
    if (searchTerm.trim() && 
        !post.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !post.content.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const reels = posts.filter(post => {
    if (post.type !== 'reel') return false;
    if (categoryFilter !== "All" && post.category !== categoryFilter) return false;
    if (searchTerm.trim() && !post.content.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const polls = posts.filter(post => {
    if (post.type !== 'poll') return false;
    if (categoryFilter !== "All" && categoryFilter !== "Poll" && post.category !== categoryFilter) return false;
    if (searchTerm.trim() && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  // Community stats
  const activeMembers = 1247;
  const postsThisWeek = posts.length + 89;
  const questionsAnswered = 156;

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Users className="h-8 w-8 mr-3 text-purple-600" />
            Community Hub
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Please sign in to access the community hub and connect with fellow students.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Users className="h-8 w-8 mr-3 text-purple-600" />
          Community Hub
        </h1>
        <p className="text-lg text-gray-600">
          Connect with fellow students, share experiences, and get support
        </p>
        <HubSearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          categories={CATEGORIES}
        />
        <HubTabNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'qa' && (
            <QATab
              qaPosts={qaPosts}
              newPost={newPost}
              onNewPostChange={setNewPost}
              onPublishPost={handlePublishPost}
              onLike={(postId) => likePost(postId)}
              onEdit={(postId) => {
                console.log('Edit post:', postId);
                // TODO: Implement edit functionality
              }}
              onDelete={(postId) => deletePost(postId)}
            />
          )}
          {activeTab === 'blogs' && (
            <BlogsTab
              blogs={blogs}
              blogTitle={blogTitle}
              blogContent={blogContent}
              onChangeTitle={setBlogTitle}
              onChangeContent={setBlogContent}
              onPublish={handlePublishBlog}
              onLike={(postId) => likePost(postId)}
              onEdit={(postId) => {
                console.log('Edit blog:', postId);
                // TODO: Implement edit functionality
              }}
              onDelete={(postId) => deletePost(postId)}
            />
          )}
          {activeTab === 'reels' && (
            <ReelsTab
              reels={reels}
              newReel={newReel}
              newReelCaption={newReelCaption}
              onReelUpload={handleReelUpload}
              onChangeCaption={setNewReelCaption}
              onPublish={handlePublishReel}
              onLike={(postId) => likePost(postId)}
              onEdit={(postId) => {
                console.log('Edit reel:', postId);
                // TODO: Implement edit functionality
              }}
              onDelete={(postId) => deletePost(postId)}
            />
          )}
          {activeTab === 'polls' && (
            <PollsTab
              polls={polls}
              pollQuestion={pollQuestion}
              pollOptions={pollOptions}
              onChangeQuestion={setPollQuestion}
              onUpdateOption={updatePollOption}
              onAddOption={addPollOption}
              onPublish={handlePublishPoll}
              onVote={voteOnPoll}
              onLike={(postId) => likePost(postId)}
              onEdit={(postId) => {
                console.log('Edit poll:', postId);
                // TODO: Implement edit functionality
              }}
              onDelete={(postId) => deletePost(postId)}
            />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <HubNoticeAlert />
          </div>
          <div>
            <HubTripPlanCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HubPage;
