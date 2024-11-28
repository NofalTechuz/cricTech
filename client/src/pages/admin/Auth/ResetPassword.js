import React from 'react';
import { conf } from '../../../Utils/Constant';
import '../../../assets/css/admin/auth.css';

const ResetPassword = () => {
  return (
    <>
      <div className="form-parent-container">
        <div className="form-container">
          <div className="logo">
            <h1>{conf.SITE_TITLE}</h1>
          </div>
          <p className="instructions">Enter your new password below.</p>
          <form action="#" method="POST">
            <input type="password" name="new_password" placeholder="New Password" required />
            <input type="password" name="confirm_password" placeholder="Confirm New Password" required />
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
