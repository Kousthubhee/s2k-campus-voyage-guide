
import { useState } from 'react';
import { 
  School, 
  CheckSquare, 
  Users, 
  Book, 
  ChevronRight,
  Languages,
  Bell,
  User,
  Phone
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  userKeys: number;
}

const menuItems = [
  { id: 'checklist', label: 'Checklist', icon: CheckSquare },
  { id: 'qa', label: 'Ask Me Anything', icon: School },
  { id: 'hub', label: 'Community Hub', icon: Users },
  { id: 'news', label: 'Stay Updated', icon: Book },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'contact', label: 'Contact Us', icon: Phone },
  { id: 'affiliation', label: 'Our Partners', icon: ChevronRight },
  { id: 'language', label: 'Learn French', icon: Book },
  { id: 'translate', label: 'Translate', icon: Languages },
];

export function Sidebar({ currentPage, onPageChange, userKeys }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">
          pas<span className="text-blue-500">S2</span><span className="text-green-500">K</span>ampus
        </h1>
        <p className="text-sm text-gray-600 mt-1">Your guide to French education</p>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onPageChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    currentPage === item.id
                      ? "bg-blue-50 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Keys Counter */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-800">Keys Available</span>
            <span className="text-lg font-bold text-yellow-600">{userKeys}</span>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="p-4">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Need Help?</h3>
          <p className="text-xs text-gray-600 mb-3">
            Reach out to our support team for assistance
          </p>
        </div>
      </div>
    </div>
  );
}
