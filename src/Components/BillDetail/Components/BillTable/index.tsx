'use client'
import React, { useState } from 'react';
import LTAnalysisChart from '../LTAnalysisChart';

interface BillTableProps {
  data: Record<string, any>;
  heading?: string;
}

function getLastSixMonths(inputMonthYear: String) {
  // 1. Parse Input:
  const [monthAbbr, yearStr] = inputMonthYear?.split("-");
  const monthIndex = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"].indexOf(monthAbbr.toUpperCase());
  const year = parseInt(yearStr);

  if (monthIndex === -1 || isNaN(year)) {
    throw new Error("Invalid input format. Use 'MMM-YYYY' (e.g., MAR-2024)");
  }

  // 2. Calculate Start Month:
  let startMonth = monthIndex - 5; // Go back 5 months
  let startYear = year;
  if (startMonth < 0) { 
    startMonth += 12;        // Wrap around to previous year if needed
    startYear--;
  }

  // 3. Generate Months:
  const months = [];
  for (let i = 0; i < 6; i++) {
    months.push(`${["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"][startMonth]}-${startYear}`);
    startMonth++;
    if (startMonth >= 12) {
      startMonth = 0;
      startYear++;
    }
  }
  return months.reverse();
}

const BillTable: React.FC<BillTableProps> = ({ data, heading="ivrs_number" }) => {
  const [selectedOption, setSelectedOption] = useState('consumption');

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const months = getLastSixMonths(data["billMonthYear"]);

  const isFirstWordN = heading[0] !== "H";

  return (
    <>
    <h1 className="text-center text-3xl font-bold my-4">IVRS-{isFirstWordN?"N":""}{heading}</h1>
    <div className="flex justify-center">
      <select
        value={selectedOption}
        onChange={handleDropdownChange}
        className="
          block // Make the dropdown fill its container's width
          px-4 py-2 // Add padding for better appearance and usability
          text-gray-700 // Text color
          bg-white // Background color
          border border-gray-300 // Border with a subtle color
          rounded-md // Rounded corners for a modern look
          focus:outline-none // Remove the default focus outline
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 // Add a nice focus ring effect
        "
      >
        <option value="consumption">Consumption</option>
        <option value="power_factor">Power Factor</option>
        <option value="maximum_demand">Maximum Demand</option>
      </select>
      </div>

      <LTAnalysisChart data={data["history"][selectedOption]} months={months}/>

      <table className="table-auto border-collapse mt-4">
  <tbody>
    {Object.entries(data)
      .filter(([key, _]) => key !== "history") // Filter out 'history' key
      .map(([key, value]) => (
        <tr key={key}>
          <td className="border px-4 py-2">{key}</td>
          <td className="border px-4 py-2">
            {typeof value === "object"
              ? JSON.stringify(value, null, 2) // Format nested objects
              : value}
          </td>
        </tr>
      ))}
  </tbody>
</table>
    </>
  );
};

export default BillTable;
