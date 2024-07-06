"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation';

interface TabBarProps {
  tabs: string[];
  currentTab: string;
}

function MonthTab({ tabs, currentTab }: TabBarProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(currentTab);

  const handleChange = (tab: string) => {
    setActiveTab(tab);
    router.push(tab); // Push the corresponding URL
  };

  return (
    <div className="flex justify-center m-4 mt-4">
      <div className="flex flex-wrap bg-gray-200 rounded justify-center p-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleChange(tab)}
            className={`
              px-4 py-2 text-sm font-medium rounded-md m-1
              focus:outline-none
              ${activeTab === tab ? "bg-gray-300" : "hover:bg-gray-100"}
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MonthTab;
