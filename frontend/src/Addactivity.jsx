import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Addactivity = () => {
  // เก็บค่าจากฟอร์ม
  const [formData, setFormData] = useState({
    nameactivity: '',
    description: '',
    date: '',
    start_time: '',
    end_time: '',
    location: '',
    hours: '',
    note: '',
  });

  const [image, setImage] = useState(null); // เก็บไฟล์รูปภาพ

  // ฟังก์ชันเปลี่ยนค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ฟังก์ชันเปลี่ยนค่ารูปภาพ
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // ฟังก์ชัน submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in formData) {
        data.append(key, formData[key]);
      }
      if (image) {
        data.append('image', image);
      }

      const res = await axios.post('http://localhost:5000/api/activities', data);
      alert('บันทึกกิจกรรมสำเร็จ!');
      console.log(res.data);
    } catch (error) {
      console.error('เกิดข้อผิดพลาด:', error);
      alert('บันทึกกิจกรรมไม่สำเร็จ');
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
            transition: background-color 0.3s;
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
          <h2>เพิ่มกิจกรรมใหม่</h2>
          <p>กรอกข้อมูลกิจกรรมที่จะเพิ่มเข้าสู่ระบบ</p>
        </div>

        <div style={styles.mainContent}>
          {/* เมนูซ้าย */}
          <div style={styles.leftSide}>
            <nav style={styles.nav}>
              <Link to="/hometeacher" className="nav-item">หน้าหลัก</Link>
              <Link to="/profileteacher" className="nav-item">โปรไฟล์</Link>
              <Link to="/searchactivityteacher" className="nav-item">ค้นหากิจกรรม</Link>
              <Link to="/followactivityteacher" className="nav-item">กิจกรรมที่ติดตาม</Link>
              <Link to="/addactivity" className="nav-item">เพิ่มกิจกรรม</Link>
              <Link to="/" className="nav-item">ออกจากระบบ</Link>
            </nav>
          </div>

          {/* แบบฟอร์ม */}
          <div style={styles.rightSide}>
            <section style={styles.mainSection}>
              <h3 style={styles.sectionTitle}>ฟอร์มเพิ่มกิจกรรม</h3>

              <form onSubmit={handleSubmit}>
                <input type="text" name="nameactivity" placeholder="ชื่อกิจกรรม" value={formData.nameactivity} onChange={handleChange} required />
                <textarea name="description" placeholder="รายละเอียดกิจกรรม" rows="4" value={formData.description} onChange={handleChange} required></textarea>

                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="start_time" placeholder="เวลาเริ่ม" value={formData.start_time} onChange={handleChange} required />
                <input type="time" name="end_time" placeholder="เวลาสิ้นสุด" value={formData.end_time} onChange={handleChange} required />

                <input type="text" name="location" placeholder="สถานที่จัดกิจกรรม" value={formData.location} onChange={handleChange} required />
                <input type="number" name="hours" placeholder="จำนวนชั่วโมงที่จะได้รับ" value={formData.hours} onChange={handleChange} required min="1" />
                
                <textarea name="note" placeholder="หมายเหตุเพิ่มเติม (ถ้ามี)" rows="2" value={formData.note} onChange={handleChange}></textarea>

                <label>อัปโหลดรูปภาพกิจกรรม:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />

                <button type="submit">บันทึกกิจกรรม</button>
              </form>
            </section>
          </div>
        </div>

        <div style={styles.bottomBox}>
          <p>ติดต่อเรา: example@domain.com</p>
        </div>
      </div>
    </>
  );
};

// ✅ CSS ด้วย JavaScript (Inline styles)
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
  sectionTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#003366',
  },
  bottomBox: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
  },
};

export default Addactivity;
