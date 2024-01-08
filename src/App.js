import { useState } from 'react';
import './App.css';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/Students/StudentList.jsx';
import ShowStudent from './components/Students/ShowStudent.jsx';
import ClassList from './components/Classes/ClassList.js';
import ShowClass from './components/Classes/ShowClass.js';
import Calendar from './components/calender/calender.js';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Router>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/students" element={<StudentList />} />
          <Route path="/students/:id" element={<ShowStudent />} />

          <Route path="/classes" element={<ClassList />} />
          <Route path="/classes/:id" element={<ShowClass/>} />

          <Route path="/calender" element={<Calendar />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
