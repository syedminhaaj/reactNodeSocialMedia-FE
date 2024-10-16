import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import BASE from "../config/apiconfig";
import Loader from "./Loader";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      //  const hashedPassword = await bcrypt.hash(password, 10);
      setLoading(true);
      const response = await axios.post(`${BASE.API_DEPLOYED_BASE_URL}/auth`, {
        username,
        password: password,
      });

      console.log("res ****", response.data);
      if (response.data.message) {
        setLoading(false);
        setSuccess("Registration successful!");
        setError("");
        navigation("/login");
      }
    } catch (err) {
      setError("Registration failed");
      setLoading(false);
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
          <h2 className="text-center">Register</h2>

          {error && <p className="alert alert-danger">{error}</p>}
          {success && <p className="alert alert-success">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
