import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // 👈 เพิ่มบรรทัดนี้
import { FaHome } from 'react-icons/fa'; // ด้านบนไฟล์

import { FaArrowLeft } from 'react-icons/fa'; // 👈 เพิ่มตรงนี้



const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    console.log('ข้อมูลที่สมัคร:', formData);
    setError('');
    alert('สมัครสมาชิกสำเร็จ!');
  };

  return (<><div style={styles.container}>
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

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>สมัครสมาชิก</h2>

        <input
          type="text"
          name="firstName"
          placeholder="ชื่อจริง"
          value={formData.firstName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="lastName"
          placeholder="นามสกุล"
          value={formData.lastName}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="text"
          name="username"
          placeholder="ชื่อผู้ใช้ (Username)"
          value={formData.username}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="รหัสผ่าน"
          value={formData.password}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="ยืนยันรหัสผ่าน"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="อีเมล"
          value={formData.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>สร้างบัญชี</button>
      </form>
    </div></>
    
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #fde9c9, #dbe9f4)',
    position: 'relative'
  },
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
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    width: '300px',
    textAlign: 'center'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '0.5rem 0',
    borderRadius: '5px',
    border: '1px solid #ccc'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'royalblue',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    fontSize: '0.9rem'
  }
};


export default Register;
