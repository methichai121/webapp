import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import Addactivity from './Addactivity';
import Checkhours from './Checkhours';
import Dashboard from './Dashboard';
import Login from './Login';
import Editprofilestudent from './Editprofilestudent';
import Editprofileteacher from './Editprofileteacher';
import Followactivitystudent from './Followactivitystudent';
import Followactivityteacher from './Followactivityteacher';
import Forgotpassword from './Forgotpassword'; 
import Homestudent from './Homestudent'; 
import Hometeacher from './Hometeacher';
import Profilestudent from './Profilestudent';
import Profileteacher from './Profileteacher';
import Register from './Register'; 
import Searchactivitystudent from './Searchactivitystudent'; 
import Searchactivityteacher from './Searchactivityteacher'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/addactivity" element={<Addactivity />} />
        <Route path="/checkhours" element={<Checkhours />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/editprofileteacher" element={<Editprofileteacher />} />
        <Route path="/editprofilestudent" element={<Editprofilestudent />} />
        <Route path="/followactivityteacher" element={<Followactivityteacher />} />
        <Route path="/followactivitystudent" element={<Followactivitystudent />} />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/homestudent" element={<Homestudent />} />       
        <Route path="/hometeacher" element={<Hometeacher />} />
        <Route path="/profilestudent" element={<Profilestudent />} />  
        <Route path="/profileteacher" element={<Profileteacher />} />      
        <Route path="/register" element={<Register />} /> 
        <Route path="/searchactivityteacher" element={<Searchactivityteacher />} /> 
        <Route path="/searchactivitystudent" element={<Searchactivitystudent />} /> 
      </Routes>
    </Router>
  );
}

export default App;
