import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/createpost" Component={CreatePost} />
          <Route path="/post/:id" Component={Post} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
