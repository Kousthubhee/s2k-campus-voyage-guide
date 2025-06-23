
import React from "react";

/**
 * Simple error boundary for notifications area.
 * Shows fallback UI if notification-related code throws an error (e.g., context is missing or hook fails).
 */
export class NotificationErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; errorMessage?: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, errorMessage: error?.message || String(error) };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // Optionally log
    console.error("[NotificationErrorBoundary]", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section className="p-6 bg-red-50 text-red-700 rounded-xl border border-red-200 my-4 max-w-xl mx-auto text-center animate-in fade-in">
          <div className="font-bold mb-2">Notifications error</div>
          <div>
            Something went wrong while loading notifications.<br />
            <small className="opacity-70">
              {this.state.errorMessage}
            </small>
          </div>
        </section>
      );
    }
    return this.props.children;
  }
}
