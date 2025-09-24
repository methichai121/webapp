import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const Activitydetailstudent = () => {
  const { id } = useParams(); // ดึง activity_id จาก URL
  const [activity, setActivity] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) navigate("/login");
    else setUserEmail(email);

    // ดึงข้อมูลกิจกรรมจาก API
    fetch(`http://127.0.0.1:5000/api/activities/${id}`)
      .then((res) => res.json())
      .then((data) => setActivity(data))
      .catch((err) => console.error("Fetch error:", err));
  }, [id, navigate]);

  if (!activity) {
    return (
      <div style={styles.container}>
        <div style={styles.topBox}>กำลังโหลดข้อมูลกิจกรรม...</div>
      </div>
    );
  }

  // คำนวณจำนวนชั่วโมง (อย่างง่าย: เอาแค่ชั่วโมงเต็ม)
  const calculateHours = (start, end) => {
    try {
      const startHour = parseInt(start.split(":")[0], 10);
      const endHour = parseInt(end.split(":")[0], 10);
      const diff = endHour - startHour;
      return diff > 0 ? diff : 0;
    } catch {
      return 0;
    }
  };

  const hours = calculateHours(activity.start_time, activity.end_time);

  // ฟังก์ชันติดตามกิจกรรมสำหรับนักศึกษา
  const handleFollow = () => {
    let followed =
      JSON.parse(localStorage.getItem("followedActivitiesStudent")) || [];

    if (!followed.find((a) => a.activity_id === activity.activity_id)) {
      followed.push({ ...activity, hours }); // เก็บจำนวนชั่วโมงด้วย
      localStorage.setItem(
        "followedActivitiesStudent",
        JSON.stringify(followed)
      );
      alert("ติดตามกิจกรรมเรียบร้อยแล้ว!");
    } else {
      alert("คุณติดตามกิจกรรมนี้แล้ว");
    }
  };

  return (
    <>
      <style>
        {`
          .nav-item {
            color: #003366;
            text-decoration: none;
            font-size: 16px;
            padding: 10px;
            line-height: 1.8;
            border-radius: 4px;
            transition: background-color 0.3s, color 0.3s;
            display: block;
          }
          .nav-item:hover {
            background-color: #0077b6;
            color: #fff;
          }
          button {
            padding: 10px 20px;
            background-color: #0077b6;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-right: 10px;
          }
        `}
      </style>

      <div style={styles.container}>
        {/* Top Box */}
        <div style={styles.topBox}>
          <h2>รายละเอียดกิจกรรม (นักศึกษา)</h2>
          <p>เข้าสู่ระบบ: {userEmail}</p>
        </div>

        <div style={styles.mainContent}>
          {/* Left Side Menu */}
          <div style={styles.leftSide}>
            <nav style={styles.nav}>
              <Link to="/homestudent" className="nav-item">
                หน้าหลัก
              </Link>
              <Link to="/profilestudent" className="nav-item">
                โปรไฟล์
              </Link>
              <Link to="/searchactivitystudent" className="nav-item">
                ค้นหากิจกรรม
              </Link>
              <Link to="/followactivitystudent" className="nav-item">
                กิจกรรมที่ติดตาม
              </Link>
              <Link to="/Checkhours" className="nav-item">
                ดูจิตอาสาสะสม
              </Link>
              <Link
                to="/"
                className="nav-item"
                onClick={() => localStorage.removeItem("userEmail")}
              >
                ออกจากระบบ
              </Link>
            </nav>
          </div>

          {/* Right Side Content */}
          <div style={styles.rightSide}>
            <div style={styles.mainSection}>
              <h3>{activity.nameactivity}</h3>
              <p>
                <strong>วันที่:</strong> {activity.date}
              </p>
              <p>
                <strong>เวลา:</strong> {activity.start_time} - {activity.end_time}
              </p>
              <p>
                <strong>จำนวนชั่วโมง:</strong> {hours} ชั่วโมง
              </p>
              <p>
                <strong>สถานที่:</strong> {activity.location}
              </p>
              <p>
                <strong>รายละเอียด:</strong>
              </p>
              <p>{activity.description || "ไม่มีรายละเอียดเพิ่มเติม"}</p>

              {/* ปุ่มย้อนกลับ และ ติดตามกิจกรรม */}
              <button onClick={() => navigate(-1)}>ย้อนกลับ</button>
              <button onClick={handleFollow}>ติดตามกิจกรรม</button>
            </div>
          </div>
        </div>

        {/* Bottom Box */}
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
  nav: { display: "flex", flexDirection: "column", gap: "20px" },
  rightSide: { flex: 1, padding: "20px" },
  mainSection: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  bottomBox: {
    backgroundColor: "#003366",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
};

export default Activitydetailstudent;
