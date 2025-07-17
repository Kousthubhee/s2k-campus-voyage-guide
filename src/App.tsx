
// ADDED: Top of file log
console.log("[App.tsx] TOP OF FILE");

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "@/components/HomePage";
import { ChecklistPage } from "@/pages/ChecklistPage";
import { DocumentsPage } from "@/components/DocumentsPage";
import { HubPage } from "@/pages/HubPage";
import { NewsPage } from "@/pages/NewsPage";
import { AffiliationPage } from "@/components/AffiliationPage";
import { LanguagePage } from "@/pages/LanguagePage";
import { FrenchIntegrationPage } from "@/components/FrenchIntegrationPage";
import { TranslatePage } from "@/pages/TranslatePage";
import { ContactPage } from "@/pages/ContactPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { SchoolInsightsPage } from "@/pages/SchoolInsightsPage";
import { PreArrival1Page } from "@/pages/PreArrival1Page";
import { PreArrival2Page } from "@/pages/PreArrival2Page";
import { PostArrivalPage } from "@/pages/PostArrivalPage";
import { FinanceTrackingPage } from "@/pages/FinanceTrackingPage";
import { NotificationsPage } from "@/pages/NotificationsPage";
import { QAPage } from "@/pages/QAPage";
import { SuggestionsPage } from "@/pages/SuggestionsPage";
import { AskMeAnythingPage } from "@/pages/AskMeAnythingPage";
import { ChatbotPage } from "@/pages/ChatbotPage";
import { AuthPage } from "@/components/AuthPage";
import { ResetPasswordPage } from "@/components/ResetPasswordPage";
import NotFound from "./pages/NotFound";
import { NotificationProvider } from "@/hooks/useNotifications";
import React from "react";
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppLayout } from "@/components/AppLayout";

// Simple error boundary for root app
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error?: Error}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, info: any) {
    console.error("Uncaught error in App:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{color: "red", padding: 32, fontSize: 20}}>
        <b>Critical Error:</b> {this.state.error?.message}
        <br />
        <small>See console for details.</small>
      </div>
    }
    return this.props.children;
  }
}

import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient();

console.log("App.tsx is rendering");

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SidebarProvider>
                <Routes>
                  <Route path="/" element={<AppLayout><HomePage onGetStarted={() => window.location.href = '/checklist'} onPageNavigation={(page) => window.location.href = `/${page}`} /></AppLayout>} />
                  <Route path="/checklist" element={<AppLayout><ChecklistPage /></AppLayout>} />
                  <Route path="/documents" element={<AppLayout><DocumentsPage /></AppLayout>} />
                  <Route path="/hub" element={<AppLayout><HubPage /></AppLayout>} />
                  <Route path="/news" element={<AppLayout><NewsPage /></AppLayout>} />
                  <Route path="/affiliation" element={<AppLayout><AffiliationPage /></AppLayout>} />
                  <Route path="/language" element={<AppLayout><LanguagePage /></AppLayout>} />
                  <Route path="/integration" element={<AppLayout><FrenchIntegrationPage onBack={() => window.location.href = '/checklist'} /></AppLayout>} />
                  <Route path="/translate" element={<AppLayout><TranslatePage /></AppLayout>} />
                  <Route path="/contact" element={<AppLayout><ContactPage /></AppLayout>} />
                  <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
                  <Route path="/school-insights" element={<AppLayout><SchoolInsightsPage onBack={() => window.location.href = '/checklist'} /></AppLayout>} />
                  <Route path="/pre-arrival-1" element={<AppLayout><PreArrival1Page onBack={() => window.location.href = '/checklist'} onComplete={() => {}} isCompleted={false} /></AppLayout>} />
                  <Route path="/pre-arrival-2" element={<AppLayout><PreArrival2Page onBack={() => window.location.href = '/checklist'} /></AppLayout>} />
                  <Route path="/post-arrival" element={<AppLayout><PostArrivalPage onBack={() => window.location.href = '/checklist'} onComplete={() => {}} isCompleted={false} /></AppLayout>} />
                  <Route path="/finance-tracking" element={<AppLayout><FinanceTrackingPage onBack={() => window.location.href = '/checklist'} /></AppLayout>} />
                  <Route path="/notifications" element={<AppLayout><NotificationsPage /></AppLayout>} />
                  <Route path="/qa" element={<AppLayout><QAPage /></AppLayout>} />
                  <Route path="/ask-me-anything" element={<AppLayout><AskMeAnythingPage /></AppLayout>} />
                  <Route path="/suggestions" element={<AppLayout><SuggestionsPage onBack={() => window.location.href = '/checklist'} /></AppLayout>} />
                  <Route path="/chatbot" element={<AppLayout><ChatbotPage /></AppLayout>} />
                  <Route path="/auth" element={<AuthPage onBack={() => window.location.href = '/'} />} />
                  <Route path="/reset-password" element={<ResetPasswordPage onBack={() => window.location.href = '/'} />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </SidebarProvider>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
