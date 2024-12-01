import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ChartComponent from "./ChartComponent"; // Ensure this is your chart component
import RExpense from "../accounting/RExpense"; // Ensure this is your report component

const NetIncomeChart = () => {
  const printRef = useRef(); // Reference for the printable section

  // Function to handle print action
  const handlePrint = useReactToPrint({
    contentRef: printRef, // Correctly use `contentRef` instead of `content`
  });

  return (
    <div>
      {/* Button to trigger print */}
      <button className="button add  mb-3 px-4" onClick={handlePrint}>
        Print
      </button>

      {/* Section to print */}
      <div ref={printRef}>
        <div className="fs-5 mb-3">Net Income Report</div>

        {/* Chart component */}
        <ChartComponent />

        {/* Reports */}
        <div className="row mt-4">
          <div className="col-md-6 col-12">
            <div className="fs-5 mb-2">Expense Report</div>
            <RExpense />
          </div>
          <div className="col-md-6 col-12">
            <div className="fs-5 mb-2">Revenues Report</div>
            <RExpense />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetIncomeChart;
