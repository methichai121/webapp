import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

const styles = {
  topLeft: {
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 1,
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
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '300px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginTop: '20px',
  },
};

function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {/* ปุ่มมุมซ้ายบน */}
      <div style={styles.topLeft}>
        <Link to="/login" style={styles.linkButton}>
          <FaArrowLeft size={40} />
        </Link>
      </div>

      {/* ปุ่มมุมขวาบน */}
      <div style={styles.topRight}>
        <Link to="/" style={styles.linkButton}>
          <FaHome size={40} />
        </Link>
      </div>

      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h2>ลืมรหัสผ่าน</h2>
        <p>กรุณากรอกอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน</p>

        <input
          type="email"
          name="email"
          placeholder="อีเมล"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
      </div>
    </>
  );
}

export default ForgotPassword;
