// AssignStudentsModal.js
import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';

const AssignStudentsModal = ({ open, onClose, students, onSave }) => {
  const [selectedStudents, setSelectedStudents] = useState([]);

  const handleToggleStudent = (studentId) => {
    setSelectedStudents((prevSelected) => {
      if (prevSelected.includes(studentId)) {
        return prevSelected.filter((id) => id !== studentId);
      } else {
        return [...prevSelected, studentId];
      }
    });
  };

  const handleSave = () => {
    // Pass both old and new selected students to onSave
    onSave(selectedStudents);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          Assign Students
        </Typography>

        <FormControl fullWidth>
          <InputLabel id="students-select-label"></InputLabel>

          <Select
            labelId="students-select-label"
            id="students-select"
            multiple
            value={selectedStudents}
            onChange={(e) => setSelectedStudents(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {students.map((student) => (
              <MenuItem key={student._id} value={student._id}>
                <Checkbox
                  checked={selectedStudents.includes(student._id)}
                  onChange={() => handleToggleStudent(student._id)}
                />
                {student.firstName}
              </MenuItem>
            ))}
          </Select>
          <Button
            onClick={handleSave}
            variant="contained"
            color="primary"
            style={{ marginTop: '10px' }}
          >
            Save
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default AssignStudentsModal;
