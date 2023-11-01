import { Link } from '@tanstack/react-router';

export const Country = ({
  country,
  countries,
}: {
  country: Country;
  countries: Country[];
}) => {
  const getBorder = (short: string) => {
    const [selectedCountry] = countries.filter((c) => c.cca3 == short);
    return selectedCountry ? selectedCountry.name.common : null;
  };
  const getCountry = (short: string) => {
    const [selectedCountry] = countries.filter((c) => c.cca3 == short);
    return selectedCountry ? selectedCountry.name.official : null;
  };
  const getNativeNames = () => {
    if (!country.name.nativeName) return '';
    const keys = Object.keys(country.name.nativeName);
    if (keys.length == 1) {
      return country.name.nativeName[keys[0]].official;
    }
    const [nativeLang] = keys.filter((k) => k !== 'eng') || '';
    return country.name.nativeName[nativeLang]?.official;
  };
  const getCommaSepertatedNumber = (amount: number | undefined) => {
    return amount ? new Intl.NumberFormat().format(amount) : null;
  };
  const getCurrencies = () => {
    const currencies = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, val] of Object.entries(country.currencies)) {
      currencies.push(val.name);
    }
    return currencies.join(', ');
  };
  const getLanguages = () => {
    const languages = [];
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, val] of Object.entries(country.languages)) {
      languages.push(val);
    }
    return languages.join(', ');
  };
  return (
    <div className='w-full h-full py-10 px-12 md:p-20 flex flex-col flex-1'>
      <Link
        to='/'
        className='flex items-center gap-x-4 fill-[#111517] dark:fill-[white] text-[#111517] dark:text-[white] transition dark:hover:bg-[#425567] dark:bg-[#2B3844] rounded-md w-[136px] py-[10px] justify-center ease-in-out duration-300'
      >
        <svg
          width='20'
          height='20'
          viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='call-made'>
            <path
              id='Shape'
              fillRule='evenodd'
              fill='inherit'
              clipRule='evenodd'
              d='M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z'
            />
          </g>
        </svg>
        Back
      </Link>
      <div className='mt-16 md:mt-20 flex flex-col md:flex-row md:items-center w-full md:gap-x-[120px]'>
        <span className='w-full rounded-[10px] max-w-[560px] h-[275px] md:h-max xl:h-[400px] max-h-[400px] shrink'>
          <img
            className='object-center object-cover rounded-[10px] h-full w-full shrink'
            src={country.flags.svg}
          />
        </span>
        <div className='w-full mt-11 md:mt-0'>
          <h1 className='font-extrabold text-[22px] md:text-[32px] w-full'>
            {country.name.official}
          </h1>
          <section className='w-full mt-4 md:mt-6 gap-y-8 md:gap-y-0 text-sm md:text-base flex flex-col md:flex-row items-start md:justify-between'>
            <ul className='flex flex-col gap-y-2 md:max-w-[250px]'>
              <li>
                <strong className='font-semibold'>Native Name: </strong>
                <span>{getNativeNames()}</span>
              </li>
              <li>
                <strong className='font-semibold'>Population: </strong>
                <span>{getCommaSepertatedNumber(country.population)}</span>
              </li>
              <li>
                <strong className='font-semibold'>Region: </strong>
                <span>{country.region}</span>
              </li>
              <li>
                <strong className='font-semibold'>Sub Region: </strong>
                <span>{country.subregion}</span>
              </li>
              <li>
                <strong className='font-semibold'>Capital: </strong>
                <span>{country.capital}</span>
              </li>
            </ul>
            <ul className='flex flex-col gap-y-2 md:max-w-[300px]'>
              <li>
                <strong className='font-semibold'>Top Level Domain: </strong>
                <span>{country.tld}</span>
              </li>
              <li>
                <strong className='font-semibold'>Currencies: </strong>
                <span>{getCurrencies()}</span>
              </li>
              <li>
                <strong className='font-semibold'>Languages: </strong>
                <span>{getLanguages()}</span>
              </li>
              <li>
                <strong className='font-semibold'>Find on Map: </strong>
                <a
                  href={country.maps.googleMaps}
                  className='underline underline-offset-4'
                  target='_blank'
                >
                  Google Maps
                </a>
              </li>
            </ul>
          </section>
          {country.borders ? (
            <footer className='mt-8 md:mt-[70px] flex flex-col md:flex-row md:items-center'>
              <span className='font-semibold'>Border Countries: </span>
              <ul className='flex items-center gap-3 flex-wrap mt-4 md:mt-0 md:ml-4'>
                {country.borders.map((border) => (
                  <li
                    className='px-5 shadow text-xs md:text-base rounded-sm py-1 dark:shadow-none dark:bg-[#2B3844]'
                    key={border}
                  >
                    <Link
                      to='/$country'
                      params={{ country: getCountry(border)! }}
                    >
                      {getBorder(border)}
                    </Link>
                  </li>
                ))}
              </ul>
            </footer>
          ) : null}
        </div>
      </div>
    </div>
  );
};
