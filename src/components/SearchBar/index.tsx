export const SearchBar = ({ handleChange }: { handleChange: any }) => {
  return (
    <div className='flex px-8 gap-x-6 py-[14px] md:py-5 items-center max-w-[480px] w-full rounded-[5px] shadow border dark:border-transparent bg-white dark:bg-[#2B3844] '>
      <label htmlFor='bar'>
        <svg
          width='18'
          height='18'
          viewBox='0 0 18 18'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g id='search'>
            <path
              id='Shape'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z'
              fill='white'
            />
          </g>
        </svg>
      </label>
      <input
        id='bar'
        onChange={handleChange}
        placeholder='Search for a country…'
        className='bg-transparent outline-none w-full'
      />
    </div>
  );
};