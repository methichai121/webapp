import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ดึง email จาก location.state (ถ้ามี)
  const initialEmail = location.state?.email || '';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: initialEmail,
    faculty: '',
    major: '',
    year: ''
  });

  const [error, setError] = useState('');

  // ถ้า location.state.email เปลี่ยน ให้ update formData.email ด้วย (optional)
  useEffect(() => {
    if (initialEmail) {
      setFormData(prev => ({ ...prev, email: initialEmail }));
    }
  }, [initialEmail]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
// ฟังก์ชัน handleSubmit ทำงานเมื่อผู้ใช้กดปุ่ม "สมัครสมาชิก" หรือส่งฟอร์ม
const handleSubmit = async (e) => {
  e.preventDefault(); // ป้องกันไม่ให้ฟอร์มรีเฟรชหน้าเว็บ

  const email = formData.email.trim(); // เอา email จาก state แล้วตัดช่องว่างออก

  // ✅ ตรวจว่ามีการกรอก email หรือยัง
  if (!email) {
    setError('กรุณากรอกอีเมล');
    return; // ถ้ายังไม่กรอกให้หยุดการทำงาน
  }

  try {
    // ✅ ส่งข้อมูลฟอร์มไปยัง Flask Backend
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST', // ใช้ POST เพราะเราจะส่งข้อมูลใหม่ไปเพิ่มในฐานข้อมูล
      headers: { 'Content-Type': 'application/json' }, // บอกว่าข้อมูลที่ส่งเป็น JSON
      body: JSON.stringify(formData) // แปลง object formData เป็น JSON string
    });

    // ✅ รับคำตอบจากเซิร์ฟเวอร์แล้วแปลงเป็น JSON
    const data = await response.json();
    console.log('Server response:', data);

    if (response.ok) {
      // ถ้าบันทึกสำเร็จ → เช็กอักษรแรกของ email เพื่อกำหนดหน้า redirect
      const firstChar = email.charAt(0);

      if (/[a-zA-Z]/.test(firstChar)) {
        // ถ้าอักษรแรกเป็นตัวอักษร → ไปหน้าอาจารย์
        navigate('/hometeacher');
      } else if (/[0-9]/.test(firstChar)) {
        // ถ้าอักษรแรกเป็นตัวเลข → ไปหน้านักเรียน
        navigate('/homestudent');
      } else {
        setError('อีเมลไม่ถูกต้อง');
      }
    } else {
      // ถ้า API ตอบ error เช่น SQL error หรือข้อมูลซ้ำ
      setError(data.error || 'ไม่สามารถบันทึกข้อมูลได้');
    }
  } catch (error) {
    // ถ้าการเชื่อมต่อ Flask server ล้มเหลว (เช่น server ปิดอยู่)
    console.error('Error:', error);
    setError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
  }
};

  return (
    <>
      <div style={styles.container}>
        <div style={styles.topLeft}>
          <a href="/" style={styles.linkButton}>
            <FaHome size={20} />
          </a>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <h2>ยืนยันข้อมูล</h2>

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
            type="email"
            name="email"
            placeholder="อีเมล"
            value={formData.email}
            readOnly
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="faculty"
            placeholder="คณะ"
            value={formData.faculty}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="major"
            placeholder="สาขา"
            value={formData.major}
            onChange={handleChange}
            required
            style={styles.input}
          />

          <input
            type="text"
            name="year"
            placeholder="ชั้นปี"
            value={formData.year}
            onChange={handleChange}
            required
            style={styles.input}
          />

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" style={styles.button}>
            สร้างบัญชี
          </button>
        </form>
      </div>
    </>
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
