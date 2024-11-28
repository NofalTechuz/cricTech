import React from 'react';
import { conf, urls } from '../../../Utils/Constant';
import { NavLink } from 'react-router-dom';
import '../../../assets/css/admin/auth.css';

const ForgetPassword = () => {
  return (
    <>
      <div className="form-parent-container">
        <div className="form-container">
          <div className="logo">
            <h1>{conf.SITE_TITLE}</h1>
          </div>
          <p className="instructions">Enter your email address and we'll send you a link to reset your password.</p>
          <form action="#" method="POST">
            <input type="email" name="email" placeholder="Email" required />
            <button type="submit">Send Reset Link</button>
          </form>
          <div className="link-text">
            <NavLink to={urls.ADMIN_SINGIN}>Back to Login</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
