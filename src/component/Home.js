import React from "react";
import Feed from "./Feed";

const Home = ({ posts, fetchError, isLoading }) => {
  return (
    // 如果沒有文章，顯示提示字
    <main className="Home">
      {isLoading && <p className="statusMsg">Loading posts...</p>}
      {!isLoading && fetchError && (
        <p className="statusMsg" style={{ color: "red" }}>
          {fetchError}
        </p>
      )}
      {!isLoading &&
        !fetchError &&
        (posts.length ? (
          <Feed posts={posts} />
        ) : (
          <p className="statusMsg"> No posts to display</p>
        ))}
      {/* {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display</p>
      )} */}
    </main>
  );
};

export default Home;
