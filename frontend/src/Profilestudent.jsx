import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaEdit } from 'react-icons/fa';



const styles = {
  topLeft: {
    position: 'fixed',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  topRight: {
    position: 'fixed',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  linkButton: {
    textDecoration: 'none',
    color: 'black',
  },
  container: {
    padding: '60px 20px',
    maxWidth: '600px',
    margin: 'auto',
  },
  item: {
    marginBottom: '15px',
    fontSize: '18px',
  },
  label: {
    fontWeight: 'bold',
    marginRight: '10px',
  },
  editButton: {
    marginTop: '30px',
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px'
  }
};

function Profilestudent() {
  // สมมติว่าข้อมูลมาจาก state หรือ backend
  const profileData = {
    firstName: 'สมชาย',
    lastName: 'ใจดี',
    studentId: '65010001',
    gender: 'ชาย',
    phone: '0891234567',
    faculty: 'วิศวกรรมศาสตร์',
    birthDate: '2003-05-10',
    major: 'วิศวกรรมคอมพิวเตอร์',
    email: 'somchai@example.com',
  };

  return (
    <>
      {/* ปุ่มกลับและโฮม */}
      <div style={styles.topLeft}>
        <Link to="/homestudent" style={styles.linkButton}><FaArrowLeft size={40} /></Link>
      </div>
      <div style={styles.topRight}>
        <Link to="/homestudent" style={styles.linkButton}><FaHome size={40} /></Link>
      </div>

      {/* แสดงรายละเอียดโปรไฟล์ */}
      <div style={styles.container}>
        <h2>รายละเอียดโปรไฟล์</h2>

        {[
          { label: 'ชื่อ', value: profileData.firstName },
          { label: 'นามสกุล', value: profileData.lastName },
          { label: 'รหัสนักศึกษา', value: profileData.studentId },
          { label: 'เพศ', value: profileData.gender },
          { label: 'เบอร์โทรศัพท์', value: profileData.phone },
          { label: 'คณะ', value: profileData.faculty },
          { label: 'วันเดือนปีเกิด', value: profileData.birthDate },
          { label: 'สาขา', value: profileData.major },
          { label: 'อีเมล', value: profileData.email },
        ].map((item, index) => (
          <div key={index} style={styles.item}>
            <span style={styles.label}>{item.label}:</span>
            <span>{item.value}</span>
          </div>
        ))}

        {/* ปุ่มแก้ไข */}
       <Link to="/editprofilestudent" style={styles.editButton}>
        <FaEdit />
           แก้ไขโปรไฟล์
       </Link>
      </div>
    </>
  );
}

export default Profilestudent;
