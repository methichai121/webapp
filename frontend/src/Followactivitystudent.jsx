import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Followactivitystudent = () => {
  const [followedActivities, setFollowedActivities] = useState([]);
  const [joinedActivities, setJoinedActivities] = useState([]); // เก็บกิจกรรมที่เข้าร่วมแล้ว
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate("/"); // ถ้าไม่มีให้กลับหน้า login
    } else {
      setUserEmail(email);
    }

    const followed =
      JSON.parse(localStorage.getItem("followedActivitiesStudent")) || [];
    setFollowedActivities(followed);

    const joined =
      JSON.parse(localStorage.getItem("joinedActivitiesStudent")) || [];
    setJoinedActivities(joined);
  }, [navigate]);

  const handleUnfollow = (activity_id) => {
    const updated = followedActivities.filter(
      (act) => act.activity_id !== activity_id
    );
    setFollowedActivities(updated);
    localStorage.setItem("followedActivitiesStudent", JSON.stringify(updated));
    alert("ยกเลิกติดตามกิจกรรมเรียบร้อยแล้ว");
  };

  const handleJoin = (activity) => {
    const exists = joinedActivities.find(
      (a) => a.activity_id === activity.activity_id
    );
    if (exists) {
      alert("คุณเข้าร่วมกิจกรรมนี้แล้ว");
      return;
    }

    // คำนวณชั่วโมง (อย่างง่าย: สิ้นสุด - เริ่ม)
    const startHour = parseInt(activity.start_time.split(":")[0], 10);
    const endHour = parseInt(activity.end_time.split(":")[0], 10);
    const hours = endHour - startHour;

    const newActivity = {
      ...activity,
      hours: hours > 0 ? hours : 0,
    };

    const updated = [...joinedActivities, newActivity];
    setJoinedActivities(updated);
    localStorage.setItem("joinedActivitiesStudent", JSON.stringify(updated));

    alert("เข้าร่วมกิจกรรมเรียบร้อยแล้ว");
  };

  const handleCancelJoin = (activity_id) => {
    const updated = joinedActivities.filter(
      (act) => act.activity_id !== activity_id
    );
    setJoinedActivities(updated);
    localStorage.setItem("joinedActivitiesStudent", JSON.stringify(updated));
    alert("ยกเลิกการเข้าร่วมกิจกรรมแล้ว");
  };

  const isJoined = (id) => {
    return joinedActivities.some((act) => act.activity_id === id);
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
            transition: background-color 0.3s;
            display: block;
          }
          .nav-item:hover {
            background-color: #0077b6;
            color: #fff;
          }
          button {
            padding: 10px 20px;
            margin-right: 10px;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.topBox}>
          <h2>กิจกรรมที่ติดตาม (นักศึกษา)</h2>
          <p>เข้าสู่ระบบ: {userEmail}</p>
        </div>

        <div style={styles.mainContent}>
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
              <Link to="/checkhours" className="nav-item">
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

          <div style={styles.rightSide}>
            <div style={styles.mainSection}>
              {followedActivities.length === 0 ? (
                <p>คุณยังไม่มีรายการกิจกรรมที่ติดตาม</p>
              ) : (
                followedActivities.map((act) => (
                  <div key={act.activity_id} style={styles.activityItem}>
                    <h4>{act.nameactivity}</h4>
                    <p>วันที่: {act.date}</p>
                    <p>
                      เวลา: {act.start_time} - {act.end_time}
                    </p>
                    <p>สถานที่: {act.location}</p>

                    <button
                      style={{ backgroundColor: "#0077b6" }}
                      onClick={() =>
                        navigate(`/activitydetailstudent/${act.activity_id}`)
                      }
                    >
                      ดูรายละเอียด
                    </button>

                    <button
                      style={{ backgroundColor: "orange" }}
                      onClick={() => handleUnfollow(act.activity_id)}
                    >
                      ยกเลิกติดตาม
                    </button>

                    {isJoined(act.activity_id) ? (
                      <>
                        <button style={{ backgroundColor: "green" }} disabled>
                          เข้าร่วมแล้ว
                        </button>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={() => handleCancelJoin(act.activity_id)}
                        >
                          ยกเลิกการเข้าร่วม
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          style={{ backgroundColor: "#0077b6" }}
                          onClick={() => handleJoin(act)}
                        >
                          เข้าร่วมกิจกรรม
                        </button>
                        <button style={{ backgroundColor: "gray" }} disabled>
                          ยังไม่ได้เข้าร่วม
                        </button>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

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
  activityItem: {
    backgroundColor: "white",
    padding: "15px",
    marginBottom: "15px",
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

export default Followactivitystudent;
