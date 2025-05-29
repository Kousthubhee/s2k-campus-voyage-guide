
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopNavProps {
  onPageChange: (page: string) => void;
}

export function TopNav({ onPageChange }: TopNavProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-end items-center gap-3">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange('notifications')}
        className="text-gray-600 hover:text-gray-800"
      >
        <Bell size={20} />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onPageChange('profile')}
        className="text-gray-600 hover:text-gray-800"
      >
        <User size={20} />
      </Button>
    </div>
  );
}
