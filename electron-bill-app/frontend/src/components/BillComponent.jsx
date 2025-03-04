import React from 'react';

const BillComponent = ({ billData }) => {
    return (
        <div>
            <h1>Bill Details</h1>
            <p><strong>Bill Number:</strong> {billData.number}</p>
            <p><strong>Date:</strong> {billData.date}</p>
            <p><strong>Amount:</strong> {billData.amount}</p>
            {/* Add more bill details as needed */}
        </div>
    );
};

export default BillComponent;
