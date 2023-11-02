import { useQuery } from '@tanstack/react-query';
import { getAllCountries } from '../../queries/countryQueries';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { CountryCard, Loader, SearchBar, SelectInput } from '../../components';
import { Helmet } from 'react-helmet-async';

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
      data?.filter((d) =>
        d.region.toLowerCase().includes(e.target.value.toLowerCase())
      ) || [];
    setCountries([...filteredCountries]);
  };
  return (
    <>
      <Helmet>
        <link
          rel='icon'
          type='image/svg+xml'
          href='../../src/assets/favicon-32x32.png'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>REST Countries | Temitope Pinheiro</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <div className='py-10 px-12 md:p-20'>
          <div className='flex flex-col md:flex-row w-full gap-y-8 md:justify-between'>
            <SearchBar handleChange={handleChange} />
            <SelectInput
              placeholder='Filter by Region'
              options={[
                { label: 'None', value: '' },
                { label: 'Africa', value: 'Africa' },
                { label: 'America', value: 'America' },
                { label: 'Europe', value: 'Europe' },
                { label: 'Asia', value: 'Asia' },
                { label: 'Oceania', value: 'Asia' },
              ]}
              onChange={handleFilter}
              name='region'
            />
          </div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={countries?.toString()}
            className='mt-8 md:mt-12 grid place-items-stretch md:place-items-stretch  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-[75px] gap-y-10 md:gap-y-[75px] w-full'
          >
            {countries?.map((country) => (
              <li key={country.name.common}>
                <CountryCard country={country} />
              </li>
            ))}
          </motion.ul>
        </div>
      )}
    </>
  );
};
