import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === '1234') {
      navigate('/dashboard');
    } else {
      setError('Username หรือ Password ไม่ถูกต้อง');
    }
  };

  const styles = {
    topLeft: {
      position: 'fixed',
      top: 20,
      left: 20,
      zIndex: 1, // ลดให้ต่ำกว่ากล่องฟอร์ม
    },
    topRight: {
      position: 'fixed',
      top: 20,
      right: 20,
      zIndex: 1,
    },
    linkButton: {
      textDecoration: 'none',
      color: 'black',
    },
  };

  return (
    <>
      {/* ปุ่มมุมซ้ายบน */}
      <div style={styles.topLeft}>
        <Link to="/" style={styles.linkButton}>
          <FaArrowLeft size={40} />
        </Link>
      </div>

      {/* ปุ่มมุมขวาบน */}
      <div style={styles.topRight}>
        <Link to="/" style={styles.linkButton}>
          <FaHome size={40} />
        </Link>
      </div>

      {/* เนื้อหาหลัก */}
      <div className="login-wrapper" style={{ padding: '50px', textAlign: 'center' }}>
        <div
          className="login-container"
          style={{
            backgroundColor: 'transparent', // ไม่มีพื้นหลังขาว
            boxShadow: 'none',              // ไม่มีเงา
            borderRadius: 0,                // มุมไม่โค้ง
          }}
        >
          <div className="icon">👥</div>

          <input
            type="text"
            placeholder="USERNAME"
            className="input-field username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError('');
            }}
          />
          <input
            type="password"
            placeholder="********"
            className="input-field password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
          />

          <div className="options">
            <label>
              <input type="checkbox" defaultChecked /> Remember me
            </label>
            <Link to="/forgotpassword">Forgot password?</Link>
          </div>

          {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}

          <button className="login-button" onClick={handleLogin}>
            LOGIN
          </button>

          <div className="register-link" style={{ marginTop: '15px' }}>
            ยังไม่มีบัญชี ?{' '}
            <Link to="/register">
              <button className="register-button">สมัครสมาชิก</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
