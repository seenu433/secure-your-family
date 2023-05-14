import React from 'react';
import GenericStep from './GenericStep';

export default function Liabilities(props) {

  const liabilities = [
    { id: "1", key: "homemortgage", value: "Home mortgage", type: "number" },
    { id: "2", key: "carloans", value: "Car Loans", type: "number" },
    { id: "3", key: "creditcardbills", value: "Credit Card Bills", type: "number" },
    { id: "4", key: "personalloans", value: "Personal Loans", type: "number" },
    { id: "5", key: "homeinsurance", value: "Home Insurance", type: "number" },
    { id: "6", key: "carinsurance", value: "Car Insurance", type: "number" },
    { id: "7", key: "funeralexpenses", value: "Funeral expenses", type: "number" },
    { id: "0", key: "others", value: "Others", type: "number" }
  ];

  return (
    <>
      <GenericStep inProps={props.inProps} isFirst={false} isLast={false} category="liabilities" categoryItems={liabilities} handleBack={props.handleBack} handleNext={props.handleNext} />
    </>
  );
}