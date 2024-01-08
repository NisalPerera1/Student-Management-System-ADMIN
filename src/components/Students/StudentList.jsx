import React, { useState, useEffect } from 'react';
import { BsFillPersonFill, BsFillHouseDoorFill, BsFillPhoneFill, BsFillBuildingFill, BsBookHalf, BsFillImageFill, BsFillArchiveFill, BsFillBookFill } from 'react-icons/bs';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import axios from 'axios';
import { PulseLoader } from 'react-spinners';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import maleThumbnail from './39874.jpg'
import femaleThumbnail from './k7a0_b7ad_210527.jpg';
import { Link } from 'react-router-dom';


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

const addButtonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  marginTop: '-20px',
  padding: '39px',

  '&:hover': {
    backgroundColor: '#45a049', // Custom color on hover
  },
};

const AssignButtonStyle = {
  backgroundColor: 'rgb(133 99 135);',
  color: 'white',
  marginTop: '-20px',
  padding: '39px',
  marginLeft: '-20px',

  '&:hover': {
    backgroundColor: '#45a049', // Custom color on hover
  },
};

const StudentList = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentCount, setStudentCount] = useState(0);

  const [newStudent, setNewStudent] = useState({
    firstName: '',
    lastName: '',
    address: '',
    contactNumber: '',
    school: '',
    grade: '',
    gender: '',
    medium: '',
    image: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/students')  
      .then(response => {
        setExistingStudents(response.data);
        setStudentCount(response.data.length); // Update the count
      })
      .catch(error => {
        console.error('Error fetching existing students:', error);
      });
  }, []);

  
  // Getting Student Details
  const [existingStudents, setExistingStudents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/students')  
      .then(response => {
        setExistingStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching existing students:', error);
      });
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      await axios.post('http://localhost:5000/students/create', newStudent);
      setLoading(false);
      setExistingStudents([...existingStudents, newStudent]); 
      handleClose();
    } catch (error) {
      console.error('Error adding student:', error);
      setLoading(false);
    }
  };


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent((prevStudent) => ({ ...prevStudent, [name]: value }));
  };

  return (
    <main className='main-container'>

    <div>
      <div className='main-title'>
        <h3>STUDENT DASHBOARD</h3>
      </div>
      <hr />
 



<div className="flex-container">

    <div className='stucard'>
      <div className='card-inner'>
        <h3>STUDENTS</h3>
        <BsFillArchiveFill className='card_icon' />
      </div>
      <h1>{studentCount}</h1>
    </div>  

    <div>
    <Button onClick={handleOpen} style={addButtonStyle}>
        <BsFillArchiveFill style={inputIconStyle} />
        Add New Student
      </Button>
    </div>

    <div>
    <Button style={AssignButtonStyle}>
        <BsFillArchiveFill style={inputIconStyle} />
        Assign Students
      </Button></div>  
</div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a New Student
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <form onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="firstName"
                value={newStudent.firstName}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsFillPersonFill style={inputIconStyle} />
                  ),
                }}
                required
              />

              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                name="lastName"
                value={newStudent.lastName}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsFillPersonFill style={inputIconStyle} />
                  ),
                }}
                required
              />

              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                name="address"
                value={newStudent.address}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsFillHouseDoorFill style={inputIconStyle} />
                  ),
                }}
                required
              />

              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                margin="normal"
                name="contactNumber"
                value={newStudent.contactNumber}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsFillPhoneFill style={inputIconStyle} />
                  ),
                }}
                required
              />

              <TextField
                label="School"
                variant="outlined"
                fullWidth
                margin="normal"
                name="school"
                value={newStudent.school}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsFillBuildingFill style={inputIconStyle} />
                  ),
                }}
              />

              <TextField
                label="Grade"
                variant="outlined"
                fullWidth
                margin="normal"
                name="grade"
                value={newStudent.grade}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsBookHalf style={inputIconStyle} />
                  ),
                }}
              />

<TextField
                label="Gender"
                variant="outlined"
                fullWidth
                margin="normal"
                name="gender"
                value={newStudent.gender}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: (
                    <BsBookHalf style={inputIconStyle} />
                  ),
                }}
              />

<TextField
            label="Medium"
            variant="outlined"
            fullWidth
            margin="normal"
            name="medium"
            value={newStudent.medium}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <BsFillBookFill style={inputIconStyle} />
              ),
            }}
          />

          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            margin="normal"
            name="image"
            value={newStudent.image}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <BsFillImageFill style={inputIconStyle} />
              ),
            }}
          />

<Button type='submit' className='addstudentsubmit' onClick={handleSubmit}>
        {loading ? 'Adding...' : 'Add Student'}
      </Button>

      {loading && <PulseLoader color="#36d7b7" />}



        </form>
      </Typography>
    </Box>
  </Modal>

  <h3>EXISTING STUDENTS</h3>
      <Grid container spacing={2} >
        {existingStudents.map((student, index) => (
          <Grid item key={student._id} xs={12} sm={3} md={3}>
          <Link to={`/students/${student._id}`}>

            <Card sx={{ maxWidth: 545 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={(student.gender?.toLowerCase() === 'male') ? maleThumbnail : femaleThumbnail}
                  alt="green iguana"
                />
                <CardContent >
                  <Typography gutterBottom variant="h5" component="div">
                    {student.firstName} {student.lastName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {student.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {student.contactNumber}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            </Link>

          </Grid>
        ))}
      </Grid>
</div>
</main>
);
};

export default StudentList;