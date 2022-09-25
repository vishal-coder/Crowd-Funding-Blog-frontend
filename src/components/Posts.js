import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/posts.css";
import Post from "./Post";
import Sidebar from "./Sidebar";

function Posts() {
  const { postList } = useSelector((state) => state.post);

  let { category } = useParams();

  return (
    <>
      <div className="home">
        <div className="posts">
          {!postList ? (
            <p>Loading Post list...</p>
          ) : (
            <>
              {postList.map((post) => {
                return (
                  post.status != "Pending" &&
                  post.status != "Rejected" &&
                  (category ? (
                    category == post.category && (
                      <Post key={post._id} post={post} />
                    )
                  ) : (
                    <Post key={post._id} post={post} />
                  ))
                );
              })}
            </>
          )}
        </div>
        <Sidebar />
      </div>
    </>
  );
}

export default Posts;
