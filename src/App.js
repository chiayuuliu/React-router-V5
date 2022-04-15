import Header from "./component/Header";
import Nav from "./component/Nav";
import Home from "./component/Home";
import NewPost from "./component/NewPost";
import PostPage from "./component/PostPage";
import About from "./component/About";
import Missing from "./component/Missing";
import Footer from "./component/Footer";
import EditPost from "./component/EditPost";
import { Route, Switch } from "react-router-dom";
import { DataProvider } from "./context/DataContext";

const App = () => {
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          {/* 新增 */}
          <Route exact path="/post" component={NewPost} />
          {/* 編輯 */}
          <Route path="/edit/:id" component={EditPost} />
          {/* 細節頁 */}
          <Route path="/post/:id" component={PostPage} />
          <Route path="/about" component={About} />
          <Route path="*" component={Missing} />
        </Switch>
      </DataProvider>

      <Footer />
    </div>
  );
};
export default App;
