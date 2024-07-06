"use client";
import { useState, Fragment, useEffect, useRef } from "react";
import LTAnalysisChart from "../LTAnalysisChart";

type ContextProviderProps = {
  buttontext: string;
  data: number[];
  months: string[]
};

function LTPopupWindow({  ...props }: ContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside); // Prevent memory leaks
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);


  const maxWidth = "100%";
  const maxHeight = "90%";

  return (
    <Fragment>
      {/* Button remains unchanged */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        {...props}
      >
        {props.buttontext || "History"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm pointer-events-none" onClick={() => setIsOpen(false)}/>
          {/* Modified Popup Container */}
          {/* <div className="bg-white p-8 rounded-md shadow-md relative z-10 flex flex-col items-center"> */}
          <div
            ref={popupRef}
            className="bg-white rounded-md shadow-md relative z-10 overflow-y-auto" // Add overflow-y-auto
            style={{ maxWidth, maxHeight, overflowY: "auto" }}
          >
            <LTAnalysisChart data={props.data} months={props.months}/>
            <div className="flex justify-center">

            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4 mb-4" // Added margin-top for spacing
            >
              Close
            </button>
            </div>

          </div>
     </div>
      )}
    </Fragment>
  );
}

export default LTPopupWindow;
