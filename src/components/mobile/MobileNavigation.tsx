
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

interface MobileNavigationProps {
  title: string;
  showBack?: boolean;
  onMenuClick?: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  title,
  showBack = false,
  onMenuClick
}) => {
  const navigate = useNavigate();
  const isNative = Capacitor.isNativePlatform();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={`bg-background border-b border-border p-4 flex items-center gap-4 ${isNative ? 'pt-safe-top' : ''}`}>
      {showBack ? (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className={isNative ? 'active:scale-95 transition-transform' : ''}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="sm"
          onClick={onMenuClick}
          className={isNative ? 'active:scale-95 transition-transform' : ''}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
      
      <h1 className="text-lg font-semibold text-foreground flex-1 text-center">
        {title}
      </h1>
      
      {/* Spacer to center the title */}
      <div className="w-10" />
    </div>
  );
};
