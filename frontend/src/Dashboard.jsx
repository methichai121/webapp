import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>ยังไม่มีชื่อ</div>
        <nav style={styles.nav}>
          <Link to="/" style={styles.navItem}>หน้าหลัก</Link>
          <Link to="/login" style={styles.navItem}>เข้าสู่ระบบ</Link>
          <Link to="/register" style={styles.navItem}>สมัครสมาชิก</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroText}>
            studentvolunteer<br />ค้นหางานจิตอาสา
          </h1>
        </div>
      </section>

      {/* Search Section */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="ค้นหางานอาสา"
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>🔍</button>
      </div>

      {/* Content Section */}
      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>บริการของเรา</h2>
        <div style={styles.cardContainer}>
          <div style={styles.card}>
            <h3>บริการที่ 1</h3>
            <p>รายละเอียดของบริการที่ 1</p>
          </div>
          <div style={styles.card}>
            <h3>บริการที่ 2</h3>
            <p>รายละเอียดของบริการที่ 2</p>
          </div>
          <div style={styles.card}>
            <h3>บริการที่ 3</h3>
            <p>รายละเอียดของบริการที่ 3</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 studentvolunteer. All Rights Reserved.</p>
      </footer>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: 'rgba(247, 204, 65, 0.5)',
    padding: '20px 40px',
    display: 'flex',
    flexDirection: 'column',  // เปลี่ยนให้เป็นแนวตั้ง
    justifyContent: 'flex-start',  // จัดเนื้อหาทางซ้าย
    alignItems: 'flex-start',  // จัดตำแหน่งเมนูทางซ้าย
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',  // เพิ่มช่องว่างระหว่างโลโก้และเมนู
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',  // เปลี่ยนให้เมนูแสดงในแนวตั้ง
    gap: '15px',  // ช่องว่างระหว่างเมนู
  },
  navItem: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  heroSection: {
    height: '400px',
    backgroundImage: 'url("https://www.jitarsabank.com/images/home-bg.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    position: 'relative',
  },
  heroOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroText: {
    color: 'white',
    fontSize: '36px',
    textAlign: 'center',
    lineHeight: '1.5',
  },
  searchContainer: {
    textAlign: 'center',
    margin: '20px 0',
  },
  searchInput: {
    padding: '10px',
    width: '300px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    padding: '10px 20px',
    marginLeft: '10px',
    backgroundColor: '#f7d007',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  section: {
    padding: '60px 20px',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: '28px',
    marginBottom: '30px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    width: '250px',
    textAlign: 'left',
  },
  footer: {
    backgroundColor: '#003366',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    marginTop: '40px',
  },
};

export default Home;
