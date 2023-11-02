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
  defaultValue,
  onChange,
  placeholder,
  required = false,
  hint,
}: SelectElementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const handleSelect = (option) => {
    onChange({
      target: {
        name: name,
        value: useLabel ? option.label : option.value,
        label: option.label,
      },
    });
    setIsOpen(false);
    setSearchTerm(option.label);
  };
  const handleOpen = () => {
    setIsOpen(true);
    setSearchTerm('');
    if (searchRef.current) searchRef.current.value = '';
  };
  const handleClose = () => {
    setIsOpen(false);
    setSearchTerm(getLabel(defaultValue));
  };
  const getLabel = (value: any) => {
    const val = value || defaultValue;
    if (!val) return '';
    const [result] = options.filter((opt) =>
      useLabel ? opt.label == val : opt.value == val
    );
    return result?.label || '';
  };
  useEffect(() => {
    // Filter options based on the search term
    const filtered = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOptions(filtered);
  }, [searchTerm, options]);
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
      <div className=' relative ' ref={dropdownContainerRef}>
        <input
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
        />
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className='dropdown-options-container'
            >
              {options.length > 3 && (
                <span className='bg-[#F9F9FC] bg-[] rounded-t-[4px] border-b block border-[#E6E8F0] py-2 px-3 w-full text-[#6C798F]'>
                  Search
                </span>
              )}
              {filteredOptions.map((option) => (
                <li key={option.value} onClick={() => handleSelect(option)}>
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <span onClick={handleOpen} className='absolute right-2 top-3'>
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
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
            />
          </motion.svg>
        </span>
      </div>

      <span className='text-sm font-medium  '>{hint}</span>
    </div>
  );
};

//Legacy Code
//  <div className={`select-container ${label && ' gap-y-[6px]'}`}>
//    {label && (
//      <label className='select-label' htmlFor={name}>
//        {label}
//        {required && <span className='input--required'></span>}
//      </label>
//    )}
//    <div className='select-menu-container group'>
//      <select
//        onChange={onChange}
//        className='select'
//        name={name}
//        id={name}
//        required={required}
//        defaultValue={defaultValue}
//      >
//        {placeholder && <option value=''>{placeholder}</option>}
//        {options?.map((option) => (
//          <option
//            value={useLabel ? option.label : option.value}
//            key={option.value}
//            // selected={option.value.toString() == defaultValue?.toString()}
//          >
//            {option.label}
//          </option>
//        ))}
//      </select>
//    </div>
//    <span className='text-sm font-medium  '>{hint}</span>
//  </div>;
