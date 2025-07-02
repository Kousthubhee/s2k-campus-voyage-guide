
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReelsTab } from './hub/ReelsTab';
import { BlogsTab } from './hub/BlogsTab';
import { PollsTab } from './hub/PollsTab';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  MapPin,
  Star,
  Award,
  Heart,
  Share2,
  BookOpen,
  Video,
  BarChart3
} from 'lucide-react';

export const HubPage = () => {
  const [activeTab, setActiveTab] = useState('reels');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Hub</h1>
              <p className="text-gray-600">Connect, share, and learn with fellow international students</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>2,847 active members</span>
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="reels" className="flex items-center space-x-2">
                  <Video className="h-4 w-4" />
                  <span>Reels</span>
                </TabsTrigger>
                <TabsTrigger value="blogs" className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Blogs</span>
                </TabsTrigger>
                <TabsTrigger value="polls" className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Polls</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reels" className="mt-6">
                <ReelsTab />
              </TabsContent>

              <TabsContent value="blogs" className="mt-6">
                <BlogsTab />
              </TabsContent>

              <TabsContent value="polls" className="mt-6">
                <PollsTab />
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Community Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Members</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Today</span>
                  <span className="font-semibold">456</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Posts This Week</span>
                  <span className="font-semibold">128</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Success Stories</span>
                  <span className="font-semibold">89</span>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Trending Topics</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">#VisaRenewal</Badge>
                  <span className="text-xs text-gray-500">124 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">#StudentLife</Badge>
                  <span className="text-xs text-gray-500">98 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">#Accommodation</Badge>
                  <span className="text-xs text-gray-500">76 posts</span>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">#JobSearch</Badge>
                  <span className="text-xs text-gray-500">45 posts</span>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Upcoming Events</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-sm">Student Meetup Paris</h4>
                  <p className="text-xs text-gray-500">Dec 15, 2024 • 6:00 PM</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Latin Quarter</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-sm">French Language Exchange</h4>
                  <p className="text-xs text-gray-500">Dec 18, 2024 • 7:30 PM</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="h-3 w-3 text-gray-400" />
                    <span className="text-xs text-gray-500">Online</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Award className="h-5 w-5" />
                  <span>Top Contributors</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-blue-600">AM</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Alex Martin</p>
                    <p className="text-xs text-gray-500">127 helpful posts</p>
                  </div>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-green-600">SL</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Sofia Lopez</p>
                    <p className="text-xs text-gray-500">89 helpful posts</p>
                  </div>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-purple-600">RK</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Raj Kumar</p>
                    <p className="text-xs text-gray-500">76 helpful posts</p>
                  </div>
                  <Star className="h-4 w-4 text-yellow-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
