import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'; // CSS ที่คุณมีอยู่แล้ว

import googleLogo from './assets/Google-Icon-2025.png'; // โลโก้ Google

const Login = () => {
  return (
    <div className="container">
      {/* ฝั่งซ้าย */}
      <div className="leftSide">

      </div>

      {/* ฝั่งขวา */}
      <div className="rightSide">
        <div className="form">
          <h2>เข้าสู่ระบบ</h2>
          <Link to="/register">
            <button className="buttonStyle">
              <img src={googleLogo} alt="Google logo" className="iconStyle" />
              เข้าสู่ระบบด้วยบัญชี Google
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
