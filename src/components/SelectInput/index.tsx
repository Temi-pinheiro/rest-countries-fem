/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { AnimatePresence, motion } from 'framer-motion';

interface SelectElementProps {
  label?: string;
  defaultValue?: any;
  options: {
    value: string | number | any;
    label: string;
  }[];
  hint?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  useLabel?: boolean;

  onChange: (v: any) => void;
}

export const SelectInput = ({
  label,
  options,
  name,
  useLabel,
  // defaultValue,
  onChange,
  placeholder,
  required = false,
  hint,
}: SelectElementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const handleSelect = (option: any) => {
    onChange({
      target: {
        name: name,
        value: useLabel ? option.label : option.value,
        label: option.label,
      },
    });
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  // const getLabel = (value: any) => {
  //   const val = value || defaultValue;
  //   if (!val) return '';
  //   const [result] = options.filter((opt) =>
  //     useLabel ? opt.label == val : opt.value == val
  //   );
  //   return result?.label || '';
  // };

  useEffect(() => {
    // Event listener for clicks outside the component
    const handleClickOutside = (e: any) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array to ensure the effect runs only once

  return (
    <div>
      {label && (
        <label className='select-label' htmlFor={name}>
          {label}
          {required && <span className='input--required'></span>}
        </label>
      )}
      <div className=' relative select-input ' ref={dropdownContainerRef}>
        <button className='w-full text-left' onClick={handleOpen} type='button'>
          {placeholder}
        </button>
        {/* <input
          type='text'
          id={name}
          ref={searchRef}
          autoComplete='off'
          className='select-input'
          placeholder={placeholder}
          value={searchTerm || getLabel(defaultValue)}
          onClick={handleOpen}
          onFocus={handleOpen}
          onChange={(e) => setSearchTerm(e.target.value)}
        /> */}
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className='dropdown-options-container'
            >
              {options.map((option) => (
                <li key={option.value} onClick={() => handleSelect(option)}>
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <button
          type='button'
          className='absolute right-2 top-4'
          onClick={handleOpen}
        >
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 9L12 15L18 9'
              stroke='#6C798F'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </motion.svg>
        </button>
      </div>

      <span className='text-sm font-medium  '>{hint}</span>
    </div>
  );
};
