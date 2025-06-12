import React from 'react';

interface RadioProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

const Radio: React.FC<RadioProps> = ({ label, options, value, onChange, name }) => {
  return (
    <div>
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option} className="flex items-center cursor-pointer">
            <input
              type="radio"
              name={name}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
            />
            <span className="ml-3 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Radio;