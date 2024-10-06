import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Login from "./components/Login";
import Registration from "./components/Registration";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/validate", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: res.data.username,
            id: res.data.id,
            status: true,
          });
        }
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/createpost" Component={CreatePost} />
            <Route path="/post/:id" Component={Post} />
            <Route path="/login" Component={Login} />
            <Route path="/registration" Component={Registration} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
