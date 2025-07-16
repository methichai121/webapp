import React from 'react';
import './Editprofilestudent.css';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHome } from 'react-icons/fa';

function Editprofilestudent() {
  return (
    <div>
      <div className="top-left">
        <Link to="/profilestudent" className="link-button">
          <FaArrowLeft size={40} color="royalblue" /> 
        </Link>
      </div>
      <div className="top-right">
        <Link to="/homestudent" className="link-button">
          <FaHome size={40} color="royalblue" /> 
        </Link>
      </div>

      <div className="form-container">
        <h2>แก้ไขโปรไฟล์</h2>

        {[
          { label: 'ชื่อ', type: 'text' },
          { label: 'นามสกุล', type: 'text' },
          { label: 'รหัสนักศึกษา', type: 'text' },
          { label: 'เพศ', type: 'text' },
          { label: 'เบอร์โทรศัพท์', type: 'tel' },
          { label: 'คณะ', type: 'text' },
          { label: 'วันเดือนปีเกิด', type: 'date' },
          { label: 'ที่อยู่', type: 'text' },
          { label: 'อีเมล', type: 'email' }
        ].map((field, index) => (
          <div className="input-group" key={index}>
            <label className="label">{field.label}</label>
            <input className="input" type={field.type} />
          </div>
        ))}

        <button className="button">บันทึก</button>
       
      </div>
    </div>
  );
}

export default Editprofilestudent;
