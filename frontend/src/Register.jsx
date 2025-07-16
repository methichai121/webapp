import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้ useNavigate
import { FaHome } from 'react-icons/fa'; // ใช้ FaHome

const Register = () => {
  const navigate = useNavigate(); // ใช้ navigate
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    faculty: '',
    major: '',
    year: '' // เพิ่มชั้นปี
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = (e) => {
  e.preventDefault(); // ห้ามหน้าเว็บรีเฟรชเมื่อ submit

  const email = formData.email.trim();

  if (!email) {
    setError('กรุณากรอกอีเมล');
    return;
  }

  const firstChar = email.charAt(0);

  if (/[a-zA-Z]/.test(firstChar)) {
    navigate('/hometeacher'); // ถ้าขึ้นต้นด้วย a-z
  } else if (/[0-9]/.test(firstChar)) {
    navigate('/homestudent'); // ถ้าขึ้นต้นด้วยเลข
  } else {
    setError('อีเมลไม่ถูกต้อง');
  }
};

  return (
    <>
      <div style={styles.container}>
        {/* ปุ่มมุมซ้ายบน */}
        <div style={styles.topLeft}>
          <a href="/" style={styles.linkButton}>
            <FaHome size={0} />
          </a>
        </div>

        {/* ฟอร์มสมัครสมาชิก */}
        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>ยืนยันข้อมูล</h2>

          {/* ชื่อจริงและนามสกุลอยู่ในช่องเดียวกัน */}
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

          {/* Input สำหรับอีเมล */}
          <input
            type="email"
            name="email"
            placeholder="อีเมล"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Input สำหรับคณะ */}
          <input
            type="text"
            name="faculty"
            placeholder="คณะ"
            value={formData.faculty}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Input สำหรับสาขา */}
          <input
            type="text"
            name="major"
            placeholder="สาขา"
            value={formData.major}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* Input สำหรับชั้นปี */}
          <input
            type="text"
            name="year"
            placeholder="ชั้นปี"
            value={formData.year}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {/* แสดงข้อความ error ถ้ามี */}
          {error && <p style={styles.error}>{error}</p>}

          {/* ปุ่มสมัครสมาชิกที่ไปหน้า Dashboard */}
          <button type="submit" style={styles.button}>
            สร้างบัญชี
          </button>
        </form>
      </div>
    </>
  );
};

// การใช้ styles ใน JSX
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
