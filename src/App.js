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

import axios from "axios";
import BASE from "./config/apiconfig";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import VerifyOTPForm from "./components/VerifyOTPForm";

function App() {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get(
        `${BASE.API_DEPLOYED_BASE_URL}/auth/validate`,
        BASE.ACCESSTOKEN_HEADER
      )
      .then((res) => {
        if (res.data.error) {
          dispatch(logout());
        } else {
          const userData = {
            username: res.data.username,
            id: res.data.id,
            token: res.data.token,
          };
          dispatch(login(userData));
        }
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/verifyotp" element={<VerifyOTPForm />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
