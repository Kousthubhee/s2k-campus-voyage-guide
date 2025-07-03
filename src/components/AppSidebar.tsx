
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
  Bell
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
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';
  
  // Cleaned logic: "Hello, Stranger!" if no name, else Hello, [Name]!
  const cleanedName = typeof userName === "string" && userName.trim() !== "" ? userName : null;
  const avatarUrl = userAvatarUrl ?? "";

  // Subtle color classes for inactive icons (pale accents)
  const iconInactiveBgClass = "bg-blue-50";
  const iconInactiveTextClass = "text-blue-400";

  // Set active to cyan for clearer feedback
  const iconActiveBgClass = "bg-cyan-100";
  const iconActiveTextClass = "text-cyan-600";

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', tooltip: 'Return to homepage' },
    { id: 'checklist', icon: CheckSquare, label: 'Checklist', tooltip: 'Your onboarding checklist' },
    { id: 'documents', icon: FileText, label: 'Documents & Renewals', tooltip: 'Track your important documents' },
    { id: 'hub', icon: Users, label: 'Community Hub', tooltip: 'Connect with fellow students' },
    { id: 'news', icon: BookOpen, label: 'Stay Updated', tooltip: 'Latest campus and city news' },
    { id: 'affiliation', icon: Building2, label: 'Our Partners', tooltip: 'See our affiliations' },
    { id: 'language', icon: Languages, label: 'Learn French', tooltip: 'Practice French language skills' },
    { id: 'translate', icon: Languages, label: 'Translate', tooltip: 'Universal translator tool' },
    { id: 'contact', icon: Phone, label: 'Contact Us', tooltip: 'Get in touch with our support team' },
    { id: 'profile', icon: User, label: 'Profile', tooltip: 'Manage your profile settings' },
  ];

  return (
    <Sidebar 
      collapsible="icon" 
      className={`border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-12' : 'w-64'
      }`}
    >
      <SidebarHeader className={`border-b border-gray-100 pb-4 ${isCollapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 px-3 py-2 ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">pS</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <h2 className="font-semibold text-gray-900 text-sm leading-tight">
                pas<span className="text-cyan-600">S</span>2<span className="text-blue-600">K</span>ampus
              </h2>
              <p className="text-xs text-gray-500 leading-tight">Your guide to French education</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-xs font-medium text-gray-500 uppercase tracking-wide">
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
                      tooltip={isCollapsed ? item.tooltip : undefined}
                      className={`
                        flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200
                        hover:bg-gray-50 group relative
                        ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-700 hover:text-gray-900'}
                        ${isCollapsed ? 'justify-center px-2' : ''}
                      `}
                    >
                      <div className={`
                        p-1.5 rounded-md transition-colors flex-shrink-0
                        ${isActive 
                          ? `${iconActiveBgClass} ${iconActiveTextClass}` 
                          : `${iconInactiveBgClass} ${iconInactiveTextClass}`
                        }
                      `}>
                        <Icon className="h-4 w-4" />
                      </div>
                      {!isCollapsed && (
                        <span className="truncate">
                          {item.label}
                        </span>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className={`border-t border-gray-100 p-4 ${isCollapsed ? 'px-2' : ''}`}>
        <div className={`flex items-center gap-3 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
            {avatarUrl ? (
              <img src={avatarUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
            ) : (
              <User className="h-4 w-4 text-gray-500" />
            )}
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {cleanedName ? `Hello, ${cleanedName}!` : "Hello, Stranger!"}
              </p>
              <p className="text-xs text-gray-500">Student</p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
