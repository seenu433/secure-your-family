import React from 'react';
import GenericStep from './GenericStep';

export default function Tax(props) {

  const taxes = [
    { id: "1", value: "Anticipated Taxes" }
  ];

  return (
    <>
      <GenericStep inProps={props.inProps} isFirst={false} isLast={false} category="tax" categoryItems={taxes} handleBack={props.handleBack} handleNext={props.handleNext} />
    </>
  );
}