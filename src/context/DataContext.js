import { createContext, useState, useEffect } from "react";
import useAxiosFetch from "../hooks/useAxiosFetch";

// 這邊放共用的資料
const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
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

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResults,
        fetchError,
        isLoading,
        posts,
        setPosts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
