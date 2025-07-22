
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<'web' | 'ios' | 'android'>('web');

  useEffect(() => {
    const checkPlatform = () => {
      const isNativeApp = Capacitor.isNativePlatform();
      const currentPlatform = Capacitor.getPlatform();
      const isMobileDevice = window.innerWidth < 768 || isNativeApp;

      setIsNative(isNativeApp);
      setIsMobile(isMobileDevice);
      setPlatform(currentPlatform as 'web' | 'ios' | 'android');
    };

    checkPlatform();
    window.addEventListener('resize', checkPlatform);
    
    return () => window.removeEventListener('resize', checkPlatform);
  }, []);

  return { isMobile, isNative, platform };
}
