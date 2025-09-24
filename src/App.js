import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Register from './Register'; 
import Home from './Home'; 
import Forgotpassword from './Forgotpassword'; // ✅ ชื่อเดียวกับไฟล์
import Profile from './Profile'; // ✅ ชื่อเดียวกับไฟล์
import Editprofile from './Editprofile';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/editprofile" element={<Editprofile />} /> 
      </Routes>
    </Router>

  );
}

export default App;
 