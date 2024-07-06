'use client';

import React from 'react';
import { LineChart } from '@mui/x-charts';

interface ChartProps {
    data: number[];
    months: String[];
}

const LTAnalysisChart: React.FC<ChartProps> = ({ data, months}) => {

    const rev_months = months.slice().reverse();
    const rev_data = data.slice().reverse();

    // Generate x-axis values based on data indices
        return (
        <div className="chart-container p-8 bg-white rounded-lg shadow-md flex items-center">

            <LineChart
                xAxis={[{scaleType: 'point', data: rev_months }]}
                series={[
                    {
                        data: rev_data,
                    },
                ]}
                width={500}
                height={300}
            />
        </div>
    );
};

export default LTAnalysisChart;