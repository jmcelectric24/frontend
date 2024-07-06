"use client";
import React from "react";
// import LTPopupWindowBill from "../LTPopupWindowBill";
import LTPopupWindowBill from "@/Components/LTPopupWindowBill";
import axios from "axios";
import BillTable from "./Components/BillTable";
import { useState, useEffect } from "react";

interface Post {
  id: string; // Firestore uses strings as document IDs
  title: string;
  // Add more fields here as needed
}

interface BlankComponentProps {
  ivrs: string;
  month: string;
} // Add props types if needed

const BillDetail: React.FC<BlankComponentProps> = (props) => {
  return (
    <div>
      <LTPopupWindowBill
        buttontext="Details"
        ivrs={props.ivrs}
        month={props.month}
      />
    </div>
  );
};

export default BillDetail;
