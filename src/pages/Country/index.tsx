import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
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
    if (!country.currencies) return 'N/A';
    const currencies = [];
    const entries = Object.entries(country.currencies);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const [_, val] of entries) {
      currencies.push(val.name);
    }
    if (currencies) {
      return currencies.join(', ');
    } else {
      return 'N/A';
    }
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
    <>
      <Helmet>
        <title>{country.name.official}</title>
        <link rel='icon' type='image/svg+xml' href={country.flags.svg} />
        <meta
          name={'country - ' + country.name.official}
          content={
            'REST Countries API info display for' + country.name.official
          }
        />
      </Helmet>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          key={country.cca3}
          className='mt-16 md:mt-20 flex flex-col md:flex-row md:items-center w-full md:gap-x-[120px]'
        >
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
            <section className='w-full mt-4 md:mt-6 gap-y-8 md:gap-y-0 text-sm md:text-base flex flex-col md:flex-row items-start md:justify-between max-w-[598px]'>
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
        </motion.div>
      </div>
      <footer className='hidden absolute w-full py-4 md:flex flex-col gap-y-1 items-center bottom-2'>
        <span className='text-sm inline-flex gap-x-1 '>
          {' '}
          View on{' '}
          <a
            className='underline underline-offset-4 flex items-center gap-x-1 group'
            href='https://github.com/Temi-pinheiro/rest-countries-fem'
            target='blank'
          >
            Github{' '}
            <svg
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='group-hover:animate-bounce transition'
            >
              <path
                d='M10.0008 1.66666C5.39665 1.66666 1.66748 5.39583 1.66748 10C1.66748 13.6875 4.0529 16.8021 7.3654 17.9062C7.78206 17.9792 7.93831 17.7292 7.93831 17.5104C7.93831 17.3125 7.9279 16.6562 7.9279 15.9583C5.83415 16.3437 5.29248 15.4479 5.12581 14.9792C5.03206 14.7396 4.62581 14 4.27165 13.8021C3.97998 13.6458 3.56331 13.2604 4.26123 13.25C4.91748 13.2396 5.38623 13.8542 5.54248 14.1042C6.29248 15.3646 7.4904 15.0104 7.96956 14.7917C8.04248 14.25 8.26123 13.8854 8.50083 13.6771C6.64665 13.4687 4.70915 12.75 4.70915 9.5625C4.70915 8.65625 5.03206 7.90625 5.56331 7.32291C5.47998 7.11458 5.18831 6.26041 5.64665 5.11458C5.64665 5.11458 6.34456 4.89583 7.93831 5.96875C8.605 5.78125 9.31333 5.6875 10.0217 5.6875C10.73 5.6875 11.4383 5.78125 12.105 5.96875C13.6987 4.88541 14.3967 5.11458 14.3967 5.11458C14.855 6.26041 14.5633 7.11458 14.48 7.32291C15.0112 7.90625 15.3342 8.64583 15.3342 9.5625C15.3342 12.7604 13.3862 13.4687 11.5321 13.6771C11.8342 13.9375 12.0946 14.4375 12.0946 15.2187C12.0946 16.3333 12.0842 17.2292 12.0842 17.5104C12.0842 17.7292 12.2404 17.9896 12.6571 17.9062C16.0492 16.7611 18.3332 13.5802 18.3342 10C18.3342 5.39583 14.605 1.66666 10.0008 1.66666Z'
                className='fill-blue-950  dark:fill-white'
              />
            </svg>
          </a>
        </span>
        <div className='text-center text-xs'>
          Challenge by{' '}
          <a href='https://www.frontendmentor.io?ref=challenge' target='_blank'>
            Frontend Mentor
          </a>
          . Coded by{' '}
          <a
            href='https://temipinheiro.com/'
            target='_blank'
            className=' underline underline-offset-4'
          >
            Temitope Pinheiro
          </a>
          .
        </div>
      </footer>
    </>
  );
};
