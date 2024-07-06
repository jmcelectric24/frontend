import React from 'react';

import { TableProps } from '../../interfaces';

import LTPopupWindow from '../LTPopupWindow';

import LTAnalysisChart from '../LTAnalysisChart';

function getFlooredFirstElement(input: string | number[]) {
  if (Array.isArray(input) && input.length > 0 && typeof input[0] === 'number') {
    return Math.floor(input[0]);
  } else {
    // Handle cases where input is not a number array or is empty
    return 0; // Or throw an error, return a default value, etc.
  }
}

function formatIndianNumber(input: number | string): string {
  // Convert input to string if it's a number
  const numStr = typeof input === 'number' ? input.toString() : input;

  // Check if the input is a valid number
  if (isNaN(Number(numStr))) {
    throw new Error('Invalid input: Input must be a number or a string representing a number.');
  }

  // Split the number into integer and fractional parts
  const [integerPart, fractionalPart] = numStr.split('.');

  // Add commas to the integer part according to the Indian numbering system
  const lastThree = integerPart.slice(-3);
  const otherNumbers = integerPart.slice(0, -3);
  const formattedIntegerPart = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + (otherNumbers ? ',' : '') + lastThree;

  // Return the formatted number
  return fractionalPart ? `${formattedIntegerPart}.${fractionalPart}` : formattedIntegerPart;
}

function getNumberList(input: string | number[]) {
  if (Array.isArray(input) && input.length > 0 && typeof input[0] === 'number') {
    return input;
  } else {
    // Handle cases where input is not a number array or is empty
    return [0]; // Or throw an error, return a default value, etc.
  }
}
const LTAnalysisTable: React.FC<TableProps> = ({ headings, data, months }) => {

  return (
    <table className="min-w-full bg-[#e2e3e5] text-gray-800 border border-gray-400">
      <thead>
        <tr className="bg-gray-700 text-white border border-gray-400">
          {headings.map((heading) => (
            <th
              key={heading}
              colSpan={3}
              className="border border-gray-400 px-4 py-2 text-center"
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="bg-[#e2e3e5] border border-gray-400">
            <td className="border border-gray-400 px-4 py-2 text-left">
              {Object.keys(row)[0].replaceAll('_', ' ')}
            </td>
            <td className="border border-gray-400 px-4 py-2 text-right">
              {formatIndianNumber(getFlooredFirstElement(row[Object.keys(row)[0]]))}

            </td>
            <td className="border border-gray-400 px-4 py-2 text-right">
              <LTPopupWindow
                buttontext="View History"
                data={getNumberList(row[Object.keys(row)[0]])}
                months={months}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LTAnalysisTable;