import React from 'react';
import './Login.css'; 
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase'; 
import { Link, useNavigate } from 'react-router-dom'; 
import googleLogo from './assets/Google-Icon-2025.png';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      console.log('เริ่ม Google login...');
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('เข้าสู่ระบบสำเร็จ:', user);

      const email = user.email.toLowerCase();
      const firstChar = email.charAt(0);

      // ตรวจสอบผู้ใช้กับ backend
      const response = await fetch('http://localhost:5000/api/check-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (!response.ok) {
        throw new Error(`Backend error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      if (data.exists) {
        // เก็บ userId ของ MySQL (ไม่ใช่ Firebase UID)
        localStorage.setItem('userId', data.user_id);
        localStorage.setItem('userEmail', email);

        // ตรวจสอบตัวแรกของ email เพื่อเลือกหน้า Home
        if (/[0-9]/.test(firstChar)) {
          console.log('Navigate to /homestudent');
          navigate('/homestudent');
        } else if (/[a-z]/.test(firstChar)) {
          console.log('Navigate to /hometeacher');
          navigate('/hometeacher');
        }
      } else {
        // ยังไม่มีบัญชี → redirect ไป Register
        console.log('Navigate to /register');
        navigate('/register', { state: { email } });
      }

    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่');
    }
  };

  return (
    <div className="container">
      <div className="leftSide"></div>
      <div className="rightSide">
        <div className="form">
          <h2>เข้าสู่ระบบ</h2>
          <button className="buttonStyle" onClick={handleGoogleLogin}>
            <img src={googleLogo} alt="Google logo" className="iconStyle" />
            เข้าสู่ระบบด้วยบัญชี Google
          </button>
          <p>
            ยังไม่มีบัญชี? <Link to="/register">ลงทะเบียน</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
