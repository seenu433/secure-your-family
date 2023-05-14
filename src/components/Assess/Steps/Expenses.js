import React from 'react';
import GenericStep from './GenericStep';

export default function Expenses(props) {

  const expenses = [
    { id: "1",key: "housing", value: "Housing" },
    { id: "2",key: "transportation", value: "Transportation" },
    { id: "3",key: "utilities", value: "Utilities" },
    { id: "4",key: "survivorlifeinsurance", value: "Survivor Life insurance" },
    { id: "5",key: "healthcare", value: "Healthcare" },
    { id: "6",key: "education", value: "Education" },
    { id: "7",key: "recreation", value: "Recreation" }
];

  return (
    <>
      <GenericStep inProps={props.inProps}  category="expenses" isFirst={false} isLast={false} categoryItems={expenses} handleBack={props.handleBack} handleNext={props.handleNext} />
    </>
  );
}