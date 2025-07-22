
import React from 'react';
import { useMobileDetection } from '@/hooks/useMobileDetection';
import { useMobileServices } from '@/hooks/useMobileServices';
import { cn } from '@/lib/utils';

interface MobileWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function MobileWrapper({ children, className }: MobileWrapperProps) {
  const { isMobile, isNative, platform } = useMobileDetection();
  const { isReady } = useMobileServices();

  if (!isReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-3xl font-bold text-white">
            pas<span className="text-cyan-400">S</span>2<span className="text-blue-400">K</span>ampus
          </div>
          <div className="text-white/60">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      'min-h-screen',
      {
        'safe-area-inset': isNative,
        'mobile-optimized': isMobile,
        [`platform-${platform}`]: true
      },
      className
    )}>
      {children}
    </div>
  );
}
