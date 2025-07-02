
import { Home, CheckSquare, Users, BookOpen, Phone, Building, Languages, Bell, User, Flag, User2 } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "home",
    icon: Home,
  },
  {
    title: "Checklist",
    url: "checklist",
    icon: CheckSquare,
  },
  {
    title: "Community Hub",
    url: "hub",
    icon: Users,
  },
  {
    title: "Stay Updated",
    url: "news",
    icon: BookOpen,
  },
  {
    title: "Our Partners",
    url: "affiliation",
    icon: Building,
  },
  {
    title: "Learn French",
    url: "language",
    icon: Languages,
  },
  {
    title: "Contact Us",
    url: "contact",
    icon: Phone,
  },
  {
    title: "Notifications",
    url: "notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    url: "profile",
    icon: User,
  },
  {
    title: "French Integration",
    url: "integration",
    icon: Flag,
  },
];

interface AppSidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  userName: string;
  userAvatarUrl: string;
}

export function AppSidebar({ currentPage, setCurrentPage, userName, userAvatarUrl }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <User2 className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Hello,</span>
            <span className="text-sm font-semibold">{userName}!</span>
            <span className="text-xs text-gray-500">Welcome!</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild
                    isActive={currentPage === item.url}
                  >
                    <button
                      onClick={() => setCurrentPage(item.url)}
                      className="flex items-center gap-2 w-full"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
