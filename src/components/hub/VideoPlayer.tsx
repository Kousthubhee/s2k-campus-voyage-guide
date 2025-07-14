
import React from 'react';
import { Card } from '@/components/ui/card';

interface VideoPlayerProps {
  src?: string;
  className?: string;
  controls?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  src, 
  className = "w-full max-w-md rounded-lg", 
  controls = true 
}) => {
  if (!src) {
    return (
      <Card className={`${className} flex items-center justify-center h-48 bg-gray-100`}>
        <p className="text-gray-500">No video available</p>
      </Card>
    );
  }

  // Handle both blob URLs and Supabase URLs
  const videoSrc = src.startsWith('blob:') || src.startsWith('http') ? src : src;
  
  if (!videoSrc) {
    return (
      <Card className={`${className} flex items-center justify-center h-48 bg-gray-100`}>
        <p className="text-gray-500">Invalid video URL</p>
      </Card>
    );
  }

  return (
    <div className={className}>
      <video
        src={videoSrc}
        controls={controls}
        className="w-full h-auto rounded-lg"
        preload="metadata"
        onError={(e) => {
          console.error('Video failed to load:', e);
          console.error('Video src:', videoSrc);
        }}
        onLoadStart={() => {
          console.log('Video loading started:', videoSrc);
        }}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
