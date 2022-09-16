import React from "react";
import Modal from "react-bootstrap/Modal";
import { useSelector } from "react-redux";

function PaymentInfoModal() {
  const { paymentInfo } = useSelector((state) => state.auth);
  console.log("data in payment info modal", paymentInfo);

  return <div></div>;
}

export default PaymentInfoModal;
