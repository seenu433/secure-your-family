import React from 'react';
import GenericStep from './GenericStep';

export default function Benefits(props) {

  const benefits = [
    { id: "1", key: "lifeinsurance", value: "Life Insurance", type: "number" },
    { id: "2", key: "socialsecurity", value: "Social Security", type: "number" },
    { id: "3", key: "401k", value: "401K", type: "number" },
    { id: "4", key: "ira", value: "IRA", type: "number" },
    { id: "5", key: "savingsaccounts", value: "Savings Accounts", type: "number" },
    { id: "6", key: "brokerageaccounts", value: "Brokerage accounts", type: "number" },
    { id: "7", key: "hsaaccounts", value: "HSA accounts", type: "number" },
    { id: "8", key: "educationplans", value: "Education Plans", type: "number" },
    { id: "9", key: "realestate", value: "Real Estate", type: "number" },
    { id: "10", key: "accidentaldeathanddismemberment", value: "Accidental Death and Dismemberment", type: "number" },
    { id: "11", key: "terminsurance", value: "Term insurance", type: "number" },
    { id: "12", key: "mortgageprotection", value: "Mortgage Protection", type: "check" }
  ];

  return (
    <>
      <GenericStep inProps={props.inProps} isFirst={true} isLast={false} category="benefits" categoryItems={benefits} handleBack={props.handleBack} handleNext={props.handleNext} />
    </>
  );
}