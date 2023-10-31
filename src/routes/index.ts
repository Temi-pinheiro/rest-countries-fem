import { RootRoute } from '@tanstack/react-router';
import { Main } from '../layout';
import { countryRoute, indexRoute } from './pages';

export const rootRoute = new RootRoute({
  component: Main,
});

export const routeTree = rootRoute.addChildren([indexRoute, countryRoute]);
