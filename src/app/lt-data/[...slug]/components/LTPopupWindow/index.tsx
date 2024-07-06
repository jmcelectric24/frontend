'use client';
import { useState, Fragment } from 'react';
import React, { ReactNode, ReactElement } from 'react';

type ContextProviderProps = {
  children: React.ReactNode;
  buttontext: string
};

function LTPopupWindow({ children , ...props } : ContextProviderProps) { // Accept children (component) and props
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Fragment>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
        {...props} // Pass through additional button props
      >
        {props.buttontext || "History"} {/* Customizable button text */}
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm pointer-events-none" />

          <div
            className="bg-white p-8 rounded-md shadow-md relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {children} {/* Render the passed-in component here */}
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              style={{ margin: "10px" }} // Example: 10px margin on all sides
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default LTPopupWindow;
