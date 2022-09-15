import "./css/dashboard.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

function Dashboard() {
  const postList1 = null;
  const { postList } = useSelector((state) => state.post);
  console.log("postlit", postList);
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
              <td>{post.title}</td>
              <td>{post.username}</td>
              <td>{post.status}</td>
              <td>{post.category}</td>
              <td>{post.amount}</td>
              <td>{post.amount}</td>
              <td>
                {post.status != "Pending" ? (
                  <>
                    <Button variant="danger" size="sm">
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    {" "}
                    <Button variant="success" size="sm">
                      Approve
                    </Button>{" "}
                    <Button variant="warning" size="sm">
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
