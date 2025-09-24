import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Checkhours = () => {
  const [joinedActivities, setJoinedActivities] = useState([]);

  useEffect(() => {
    const joined =
      JSON.parse(localStorage.getItem("joinedActivitiesStudent")) || [];
    setJoinedActivities(joined);
  }, []);

  const totalHours = joinedActivities.reduce(
    (sum, act) => sum + (act.hours || 0),
    0
  );

  return (
    <>
      {/* Inline CSS สำหรับ hover และ table */}
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
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid #ccc;
            padding: 12px;
            text-align: left;
          }
          th {
            background-color: #003366;
            color: #fff;
          }
        `}
      </style>

      <div style={styles.container}>
        {/* Top Box */}
        <div style={styles.topBox}>
          <h2>ตรวจสอบชั่วโมงจิตอาสาสะสม</h2>
          <p>ดูรายละเอียดชั่วโมงจิตอาสาที่คุณได้เข้าร่วม</p>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Left Menu */}
          <div style={styles.leftSide}>
            <header style={styles.header}>
              <nav style={styles.nav}>
                <Link to="/homestudent" className="nav-item">หน้าหลัก</Link>                
                <Link to="/profilestudent" className="nav-item">โปรไฟล์</Link>           
                <Link to="/searchactivitystudent" className="nav-item">ค้นหากิจกรรม</Link> 
                <Link to="/followactivitystudent" className="nav-item">กิจกรรมที่ติดตาม</Link> 
                <Link to="/checkhours" className="nav-item">ดูจิตอาสาสะสม</Link>
                <Link to="/" className="nav-item">ออกจากระบบ</Link> 
              </nav>
            </header>
          </div>

          {/* Right Content */}
          <div style={styles.rightSide}>
            <section style={styles.mainSection}>
              <h3 style={styles.sectionTitle}>ชั่วโมงจิตอาสาของฉัน</h3>

              {joinedActivities.length === 0 ? (
                <p>คุณยังไม่ได้เข้าร่วมกิจกรรม</p>
              ) : (
                <table>
                  <thead>
                    <tr>
                      <th>ชื่อกิจกรรม</th>
                      <th>วันที่เข้าร่วม</th>
                      <th>จำนวนชั่วโมง</th>
                    </tr>
                  </thead>
                  <tbody>
                    {joinedActivities.map((act) => (
                      <tr key={act.activity_id}>
                        <td>{act.nameactivity}</td>
                        <td>{act.date}</td>
                        <td>{act.hours} ชั่วโมง</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              <div style={styles.totalHours}>
                <strong>รวมทั้งหมด:</strong> {totalHours} ชั่วโมง
              </div>
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
  container: { display: "flex", flexDirection: "column", height: "100vh" },
  topBox: {
    backgroundColor: "#003366",
    padding: "20px",
    textAlign: "center",
    color: "white",
  },
  mainContent: { display: "flex", flex: 1, backgroundColor: "#f9f9f9" },
  leftSide: {
    width: "250px",
    backgroundColor: "#A1D8E6",
    padding: "20px",
    color: "#003366",
  },
  header: { marginBottom: "30px" },
  nav: { display: "flex", flexDirection: "column", gap: "20px" },
  rightSide: { flex: 1, padding: "20px" },
  mainSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  sectionTitle: { fontSize: "24px", marginBottom: "20px", color: "#003366" },
  totalHours: { marginTop: "20px", fontSize: "18px" },
  bottomBox: {
    backgroundColor: "#003366",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
};

export default Checkhours;
