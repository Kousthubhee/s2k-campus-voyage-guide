
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Capacitor } from '@capacitor/core';

interface MobileWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const MobileWrapper: React.FC<MobileWrapperProps> = ({ 
  children, 
  fallback 
}) => {
  const isMobile = useIsMobile();
  const isNative = Capacitor.isNativePlatform();

  if (isMobile || isNative) {
    return <>{children}</>;
  }

  return <>{fallback || null}</>;
};
