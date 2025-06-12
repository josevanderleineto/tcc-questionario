import React from 'react';

interface FrequencyMatrixProps {
  label: string;
  items: { id: string; label: string }[];
  options: string[];
  values: { [key: string]: string };
  onChange: (newValues: { [key: string]: string }) => void;
}

const FrequencyMatrix: React.FC<FrequencyMatrixProps> = ({ label, items, options, values, onChange }) => {
  const handleOptionChange = (itemId: string, optionValue: string) => {
    onChange({
      ...values,
      [itemId]: optionValue,
    });
  };

  return (
    <div className="mb-4">
      <p className="block text-gray-700 text-sm font-bold mb-2">{label}</p>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b font-semibold text-left text-xs text-gray-600 uppercase tracking-wider">Suporte/Formato</th>
              {options.map((option) => (
                <th key={option} className="py-3 px-4 border-b font-semibold text-center text-xs text-gray-600 uppercase tracking-wider">
                  {option}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-800">{item.label}</td>
                {options.map((option) => (
                  <td key={option} className="py-3 px-4 text-center">
                    <input
                      type="radio"
                      name={item.id}
                      value={option}
                      checked={values[item.id] === option}
                      onChange={() => handleOptionChange(item.id, option)}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FrequencyMatrix;