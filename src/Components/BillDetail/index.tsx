'use client';
import React from 'react';
import LTPopupWindowBill from '../LTPopupWindowBill';
import axios from 'axios';
import BillTable from './Components/BillTable';
import { useState, useEffect } from 'react';

interface Post {
    id: string; // Firestore uses strings as document IDs
    title: string;
    // Add more fields here as needed
}

interface BlankComponentProps {
    ivrs: string;
    month: string;
} // Add props types if needed

const BillDetail: React.FC<BlankComponentProps> =  (props) => {

    // const {isOpen} = useBillState();

    // const [billInfo, setBillInfo] = useState({
    //     "data":"none"
    // })



    // async function fetchData() {
    //     try {
    //       const response = await axios.get('http://localhost:3000/api/v1/bills/get-bill', {
    //         params: {
    //           ivrs: props.ivrs,
    //           month: props.month
    //         }
    //       });

    //       console.log(response.data.data)
      
    //       setBillInfo(response.data.data)
    //     } catch (error) {
    //       console.error('Error fetching data:', error);
    //     }
    //   }

    //   useEffect(()=>{
    //     if (isOpen){
    //         fetchData();
    //     }
    //   }, [isOpen])



    // console.log(data["ivrs"])

    // const data = {
    //         "foundflag": false,
    //         "TypeOfConsumer": "LT",
    //         "msg": "OK",
    //         "divisionName": "JABALPUR CITY VIJAY NAGAR ",
    //         "billMonthYear": "FEB-2024",
    //         "distributionCenter1": "Madhotal-T DC",
    //         "address1": "MOHIT TOWN 11KV TAPPING KE PAS",
    //         "address2": "VRINDAVAN TURNING MODE PAR",
    //         "customerName": "COMMISSIONER NAGAR NIGAM MADHOTAL",
    //         "accountId": "N1873010054",
    //         "billPurpose": "Public street Lights",
    //         "tariffCode": "LV3.2",
    //         "billingDemand": 4730,
    //         "phone2": "9425806196",
    //         "sanctionLoad": 4,
    //         "contractDemand": null,
    //         "meterNo": "3581085",
    //         "maxDemand": 0,
    //         "readingDate": "08-03-2024",
    //         "presentMeterReading": 43474,
    //         "previousReading": 43474,
    //         "multiplier": 1,
    //         "totalConsumption": 592,
    //         "billType": null,
    //         "readingType": "ASSESSMENT",
    //         "billDate": "08-03-2024",
    //         "categoryCode": "Trf Catg: LV3.2 Public street Lights (METERED - URBAN)",
    //         "billDueDateCash": "2024-03-18",
    //         "finalConsumption": 592,
    //         "energyCharge": 3362.56,
    //         "duty": 0,
    //         "fixedCharge": 1428,
    //         "weldingSurcharge": 0,
    //         "penalCharge": null,
    //         "subsidyLoadFactor": null,
    //         "onlineRebate": 0,
    //         "otherCharges": 0,
    //         "powerFactor": 0.8,
    //         "intrestAdvancePayment": 0,
    //         "latePayCharge": 3525,
    //         "ccbCalculation": 0,
    //         "outstandingAmt": 275813,
    //         "previousPendingAmount": 275813,
    //         "securityAmountPending": 0,
    //         "currentPayableAmount": 284068,
    //         "totalAmountAfterDueDate": 284068,
    //         "customerDepositedAmount": 0,
    //         "lastPaidDate": "26/03/2024 24599204 CASH 8255FEB-2024",
    //         "securityAmountDeposit": 12203,
    //         "constype": "NGB",
    //         "ivrs": "1873010054",
    //         "billFetchMonth": "FEB-2024",
    //         "history": {
    //             "consumption": [
    //                 592.0,
    //                 718.0,
    //                 371.0,
    //                 819.0,
    //                 818.0,
    //                 654.0
    //             ],
    //             "power_factor": [
    //                 0.8,
    //                 0.8,
    //                 0.8,
    //                 0.8,
    //                 0.8,
    //                 0.8
    //             ],
    //             "maximum_demand": [
    //                 0.0,
    //                 3.0,
    //                 10.0,
    //                 1.4,
    //                 5.0,
    //                 2.0
    //             ]
    //         },
    //         "metadata": {
    //             "connections_with_mdsl_gt_20": false,
    //             "connections_with_slmd_gt_10": true,
    //             "connections_with_pf_lt_8_tenths": false,
    //             "connections_with_zero_consumptions": false,
    //             "previous_month_consumption": 718,
    //             "consumption_variation": -17.548746518105848,
    //             "connections_with_consumption_minus_5": true,
    //             "connections_with_consumption_plus_5": false
    //         }

    //     }



        // const data_show = ["address1", "address2", "billDate", "billDueDateCash", "billMonthYear", "billPurpose", "billingDemand", "categoryCode", "ccbCalculation", "contractDemand", "currentPayableAmount", "customerDepositedAmount", "customerName", "distributionCenter1", "divisionName", "duty", "energyCharge", "finalConsumption", "fixedCharge", "intrestAdvancePayment", "lastPaidDate", "latePayCharge", "maxDemand", "meterNo", "multiplier", "onlineRebate", "otherCharges", "outstandingAmt", "penalCharge", "phone2", "powerFactor", "presentMeterReading", "previousPendingAmount", "previousReading", "readingDate", "readingType", "sanctionLoad", "securityAmountDeposit", "securityAmountPending", "subsidyLoadFactor", "tariffCode", "totalAmountAfterDueDate", "totalConsumption", "weldingSurcharge", "history"]
        // const filteredData = data_show.reduce((acc, key) => {
        //     if (key in billInfo) {
        //         acc[key] = (billInfo as Record<string, any>)[key]; // Assertion
        //     }
        //     return acc;
        // }, {} as Record<string, any>);
        return (
        <div>
            <LTPopupWindowBill buttontext='Details' ivrs={props.ivrs} month={props.month}/>
        </div>
    );
};

export default BillDetail;
