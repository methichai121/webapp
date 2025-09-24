import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Searchactivitystudent = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      navigate("/login");
    } else {
      setUserEmail(email);
    }

    fetch("http://127.0.0.1:5000/api/activities")
      .then((res) => res.json())
      .then((data) => {
        setActivities(data);
        setFilteredActivities(data);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [navigate]);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = activities.filter(
      (act) =>
        act.nameactivity.toLowerCase().includes(query) ||
        act.date.toLowerCase().includes(query) ||
        act.location.toLowerCase().includes(query)
    );
    setFilteredActivities(filtered);
  };

  const handleViewDetails = (id) => {
    navigate(`/activitydetailstudent/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
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
          input, textarea {
            display: block;
            width: 100%;
            padding: 10px;
            margin-bottom: 15px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }
          button {
            padding: 10px 20px;
            background-color: #0077b6;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.topBox}>
          <h2>ค้นหากิจกรรม (นักศึกษา)</h2>
          <p>เข้าสู่ระบบ: {userEmail}</p>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.leftSide}>
            <nav style={styles.nav}>
              <Link to="/homestudent" className="nav-item">หน้าหลัก</Link>
              <Link to="/profilestudent" className="nav-item">โปรไฟล์</Link>
              <Link to="/searchactivitystudent" className="nav-item">ค้นหากิจกรรม</Link>
              <Link to="/followactivitystudent" className="nav-item">กิจกรรมที่ติดตาม</Link>
              <Link to="/Checkhours" className="nav-item">
                              ดูจิตอาสาสะสม
                            </Link>
              <button className="nav-item" onClick={handleLogout}>ออกจากระบบ</button>
            </nav>
          </div>

          <div style={styles.rightSide}>
            <div style={styles.mainSection}>
              <h3>ค้นหากิจกรรม</h3>
              <input
                type="text"
                placeholder="พิมพ์ชื่อกิจกรรม, วันที่ หรือสถานที่"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button onClick={handleSearch}>ค้นหา</button>

              {filteredActivities.length === 0 ? (
                <p>ไม่พบกิจกรรมที่ค้นหา</p>
              ) : (
                filteredActivities.map((act) => (
                  <div key={act.activity_id} style={styles.activityItem}>
                    <h4>{act.nameactivity}</h4>
                    <p>วันที่: {act.date}</p>
                    <p>เวลา: {act.start_time} - {act.end_time}</p>
                    <p>สถานที่: {act.location}</p>
                    <button onClick={() => handleViewDetails(act.activity_id)}>
                      ดูรายละเอียด
                    </button>
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
  bottomBox: {
    backgroundColor: "#003366",
    color: "white",
    padding: "20px",
    textAlign: "center",
  },
};

export default Searchactivitystudent;
