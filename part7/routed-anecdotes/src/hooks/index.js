import { useState } from 'react';

export const useField = (type = 'text') => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue('');
  };

  const result = {
    type,
    value,
    onChange,
    reset,
  };

  Object.defineProperty(result, 'reset', { enumerable: false });

  return result;
};
