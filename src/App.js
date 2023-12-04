import { useState } from 'react';
import './App.css';
import Header from './components/Header/header';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/Students/StudentList.jsx';

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
        {/* Use Routes to define your navigation */}
        <Routes>
          {/* Specify the Dashboard component only when the path is / */}
          <Route path="/" element={<Dashboard />} />
          {/* Specify the StudentList component only when the path is /students */}
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
