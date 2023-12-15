import React, { FC, ChangeEvent } from 'react';

interface CurrencySelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CurrencySelect: FC<CurrencySelectProps> = ({ options, value, onChange }) => {
  return (
    <select className='select select_custom_arrow text-black p-2 mt-5' value={value} onChange={onChange}>
      {options.map((currency, index) => (
        <option key={index} value={currency.value}>
          {currency.label}
        </option>
      ))}
    </select>
  );
};

export default CurrencySelect;