
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

interface MobileDetection {
  isMobile: boolean;
  isNative: boolean;
  platform: 'web' | 'ios' | 'android';
  orientation: 'portrait' | 'landscape';
}

export const useMobileDetection = (): MobileDetection => {
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const isNative = Capacitor.isNativePlatform();
  const platform = Capacitor.getPlatform() as 'web' | 'ios' | 'android';
  
  // Use the existing mobile detection hook
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if running in Capacitor (native mobile app)
    if (isNative) {
      setIsMobile(true);
      return;
    }

    // Fallback to screen width detection
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isNative]);

  useEffect(() => {
    const checkOrientation = () => {
      if (window.innerHeight > window.innerWidth) {
        setOrientation('portrait');
      } else {
        setOrientation('landscape');
      }
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  return {
    isMobile,
    isNative,
    platform,
    orientation
  };
};
