import { Route } from '@tanstack/react-router';
import { rootRoute } from '.';
import { Countries, Country } from '../pages';
// import { queryClient } from '.';

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Countries,
});
export const countryRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '$country',
  component: Country,
});
