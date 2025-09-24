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


{/* วางช่องค้นหาไว้ตรงนี้ */}
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
            <h3></h3>
            <p></p>
          </div>
          <div style={styles.card}>
            <h3></h3>
            <p></p>
          </div>
          <div style={styles.card}>
            <h3></h3>
            <p></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <p></p>
      </footer>
    </>
  );
};

const styles = {
  header: {
    backgroundColor: 'rgba(247, 204, 65, 0.5)',
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 999,
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
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
