import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { Router, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools, queryClient, routeTree } from './routes';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

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
      <ReactQueryDevtools />
      <TanStackRouterDevtools router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
