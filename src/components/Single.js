import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPostDetails, getUserDetails } from "../services/postService";
import "./css/single.css";
import PostDetails from "./PostDetails.js";

import Sidebar from "./Sidebar.js";

function Single() {
  let { Id } = useParams();
  const [postDetails, setPostDetails] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getPostDetails({ _id: Id });
      setPostDetails(response.post);
      setUser(response.post.username);
      setLoading(false);
    }
    fetchData();
  }, []);
  return (
    <div className="singlepost">
      {!loading ? (
        <>
          <PostDetails post={postDetails} />
          <Sidebar userName={user} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Single;
