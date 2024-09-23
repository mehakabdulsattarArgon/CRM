import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Applogo } from "../../../Routes/ImagePath";
import { requestPasswordReset } from "../../../helpers/users";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleresetpassword = async () => {
    try {
      const result = requestPasswordReset(email);
      if (result === true) {
        alert("Reset Password link Sent");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="account-page">
      <div className="main-wrapper">
        <div className="account-content">
          <div className="container">
            <div className="account-logo">
              <Link to="/app/main/dashboard">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </Link>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Forgot Password?</h3>
                <p className="account-subtitle">
                  Enter your email to get a password reset link
                </p>
                <form>
                  <div className="input-block">
                    <label>Email Address</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-block text-center">
                    <button
                      className="btn btn-primary account-btn"
                      type="submit"
                      onClick={handleresetpassword}
                    >
                      Reset Password
                    </button>
                  </div>
                  <div className="account-footer">
                    <p>
                      Remember your password? <Link to="/">Login</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
