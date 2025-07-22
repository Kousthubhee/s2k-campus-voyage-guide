
import { useCallback } from 'react';
import { Capacitor } from '@capacitor/core';

interface MobileServices {
  hapticFeedback: (type?: 'light' | 'medium' | 'heavy') => Promise<void>;
  statusBarStyle: (style: 'dark' | 'light') => Promise<void>;
  shareContent: (content: { title: string; text: string; url?: string }) => Promise<void>;
  showToast: (message: string) => Promise<void>;
}

export const useMobileServices = (): MobileServices => {
  const hapticFeedback = useCallback(async (type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      // Note: This would require the Haptics plugin to be installed
      // For now, we'll just log the action
      console.log(`Haptic feedback: ${type}`);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }, []);

  const statusBarStyle = useCallback(async (style: 'dark' | 'light') => {
    if (!Capacitor.isNativePlatform()) return;
    
    try {
      // Note: This would require the Status Bar plugin to be installed
      console.log(`Status bar style: ${style}`);
    } catch (error) {
      console.warn('Status bar control not available:', error);
    }
  }, []);

  const shareContent = useCallback(async (content: { title: string; text: string; url?: string }) => {
    if (!Capacitor.isNativePlatform()) {
      // Fallback to Web Share API
      if (navigator.share) {
        try {
          await navigator.share(content);
        } catch (error) {
          console.warn('Web share failed:', error);
        }
      }
      return;
    }
    
    try {
      // Note: This would require the Share plugin to be installed
      console.log('Share content:', content);
    } catch (error) {
      console.warn('Native share not available:', error);
    }
  }, []);

  const showToast = useCallback(async (message: string) => {
    if (!Capacitor.isNativePlatform()) {
      // Fallback to console or could use a web toast library
      console.log('Toast:', message);
      return;
    }
    
    try {
      // Note: This would require the Toast plugin to be installed
      console.log('Native toast:', message);
    } catch (error) {
      console.warn('Native toast not available:', error);
    }
  }, []);

  return {
    hapticFeedback,
    statusBarStyle,
    shareContent,
    showToast
  };
};
