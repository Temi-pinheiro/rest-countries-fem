import { Link } from '@tanstack/react-router';

export const CountryCard = ({ country }: { country: Country }) => {
  const getCommaSepertatedNumber = (amount: number | undefined) => {
    return amount ? new Intl.NumberFormat().format(amount) : null;
  };
  return (
    <Link
      to='/$country'
      params={{ country: country.name.official }}
      className='rounded-5px shadow dark:shadow-none bg-white dark:bg-[#2B3844] w-full max-w-[400px] md:max-w-none flex flex-col'
    >
      <span className='w-full'>
        <img
          className='object-center object-cover rounded-t-[5px] w-full  h-[160px]'
          src={country.flags.svg}
        />
      </span>
      <section className='p-6'>
        <h3 className='text-lg font-extrabold'>{country.name.common}</h3>
        <ul className='flex flex-col text-sm md:max-w-[250px] mt-4'>
          <li>
            <strong className='font-semibold'>Population: </strong>
            <span>{getCommaSepertatedNumber(country.population)}</span>
          </li>
          <li>
            <strong className='font-semibold'>Region: </strong>
            <span>{country.region}</span>
          </li>

          <li>
            <strong className='font-semibold'>Capital: </strong>
            <span>{country.capital}</span>
          </li>
        </ul>
      </section>
    </Link>
  );
};
