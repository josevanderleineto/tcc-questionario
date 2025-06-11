import React from 'react';

interface RadioProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string; // Add name prop for unique grouping
}

const Radio: React.FC<RadioProps> = ({ label, options, value, onChange, name }) => {
  return (
    <div className="mb-4">
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
      {options.map((option) => (
        <label key={option} className="inline-flex items-center mr-4 mb-2 cursor-pointer">
          <input
            type="radio"
            name={name} // Use the unique name prop here
            className="form-radio"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default Radio;