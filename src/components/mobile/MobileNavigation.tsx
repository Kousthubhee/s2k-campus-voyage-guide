
import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, User, Bell, Settings, Menu } from 'lucide-react';
import { useMobileServices } from '@/hooks/useMobileServices';
import { cn } from '@/lib/utils';

interface MobileNavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function MobileNavigation({ currentPage, onNavigate }: MobileNavigationProps) {
  const { triggerHaptic } = useMobileServices();

  const handleNavigation = async (page: string) => {
    await triggerHaptic();
    onNavigate(page);
  };

  const navItems = [
    { key: 'home', icon: Home, label: 'Home' },
    { key: 'profile', icon: User, label: 'Profile' },
    { key: 'notifications', icon: Bell, label: 'Alerts' },
    { key: 'hub', icon: Menu, label: 'Hub' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-card border-t border-gray-200 dark:border-border md:hidden z-50 safe-area-bottom">
      <div className="flex justify-around items-center py-2 px-4">
        {navItems.map(({ key, icon: Icon, label }) => (
          <Button
            key={key}
            variant="ghost"
            size="sm"
            className={cn(
              'flex flex-col items-center gap-1 h-auto py-2 px-3 min-w-0',
              currentPage === key && 'text-primary bg-primary/10'
            )}
            onClick={() => handleNavigation(key)}
          >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
