import React, { useState, useEffect } from 'react';
import { BsFillPersonFill, BsFillHouseDoorFill, BsFillPhoneFill, BsFillBuildingFill, BsBookHalf, BsFillImageFill, BsFillArchiveFill, BsFillBookFill } from 'react-icons/bs';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const inputIconStyle = {
  marginRight: '10px',
  fontSize: '1.5em', // Adjust the size as needed
  verticalAlign: 'middle',
};


const buttonStyle = {
  marginTop: '-20px',
  padding: '39px',
  '&:hover': {
    backgroundColor: '#45a049',
  },
};

const addButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#4CAF50',
  color: 'white',
};

const assignButtonStyle = {
  ...buttonStyle,
  backgroundColor: 'darkmagenta',
  color: 'white',
  marginLeft: '-20px',
};

const ClassList = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classCount, setClassCount] = useState(0);
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [newClass, setNewClass] = useState({
    name: '',
    day: '',
    time: '',
    location: '',
    contactNumber: '',
    grade: '',
    medium: '',
    fee: '',
    assignedStudents: '',
  });



  const [existingClasses, setExistingClasses] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/classes')
      .then(response => {
        const currentDate = new Date();
        console.log('All Classes:', response.data);
        
        const filteredClasses = response.data.filter(classItem => {
          const classDate = new Date(`2022-01-01 ${classItem.time}`); // Use a fixed date (e.g., '2022-01-01') for parsing time
          
          // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
          const classDay = classDate.getDay();
          
          // Check if the class day is equal to or after the current day
          return classDay >= currentDate.getDay();
        });
        
        console.log('Filtered Classes:', filteredClasses);
  
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
      // const response = await axios.get('http://localhost:5000/classes');
      // setExistingClasses(response.data);

      setLoading(false);
      

      handleClose();
    } catch (error) {
      console.error('Error adding class:', error);
      setLoading(false);
      // Handle error state or display an error message to the user
    }
  };

  

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass((prevClass) => ({ ...prevClass, [name]: value }));
  };

  const handleEdit = (classId) => {
    // Handle edit functionality, you can redirect to the edit page
    console.log(`Editing class with ID: ${classId}`);
  };

  const handleDelete = (classId) => {
    // Handle delete functionality, you can show a confirmation modal
    console.log(`Deleting class with ID: ${classId}`);
  };

  const handleAssign = (classId) => {
    // Handle assign functionality, you can redirect to the assign page
    console.log(`Assigning students to class with ID: ${classId}`);
  };

  return (
    <main className='main-container'>
      <div>
        <div className='main-title'>
          <h3>CLASS DASHBOARD</h3>
        </div>
        <hr />

        <div className="flex-container">

          <div className='stucard'>
            <div className='card-inner'>
              <h3>CLASSES</h3>
              <BsFillArchiveFill className='card_icon' />
            </div>
            <h1>{classCount}</h1>
          </div>

          <div>
          <Button onClick={handleOpen} style={addButtonStyle}>
            <BsFillArchiveFill style={inputIconStyle} />
            Add New Class
          </Button>
          </div>

          <div>
          <div>
          <Button style={assignButtonStyle}>
            <BsFillArchiveFill style={inputIconStyle} />
            Assign Students
          </Button>
        </div>

          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a New Class
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 3 }}>
              <form onSubmit={handleSubmit}>
              
              
              
              <TextField
  label="Name of the class"
  variant="outlined"
  fullWidth
  margin="normal"
  type="name"
  name="name"
  value={newClass.name}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillPhoneFill style={inputIconStyle} />
    ),
  }}
  required
/>
              
              
              
              <TextField
        label="Day of the Week"
        variant="outlined"
        fullWidth
        margin="normal"
        select
        name="day"
        value={newClass.day}
        onChange={handleInputChange}
        InputProps={{
          startAdornment: (
            <BsFillHouseDoorFill style={inputIconStyle} />
          ),
        }}
        required
      >
        {day.map((day, index) => (
          <MenuItem key={index} value={day}>
            {day}
          </MenuItem>
        ))}
      </TextField>

<TextField
  label="Time"
  variant="outlined"
  fullWidth
  margin="normal"
  type="time"
  name="time"
  value={newClass.time}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillPhoneFill style={inputIconStyle} />
    ),
  }}
  required
/>

<TextField
  label="Location"
  variant="outlined"
  fullWidth
  margin="normal"
  name="location"
  value={newClass.location}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillBuildingFill style={inputIconStyle} />
    ),
  }}
  required
/>

<TextField
  label="Contact Number"
  variant="outlined"
  fullWidth
  margin="normal"
  type="tel"
  name="contactNumber"
  value={newClass.contactNumber}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsBookHalf style={inputIconStyle} />
    ),
  }}
  required
/>

<TextField
  label="Grade"
  variant="outlined"
  fullWidth
  margin="normal"
  name="grade"
  value={newClass.grade}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillImageFill style={inputIconStyle} />
    ),
  }}
  required
/>

<TextField
  label="Medium"
  variant="outlined"
  fullWidth
  margin="normal"
  name="medium"
  value={newClass.medium}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillArchiveFill style={inputIconStyle} />
    ),
  }}
  required
/>

<TextField
  label="Fee"
  variant="outlined"
  fullWidth
  margin="normal"
  type="number"
  name="fee"
  value={newClass.fee}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillBookFill style={inputIconStyle} />
    ),
  }}
  required
/>

<TextField
  label="Assign Students"
  variant="outlined"
  fullWidth
  margin="normal"
  type="String"
  name="assignedStudents"
  value={newClass.assignedStudents}
  onChange={handleInputChange}
  InputProps={{
    startAdornment: (
      <BsFillBookFill style={inputIconStyle} />
    ),
  }}
  required
/>

                <Button type='submit' className='addstudentsubmit'>
                  {loading ? 'Adding...' : 'Add Class'}
                </Button>

                {loading && <PulseLoader color="#36d7b7" />}
              </form>
            </Typography>
          </Box>
        </Modal>

        <h3>UPCOMMING CLASSES</h3>
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
  {upcomingClasses.map((classItem, index) => (
    <TableRow key={classItem._id} component={Link} to={`/classes/${classItem._id}`} style={{ textDecoration: 'none' }}>
      <TableCell>{classItem.name}</TableCell>
      <TableCell>{classItem.location}</TableCell>
      <TableCell>{classItem.day} : {classItem.time}</TableCell>

      <TableCell>
        <FaEdit
          style={{ cursor: 'pointer', marginRight: '10px', color: 'blue', fontSize: 'x-large' }}
          onClick={() => handleEdit(classItem._id)}
        />
        <FaTrash
          style={{ cursor: 'pointer', marginRight: '10px', color: 'red' ,  fontSize:'x-large' }}
          onClick={() => handleDelete(classItem._id)}
        />
        <FaUserPlus
          style={{ cursor: 'pointer', color: 'green' , fontSize: 'x-large'}}
          onClick={() => handleAssign(classItem._id)}
        />
      </TableCell>
    </TableRow>
  ))}
</TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
  );
};

export default ClassList;



