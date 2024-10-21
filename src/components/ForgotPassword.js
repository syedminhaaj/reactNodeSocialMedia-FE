import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import BASE from "../config/apiconfig";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios
        .post(`${BASE.API_DEPLOYED_BASE_URL}/forgotpassword`, {
          email: email,
        })
        .then((res) => {
          if (res.data.message) {
            setLoading(false);
            setSuccess("Registration successful!");
            setError("");
            navigation("/verifyotp", {
              state: { email, page: "resetPassword" },
            });
          }
        });
    } catch (err) {
      setError("err.response.data");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="forgot-password">
            <h2 className="text-center">Enter Email</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-3">
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
