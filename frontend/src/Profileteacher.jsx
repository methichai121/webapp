import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaEdit } from 'react-icons/fa';
import axios from 'axios';

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
  container: {
    padding: '60px 20px',
    maxWidth: '600px',
    margin: 'auto',
  },
  item: {
    marginBottom: '15px',
    fontSize: '18px',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  editButton: {
    marginTop: '30px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
  }
};

function Profileteacher() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    const id = localStorage.getItem('userId');

    if (!email || !id) {
      alert("ไม่พบข้อมูลผู้ใช้ กรุณาเข้าสู่ระบบ");
      navigate("/login");
      return;
    }

    setUserEmail(email);
    setUserId(id);

    axios.get(`http://localhost:5000/api/teacher/${id}`)
      .then(res => {
        setProfileData(res.data || {}); // ถ้าไม่มีข้อมูลให้เป็น object ว่าง
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) return <p>กำลังโหลดข้อมูล...</p>;
  if (error) return <p>{error}</p>;

  // ✅ field จะ render ก็ต่อเมื่อมีใน profileData จริง ๆ
  const fields = [
    { key: 'firstname', label: 'ชื่อ' },
    { key: 'lastname', label: 'นามสกุล' },
    { key: 'studentid', label: 'รหัสนักศึกษา' },
    { key: 'sex', label: 'เพศ' },
    { key: 'phone', label: 'เบอร์โทร' },
    { key: 'faculty', label: 'คณะ' },
    { key: 'major', label: 'สาขา' },
    { key: 'year', label: 'ชั้นปี' },
    { key: 'dateofburn', label: 'วันเดือนปีเกิด' },
    { key: 'address', label: 'ที่อยู่' },
  ];

  return (
    <div style={styles.container}>
      {/* ปุ่มกลับ */}
      <div style={styles.topLeft}>
        <Link to="/hometeacher" style={styles.linkButton}>
          <FaArrowLeft size={40} color="royalblue" />
        </Link>
      </div>

      {/* ปุ่มหน้าแรก */}
      <div style={styles.topRight}>
        <Link to="/hometeacher" style={styles.linkButton}>
          <FaHome size={40} color="royalblue" />
        </Link>
      </div>

      <h2>รายละเอียดโปรไฟล์</h2>

      <div style={styles.item}>
        <span style={styles.label}>อีเมล:</span>
        <span>{userEmail}</span>
      </div>

      {/* ✅ แสดงเฉพาะ field ที่มีข้อมูล */}
      {fields.map((item, index) =>
        profileData[item.key] ? (
          <div key={index} style={styles.item}>
            <span style={styles.label}>{item.label}:</span>
            <span>{profileData[item.key]}</span>
          </div>
        ) : null
      )}

      {/* ปุ่มแก้ไขโปรไฟล์ */}
      <Link to="/editprofileteacher" style={styles.linkButton}>
        <button style={styles.editButton}>
          <FaEdit /> แก้ไขโปรไฟล์
        </button>
      </Link>
    </div>
  );
}

export default Profileteacher;
