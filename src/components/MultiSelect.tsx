import React from 'react';

interface MultiSelectProps {
  label: string;
  options: string[];
  value: string[];
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
    <div>
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
       <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              checked={value.includes(option)}
              onChange={() => toggleOption(option)}
            />
            <span className="ml-3 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;