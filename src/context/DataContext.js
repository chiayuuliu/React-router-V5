import { createContext, useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

// 這邊放共用的資料
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  // 新增
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  // 修改
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const history = useHistory();
  const { width } = useWindowSize();
  const { data, fetchError, isLoading } = useAxiosFetch(
    "http://localhost:3500/posts"
  );

  // 相依性設定data, 就會在抓到資料的時候又在設定回posts，如果一開始因為時間差沒有抓到資料，當api有response 的時候又會在設定回posts

  useEffect(() => {
    console.log("data", data);
    setPosts(data);
  }, [data]);
  // axios 取資料方式取資料，有設定api的baseURL
  // axios 會自動處理錯誤，不用判斷是否有回應資料
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await api.get("/posts");
  //       setPosts(response.data);
  //     } catch (err) {
  //       if (err.response) {
  //         console.log(err.response.data);
  //         console.log(err.response.status);
  //         console.log(err.response.headers);
  //       } else {
  //         console.log(`Error:${err.message}`);
  //       }
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  //  篩選資料
  // 搜尋文章功能
  useEffect(() => {
    const filteredResults = posts.filter(
      // 文章標題"或"文章內容有包含搜尋字都回傳
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    // 讓最新的文章在最前面
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

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

  // 修改
  // 將要修改的新的文章標題跟內文設定給updatedPost 裡並送api
  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const updatedPost = { id, title: editTitle, datetime, body: editBody };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(
        posts.map((post) => (post.id === id ? { ...response.data } : post))
      );
      setEditTitle("");
      setEditBody("");
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };
  // 刪除
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter((post) => post.id !== id);
      setPosts(postsList);
      history.push("/");
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        handleSubmit,
        posts,
        handleEdit,
        editBody,
        setEditBody,
        editTitle,
        setEditTitle,
        handleDelete
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
