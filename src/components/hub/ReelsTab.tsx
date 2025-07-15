
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Video, Edit, Trash2 } from 'lucide-react';
import { HubPost } from '@/hooks/useHubPosts';
import { CommentSection } from './CommentSection';
import { useAuth } from '@/hooks/useAuth';

interface ReelsTabProps {
  reels: HubPost[];
  newReel: string | null;
  newReelCaption: string;
  onReelUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCaption: (value: string) => void;
  onPublish: () => void;
  onLike: (postId: string) => void;
  onEdit: (postId: string) => void;
  onDelete: (postId: string) => void;
}

export const ReelsTab: React.FC<ReelsTabProps> = ({
  reels,
  newReel,
  newReelCaption,
  onReelUpload,
  onChangeCaption,
  onPublish,
  onLike,
  onEdit,
  onDelete
}) => {
  const { user } = useAuth();

  return (
    <>
      {/* Create New Reel */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-5 w-5" />
            Share a Video Reel
          </CardTitle>
        </CardHeader>
        <CardContent>
          <input
            type="file"
            accept="video/*"
            onChange={onReelUpload}
            className="mb-4"
          />
          {newReel && (
            <video
              src={newReel}
              controls
              className="w-full max-w-md mb-4 rounded-lg bg-gray-100"
              style={{ maxHeight: '400px' }}
              preload="metadata"
            />
          )}
          <Input
            placeholder="Add a caption..."
            value={newReelCaption}
            onChange={(e) => onChangeCaption(e.target.value)}
            className="mb-4"
          />
          <Button onClick={onPublish} disabled={!newReel || !newReelCaption.trim()}>
            Share Reel
          </Button>
        </CardContent>
      </Card>

      {/* Reels Feed */}
      {reels.map((reel) => (
        <Card key={reel.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-lg font-medium text-purple-600">
                  {reel.user_profile?.display_name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <div className="font-semibold">{reel.user_profile?.display_name || 'Anonymous'}</div>
                  <div className="text-sm text-gray-500">{new Date(reel.created_at).toLocaleDateString()}</div>
                </div>
              </div>
              {user?.id === reel.user_id && (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(reel.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(reel.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            
            <div className="mb-4">
              {reel.media_url ? (
                <video
                  key={reel.media_url}
                  controls
                  className="w-full max-w-md rounded-lg"
                  style={{ maxHeight: '400px', backgroundColor: '#f3f4f6' }}
                  playsInline
                  preload="metadata"
                  onError={(e) => {
                    console.error('Video failed to load:', reel.media_url, e);
                  }}
                  onLoadStart={() => {
                    console.log('Video loading started:', reel.media_url);
                  }}
                  onCanPlay={() => {
                    console.log('Video can play:', reel.media_url);
                  }}
                >
                  <source src={reel.media_url} type="video/mp4" />
                  <source src={reel.media_url} type="video/webm" />
                  <source src={reel.media_url} type="video/ogg" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full max-w-md h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Video not available</span>
                </div>
              )}
            </div>
            
            <p className="mb-4">{reel.content}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(reel.id)}
                className="flex items-center gap-2"
              >
                <Heart className="h-4 w-4" />
                {reel.likes_count}
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {reel.comments_count}
              </Button>
            </div>

            {/* Comments Section */}
            <CommentSection postId={reel.id} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
