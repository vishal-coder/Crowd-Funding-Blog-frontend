import "./css/dashboard.css";

import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getPaymentInfo } from "../services/paymentService";
import Table from "react-bootstrap/Table";
import { formatDate } from "../services/utilityService";
import ProgressBar from "react-bootstrap/ProgressBar";

function PostPaymentDashboard() {
  const { paymentInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {paymentInfo && paymentInfo.paymentData.length > 0 ? (
        <>
          <ProgressBar
            className="progress"
            now={`${(
              (paymentInfo.receivedTotal / paymentInfo.total) *
              100
            ).toFixed(2)} %`}
            label={`${(
              (paymentInfo.receivedTotal / paymentInfo.total) *
              100
            ).toFixed(2)}%`}
            variant="success"
          />
          <div>
            <span>{paymentInfo.receivedTotal}</span> /
            <span>{paymentInfo.total}</span> : Received / Total
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Amount</th>
                <th>Donated By</th>
                <th>Payment Id</th>
                <th>Donatd On</th>
              </tr>
            </thead>
            <tbody>
              {paymentInfo.paymentData.map((payment, index) => (
                <tr key={payment._id + index}>
                  <td>{index + 1}</td>
                  <td>{payment.amount}</td>
                  <td>{payment.username}</td>
                  <td>{payment.razorpayPaymentId}</td>
                  <td>{formatDate(payment.createdOn)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p>No Payment Data for this post</p>
      )}
    </div>
  );
}

export default PostPaymentDashboard;
