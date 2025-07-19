
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, MessageSquare, Video, Edit, Trash2, Upload } from 'lucide-react';
import { HubPost } from '@/hooks/useHubPosts';
import { CommentSection } from './CommentSection';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';

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
  const [removeSound, setRemoveSound] = useState(false);
  const [processingVideo, setProcessingVideo] = useState(false);

  const processVideoWithoutSound = async (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      video.onloadedmetadata = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Create a MediaStream from canvas (this naturally excludes audio)
        const stream = canvas.captureStream(25); // Reduced FPS for better performance
        
        // Ensure the stream has no audio tracks
        const audioTracks = stream.getAudioTracks();
        audioTracks.forEach(track => {
          stream.removeTrack(track);
          track.stop();
        });
        
        // Use MediaRecorder to record the silent video
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp8'
        });
        
        const chunks: BlobPart[] = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            chunks.push(event.data);
          }
        };
        
        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          const processedFile = new File([blob], file.name.replace(/\.[^/.]+$/, '_no_sound.webm'), {
            type: 'video/webm'
          });
          resolve(processedFile);
        };
        
        let currentTime = 0;
        const fps = 25;
        const frameInterval = 1 / fps;
        const duration = video.duration;
        
        const drawFrame = () => {
          if (currentTime < duration) {
            video.currentTime = currentTime;
            ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
            currentTime += frameInterval;
            setTimeout(drawFrame, 1000 / fps);
          } else {
            mediaRecorder.stop();
          }
        };
        
        mediaRecorder.start();
        drawFrame();
      };
      
      video.onerror = () => reject(new Error('Failed to process video'));
      video.muted = true; // Ensure video is muted during processing
      video.src = URL.createObjectURL(file);
      video.load();
    });
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!user) {
      toast.error('Please sign in to upload videos');
      return;
    }

    try {
      setProcessingVideo(true);
      console.log('Uploading video file:', file.name, file.size);
      
      let fileToUpload = file;
      
      // Process video to remove sound if requested
      if (removeSound) {
        toast.info('Processing video to remove sound...');
        try {
          fileToUpload = await processVideoWithoutSound(file);
          console.log('Video processed successfully, sound removed');
        } catch (error) {
          console.error('Error processing video:', error);
          toast.error('Failed to process video. Please try again.');
          setProcessingVideo(false);
          return;
        }
      }
      
      // Create a unique filename
      const fileExt = fileToUpload.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      // Upload to the hub-media bucket
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('hub-media')
        .upload(fileName, fileToUpload, {
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
          files: [Object.assign(fileToUpload, { uploadedUrl: urlData.publicUrl })]
        }
      };
      
      // Call the parent handler
      onReelUpload(syntheticEvent as any);
      
      toast.success('Video uploaded successfully!');
      
    } catch (error) {
      console.error('Error uploading video:', error);
      toast.error('Failed to upload video');
    } finally {
      setProcessingVideo(false);
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
                disabled={processingVideo}
              />
              <label
                htmlFor="video-upload"
                className={`flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors ${processingVideo ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Upload className="h-4 w-4" />
                {processingVideo ? 'Processing...' : 'Upload Video'}
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remove-sound" 
                checked={removeSound}
                onCheckedChange={(checked) => setRemoveSound(checked as boolean)}
                disabled={processingVideo}
              />
              <label htmlFor="remove-sound" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Remove sound from video
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
                  muted={removeSound}
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
              disabled={processingVideo}
            />
            
            <Button 
              onClick={onPublish} 
              disabled={!newReel || !newReelCaption.trim() || processingVideo}
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
