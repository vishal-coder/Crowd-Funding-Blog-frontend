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
  console.log("single id is", Id);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      console.log("single id is in side fetch", Id);
      const response = await getPostDetails({ _id: Id });
      setPostDetails(response.post);
      setUser(response.post.username);
      console.log("test");
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
