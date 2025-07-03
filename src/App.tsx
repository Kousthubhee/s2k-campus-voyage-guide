
// ADDED: Top of file log
console.log("[App.tsx] TOP OF FILE");

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
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
    console.error("Error caught by boundary:", error);
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
        <br />
        <button onClick={() => window.location.reload()} style={{marginTop: 16, padding: '8px 16px'}}>
          Reload Page
        </button>
      </div>
    }
    return this.props.children;
  }
}

import { AuthProvider } from '@/hooks/useAuth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

console.log("App.tsx is rendering");

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <NotificationProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Index />
          </TooltipProvider>
        </AuthProvider>
      </NotificationProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
