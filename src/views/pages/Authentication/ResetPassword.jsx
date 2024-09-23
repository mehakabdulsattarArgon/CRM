import React, { useState } from "react";
import { Applogo } from "../../../Routes/ImagePath";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const { uid, token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  // const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    console.log(error);
    console.log(uid);
    console.log(message);

    try {
      const response = await axios.post(
        `http://182.176.91.106:8002/api/password-reset-confirm/${uid}/${token}/`,
        {
          new_password: newPassword,
          confirm_password: confirmPassword,
        }
      );
      console.log(response);
      setMessage("Password has been reset successfully.");
      navigate("/login");
    } catch (error) {
      setError("Invalid token or the token has expired.");
    }
  };

  return (
    <div>
      <div className="account-page">
        <div className="main-wrapper">
          <div className="account-content">
            {/* Account Logo */}
            <div className="account-logo">
              <Link to="/admin-dashboard">
                <img src={Applogo} alt="Dreamguy's Technologies" />
              </Link>
            </div>
            <div className="account-box">
              <div className="account-wrapper">
                <h3 className="account-title">Reset Password</h3>
                <form>
                  {/* <div className="input-block mb-3">
                    <label className="col-form-label">Old password</label>
                    <input type="password" className="form-control" />
                  </div> */}
                  <div className="input-block mb-3">
                    <label className="col-form-label">New password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="input-block mb-3">
                    <label className="col-form-label">Confirm password</label>
                    <input
                      type="password"
                      className="form-control"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="submit-section mb-4">
                    <Link
                      to="/admin-dashboard"
                      className="btn btn-primary submit-btn"
                      onClick={handleSubmit}
                    >
                      Update Password
                    </Link>
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

export default ChangePassword;
