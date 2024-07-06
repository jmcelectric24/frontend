"use client";

import { useState } from "react";

interface DataObject {
  [key: string]: string | number; // Allows any key with string or number values
}

interface CSVDownloadButtonProps {
  data: DataObject[];
  filename?: string; // Optional filename
}

function CSVDownloadButton({
  data,
  filename = "download.csv",
}: CSVDownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const headers = Object.keys(data[0]).join(",");

  const convertDataToCSV = (data: DataObject[], headers: string[]): string => {
    const headerRow = headers.join(",");

    const rows = data.map((obj) => {
      return headers
        .map((header) => {
          // Check if the header exists as a property in the object
          if (obj.hasOwnProperty(header)) {
            const value = obj[header];
            if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`; // Proper escaping for quotes within strings
            }
            return value;
          } else {
            return ""; // Or any default value you prefer when the header is missing
          }
        })
        .join(",");
    });

    return [headerRow, ...rows].join("\n");
  };

  const downloadCSV = () => {
    const headings_fixed = [
      "accountId",
      "address1",
      "address2",
      "billDate",
      "billDueDateCash",
      "billMonthYear",
      "billPurpose",
      "billingDemand",
      "categoryCode",
      "ccbCalculation",
      "contractDemand",
      "currentPayableAmount",
      "customerDepositedAmount",
      "customerName",
      "distributionCenter1",
      "divisionName",
      "duty",
      "energyCharge",
      "finalConsumption",
      "fixedCharge",
      "intrestAdvancePayment",
      "lastPaidDate",
      "latePayCharge",
      "maxDemand",
      "meterNo",
      "multiplier",
      "onlineRebate",
      "otherCharges",
      "outstandingAmt",
      "penalCharge",
      "phone2",
      "powerFactor",
      "presentMeterReading",
      "previousPendingAmount",
      "previousReading",
      "readingDate",
      "readingType",
      "sanctionLoad",
      "securityAmountDeposit",
      "securityAmountPending",
      "subsidyLoadFactor",
      "tariffCode",
      "totalAmountAfterDueDate",
      "totalConsumption",
      "weldingSurcharge",
    ];

    setIsDownloading(true);

    const headers = [...headings_fixed];
    const csvContent = convertDataToCSV(data, headers);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      link.setAttribute("href", URL.createObjectURL(blob));
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    setIsDownloading(false);
  };

  return (
<div className="flex justify-center mt-4"> 
  <button onClick={downloadCSV} disabled={isDownloading} className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
    {isDownloading ? "Downloading..." : "Download CSV"}
  </button>
</div>
  );
}

export default CSVDownloadButton;
