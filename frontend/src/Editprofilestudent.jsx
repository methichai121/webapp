import React, { useState, useEffect } from 'react';
import './Editprofilestudent.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';
import axios from 'axios';

function Editprofilestudent() {
  const navigate = useNavigate();

  // ดึง userId จาก localStorage เป็นหลัก fallback ถ้าไม่ได้มาจาก Route param
  const [userId, setUserId] = useState(localStorage.getItem('userId') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    studentid: '',
    sex: '',
    phone: '',
    faculty: '',
    major: '',
    year: '',
    dateofburn: '',
  });

  useEffect(() => {
    if (!userId) {
      alert("ไม่พบผู้ใช้ กรุณา login หรือ register ก่อน");
      navigate("/login");
      return;
    }

    setLoading(true);
    axios.get(`http://localhost:5000/api/student/${userId}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        setLoading(false);
      });
  }, [userId, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("userId ไม่ถูกต้อง");
      return;
    }

    try {
      const payload = {
        ...formData,
        dateofburn: formData.dateofburn || null
      };

      const res = await axios.put(
        `http://localhost:5000/api/student/update/${userId}`,
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(res.data.message || 'บันทึกสำเร็จ');
      navigate(`/profilestudent`);
      

    } catch (err) {
      console.error("Backend error:", err.response?.data || err.message);
      alert(`เกิดข้อผิดพลาด: ${err.response?.data?.error || err.message}`);
    }
  };

  if (loading) return <p>กำลังโหลดข้อมูลผู้ใช้...</p>;

  return (
    <div>
      {/* ปุ่มกลับหน้าโปรไฟล์ */}
      <div className="top-left">
        <Link to={`/profilestudent/`} className="link-button">
          <FaArrowLeft size={40} color="royalblue" />
        </Link>
      </div>

      {/* ปุ่มไปหน้า home student */}
      <div className="top-right">
        <Link to="/homestudent" className="link-button">
          <FaHome size={40} color="royalblue" />
        </Link>
      </div>

      <div className="form-container">
        <h2>แก้ไขโปรไฟล์</h2>
        {error && <p className="error">{error}</p>}

        {/* สร้าง input ทุก field แบบ dynamic */}
        {[
          { name: 'firstname', label: 'ชื่อ', type: 'text' },
          { name: 'lastname', label: 'นามสกุล', type: 'text' },
          { name: 'studentid', label: 'รหัสนักศึกษา', type: 'text' },
          { name: 'sex', label: 'เพศ', type: 'text' },
          { name: 'phone', label: 'เบอร์โทรศัพท์', type: 'tel' },
          { name: 'faculty', label: 'คณะ', type: 'text' },
          { name: 'major', label: 'สาขา', type: 'text' },
          { name: 'year', label: 'ชั้นปี', type: 'text' },
          { name: 'dateofburn', label: 'วันเดือนปีเกิด', type: 'date' },
        ].map((field, index) => (
          <div className="input-group" key={index}>
            <label className="label">{field.label}</label>
            <input
              className="input"
              name={field.name}
              type={field.type}
              value={formData[field.name] || ''}
              onChange={handleChange}
            />
          </div>
        ))}

        <button className="button" onClick={handleSubmit}>
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default Editprofilestudent;