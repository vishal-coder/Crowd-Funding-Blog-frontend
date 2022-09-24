import { formatDate } from "../services/utilityService";
import "./css/postdetails.css";
import DonateButton from "./DonateButton";

function PostDetails({ post }) {
  return (
    <div className="postdetails">
      <div className="postdetailswrapper">
        <img
          className="singlepostimg"
          src="https://images.pexels.com/photos/6348119/pexels-photo-6348119.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Coral Image"
        />
        <h1 className="singleposttitle">
          {post.title}
          <div className="singepostedit">Category : {post.category}</div>
        </h1>
        <div className="singlepostinfo">
          <div className="singlepostauthor">Created By : {post.name}</div>
          <div>
            {" "}
            <DonateButton post={post} key={post._id} />
          </div>

          <div className="singlepostdate">
            Created On : {formatDate(post.createdOn)}
          </div>
        </div>
        <p className="singlepostdesc">{post.description}</p>
      </div>
    </div>
  );
}

export default PostDetails;
