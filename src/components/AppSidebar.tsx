import { 
  CheckSquare, 
  MessageSquare, 
  Users, 
  BookOpen, 
  Building2, 
  Languages, 
  Phone,
  FileText,
  User
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface AppSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userName?: string | null;
  userAvatarUrl?: string | null;
}

export const AppSidebar = ({
  currentPage,
  setCurrentPage,
  userName,
  userAvatarUrl,
}: AppSidebarProps) => {
  // Cleaned logic: "Hello, Stranger!" if no name, else Hello, [Name]!
  const cleanedName = typeof userName === "string" && userName.trim() !== "" ? userName : null;
  const avatarUrl = userAvatarUrl ?? "";

  // Subtle color classes for inactive icons (pale accents)
  const iconInactiveBgClass = "bg-blue-50"; // very light blue background
  const iconInactiveTextClass = "text-blue-400"; // soft, not gray

  // Set active to cyan for clearer feedback
  const iconActiveBgClass = "bg-cyan-100";       // cyan background
  const iconActiveTextClass = "text-cyan-600";   // deep cyan

  const menuItems = [
    { id: 'checklist', icon: CheckSquare, label: 'Checklist', tooltip: 'Your onboarding checklist' },
    { id: 'documents', icon: FileText, label: 'Documents & Renewals', tooltip: 'Manage paperwork and renewal timelines' },
    { id: 'qa', icon: MessageSquare, label: 'Ask Me Anything', tooltip: 'Chat with our AI or browse FAQs' },
    { id: 'hub', icon: Users, label: 'Community Hub', tooltip: 'Connect with fellow students' },
    { id: 'news', icon: BookOpen, label: 'Stay Updated', tooltip: 'Latest campus and city news' },
    { id: 'affiliation', icon: Building2, label: 'Our Partners', tooltip: 'See our affiliations' },
    { id: 'language', icon: Languages, label: 'Learn French', tooltip: 'Practice French language skills' },
    { id: 'translate', icon: Languages, label: 'Translate', tooltip: 'Translate documents or conversations' },
    { id: 'contact', icon: Phone, label: 'Contact Us', tooltip: 'Reach support or ask for help' },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="p-4 pb-2 border-b border-blue-100">
          <div
            className="text-xl cursor-pointer hover:scale-105 transition-transform font-bold"
            onClick={() => setCurrentPage('checklist')}
          >
            pas<span className="text-cyan-600 font-bold">S</span>2<span className="text-blue-600 font-bold">K</span>ampus
          </div>
          <div className="text-xs text-gray-600 mt-1 font-normal">
            Your guide to French education
          </div>
        </div>
        <div className="flex items-center mb-3 px-4 mt-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-400 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-semibold text-xl border">
              {cleanedName ? cleanedName[0].toUpperCase() : 'S'}
            </div>
          )}
          <div className="ml-4">
            <div className="leading-6 text-base font-normal text-gray-900">
              <span className="font-bold">
                Hello{cleanedName ? "," : ", Stranger!"}
              </span>
              {cleanedName && (
                <span className="font-bold"> {cleanedName}!</span>
              )}
              {!cleanedName && null}
            </div>
            <div className="text-xs text-gray-500 font-normal">Welcome!</div>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => setCurrentPage(item.id)}
                      className={`w-full group transition-all px-3 py-2 rounded-lg hover:bg-blue-50 hover:shadow-md hover:scale-[1.03] text-[15px] font-normal ${
                        isActive
                          ? 'bg-blue-100 text-blue-700 shadow'
                          : 'text-gray-700'
                      }`}
                      tooltip={item.tooltip}
                    >
                      <span
                        className={`
                          rounded-full p-2 flex items-center justify-center mr-3 transition-all
                          ${isActive
                            ? `${iconActiveBgClass} ${iconActiveTextClass} scale-110 shadow`
                            : `${iconInactiveBgClass} ${iconInactiveTextClass}`
                          }
                        `}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className={isActive ? "font-bold" : "font-normal"}>
                        {item.label}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="bg-blue-50 p-3 rounded-lg mt-4">
          <div className="text-sm text-blue-900 mb-1 font-normal">Need Help?</div>
          <div className="text-xs text-blue-700 mb-2 font-normal">
            Reach out to our support team for assistance
          </div>
          <Button 
            size="sm" 
            className="w-full bg-blue-600 hover:bg-blue-700 shadow"
            onClick={() => setCurrentPage('contact')}
          >
            Contact Support
          </Button>
        </div>
      </SidebarFooter>
      {/* ...keep existing custom animation styles */}
      <style>
        {`
          @keyframes sidebarActive {
            0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.2);}
            100% { box-shadow: 0 4px 24px 2px rgba(59,130,246,0.11);}
          }
          .animate-sidebar-active {
            animation: sidebarActive 0.4s;
          }
        `}
      </style>
    </Sidebar>
  );
};
