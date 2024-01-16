'use client';

import { useState, useId } from 'react';

type Props = {
  placeholder?: string;
  onChangeValue?: (value: string) => void;
  defaultValue?: string;
  className?: string;
  type?: HTMLInputElement['type'];
  required?: boolean;
  disabled?: boolean;
  name?: string;
};

export function InputText({
  placeholder = 'Your placeholder text...',
  onChangeValue,
  defaultValue = '',
  className = '',
  type = 'text',
  required = false,
  disabled = false,
  name = '',
}: Props) {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!defaultValue);
  const inputId = useId();

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (e.target.value === '') {
      setHasValue(false);
    } else {
      setHasValue(true);
    }
  };

  const handleChange = (e: any) => {
    const value = e.target.value;
    if (value) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }

    // Pass the value up to the parent
    if (onChangeValue) {
      onChangeValue(value);
    }
  };

  const disabledStyle = `bg-ui-grey-light cursor-not-allowed`;
  const rootStyle = `relative rounded-lg border border-ui-grey p-2 px-4 ${className} ${
    disabled ? disabledStyle : ''
  }`;

  return (
    <div className={rootStyle}>
      <input
        type={type}
        id={inputId}
        className={`peer h-10 w-full border-transparent bg-transparent pt-4 transition focus:border-blue-600 focus:outline-none ${
          disabled ? `cursor-not-allowed` : ''
        }`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        defaultValue={defaultValue}
        required={required}
        disabled={disabled}
        name={name}
      />
      <label
        htmlFor={inputId}
        className={`absolute left-4 text-base text-ui-grey transition-all ${
          isFocused || hasValue ? 'top-1 !text-xs' : 'top-4'
        }
          ${disabled ? `cursor-not-allowed` : ''}
        }`}
      >
        {placeholder}
      </label>
    </div>
  );
}
