// components/TextInput.tsx
import React, { Dispatch, SetStateAction } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  type?: string; // <--- Certo!
  required?: boolean; // <--- Certo!
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, type = 'text', required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type} // <--- Certo!
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        required={required} // <--- Certo!
      />
    </div>
  );
};

export default TextInput;