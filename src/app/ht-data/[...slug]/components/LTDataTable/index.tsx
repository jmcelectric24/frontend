import React from 'react';
import { TableProps } from '../../interfaces';
import BillDetail from '../BillDetail';

function formatString(inputString: string) {
    const words = inputString.split('_');
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalizedWords.join(' ');
}

function removeFirstCharacter(str: string | number[]) {
    if (typeof str !== 'string' || str.length === 0) {
        return "0";
    }
    return str.startsWith("N") ? str.slice(1) : str;
}

const LTDataTable: React.FC<TableProps> = ({ headings, data, month }) => {
    const headings_fixed = ["ivrs", "Details", "distribution_center", "tariff_code"];
    const headings_variable = [
        "energy_charge", "total_consumption", "fixed_charges", "total_amount",
        "this_month_consumption", "previous_month_consumption", "consumption_variation",
        "fixed_charge", "security_amount_deposit", "sanction_load", "contract_demand",
        "max_demand", "power_factor", "welding_surcharge"
    ];

    return (
        <div className="flex justify-center m-4 mt-4 overflow-x-auto">
            <div className="min-w-full">
                <table className="min-w-full border-collapse">
                    <thead>
                        <tr>
                            {headings_fixed.map(heading => (
                                <th key={heading} className="bg-gray-200 border text-center px-4 py-2">
                                    {formatString(heading)}
                                </th>
                            ))}
                            {headings_variable.map(heading => (
                                headings.includes(heading) && (
                                    <th key={heading} className="bg-gray-200 border text-center px-4 py-2">
                                        {formatString(heading)}
                                    </th>
                                )
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="bg-white border-b">
                                {headings_fixed.map((val, idx) => (
                                    <React.Fragment key={idx}>
                                        {val !== "Details" ? (
                                            <td className="border px-4 py-2 text-right">{row[val]}</td>
                                        ) : (
                                            <td className="border px-4 py-2 text-center">
                                                <BillDetail ivrs={removeFirstCharacter(row["ivrs"])} month={month} />
                                            </td>
                                        )}
                                    </React.Fragment>
                                ))}
                                {headings_variable.map((val, idx) => (
                                    headings.includes(val) && (
                                        <td key={idx} className="border px-4 py-2 text-right">
                                            {row[val]}
                                        </td>
                                    )
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LTDataTable;
