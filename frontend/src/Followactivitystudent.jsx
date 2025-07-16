import React from 'react';
import { Link } from 'react-router-dom';

const Followactivitystudent = () => {
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
          <h2>กิจกรรมที่ติดตาม</h2>
          <p>ดูรายการกิจกรรมที่คุณติดตามอยู่</p>
        </div>

        {/* Main content container */}
        <div style={styles.mainContent}>
          {/* Left Side (Menu) */}
          <div style={styles.leftSide}>
            <header style={styles.header}>
              <nav style={styles.nav}>
                <Link to="/homestudent" className="nav-item">หน้าหลัก</Link>
                <Link to="/profile" className="nav-item">โปรไฟล์</Link>
                <Link to="/searchactivitystudent" className="nav-item">ค้นหากิจกรรม</Link>
                <Link to="/followactivitystudent" className="nav-item">กิจกรรมที่ติดตาม</Link>
                <Link to="/checkhours" className="nav-item">ดูจิตอาสาสะสม</Link>
                <Link to="/" className="nav-item">ออกจากระบบ</Link>
              </nav>
            </header>
          </div>

          {/* Right Side (Main content) */}
          <div style={styles.rightSide}>
            <section style={styles.mainSection}>
              <h3 style={styles.sectionTitle}>รายการกิจกรรมที่ติดตาม</h3>

              <div style={styles.activityList}>
                <div style={styles.activityItem}>
                  <h4>กิจกรรม A</h4>
                  <p>วันที่: 5 สิงหาคม 2567</p>
                  <p>สถานที่: อาคารเรียนรวม</p>
                  <button style={styles.joinButton}>ดูรายละเอียด</button>
                  <button style={styles.unfollowButton}>ยกเลิกติดตาม</button>
                </div>

                <div style={styles.activityItem}>
                  <h4>กิจกรรม B</h4>
                  <p>วันที่: 10 กันยายน 2567</p>
                  <p>สถานที่: หอประชุมใหญ่</p>
                  <button style={styles.joinButton}>ดูรายละเอียด</button>
                  <button style={styles.unfollowButton}>ยกเลิกติดตาม</button>
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
    flex: '0 1 100px',
    color: '#fff',
  },
  mainContent: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  leftSide: {
    width: '250px',
    backgroundColor: '#A1D8E6',
    padding: '20px',
    color: '#003366',
  },
  header: {
    marginBottom: '30px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  rightSide: {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
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
  activityList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  activityItem: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#f1f9ff',
  },
  joinButton: {
    marginTop: '10px',
    marginRight: '10px',
    padding: '8px 16px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  unfollowButton: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#b60000',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  bottomBox: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flex: '0 1 100px',
  },
};

export default Followactivitystudent;
