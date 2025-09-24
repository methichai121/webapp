import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Followactivityteacher = () => {
  const [followedActivities, setFollowedActivities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ดึงกิจกรรมที่ติดตามจาก localStorage
    const followed =
      JSON.parse(localStorage.getItem('followedActivities')) || [];
    setFollowedActivities(followed);
  }, []);

  const handleUnfollow = (activity_id) => {
    const updated = followedActivities.filter(
      (act) => act.activity_id !== activity_id
    );
    setFollowedActivities(updated);
    localStorage.setItem('followedActivities', JSON.stringify(updated));
    alert('ยกเลิกติดตามกิจกรรมเรียบร้อยแล้ว');
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
          <h2>กิจกรรมที่ติดตาม (สำหรับอาจารย์)</h2>
          <p>ดูรายการกิจกรรมที่คุณติดตามอยู่</p>
        </div>

        <div style={styles.mainContent}>
          <div style={styles.leftSide}>
            <nav style={styles.nav}>
              <Link to="/hometeacher" className="nav-item">หน้าหลัก</Link>
              <Link to="/profileteacher" className="nav-item">โปรไฟล์</Link>
              <Link to="/searchactivityteacher" className="nav-item">ค้นหากิจกรรม</Link>
              <Link to="/followactivityteacher" className="nav-item">กิจกรรมที่ติดตาม</Link>
              <Link to="/addactivity" className="nav-item">เพิ่มกิจกรรม</Link>
              <Link
                to="/"
                className="nav-item"
                onClick={() => localStorage.removeItem('userEmail')}
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
                    <p>เวลา: {act.start_time} - {act.end_time}</p>
                    <p>สถานที่: {act.location}</p>
                    <button onClick={() => navigate(`/activitydetailteacher/${act.activity_id}`)}>
                      ดูรายละเอียด
                    </button>
                    <button onClick={() => handleUnfollow(act.activity_id)}>
                      ยกเลิกติดตาม
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
  container: { display: 'flex', flexDirection: 'column', height: '100vh' },
  topBox: {
    backgroundColor: '#003366',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
  },
  mainContent: { display: 'flex', flex: 1, backgroundColor: '#f9f9f9' },
  leftSide: {
    width: '250px',
    backgroundColor: '#A1D8E6',
    padding: '20px',
    color: '#003366',
  },
  nav: { display: 'flex', flexDirection: 'column', gap: '20px' },
  rightSide: { flex: 1, padding: '20px' },
  mainSection: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  activityItem: {
    backgroundColor: 'white',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  bottomBox: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
};

export default Followactivityteacher;
