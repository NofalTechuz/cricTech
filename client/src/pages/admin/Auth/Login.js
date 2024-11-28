import React, { useState } from 'react';
import '../../../assets/css/admin/auth.css';
import { conf, urls } from '../../../Utils/Constant';
import { NavLink, useNavigate } from 'react-router-dom';
import PublicApiInstance from '../../../Utils/PublicApiInstance';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loginData.email === '' || loginData.password === '') {
      toast.error('Please enter email and password');
      return;
    }

    try {
      const res = await PublicApiInstance.post('/auth/login', loginData);

      if (!res) {
        toast.error(res.data.message);
      }
      console.log(res.data.data);
      const token = res?.data?.data?.token;
      Cookies.set('token', token, {
        expires: 7,
        path: '/',
        secure: false,
        sameSite: 'Lax',
      });

      navigate(urls.ADMIN_DASHBOARD);
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="form-parent-container">
        <div className="form-container">
          <div className="logo">
            <h1>{conf.SITE_TITLE}</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleInputChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleInputChange} required />
            <button type="submit">Log In</button>
          </form>
          <div className="link-text">
            <NavLink to={urls.ADMIN_FORGET_PASSWORD}>Forgot password?</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
