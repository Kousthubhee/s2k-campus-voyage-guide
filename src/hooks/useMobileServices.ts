
import { useState, useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

export function useMobileServices() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initMobileServices = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          // Configure status bar
          await StatusBar.setStyle({ style: Style.Dark });
          await StatusBar.setBackgroundColor({ color: '#1e293b' });
          
          // Hide splash screen after app is ready
          setTimeout(async () => {
            await SplashScreen.hide();
          }, 1000);
          
          setIsReady(true);
        } catch (error) {
          console.error('Error initializing mobile services:', error);
          setIsReady(true);
        }
      } else {
        setIsReady(true);
      }
    };

    initMobileServices();
  }, []);

  const triggerHaptic = async (style: ImpactStyle = ImpactStyle.Medium) => {
    if (Capacitor.isNativePlatform()) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.error('Haptic feedback error:', error);
      }
    }
  };

  const takePicture = async () => {
    if (!Capacitor.isNativePlatform()) return null;
    
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      
      return image.dataUrl;
    } catch (error) {
      console.error('Camera error:', error);
      return null;
    }
  };

  return {
    isReady,
    triggerHaptic,
    takePicture,
    isNative: Capacitor.isNativePlatform(),
    platform: Capacitor.getPlatform()
  };
}
