import React from 'react';
import GenericStep from './GenericStep';

export default function Expenses(props) {

  const expenses = [
    { id: "1", key: "housing", value: "Housing", type: "number" },
    { id: "2", key: "transportation", value: "Transportation", type: "number" },
    { id: "3", key: "utilities", value: "Utilities", type: "number" },
    { id: "4", key: "survivorlifeinsurance", value: "Survivor Life insurance", type: "number" },
    { id: "5", key: "healthcare", value: "Healthcare", type: "number" },
    { id: "6", key: "education", value: "Education", type: "check" },
    { id: "7", key: "recreation", value: "Recreation", type: "number" },
    { id: "0", key: "others", value: "Others", type: "number" }
  ];

  return (
    <>
      <GenericStep inProps={props.inProps} category="expenses" isFirst={false} isLast={false} categoryItems={expenses} handleBack={props.handleBack} handleNext={props.handleNext} />
    </>
  );
}