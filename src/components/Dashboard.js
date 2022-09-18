import "./css/dashboard.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { updateStatus } from "../services/postService";
import { toast } from "react-toastify";
import { addEditedpost } from "../features/postSlice";
import Modal from "react-bootstrap/Modal";
import PostPaymentDashboard from "./PostPaymentDashboard";
import { useEffect, useState } from "react";
import { getPaymentInfo, getTotalPayment } from "../services/paymentService";
import { setUserPaymentInfo } from "../features/auth/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState(); //
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { postList } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  const handleUpdateStatus = async (post, status) => {
    const response = await updateStatus({ id: post._id, status: status });
    console.log("response of update status is", response);
    if (response.success) {
      toast.success("status updated successfully");
      const updatedPost = {
        _id: post._id,
        category: post.category,
        createdOn: post.createdOn,
        title: post.title,
        description: post.description,
        amount: post.amount,
        username: post.username,
        name: post.name,
        status: status,
      };
      dispatch(addEditedpost(updatedPost));
    } else {
      toast.warning("status update failed");
    }
  };

  const handlePaymentData = async (postId) => {
    const paymentInfoList = await getPaymentInfo(
      { postId: postId },
      user.token
    );

    const response = await getTotalPayment({ postId: postId }, user.token);

    if (!response.paymentData.length > 0) {
      return toast.warning("No data available for post");
    }
    paymentInfoList.paymentData.receivedTotal =
      response.paymentData[0].receivedAmount;
    dispatch(setUserPaymentInfo(paymentInfoList.paymentData));
    handleShow();
  };

  return (
    <div className="dashboard">
      {" "}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Created By</th>
            <th>Status</th>
            <th>Category</th>
            <th>Target</th>
            <th>Received</th>
            <th>Pay Info</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post, index) => (
            <tr key={post._id + index}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/singlePost/${post._id}`}>{post.title}</Link>
              </td>
              <td>{post.username}</td>
              <td>{post.status}</td>
              <td>{post.category}</td>
              <td>{post.amount}</td>
              <td>{post.amount}</td>
              <td>
                {post.status != "Pending" && post.status != "Rejected" ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => {
                      setPostId(post._id);
                      handlePaymentData(post._id);
                    }}
                  >
                    Payment Info
                  </Button>
                ) : (
                  <p>Not activated</p>
                )}
              </td>
              <td>
                {post.status != "Pending" ? (
                  <>
                    {/* <Button variant="danger" size="sm">
                      Delete
                    </Button> */}
                    <span>No Action needed</span>
                  </>
                ) : (
                  <>
                    {" "}
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        handleUpdateStatus(post, "Active");
                      }}
                    >
                      Approve
                    </Button>{" "}
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        handleUpdateStatus(post, "Rejected");
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-50w"
        scrollable={true}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Transaction Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PostPaymentDashboard key={postId} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Dashboard;
