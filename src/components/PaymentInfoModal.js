import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";
import "./css/paymentModal.css";
import Table from "react-bootstrap/Table";

function PaymentInfoModal() {
  const { paymentInfo } = useSelector((state) => state.auth);

  return (
    <>
      <Table
        style={{ width: "100%" }}
        className="styled-table"
        striped
        bordered
        hover
      >
        <tr>
          <th>Username</th>
          <td>{paymentInfo.username}</td>
        </tr>
        <tr>
          <th>Amount</th>
          <td>{paymentInfo.amount}</td>
        </tr>
        <tr>
          <th>Payment Id</th>
          <td>{paymentInfo.razorpayPaymentId}</td>
        </tr>
        <tr>
          <th>Post name</th>
          <td>{paymentInfo.postTitle}</td>
        </tr>
      </Table>
      <h6>Save payment Id for future reference</h6>
    </>
  );
}

export default PaymentInfoModal;
