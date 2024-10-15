import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";
import BASE from "../config/apiconfig";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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
          status: true,
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
    }
  };

  return (
    <div className="container">
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
                className="form-control"
                value={password}
                autoComplete="off"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
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
