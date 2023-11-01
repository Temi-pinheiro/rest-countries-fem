import { RootRoute } from '@tanstack/react-router';
import { Main } from '../layout';
import { countryRoute, indexRoute } from './pages';
import React from 'react';
import { QueryClient } from '@tanstack/react-query';

export const rootRoute = new RootRoute({
  component: Main,
});
export const queryClient = new QueryClient();

export const routeTree = rootRoute.addChildren([indexRoute, countryRoute]);

export const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        }))
      );
