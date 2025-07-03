
import { Home, Users, FileText, Calculator, School, MapPin, MessageCircle, Bell, User, HelpCircle, Newspaper, Languages, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useLocalStorageProgress } from "@/hooks/useLocalStorageProgress";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const { user } = useAuth();
  const { progress } = useLocalStorageProgress();
  
  const isHomePage = location.pathname === '/';
  const hasStartedJourney = progress?.unlocked_modules?.includes('pre-arrival-1') || false;

  const navigationItems = [
    { title: "Home", url: "/", icon: Home, alwaysShow: true },
    { title: "School Insights", url: "/school-insights", icon: School, requiresStart: true },
    { title: "Pre-Arrival Phase 1", url: "/pre-arrival-1", icon: MapPin, requiresStart: true },
    { title: "Pre-Arrival Phase 2", url: "/pre-arrival-2", icon: MapPin, requiresStart: true },
    { title: "Post-Arrival", url: "/post-arrival", icon: ChevronRight, requiresStart: true },
    { title: "Documents", url: "/documents", icon: FileText, requiresStart: true },
    { title: "Finance Tracking", url: "/finance", icon: Calculator, requiresStart: true },
    { title: "Community Hub", url: "/hub", icon: Users, requiresStart: true },
    { title: "Q&A Assistant", url: "/qa", icon: MessageCircle, requiresStart: true },
    { title: "Translator", url: "/translate", icon: Languages, requiresStart: true },
    { title: "News", url: "/news", icon: Newspaper, requiresStart: true },
    { title: "Notifications", url: "/notifications", icon: Bell, requiresStart: true },
    { title: "Profile", url: "/profile", icon: User, requiresStart: true },
  ];

  // Filter items based on whether user has started their journey
  const visibleItems = navigationItems.filter(item => {
    if (item.alwaysShow) return true;
    if (isHomePage && !hasStartedJourney) return false;
    return true;
  });

  const isActive = (path: string) => location.pathname === path;

  return (
    <Sidebar className={cn("border-r", collapsed ? "w-14" : "w-64")} collapsible>
      <SidebarContent className="p-4">
        <div className="mb-6">
          <h1 className={cn("font-bold text-lg text-blue-600", collapsed && "hidden")}>
            pasS2Kampus
          </h1>
          {collapsed && (
            <div className="text-blue-600 font-bold text-sm">P2K</div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "hidden" : ""}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {visibleItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-blue-50",
                        isActive(item.url) && "bg-blue-100 text-blue-700 font-medium"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
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
