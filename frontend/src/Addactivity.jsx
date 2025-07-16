import React from 'react';
import { Link } from 'react-router-dom';

const Addactivity = () => {
  return (
    <>
      {/* Inline CSS สำหรับ hover */}
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
        
  {`
    /* ...style เดิมของคุณ... */

    @media (max-width: 768px) {
      .main-content {
        flex-direction: column;
      }

      .left-side {
        width: 100%;
        padding: 10px;
        text-align: center;
      }

      .right-side {
        padding: 10px;
      }

      input, textarea {
        font-size: 14px;
        padding: 8px;
      }

      button {
        font-size: 14px;
        padding: 10px;
        width: 100%;
      }

      .nav-item {
        padding: 8px;
        font-size: 15px;
      }

      .top-box h2 {
        font-size: 20px;
      }

      .section-title {
        font-size: 20px;
      }
    }

    @media (max-width: 480px) {
      .nav-item {
        font-size: 14px;
      }

      .section-title {
        font-size: 18px;
      }

      input, textarea {
        font-size: 13px;
      }

      button {
        font-size: 13px;
      }
    }
  `}
</style>

     

      {/* Main container */}
      <div style={styles.container}>
        
        {/* Top Box (Header) */}
        <div style={styles.topBox}>
          <h2>เพิ่มกิจกรรมใหม่</h2>
          <p>กรอกข้อมูลกิจกรรมที่จะเพิ่มเข้าสู่ระบบ</p>
        </div>

        {/* Main content container */}
        <div style={styles.mainContent}>
          {/* Left Side (Menu) */}
          <div style={styles.leftSide}>
            <header style={styles.header}>
              <nav style={styles.nav}>
                <Link to="/hometeacher" style={styles.navItem}>หน้าหลัก</Link>                
                <Link to="/profileteacher" style={styles.navItem}>โปรไฟล์</Link>           
                <Link to="/searchactivityteacher" style={styles.navItem}>ค้นหากิจกรรม</Link> 
                <Link to="/followactivityteacher" style={styles.navItem}>กิจกรรมที่ติดตาม</Link> 
                <Link to="/addactivity" style={styles.navItem}>เพิ่มกิจกรรม</Link>
                {/* เพิ่มลิงก์ที่ "ออกจากระบบ" เพื่อไปหน้า Login */}
                <Link to="/" style={styles.navItem}>ออกจากระบบ</Link> </nav>
            </header>
          </div>

          {/* Right Side (Main content) */}
          <div style={styles.rightSide}>
            <section style={styles.mainSection}>
              <h3 style={styles.sectionTitle}>ฟอร์มเพิ่มกิจกรรม</h3>

              <form>
                <input type="text" placeholder="ชื่อกิจกรรม" required />
                <input type="date" placeholder="วันที่จัดกิจกรรม" required />
                <input type="text" placeholder="สถานที่" required />
                <input type="number" placeholder="จำนวนชั่วโมง" required min="1" />
                <textarea placeholder="รายละเอียดกิจกรรมเพิ่มเติม" rows="4"></textarea>
                <button type="submit">บันทึกกิจกรรม</button>
              </form>
            </section>
          </div>
        </div>

        {/* Bottom Box (Footer) */}
        <div style={styles.bottomBox}>
          <p>ติดต่อเรา: example@domain.com</p>
        </div>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  topBox: {
    backgroundColor: '#003366',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flex: '0 1 100px', // กำหนดความสูงของกล่องบนสุด
  },
  mainContent: {
    display: 'flex',
    flex: 1, // ใช้พื้นที่ที่เหลือ
    backgroundColor: '#f9f9f9',
  },
  leftSide: {
    width: '250px',
    backgroundColor: '#A1D8E6', // สีพื้นหลังของฝั่งซ้าย
    padding: '20px',
    color: '#003366',
  },
  header: {
    marginBottom: '30px',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // เพิ่มช่องว่างระหว่างเมนู
  },
  navItem: {
    color: '#003366',
    textDecoration: 'none',
    fontSize: '16px',
    padding: '10px',
    lineHeight: '1.8',
    borderRadius: '4px',
    transition: 'background-color 0.3s', // เพิ่มการเปลี่ยนสีเมื่อ hover
  },
  navItemHover: {
    backgroundColor: '#0077b6',
  },
  rightSide: {
    flex: 1, // ฝั่งขวาจะยืดตามขนาดที่เหลือ
    padding: '20px',
  },
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
  inputField: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '20px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textArea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    height: '100px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginBottom: '20px',
  },
  imageBox: {
    height: '150px',
    backgroundColor: '#d0e6f7',
    borderRadius: '8px',
    border: '2px solid #0077b6',
  },
  bottomBox: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    flex: '0 1 100px', // กำหนดความสูงของกล่องล่างสุด
  },
};
export default Addactivity;
