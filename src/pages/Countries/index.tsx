import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { getAllCountries } from '../../queries/countryQueries';
import { useState } from 'react';

export const Countries = () => {
  const [countries, setCountries] = useState<Country[] | undefined>();
  const { data, isLoading } = useQuery<Country[], any>({
    queryKey: ['countries'],
    queryFn: async () => {
      const countries = await getAllCountries();
      setCountries(countries);
      return countries;
    },
    refetchOnMount: true,
  });

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <ul>
        {countries?.map((country) => (
          <li key={country.name.common}>
            <Link to='/$country' params={{ country: country.name.official }}>
              {country.name.common}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
