import { db } from "@/firebase/config/firebaseConfig";
import { collection, getDocs, where, query } from "firebase/firestore";
import { format, subMonths } from "date-fns";
import SearchBarIvrs from "@/Components/SearchIvrs";
import Link from "next/link";

interface Post {
  id: string; // Firestore uses strings as document IDs
  title: string;
  // Add more fields here as needed
}

const HomePage = async () => {

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(number);
  };

  const prevMonth = format(subMonths(new Date(), 1), 'MMM-yyyy').toUpperCase();  // E.g., "APR-2024"
  // const prevMonth = "MAR-2024"; // TEMP

  const homepageRef = collection(db, "homepage_data");
  const filteredQuery = query(homepageRef, where("month", "==", prevMonth));
  const querySnapshot = await getDocs(filteredQuery);
  const data = querySnapshot.docs[0].data();

  data.total_energy = parseFloat(data.total_energy.toFixed(2));
  data.bill_amount = parseFloat(data.bill_amount.toFixed(2));
  data.total_load = parseFloat(data.total_load.toFixed(2));

  const ht_homepageRef = collection(db, "ht_homepage_data");
  const ht_filteredQuery = query(ht_homepageRef, where("month", "==", prevMonth));
  const ht_querySnapshot = await getDocs(ht_filteredQuery);
  const ht_data = ht_querySnapshot.docs[0].data();

  ht_data.total_energy = parseFloat(ht_data.total_energy.toFixed(2));
  ht_data.bill_amount = parseFloat(ht_data.bill_amount.toFixed(2));
  ht_data.total_load = parseFloat(ht_data.total_load.toFixed(2));

  return (
    <div className="flex flex-col gap-6 mx-auto items-center">
      <div className="font-[400] text-[33px] text-center">
        ELECTRIC SECTION
        <br />
        POWER BILL OPTIMIZATION
      </div>
      <div className="flex gap-6 justify-center">
        <Link href='/lt-analysis' className='font-semibold bg-gray-500 text-white p-2 rounded'>LT-Analysis</Link>
        <Link href='/ht-analysis' className='font-semibold bg-gray-500 text-white p-2 rounded'>HT-Analysis</Link>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='font-semibold text-[25px] text-center'>LT DATA</div>
        <table className="bg-gray-500 border text-white border-gray-400 rounded-lg overflow-hidden divide-y divide-gray-300">
          <thead className="relative h-12 w-full bg-gray-500 text-white">
            <div className="flex justify-center items-center h-full w-full absolute text-[20px] font-semibold">
              {data.month}
            </div>
          </thead>

          <tbody className="divide-y divide-gray-300">
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Total Connections</td>
              <td className="text-right px-4 py-2">{formatNumber(data.total_connections)}</td>
            </tr>
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Total Load</td>
              <td className="text-right px-4 py-2">{formatNumber(data.total_load)} kW</td>
            </tr>
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Total Energy</td>
              <td className="text-right px-4 py-2">{formatNumber(data.total_energy)} kWh</td>
            </tr>
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Bill Amount</td>
              <td className="text-right px-4 py-2">{formatNumber(data.bill_amount)} Rs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='font-semibold text-[25px] text-center'>HT DATA</div>
        <table className="bg-gray-500 border text-white border-gray-400 rounded-lg overflow-hidden divide-y divide-gray-300">
          <thead className="relative h-12 w-full bg-gray-500 text-white">
            <div className="flex justify-center items-center h-full w-full absolute text-[20px] font-semibold">
              {data.month}
            </div>
          </thead>

          <tbody className="divide-y divide-gray-300">
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Total Connections</td>
              <td className="text-right px-4 py-2">{formatNumber(ht_data.total_connections)}</td>
            </tr>
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Total Load</td>
              <td className="text-right px-4 py-2">{formatNumber(ht_data.total_load)} kW</td>
            </tr>
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Total Energy</td>
              <td className="text-right px-4 py-2">{formatNumber(ht_data.total_energy)} kWh</td>
            </tr>
            <tr className="divide-x divide-gray-300">
              <td className="text-left px-4 py-2">Bill Amount</td>
              <td className="text-right px-4 py-2">{formatNumber(ht_data.bill_amount)} Rs</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        {" "}
        <SearchBarIvrs month={prevMonth} />{" "}
      </div>
    </div>
  );
};

export default HomePage;
