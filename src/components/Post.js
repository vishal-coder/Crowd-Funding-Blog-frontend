import { Link } from "react-router-dom";
import { formatDate } from "../services/utilityService";
import "./css/post.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import DonateButton from "./DonateButton";

function Post({ post }) {
  const now = 60;

  return (
    <div className="post">
      <img
        className="postimg"
        src="https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt="Donate Image"
      />
      <div className="postinfo">
        <div className="postAction">
          <ProgressBar
            className="progress"
            variant="success"
            now={now}
            label={`${now}%`}
          />
          <DonateButton post={post} />
        </div>
        <div className="postcat">
          <div>Created By : {post.name}</div>
          <div className=" ">catg: {post.category}</div>
        </div>
        <span className="posttitle">
          <Link to={`/singlePost/${post._id}`}>{post.title}</Link>
        </span>
      </div>
      <p className="postdescription">{post.description}</p>
    </div>
  );
}

export default Post;
