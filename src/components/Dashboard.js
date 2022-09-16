import "./css/dashboard.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { updateStatus } from "../services/postService";
import { toast } from "react-toastify";
import { addEditedpost } from "../features/postSlice";

function Dashboard() {
  const postList1 = null;
  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.post);
  console.log("postlit", postList);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postList.map((post, index) => (
            <tr key={post.id + index}>
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
    </div>
  );
}

export default Dashboard;
