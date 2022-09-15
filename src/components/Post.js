import { Link } from "react-router-dom";
import { formatDate } from "../services/utilityService";
import "./css/post.css";

function Post({ post }) {
  return (
    <div className="post">
      <img
        className="postimg"
        src="https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Donate Image"
      />
      <div className="postinfo">
        <div className="postcat">
          <div>Created By : {post.name}</div>
          <div className=" ">catg: {post.category}</div>
        </div>
        <span className="posttitle">
          <Link to={`/singlePost/${post._id}`}>{post.title}</Link>
        </span>
        {/* {post.title} */}
      </div>
      <p className="postdescription">{post.description}</p>
    </div>
  );
}

export default Post;
