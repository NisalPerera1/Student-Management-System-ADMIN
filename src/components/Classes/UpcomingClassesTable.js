import React from 'react';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

// Function to get the index of the day in a week (considering Monday as the first day)
const getDayIndex = (day) => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return daysOfWeek.indexOf(day);
};

const UpcomingClassesTable = ({ upcomingClasses, handleEdit, handleDelete, handleAssign }) => {
  const currentDate = new Date();

  const sortedClasses = upcomingClasses.sort((a, b) => {
    const dayA = getDayIndex(a.day);
    const dayB = getDayIndex(b.day);

    // Compare the day indices
    if (dayA < dayB) {
      return -1;
    } else if (dayA > dayB) {
      return 1;
    }

    // If days are equal, sort based on time
    const timeA = a.time;
    const timeB = b.time;

    if (timeA < timeB) {
      return -1;
    } else if (timeA > timeB) {
      return 1;
    }

    // If times are also equal, the classes are considered equal
    return 0;
  });

  return (
    <div>
      <h3>UPCOMING CLASSES</h3>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className='TableHead'>
              <TableCell>Name</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Date & Time</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedClasses.map((classItem, index) => (
              <TableRow key={classItem._id}>
                <TableCell>
                  <Link to={`/classes/${classItem._id}`} style={{ textDecoration: 'none' }}>
                    <span>{classItem.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{classItem.location}</TableCell>
                <TableCell>{classItem.day} : {classItem.time}</TableCell>
                <TableCell>
                  <FaEdit
                    style={{ cursor: 'pointer', marginRight: '10px', color: 'blue', fontSize: 'x-large' }}
                    onClick={() => handleEdit(classItem._id)}
                  />
                  <FaTrash
                    style={{ cursor: 'pointer', marginRight: '10px', color: 'red', fontSize: 'x-large' }}
                    onClick={() => handleDelete(classItem._id)}
                  />
                  <FaUserPlus
                    style={{ cursor: 'pointer', color: 'green', fontSize: 'x-large' }}
                    onClick={() => handleAssign(classItem._id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UpcomingClassesTable;
