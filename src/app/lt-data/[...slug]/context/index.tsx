"use client";
import { useState, useEffect, useContext, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface BillContextType {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContextValue: BillContextType = {
    setIsOpen: () => {},
    isOpen: false
};

const BillContext = createContext<BillContextType>(defaultContextValue);
type ContextProviderProps = {
    children: React.ReactNode;
};

function BillStateProvider({ children }: ContextProviderProps) {

    const [isOpen, setIsOpen] = useState(false);

    const value = { isOpen, setIsOpen };

    return (
        <BillContext.Provider value={value} >
            {children}
        </BillContext.Provider>
    );
};

const useBillState = () => useContext(BillContext);

export { useBillState, BillStateProvider };
