import React from "react";
import Feed from "./Feed";

const Home = ({ posts }) => {
  return (
    // 如果沒有文章，顯示提示字
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to display</p>
      )}
    </main>
  );
};

export default Home;
