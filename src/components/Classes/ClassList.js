// ClassList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

import ClassCard from './ClassCard';
import AddClassModal from './AddClassModal';
import UpcomingClassesTable from './UpcomingClassesTable';

const ClassList = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classCount, setClassCount] = useState(0);
  const [newClass, setNewClass] = useState({
    name: '',
    day: '',
    time: '',
    // ... (other fields)
  });

  const [existingClasses, setExistingClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/classes')
      .then(response => {
        const currentDate = new Date();
        const filteredClasses = response.data.filter(classItem => {
          const classDate = new Date(`2022-01-01 ${classItem.time}`);
          const classDay = classDate.getDay();
          return classDay >= currentDate.getDay();
        });
        setExistingClasses(response.data);
        setUpcomingClasses(filteredClasses);
        setClassCount(filteredClasses.length);
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      await axios.post('http://localhost:5000/classes/create', newClass);
      setLoading(false);
      handleClose();
    } catch (error) {
      console.error('Error adding class:', error);
      setLoading(false);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass(prevClass => ({ ...prevClass, [name]: value }));
  };

  const handleEdit = (classId) => {
    console.log(`Editing class with ID: ${classId}`);
  };

  const handleDelete = (classId) => {
    console.log(`Deleting class with ID: ${classId}`);
  };

  const handleAssign = (classId) => {
    console.log(`Assigning students to class with ID: ${classId}`);
  };

  return (
    <main className='main-container'>
      <div>
        <ClassCard classCount={classCount} handleOpen={handleOpen} />
        <AddClassModal
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          loading={loading}
          newClass={newClass}
          handleInputChange={handleInputChange}
        />
        <UpcomingClassesTable
          upcomingClasses={upcomingClasses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          handleAssign={handleAssign}
        />
      </div>
    </main>
  );
};

export default ClassList;
