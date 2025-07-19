
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Video, Edit, Trash2, Upload } from 'lucide-react';
import { HubPost } from '@/hooks/useHubPosts';
import { CommentSection } from './CommentSection';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

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

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      toast.error('Please sign in to upload videos');
      return;
    }

    try {
      console.log('Uploading video file:', file.name, file.size);
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload to the new hub-media bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hub-media')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast.error('Failed to upload video: ' + uploadError.message);
        return;
      }

      console.log('Upload successful:', uploadData);

      // Get the public URL since hub-media bucket is public
      const { data: urlData } = supabase.storage
        .from('hub-media')
        .getPublicUrl(fileName);

      console.log('Public URL:', urlData.publicUrl);
      
      // Create a synthetic event to pass the URL back
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          files: [Object.assign(file, { uploadedUrl: urlData.publicUrl })]
        }
      };
      
      // Call the parent handler
      onReelUpload(syntheticEvent as any);
      
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
    }
  };

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
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                className="hidden"
                id="video-upload"
              />
              <label
                htmlFor="video-upload"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
              >
                <Upload className="h-4 w-4" />
                Upload Video
              </label>
            </div>
            
            {newReel && (
              <div className="w-full max-w-md">
                <video
                  src={newReel}
                  controls
                  className="w-full rounded-lg bg-gray-900"
                  style={{ maxHeight: '400px' }}
                  preload="metadata"
                  playsInline
                  onError={(e) => {
                    console.error('Video failed to load:', newReel, e);
                  }}
                  onLoadStart={() => {
                    console.log('Video loading started:', newReel);
                  }}
                  onCanPlay={() => {
                    console.log('Video can play:', newReel);
                  }}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            
            <Input
              placeholder="Add a caption..."
              value={newReelCaption}
              onChange={(e) => onChangeCaption(e.target.value)}
            />
            
            <Button 
              onClick={onPublish} 
              disabled={!newReel || !newReelCaption.trim()}
              className="w-full"
            >
              Share Reel
            </Button>
          </div>
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
                <div className="w-full max-w-md">
                  <video
                    key={reel.media_url}
                    controls
                    className="w-full rounded-lg bg-gray-900"
                    style={{ maxHeight: '400px' }}
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
                </div>
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

            <CommentSection postId={reel.id} />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
