import clsx from 'clsx';
import { forwardRef } from 'react';

const Input = (
  { label, name = label.toLowerCase(), value, onChange, type = 'text', className },
  ref
) => {
  return (
    <label className={clsx(className)}>
      {label}
      <input ref={ref} name={name} type={type} value={value} onChange={onChange} />
    </label>
  );
};

export default forwardRef(Input);
