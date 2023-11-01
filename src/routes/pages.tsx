import { Route } from '@tanstack/react-router';
import { queryClient, rootRoute } from '.';
import { Countries, Country } from '../pages';
import { getAllCountries } from '../queries/countryQueries';

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Countries,
});
export const countryRoute = new Route({
  getParentRoute: () => rootRoute,
  beforeLoad: async ({ params }) => {
    const { country } = params;
    const qc = queryClient;
    let countries: Country[] | undefined = qc.getQueryData(['countries']);
    if (!countries) {
      countries = await qc.fetchQuery<Country[]>({
        queryKey: ['countries'],
        queryFn: getAllCountries,
      });
    }
    const [selectedCountry] = countries.filter(
      (c) => c.name.official == country.replace(/%20/g, ' ')
    );
    console.log({ selectedCountry });
    return { selectedCountry, countries };
  },
  path: '$country',
  component: ({ useRouteContext }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { selectedCountry, countries } = useRouteContext();
    return <Country country={selectedCountry} countries={countries} />;
  },
});
