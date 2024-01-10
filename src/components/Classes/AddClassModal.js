// AddClassModal.js
import React from 'react';
import { Box, Button, Typography, Modal, TextField, MenuItem } from '@mui/material';
import { PulseLoader } from 'react-spinners';
import { BsFillPhoneFill, BsFillHouseDoorFill, BsFillBuildingFill, BsBookHalf, BsFillImageFill, BsFillArchiveFill, BsFillBookFill } from 'react-icons/bs';
import { useState } from 'react';



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
  fontSize: '1.5em',
  verticalAlign: 'middle',
};

const AddClassModal = ({ open, handleClose, handleSubmit, loading, newClass, handleInputChange }) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const [students, setStudents] = useState([]);

  return (
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
              {days.map((day, index) => (
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
  select
  name="assignedStudents"
  multiple
  value={newClass.assignedStudents}
  onChange={(e) => handleInputChange({ target: { name: 'assignedStudents', value: e.target.value } })}
  InputProps={{
    startAdornment: (
      <BsFillBookFill style={inputIconStyle} />
    ),
  }}
  required
>
  {students.map((student) => (
    <MenuItem key={student._id} value={student._id}>
      {student.firstName}
    </MenuItem>
  ))}
</TextField>

            <Button type='submit' className='addstudentsubmit'>
              {loading ? 'Adding...' : 'Add Class'}
            </Button>
            {loading && <PulseLoader color="#36d7b7" />}
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};

export default AddClassModal;
