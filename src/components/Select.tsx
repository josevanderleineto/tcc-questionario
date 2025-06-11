import React from 'react';

interface SelectProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void; // recebe valor direto
}

const Select: React.FC<SelectProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
        {label}
      </label>
      <select
        id={label}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        value={value}
        onChange={(e) => onChange(e.target.value)} // adapta evento para valor
      >
        <option value="">Selecione</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;