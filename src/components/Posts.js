import { useSelector } from "react-redux";
import "./css/posts.css";
import Post from "./Post";

function Posts() {
  const { postList } = useSelector((state) => state.post);
  console.log("postlist in postlist", postList);
  return (
    <div className="posts">
      {/* {postList.map((post) => {
        <Post key={post._id} post={post} />;
      })} */}
      {!postList ? (
        <p>Loading Post list...</p>
      ) : (
        <>
          {postList.map((post) => {
            return post.status != "Pending" ? <Post post={post} /> : null;
          })}
        </>
      )}
    </div>
  );
}

export default Posts;
