import React from 'react';
import { Link } from 'react-router-dom';

const Searchactivitystudent = () => {
  return (
    <>
      {/* Inline CSS สำหรับ hover */}
      <style>
        {`
          .nav-item {
            color: #003366;
            text-decoration: none;
            font-size: 16px;
            padding: 10px;
            line-height: 1.8;
            border-radius: 4px;
            transition: background-color 0.3s;
            display: block;
          }
          .nav-item:hover {
            background-color: #0077b6;
            color: #fff;
          }
        `}
      </style>

      {/* Main container */}
      <div style={styles.container}>
        
        {/* Top Box (Header) */}
        <div style={styles.topBox}>
          <h2>ค้นหากิจกรรมของนักศึกษา</h2>
          <p>ค้นหากิจกรรมที่คุณสนใจและสมัครเข้าร่วมได้เลย</p>
        </div>

        {/* Main content container */}
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
                                {/* เพิ่มลิงก์ที่ "ออกจากระบบ" เพื่อไปหน้า Login */}
                                <Link to="/" style={styles.navItem}>ออกจากระบบ</Link> 
                              </nav>
            </header>
          </div>

          {/* Right Side (Main content) */}
          <div style={styles.rightSide}>
            <section style={styles.mainSection}>
              <h3 style={styles.sectionTitle}>ค้นหากิจกรรม</h3>
              <input
                type="text"
                placeholder="พิมพ์ชื่อกิจกรรมหรือหน่วยงาน"
                style={styles.inputField}
              />
              <button style={styles.searchButton}>ค้นหา</button>

              {/* ตัวอย่างผลลัพธ์ */}
              <div style={styles.activityList}>
                <div style={styles.activityItem}>
                  <h4>กิจกรรมปลูกป่า</h4>
                  <p>วันที่: 12 สิงหาคม 2567</p>
                  <p>สถานที่: มหาวิทยาลัยตัวอย่าง</p>
                  <button style={styles.joinButton}>ดูรายละเอียด</button>
                </div>

                <div style={styles.activityItem}>
                  <h4>กิจกรรมทำความสะอาดชายหาด</h4>
                  <p>วันที่: 20 กันยายน 2567</p>
                  <p>สถานที่: หาดสมบูรณ์</p>
                  <button style={styles.joinButton}>ดูรายละเอียด</button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Bottom Box (Footer) */}
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
export default Searchactivitystudent;
