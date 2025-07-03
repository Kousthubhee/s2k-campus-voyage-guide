import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/Layout';
import Index from '@/pages/Index';
import SchoolInsightsPage from '@/pages/SchoolInsightsPage';
import PreArrival1Page from '@/pages/PreArrival1Page';
import PreArrival2Page from '@/pages/PreArrival2Page';
import PostArrivalPage from '@/pages/PostArrivalPage';
import DocumentsPage from '@/components/DocumentsPage';
import FinanceTrackingPage from '@/pages/FinanceTrackingPage';
import InteractiveHubPage from '@/components/hub/InteractiveHubPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Index />
      },
      {
        path: "/school-insights",
        element: <SchoolInsightsPage />
      },
      {
        path: "/school-insights/:cityName",
        element: <SchoolInsightsPage />
      },
      {
        path: "/school-insights/:cityName/:schoolId",
        element: <SchoolInsightsPage />
      },
      {
        path: "/pre-arrival-1",
        element: <PreArrival1Page />
      },
      {
        path: "/pre-arrival-2",
        element: <PreArrival2Page />
      },
      {
        path: "/post-arrival",
        element: <PostArrivalPage />
      },
      {
        path: "/documents",
        element: <DocumentsPage />
      },
      {
        path: "/finance",
        element: <FinanceTrackingPage />
      },
      {
        path: "/hub",
        element: <InteractiveHubPage />
      }
    ]
  }
]);

export default router;
