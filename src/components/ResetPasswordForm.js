import { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import BASE from "../config/apiconfig";

function ResetPassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const { email, successMessage } = location?.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Password doesn't match");
    }
    try {
      const response = await axios.post(
        `${BASE.API_DEPLOYED_BASE_URL}/forgotpassword/resetpassword`,
        {
          username: username,
          password: password,
          email: email,
        }
      );

      if (response.data.message) {
        setLoading(false);
        setSuccess("Reset Password successful!");
        setError("");
        navigation("/login", {
          state: { successMessage: "OTP Verified successfully!" },
        });
      }
    } catch (err) {}
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-4 bg-light rounded shadow"
    >
      <h3>Reset Username or Password </h3>
      <div className="form-group mb-3">
        <label>Email</label>
        <input
          type="text"
          value={email}
          readOnly
          className="form-control form-control-plaintext"
        />
      </div>

      <div className="form-group mb-3">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
          autoComplete="off"
        />
      </div>

      <div className="form-group mb-3">
        <label>New Password</label>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          required
          autoComplete="off"
        />
      </div>

      <div className="form-group mb-3">
        <label>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="form-control"
          required
          autoComplete="off"
        />
      </div>

      {error && <p className="text-danger">{error}</p>}

      <button type="submit" className="btn btn-primary w-100">
        Reset Password
      </button>
    </form>
  );
}

export default ResetPassword;
