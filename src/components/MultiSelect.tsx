import React from 'react';

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[]; // array de strings
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, options, value, onChange }) => {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="mb-4">
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
      {options.map((option) => (
        <label key={option} className="inline-flex items-center mr-4 mb-2 cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox"
            checked={value.includes(option)}
            onChange={() => toggleOption(option)}
          />
          <span className="ml-2">{option}</span>
        </label>
      ))}
    </div>
  );
};

export default MultiSelect;