import type { NextPage } from 'next';
import { db } from '@/firebase/config/firebaseConfig';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { format, subMonths } from 'date-fns';
import LTAnalysisTable from './components/LTAnalysisTable';
import { TableRow } from './interfaces';

interface Post {
  id: string; // Firestore uses strings as document IDs
  title: string;
  // Add more fields here as needed
}

function getLastSixMonths(inputMonthYear: String) {
  // 1. Parse Input:
  const [monthAbbr, yearStr] = inputMonthYear.split("-");
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

const LTAnalysisPage = async () => {

  const prevMonth = format(subMonths(new Date(), 1), 'MMM-yyyy').toUpperCase();  // E.g., "APR-2024"
  // const prevMonth = "MAR-2024"; // TEMP

  const last_six_months = getLastSixMonths(prevMonth)

  const homepageRef = collection(db, 'lt_analysis');
  const filteredQuery = query(homepageRef, where('month', '==', prevMonth));
  const querySnapshot = await getDocs(filteredQuery);
  const data = querySnapshot.docs[0].data();

  // console.log(data["overview"]["total_consumption"])

  const overviewTableHeading = ["Overview"]
  const overviewTableData: TableRow[] = [
    { "Total billed connections": data["overview"]["total_billed_connections"] },
    { "Total Consumption (kWh)": data["overview"]["total_consumption"] },
    { "Total Month Bill (Rs)": data["overview"]["total_month_bill"] },
    { "Total Amount Due (Rs)": data["overview"]["total_amount_due"] },
  ]

  const loadAnalysisTableHeading = ["Load Analysis"]
  const loadAnalysisTableData: TableRow[] = [
    { "Total Load (kW)": data["load_analysis"]["total_load"] },
    { "Fixed Charges (Rs)": data["load_analysis"]["fixed_charges"] },
    { "Connections With MD-SL > 20%": data["load_analysis"]["connections_with_mdsl_gt_20"] },
    { "Connections with SL-MD > 10%": data["load_analysis"]["connections_with_slmd_gt_10"] },
  ]

  const pfAnalysisTableHeading = ["PF Analysis"]
  const pfAnalysisTableData: TableRow[] = [
    { "Connections with pf < 0.8": data["pf_analysis"]["connections_with_pf_lt_8_tenths"] },
    { "Total PF Surcharge": data["pf_analysis"]["total_pf_surcharge"] },
  ]

  const consumptionAnalysisTableHeading = ["Consumption Analysis"]
  const consumptionAnalysisTableData: TableRow[] = [
    { "Connections with Zero Consumption": data["consumption_analysis"]["connections_with_zero_consumptions"] },
    { "Connections with Consumption +5%": data["consumption_analysis"]["connections_with_consumption_plus_5"] },
    { "Connections with Consumption -5%": data["consumption_analysis"]["connections_with_consumption_minus_5"] },
  ]

  return (
    <div className="flex text-xs md:text-md flex-col mx-auto max-w-screen-xl m-4 mt-4 px-2">
      <div className='flex justify-center mb-4'>
        <div className="text-white bg-slate-500 p-2 rounded md:font-extrabold text-lg">
          LT-Analysis
        </div>
      </div>
      <LTAnalysisTable headings={overviewTableHeading} data={overviewTableData} months={last_six_months} />
      <LTAnalysisTable headings={loadAnalysisTableHeading} data={loadAnalysisTableData} months={last_six_months} />
      <LTAnalysisTable headings={pfAnalysisTableHeading} data={pfAnalysisTableData} months={last_six_months} />
      <LTAnalysisTable headings={consumptionAnalysisTableHeading} data={consumptionAnalysisTableData} months={last_six_months} />
    </div>
  );
};




export default LTAnalysisPage;