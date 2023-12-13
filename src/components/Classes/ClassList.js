// Import necessary dependencies and icons
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
import { Link } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';


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
  backgroundColor: 'blueviolet',
  color: 'white',
  marginTop: '-20px',
  padding: '39px',
  marginLeft: '-20px',
  backgroundColor: 'darkmagenta',

  '&:hover': {
    backgroundColor: '#45a049', // Custom color on hover
  },
};

const ClassList = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [classCount, setClassCount] = useState(0);
  const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const [newClass, setNewClass] = useState({
    name: '',
    address: '',
    contactNumber: '',
    grade: '',
    medium: '',
  });

  useEffect(() => {
    // Fetch existing classes from your API using Axios
    axios.get('http://localhost:5000/classes')  
      .then(response => {
        setExistingClasses(response.data);
        setClassCount(response.data.length); // Update the count
      })
      .catch(error => {
        console.error('Error fetching existing classes:', error);
      });
  }, []);

  const [existingClasses, setExistingClasses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/classes')  
      .then(response => {
        setExistingClasses(response.data);
      })
      .catch(error => {
        console.error('Error fetching existing classes:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      await axios.post('http://localhost:5000/classes/create', newClass);
      setLoading(false);
      setExistingClasses([...existingClasses, newClass]); 
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
    setNewClass((prevClass) => ({ ...prevClass, [name]: value }));
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
          <Button style={AssignButtonStyle}>
            <BsFillArchiveFill style={inputIconStyle} />
            Assign Students
          </Button>
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
                      label="Class Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      name="name"
                      value={newClass.name}
                      onChange={handleInputChange}
                      InputProps={{
                        startAdornment: (
                          <BsFillPersonFill style={inputIconStyle} />
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

                    <Button type='submit' className='addstudentsubmit'>
                      {loading ? 'Adding...' : 'Add Class'}
                    </Button>
              <Button type='submit' className='addstudentsubmit' onClick={handleSubmit}>
                {loading ? 'Adding...' : 'Add Class'}
              </Button>

              {loading && <PulseLoader color="#36d7b7" />}
            </form>
          </Typography>
        </Box>
      </Modal>

      <h3>EXISTING CLASSES</h3>
      <Grid container spacing={2} >
        {existingClasses.map((classItem, index) => (
          <Grid item key={classItem._id} xs={12} sm={3} md={3}>
            <Link to={`/classes/${classItem._id}`}>
              <Card sx={{ maxWidth: 545 }}>
                <CardActionArea>
                  {/* Add any additional details or images for classes */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {classItem.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {classItem.contactNumber}
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

export default ClassList;