import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import "./css/posts.css";
import Post from "./Post";
import Sidebar from "./Sidebar";

function Posts() {
  const { postList } = useSelector((state) => state.post);

  let { category } = useParams();
  if (category) {
  }
  console.log("postlist in postlist-category", category);
  console.log("postlist in postlist", postList);
  return (
    <>
      <div className="home">
        <div className="posts">
          {!postList ? (
            <p>Loading Post list...</p>
          ) : (
            <>
              {/* {postList.map((post) => {
            return post.status != "Pending" ? <Post post={post} /> : null;
          })} */}

              {postList.map((post) => {
                //post.status != "Pending" ? <Post post={post} /> : null//
                return (
                  post.status != "Pending" &&
                  (category ? (
                    category == post.category && <Post post={post} />
                  ) : (
                    <Post post={post} />
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
