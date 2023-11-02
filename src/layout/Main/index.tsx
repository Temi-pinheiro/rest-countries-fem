import { Outlet } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

export const Main = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);
  return (
    <HelmetProvider>
      <main className='h-full w-full text-[#111517] dark:text-white  bg-white dark:bg-[#202C36]'>
        <header className='px-4 md:px-20 py-[30px] md:py-6 bg-white shadow dark:shadow-none dark:bg-[#2B3844] flex w-full items-center justify-between'>
          <h2 className='text-sm font-extrabold md:text-2xl'>
            Where in the world?
          </h2>
          <button
            className='text-xs md:text-base flex w-fit items-center gap-x-2'
            onClick={toggleDarkMode}
          >
            <svg
              className='w-4 h-4 md:w-5 md:h-5 fill-white stroke-black dark:stroke-none'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M13.5532 13.815C9.66857 13.815 6.51929 10.9278 6.51929 7.36821C6.51929 6.0253 6.96679 4.78158 7.73143 3.75C4.69036 4.69515 2.5 7.33122 2.5 10.4381C2.5 14.3385 5.94929 17.5 10.2036 17.5C13.5929 17.5 16.4696 15.4932 17.5 12.7045C16.375 13.4048 15.0161 13.815 13.5532 13.815Z'
                strokeWidth='1.25'
              />
            </svg>
            Dark Mode
          </button>
        </header>
        <Outlet />
      </main>
    </HelmetProvider>
  );
};
