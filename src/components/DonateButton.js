import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUserPaymentInfo } from "../features/auth/authSlice";
import {
  createPaymentOrder,
  savePaymentInfo,
} from "../services/paymentService";
import PaymentInfoModal from "./PaymentInfoModal";

function DonateButton({ post }) {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };
  const handleDonate = async () => {
    if (!user) {
      return toast.warning("Please login to donate");
    }
    const res = await initializeRazorpay();
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    try {
      setLoading(true);
      const response = await createPaymentOrder({ amount: 100 }, user.token);
      const { amount, id: order_id, currency } = response.orderData;
      var options = {
        key: `${process.env.REACT_APP_RZ_KEY}`,
        amount: amount,
        currency: currency,
        name: "FuneME100",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            amount: Number(amount) / 100,
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            username: user.email,
            postid: post._id,
          };
          toast.success("Rs.100 donated successfully");
          const paymentResult = await savePaymentInfo(data, user.token);

          data.postTitle = post.title;
          dispatch(setUserPaymentInfo(data));
          if (!paymentResult) {
            toast.warning("error in executing order");
          } else {
            handleShow();
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "FundME100  Corporate Office",
        },
      };
      var rzPay = new window.Razorpay(options);

      rzPay.open();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        style={{ marginLeft: "0.5rem" }}
        variant="warning"
        size="sm"
        onClick={() => handleDonate(post)}
        disabled={loading}
      >
        Donate
      </Button>
      <Modal show={show} onHide={handleClose} dialogClassName="modal-50w">
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Transaction Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PaymentInfoModal />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DonateButton;
