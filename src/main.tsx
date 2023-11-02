import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Router, RouterProvider } from '@tanstack/react-router';
import { queryClient, routeTree } from './routes';

const router = new Router({
  routeTree,
  defaultPreload: 'intent',
  context: {
    queryClient: queryClient,
  },
});
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
