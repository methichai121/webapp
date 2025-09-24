import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaUserCircle, FaBell } from 'react-icons/fa';
import './Dashboard.css'; // <-- เพิ่มบรรทัดนี้

const Dashboard = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    alert("คุณได้ออกจากระบบแล้ว");
  };

  return (
    <>
      {/* ปุ่มมุมซ้ายบน */}
      <div className="top-left">
        <Link to="/login" className="link-button">
          <FaArrowLeft size={40} />
        </Link>
      </div>

      {/* ไอคอนมุมขวาบน */}
      <div className="top-right">
        <div className="icon-button">
          <FaBell size={26} />
        </div>

        <div onClick={() => setDropdownOpen(!dropdownOpen)} className="link-button">
          <FaUserCircle size={40} />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/profile" className="dropdown-link">โปรไฟล์</Link>
            <span onClick={handleLogout} className="dropdown-item">
              ออกจากระบบ
            </span>
          </div>
        )}
      </div>

      {/* เนื้อหาหลัก */}
      <div style={{ padding: '50px', textAlign: 'center' }}>
        <h1>🎉 ยินดีต้อนรับเข้าสู่ Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
