import React from "react";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import api from "../api/posts";
import { format } from "date-fns";
import DataContext from "../context/DataContext";

const NewPost = () => {
  // 新增
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const { posts, setPosts } = useContext(DataContext);
  const history = useHistory();
  // 新增文章
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 取得目前資料裡的最後一筆的id值 +1，如果沒有資料表示是空陣列，那id就是從1開始
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody };
    // **研究try catch
    try {
      const response = await api.post("/posts", newPost);
      const allPosts = [...posts, response.data];
      console.log("res-data", response);
      setPosts(allPosts);
      setPostTitle("");
      setPostBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  return (
    <main className="NewPost">
      <h2>NewPost</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title</label>
        <input
          type="text"
          id="postTitle"
          required
          value={postTitle}
          onChange={(e) => {
            setPostTitle(e.target.value);
          }}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
