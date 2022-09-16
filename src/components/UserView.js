import "./css/userview.css";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { removePost } from "../features/postSlice";
import { deltePost } from "../services/postService";

function UserView() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { postList } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);
  const [userList, setUserList] = useState();
  console.log("postlit user view function", postList, user);

  useEffect(() => {
    console.log("inside use effect of user viewpostlit", postList);
    const list = postList.filter(function (post) {
      return post.username === user.email;
    });
    console.log("inside use effect of user userList is -", list);
    setUserList(list);
  }, []);

  const handleDeletePost = async (post) => {
    const response = await deltePost({ id: post._id });
    if (response.success) {
      toast.success("post deleted successfully");
      const updatdPostList = userList.filter((item) => item._id != post._id);
      setUserList(updatdPostList);
      dispatch(removePost(post));
    } else {
      toast.warning("status update failed");
    }
  };
  return (
    <div className="userview">
      {userList && userList.length > 0 ? (
        <>
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
              {userList.map((post, index) => (
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
                    {post.status == "Pending" ? (
                      <h6>
                        <span>Yet To Approve</span>
                      </h6>
                    ) : post.status == "Rejected" ? (
                      <Button
                        variant="danger"
                        onClick={() => {
                          handleDeletePost(post, "Active");
                        }}
                      >
                        Delete
                      </Button>
                    ) : (
                      post.status
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <>
          <p>
            You do not have any post.{" "}
            <span>
              <Link to="/createPost">Click Here</Link> to create post
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default UserView;
