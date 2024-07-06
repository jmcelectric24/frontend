import type { NextPage } from "next";
import { db } from "@/firebase/config/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import { format, subMonths } from "date-fns";

import LTDataTable from "./components/LTDataTable";
import LTDataDropdown from "./components/LTDataDropdown";
import CSVDownloadButton from "./components/CSVDownloadButton";
import MonthTab from "./components/MonthTab";

interface Post {
  id: string; // Firestore uses strings as document IDs
  title: string;
  // Add more fields here as needed
}

function getLastSixMonths(inputMonthYear: String) {
  // 1. Parse Input:
  const [monthAbbr, yearStr] = inputMonthYear.split("-");
  const monthIndex = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ].indexOf(monthAbbr.toUpperCase());
  const year = parseInt(yearStr);

  if (monthIndex === -1 || isNaN(year)) {
    throw new Error("Invalid input format. Use 'MMM-YYYY' (e.g., MAR-2024)");
  }

  // 2. Calculate Start Month:
  let startMonth = monthIndex - 5; // Go back 5 months
  let startYear = year;
  if (startMonth < 0) {
    startMonth += 12; // Wrap around to previous year if needed
    startYear--;
  }

  // 3. Generate Months:
  const months = [];
  for (let i = 0; i < 6; i++) {
    months.push(
      `${[
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ][startMonth]
      }-${startYear}`
    );
    startMonth++;
    if (startMonth >= 12) {
      startMonth = 0;
      startYear++;
    }
  }
  return months.reverse();
}

const LTDataPage = async ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;

  const data_filter = slug[0]
  const month = slug[1]

  console.log(month)

  const displayMonth = format(subMonths(new Date(), 1), 'MMM-yyyy').toUpperCase();  // E.g., "APR-2024"
  const prevMonth = month; // TEMP

  const last_six_months = getLastSixMonths(displayMonth);

  const ltDataRef = collection(db, "lt_data");
  const filteredQuery = query(ltDataRef, where("month", "==", prevMonth));
  const querySnapshot = await getDocs(filteredQuery);
  const data = querySnapshot.docs[0].data();

  const downloadData: any = []
  const downloadRef = collection(db, `lt_download_data_${data_filter}`);
  const downloadQuery = query(downloadRef, where("month", "==", prevMonth));
  const downloadQuerySnapshot = await getDocs(downloadQuery);
  downloadQuerySnapshot.forEach((doc) => {
    downloadData.push(...doc.data()["data"])
  });


  const mainData = data[data_filter];

  const headings = Object.keys(mainData[0]);

  const options = [
    {
      label: "Total Live LT Connections",
      value: "main_table",
    },
    {
      label: "LT Connections with MD-SL > 20%",
      value: "connections_with_mdsl_gt_20_table",
    },
    {
      label: "LT Connections with SL-MD > 10%",
      value: "connections_with_slmd_gt_10_table",
    },
    {
      label: "LT Connections with power-factor less than 0.8",
      value: "connections_with_pf_lt_8_tenths_table",
    },
    {
      label: "LT Connections with zero Energy Consumption",
      value: "connections_with_zero_consumptions_table",
    },
    {
      label: "LT Connections with Energy Variations of +5%",
      value: "connections_with_consumption_plus_5_table",
    },
    {
      label: "LT Connections with Energy Variations of -5%",
      value: "connections_with_consumption_minus_5_table",
    },
  ];


  return (
    <div className="">
      <div className='flex justify-center'>
        <div className="text-white bg-slate-500 p-2 rounded md:font-extrabold text-lg">
          LT-DATA
        </div>
      </div>
      <MonthTab tabs={last_six_months} currentTab={month} />
      <LTDataDropdown
        label="Specific Connections"
        options={options}
        value={data_filter}
        month={month}
      />
      <CSVDownloadButton data={downloadData} />
      <LTDataTable
        headings={headings}
        data={mainData}
        month={month}
      />
    </div>
  );
};

export default LTDataPage;
