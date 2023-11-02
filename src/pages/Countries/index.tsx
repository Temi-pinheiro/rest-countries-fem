import { useQuery } from '@tanstack/react-query';
import { getAllCountries } from '../../queries/countryQueries';
import { useState } from 'react';
import { CountryCard, Loader, SearchBar, SelectInput } from '../../components';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredCountries =
      data?.filter((d) =>
        d.name.common.toLowerCase().includes(e.target.value)
      ) || [];
    setCountries([...filteredCountries]);
  };
  const handleFilter = (e: any) => {
    const filteredCountries =
      data?.filter((d) => d.region.toLowerCase().includes(e.target.value)) ||
      [];
    setCountries([...filteredCountries]);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <div className='py-10 px-12 md:p-20'>
      <div>
        <SearchBar handleChange={handleChange} />
        <SelectInput
          placeholder='Filter by Region'
          options={[
            { label: 'None', value: '' },
            { label: 'Africa', value: 'Africa' },
          ]}
          onChange={handleFilter}
          name='region'
        />
      </div>
      <ul className='mt-8 md:mt-12 grid place-items-center md:place-items-stretch  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[75px] gap-y-10 md:gap-y-[75px] w-full'>
        {countries?.map((country) => (
          <li key={country.name.common}>
            <CountryCard country={country} />
          </li>
        ))}
      </ul>
    </div>
  );
};
