import React, { useEffect, useState } from 'react'; // ✅ เพิ่ม useEffect และ useState
import { Link } from 'react-router-dom';

const Homestudent = () => {
  const [message, setMessage] = useState(""); // ✅ state สำหรับเก็บข้อความ

  // ✅ เรียก API จาก Flask เมื่อ component โหลด
  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/hello") // หรือ "/api/hello" ถ้าใช้ proxy
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error("เกิดข้อผิดพลาด:", err));
  }, []);

  return (
    <>
      {/* Main container */}
      <div style={styles.container}>
        
        {/* Top Box */}
        <div style={styles.topBox}>
          <h2>ของนักศึกษา</h2>
          <p>ข้อมูลหรือคำแนะนำที่ด้านบนสุด</p>
        </div>

        <div style={styles.mainContent}>
          {/* Left Side (Menu) */}
          <div style={styles.leftSide}>
            <header style={styles.header}>
              <nav style={styles.nav}>
                <Link to="/homestudent" style={styles.navItem}>หน้าหลัก</Link>
                <Link to="/profilestudent" style={styles.navItem}>โปรไฟล์</Link>
                <Link to="/searchactivitystudent" style={styles.navItem}>ค้นหากิจกรรม</Link>
                <Link to="/followactivitystudent" style={styles.navItem}>กิจกรรมที่ติดตาม</Link>
                <Link to="/Checkhours" style={styles.navItem}>ดูจิตอาสาสะสม</Link>
                <Link to="/" style={styles.navItem}>ออกจากระบบ</Link>
              </nav>
            </header>
          </div>

          {/* Right Side (Main content) */}
          <div style={styles.rightSide}>
            <section style={styles.mainSection}>
              <h3 style={styles.sectionTitle}>กรอกข้อมูล</h3>
              
              {/* ✅ แสดงข้อความจาก Flask */}
              <p><strong>ข้อความจากเซิร์ฟเวอร์:</strong> {message}</p>

              <input
                type="text"
                placeholder="ชื่อหน่วยงาน"
                style={styles.inputField}
              />
              <textarea
                placeholder="รายละเอียดเพิ่มเติม"
                style={styles.textArea}
              ></textarea>
              <div style={styles.imageBox}></div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.bottomBox}>
          <p>ติดต่อเรา: example@domain.com</p>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  topBox: {
    backgroundColor: '#003366',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flex: '0 1 100px', // กำหนดความสูงของกล่องบนสุด
  },
  mainContent: {
    display: 'flex',
    flex: 1, // ใช้พื้นที่ที่เหลือ
    backgroundColor: '#f9f9f9',
  },
  leftSide: {
    width: '250px',
    backgroundColor: '#A1D8E6', // สีพื้นหลังของฝั่งซ้าย
    padding: '20px',
    color: '#003366',
  },
  header: {
    marginBottom: '30px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // เพิ่มช่องว่างระหว่างเมนู
  },
  navItem: {
    color: '#003366',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px',
    lineHeight: '1.8',
    borderRadius: '4px',
    transition: 'background-color 0.3s', // เพิ่มการเปลี่ยนสีเมื่อ hover
  },
  navItemHover: {
    backgroundColor: '#0077b6',
  },
  rightSide: {
    flex: 1, // ฝั่งขวาจะยืดตามขนาดที่เหลือ
    padding: '20px',
  },
  mainSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#003366',
  },
  inputField: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  imageBox: {
    height: '150px',
    backgroundColor: '#d0e6f7',
    borderRadius: '8px',
    border: '2px solid #0077b6',
  },
  bottomBox: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flex: '0 1 100px', // กำหนดความสูงของกล่องล่างสุด
  },
};
export default Homestudent;