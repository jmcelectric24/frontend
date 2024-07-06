"use client";

import React from "react";
import { LineChart } from "@mui/x-charts";

interface ChartProps {
  data: number[];
  months: string[];
  heading?: string; // Optional heading prop
}

const LTAnalysisChart: React.FC<ChartProps> = ({
  data,
  months,
  heading = "Chart Analysis", // Default heading
}) => {
  const rev_months = months.slice().reverse();
  const rev_data = data.slice().reverse();

  const maxValue = Math.max(...rev_data)
  let final_data = rev_data;
  let isFormatted = false;
  if (maxValue >= 100000){
    final_data = rev_data.map(item => item/1000)
    isFormatted = true
  }

  return (
    <>
    <h1 className="text-center text-2xl font-bold my-4">{heading}</h1>
    {
      isFormatted?
      <h2 className="text-center font-bold my-4">
        (Values are in thousands)
      </h2>:null
    }
    <div className="chart-container  bg-white p-2 md:p-8 flex items-center">
      <LineChart
        xAxis={[{ scaleType: "point", data: rev_months }]}
        series={[
          {
            data: final_data,
          },
        ]}
        width={500}
        height={300}
      />
    </div>
    </>
  );
};

export default LTAnalysisChart;
