import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
function App() {
  return (
    <div className="App">
      <Router>
        <Link to="/createpost">Create Post</Link>
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/createpost" Component={CreatePost} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
