import React from 'react';
import GenericStep from './GenericStep';

export default function Liabilities(props) {

  const liabilities = [
    { id: "1",key: "homemortgage", value: "Home mortgage" },
    { id: "2",key: "carloans", value: "Car Loans" },
    { id: "3",key: "creditcardbills", value: "Credit Card Bills" },
    { id: "4",key: "personalloans", value: "Personal Loans" },
    { id: "5",key: "homeinsurance", value: "Home Insurance" },
    { id: "6",key: "carinsurance", value: "Car Insurance" },
    { id: "7",key: "funeralexpenses", value: "Funeral expenses" }
  ];

  return (
    <>
      <GenericStep inProps={props.inProps} isFirst={false} isLast={false} category="liabilities" categoryItems={liabilities} handleBack={props.handleBack} handleNext={props.handleNext} />
    </>
  );
}