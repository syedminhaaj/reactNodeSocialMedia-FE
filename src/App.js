import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";
import BASE from "./config/apiconfig";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get(`${BASE.API_DEPLOYED_BASE_URL}/auth/validate`, {
        headers: BASE.ACCESSTOKEN_HEADER,
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
      <Provider store={store}>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
          </Routes>
        </AuthContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
