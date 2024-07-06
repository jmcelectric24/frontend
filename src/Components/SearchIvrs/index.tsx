"use client";

import { useState, ChangeEvent } from "react";
import LTPopupWindowBill from "../LTPopupWindowBill";

interface SearchBarIvrsProps {
  month: string;
}

const SearchBarIvrs = ({ month }: SearchBarIvrsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsValid(/^[NH]\d{10}$/.test(value)); 
  };

  const handleSubmit = () => {
    if (isValid) {
      console.log("Submitting search:", searchTerm);
    }
  };

  const removeFirstCharacter = (str: string) => {
    return str.startsWith("N") ? str.slice(1) : str; // Concise removal
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-md w-[300px]">
      <h2 className="text-lg font-semibold text-center mb-4">
        Connection Details
      </h2>

      <div className="mb-4">
        <label
          htmlFor="ivrsNumber"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          IVRS Number
        </label>
        <input
          type="text"
          id="ivrsNumber"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Enter N or H followed by 10 digits"
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            !isValid && "border-red-500"
          }`}
        />
        {!isValid && (
          <p className="text-red-500 text-xs italic mt-2">
            Invalid format. Please enter N or H followed by 10 digits.
          </p>
        )}
      </div>

      <div className="text-center">
        <LTPopupWindowBill
          buttontext="Show Details"
          ivrs={removeFirstCharacter(searchTerm)}
          month={month}
          disabled={!isValid}
        />
      </div>
    </div>
  );
};

export default SearchBarIvrs;
