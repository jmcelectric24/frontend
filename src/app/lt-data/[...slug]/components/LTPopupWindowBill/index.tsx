"use client";
import { useState, Fragment, useEffect, useRef } from "react";
import BillTable from "../BillDetail/Components/BillTable";
import axios from "axios";

function LTPopupWindowBill({
  buttontext,
  ivrs,
  month,
  maxWidthPercent = 80,
  maxHeightPercent = 80,
}: {
  buttontext: string;
  ivrs: string;
  month: string;
  maxWidthPercent?: number;
  maxHeightPercent?: number;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [billInfo, setBillInfo] = useState({});
  const [gotBillInfo, setGotBillInfo] = useState(false);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/api/v1/bills/get-bill`,
        {
          params: {
            ivrs: ivrs,
            month: month,
          },
        }
      );

      const data_show = [
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
        "history",
      ];
      const filteredData = data_show.reduce((acc, key) => {
        if (key in response.data.data) {
          acc[key] = (response.data.data as Record<string, any>)[key]; // Assertion
        }
        return acc;
      }, {} as Record<string, any>);
      setGotBillInfo(true);
      setBillInfo(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

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

  const maxWidth = `${maxWidthPercent}%`;
  const maxHeight = `${maxHeightPercent}%`;

  function handleClick() {
    setIsOpen((prev) => {
      return !prev;
    });
  }

  return (
    <Fragment>
      <button
        onClick={handleClick}
        className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
      >
        {buttontext || "History"}
      </button>

      {isOpen && gotBillInfo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm pointer-events-none"
            onClick={() => setIsOpen(false)}
          />

          <div
            ref={popupRef}
            className="bg-white p-8 rounded-md shadow-md relative z-10 overflow-y-auto" // Add overflow-y-auto
            style={{ maxWidth, maxHeight, overflowY: "auto" }}
          >
            <BillTable data={billInfo} heading={ivrs} />
            <div className="flex justify-center">
              <button
                onClick={() => setIsOpen(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4"
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

export default LTPopupWindowBill;