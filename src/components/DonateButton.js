import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  createPaymentOrder,
  linkPostPayment,
  savePaymentInfo,
} from "../services/paymentService";
import PaymentInfoModal from "./PaymentInfoModal";
import { setUserPaymentInfo } from "../features/auth/authSlice";

function DonateButton({ post }) {
  console.log("donate button post", post);
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  console.log("user button post", user);

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
    console.log("handleDonate", user);
    if (!user) {
      return toast.warning("Please login to donate");
    }
    const res = await initializeRazorpay();
    console.log("pay initialisation", res);
    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    try {
      setLoading(true);
      const response = await createPaymentOrder({ amount: 100 }, user.token);
      console.log("createPaymentOrder-response", response.orderData);
      console.log("razor pay key is", process.env.REACT_APP_RZ_KEY);

      const { amount, id: order_id, currency } = response.orderData;
      var options = {
        key: `${process.env.REACT_APP_RZ_KEY}`,
        amount: amount,
        currency: currency,
        name: "FuneME100",
        description: "Test Transaction",
        order_id: order_id,
        handler: async function (response) {
          console.log("user in payment function is", response);
          const data = {
            amount: Number(amount) / 100,
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            username: user.email,
            postid: post._id,
          };
          toast.success("Rs.100 donated successfully");
          console.log("payment data is-", data);
          const paymentResult = await savePaymentInfo(data, user.token);
          // const addedToPost = await linkPostPayment(
          //   {
          //     postid: post._id,
          //     amount: Number(amount) / 100,
          //     username: user.email,
          //     payementId: data.razorpayPaymentId,
          //   },
          //   user.token
          // );
          data.postTitle = post.title;
          dispatch(setUserPaymentInfo(data));
          if (!paymentResult) {
            toast.warning("error in executing order");
          } else {
            handleShow();
            // toast.success("Product ordered successfully");
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "MomoKing Corporate Office",
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
