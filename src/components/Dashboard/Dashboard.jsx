import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ClassCard from '../Classes/ClassCard';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';



function Dashboard() {
  const [classCount, setClassCount] = useState(0);
  const [classData, setClassData] = useState([]);

  const [studentCount, setStudentCount] = useState(0);
  const [studentData, setStudentData] = useState([]);



  const [totalSalary, setTotalSalary] = useState(0);

  useEffect(() => {
    // Calculate total salary by summing up fees from each class
    const calculatedTotalSalary = classData.reduce((acc, classItem) => {
      return acc + classItem.fee;
    }, 0);
  
    setTotalSalary(calculatedTotalSalary);
  }, [classData]);


  useEffect(() => {
    axios.get('http://localhost:5000/classes')

      .then(response => {
        const filteredClasses = response.data.filter(classItem => {
          // You can add any filtering logic here if needed
          return true;
        });
        setClassCount(filteredClasses.length);
        setClassData(filteredClasses);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);



  useEffect(() => {
    axios.get('http://localhost:5000/students')

      .then(response => {
        const filteredStu = response.data.filter(classItem => {
          // You can add any filtering logic here if needed
          return true;
        });
        setStudentCount(filteredStu.length);
        setStudentData(filteredStu);
      })
      .catch(error => {
        console.error('Error fetching Studetns:', error);
      });
  }, []);





  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>CLASSES</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{classCount}</h1>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>STUDENTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{studentCount}</h1>
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>EXPECTED SALLERY </h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>
          <>Rs.</> {totalSalary}
         
            </h1>
          
          
        </div>

        <div className='card'>
          <div className='card-inner'>
            <h3>PAYMENTS</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{classCount}</h1>
        </div>

      </div>
    </main>
  );
}

export default Dashboard;
