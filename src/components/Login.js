import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import Loader from "./Loader";
import BASE from "../config/apiconfig";
import { Link } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccess(location.state.successMessage);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios
        .post(`${BASE.API_DEPLOYED_BASE_URL}/auth/login`, {
          username: username,
          password: password,
        })
        .then((res) => {
          return res;
        });

      if (!response.data.error) {
        setSuccess("Login successful!");
        const authData = {
          username: response.data.username,
          id: response.data.id,
          token: response.data.token,
        };
        dispatch(login(authData));
        navigation("/");
        setError("");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center">Login</h2>
          {error && <p className="alert alert-danger">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                autoComplete="off"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control mb-3"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Link to="/forgotpassword">Forgot Password/Username</Link>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
