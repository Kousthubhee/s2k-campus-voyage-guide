
// ADDED: Top of file log
console.log("[App.tsx] TOP OF FILE");

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainRouter from "./pages/MainRouter";
import NotFound from "./pages/NotFound";
import { NotificationProvider } from "@/hooks/useNotifications";
import React from "react";

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
              <Routes>
                <Route path="/*" element={<MainRouter />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
