import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Navbar from "./components/Navbar";
import Post from "./components/Post";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Registration from "./components/Registration";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { useState, useEffect } from "react";
import { AuthContext } from "./helpers/AuthContext";

import axios from "axios";
import BASE from "./config/apiconfig";
import { useDispatch } from "react-redux";
import { login, logout } from "./features/authSlice";
import VerifyOTPForm from "./components/VerifyOTPForm";
import ForgotPassword from "./components/ForgotPassword";

function App() {
  const dispatch = useDispatch();
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });
  useEffect(() => {
    axios
      .get(`${BASE.API_DEPLOYED_BASE_URL}/auth/validate`, {
        headers: {
          AccessToken: localStorage.getItem("accessToken"),
        },
      })
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
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/verifyotp" element={<VerifyOTPForm />} />
          <Route path="/resetpassword" element={<ResetPasswordForm />} />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
