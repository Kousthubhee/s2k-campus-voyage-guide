
import { 
  CheckSquare, 
  Users, 
  BookOpen, 
  Building2, 
  Languages, 
  Phone,
  User,
  Home,
  FileText,
  Bell,
  Menu,
  X,
  MessageCircle,
  Flag
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
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

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
  const { state, setOpen } = useSidebar();
  const [isFullyCollapsed, setIsFullyCollapsed] = useState(false);
  
  useEffect(() => {
    const savedState = localStorage.getItem('sidebar-fully-collapsed');
    if (savedState === 'true') {
      setIsFullyCollapsed(true);
    }
  }, []);

  const toggleFullCollapse = () => {
    const newState = !isFullyCollapsed;
    setIsFullyCollapsed(newState);
    localStorage.setItem('sidebar-fully-collapsed', newState.toString());
  };

  const isCollapsed = state === 'collapsed';
  
  const cleanedName = typeof userName === "string" && userName.trim() !== "" ? userName : null;
  const avatarUrl = userAvatarUrl ?? "";

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', tooltip: 'Return to homepage' },
    { id: 'checklist', icon: CheckSquare, label: 'Checklist', tooltip: 'Your onboarding checklist' },
    { id: 'documents', icon: FileText, label: 'Documents & Renewals', tooltip: 'Track your important documents' },
    { id: 'hub', icon: Users, label: 'Community Hub', tooltip: 'Connect with fellow students' },
    { id: 'news', icon: BookOpen, label: 'Stay Updated', tooltip: 'Latest campus and city news' },
    { id: 'affiliation', icon: Building2, label: 'Our Partners', tooltip: 'See our affiliations' },
    { id: 'language', icon: Languages, label: 'Learn French', tooltip: 'Practice French language skills' },
    { id: 'translate', icon: Languages, label: 'Translate', tooltip: 'Universal translator tool' },
    { id: 'chatbot', icon: MessageCircle, label: 'FAQ Chatbot', tooltip: 'Get instant answers to common questions' },
    { id: 'contact', icon: Phone, label: 'Contact Us', tooltip: 'Get in touch with our support team' },
    { id: 'profile', icon: User, label: 'Profile', tooltip: 'Manage your profile settings' },
  ];

  if (isFullyCollapsed) {
    return (
      <div className="fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleFullCollapse}
          className="bg-card shadow-xl hover:shadow-2xl transition-all duration-200 border-border rounded-xl"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-border transition-all duration-300 bg-sidebar">
      <SidebarHeader className="border-b border-sidebar-border pb-4">
        <div className="flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-primary-foreground font-bold text-sm">KS</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-sidebar-foreground truncate">
                  pas<span className="text-primary">S</span>2<span className="text-primary">K</span>ampus
                </h2>
                <p className="text-xs text-sidebar-foreground/70 truncate">Your guide to French education</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullCollapse}
            className="h-8 w-8 p-0 hover:bg-sidebar-accent rounded-xl"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-sidebar-foreground/70 uppercase tracking-wide px-3 mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => {
                const isActive = currentPage === item.id;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => setCurrentPage(item.id)}
                      className={`
                        flex items-center gap-3 w-full px-3 py-3 rounded-xl transition-all duration-200
                        hover:bg-sidebar-accent group relative
                        ${isActive 
                          ? 'bg-primary text-primary-foreground font-medium shadow-lg' 
                          : 'text-sidebar-foreground hover:text-sidebar-foreground'
                        }
                      `}
                      title={item.tooltip}
                    >
                      <div className={`
                        p-2 rounded-lg transition-colors flex-shrink-0
                        ${isActive 
                          ? 'bg-primary-foreground/20 text-primary-foreground' 
                          : 'bg-sidebar-accent text-primary'
                        }
                      `}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {!isCollapsed && (
                        <span className="truncate">
                          {item.label}
                        </span>
                      )}
                      {isActive && (
                        <div className="absolute right-2 w-2 h-2 bg-primary-foreground rounded-full opacity-60" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-sidebar-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-xl" />
            ) : (
              <User className="h-4 w-4 text-sidebar-foreground" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">
                {cleanedName ? `Hello, ${cleanedName}!` : "Hello, Stranger!"}
              </p>
              <p className="text-xs text-sidebar-foreground/70">Student</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
