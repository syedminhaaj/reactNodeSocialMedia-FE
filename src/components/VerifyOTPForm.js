import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import BASE from "../config/apiconfig";
import { useLocation } from "react-router-dom";
import "./allStyles/VerifyOTPForm.css";

const VerifyOTPForm = ({ verifyOtp }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigation = useNavigate();
  const location = useLocation();
  const { email, page } = location?.state;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.trim() === "" || otp.length !== 6) {
      setError("OTP required & must be a 6-digit number");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE.API_DEPLOYED_BASE_URL}/verifyotp`,
        {
          otp: otp,
          email: email,
        }
      );
      if (response.status == 200) {
        if (page == "registration") {
          navigation("/login", {
            state: { successMessage: "OTP Verified successfully!" },
          });
        } else if (page == "resetPassword") {
          navigation("/resetpassword", {
            state: { successMessage: "OTP Verified successfully!", email },
          });
        }
      } else if (response.status == 400) {
        setError("Invalid otp or OTP expired");
      }
      setError("");
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="otp-form">
            <h2 className="text-center">Verify OTP</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Enter OTP:</label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
              {error && <p className="text-danger">{error}</p>}
              <div className="text-center">
                <button type="submit" className="btn btn-primary mt-3">
                  Verify OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTPForm;
