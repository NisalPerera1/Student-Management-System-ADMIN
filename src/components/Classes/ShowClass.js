import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal, Box, Typography, TextField, Snackbar, Divider, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import GradeIcon from '@mui/icons-material/Grade';
import LanguageIcon from '@mui/icons-material/Language';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { PulseLoader } from 'react-spinners';
import Alert from '@mui/material/Alert';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import AssignStudentsModal from './AssignStudentsModal';


const ShowClass = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editedClass, setEditedClass] = useState({
    name: '',
    day: '',
    time: '',
    location: '',
    contactNumber: '',
    grade: '',
    medium: '',
    fee: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleConfirmationDialogOpen = () => {
    setConfirmationDialogOpen(true);
  };

  const handleConfirmationDialogClose = () => {
    setConfirmationDialogOpen(false);
  };


  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [students, setStudents] = useState([]);

  useEffect(() => {
    // Fetch the list of students when the component mounts
    axios.get('http://localhost:5000/students')
      .then(response => {
        setStudents(response.data);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
      });
  }, []);
  
const [openAssignModal, setOpenAssignModal] = useState(false);
 // Function to open the assign modal


const handleAssignModalOpen = () => {
  setAssignModalOpen(true);
};

const handleAssignModalClose = () => {
  setAssignModalOpen(false);
};


  const handleConfirmDelete = async () => {
    handleCloseDialog();
    await handleDelete();
  };

  const handleDeleteSnackbarClose = () => {
    setDeleteSuccess(false);
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await axios.delete(`http://localhost:5000/classes/${id}`);
      setDeleteSuccess(true);
    } catch (error) {
      console.error('Error deleting class:', error);
      setError('Failed to delete class. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    navigate(-1);
  };

  const fetchClass = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/classes/${id}`);
      setClassData(response.data);

      setEditedClass({
        name: response.data.name,
        day: response.data.day,
        time: response.data.time,
        location: response.data.location,
        contactNumber: response.data.contactNumber,
        grade: response.data.grade,
        medium: response.data.medium,
        fee: response.data.fee,
      });
    } catch (error) {
      console.error('Error fetching class:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClass();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.put(`http://localhost:5000/classes/${id}`, editedClass);
      setSubmitting(false);

      setSuccessMessage('Class updated successfully');
      setSnackbarOpen(true);
      setTimeout(() => {
        setSuccessMessage('');
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error updating class:', error);
      setError('Failed to update class. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!classData) {
    return <div>Class not found</div>;
  }

  const handleSaveAssignModal = async (selectedStudents) => {
    try {
      // Make an API request to save the selected students for the class
      const response = await axios.post(
        `http://localhost:5000/classes/${id}/assign`,
        { students: selectedStudents }
      );
  
      // Check if the response status is OK (2xx)
      if (response.status === 200) {
        // Fetch the updated class data after assigning students
        await fetchClass();
  
        // Display a success message or perform any additional actions
        console.log('Students assigned successfully');
  
        // Show alert
        alert('Students assigned successfully');
      } else {
        // Handle unexpected response status
        console.error(
          'Error assigning students. Unexpected response:',
          response
        );
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error assigning students:', error);
    }
  };
  
  const handleRemoveAllStudents = async () => {
    handleConfirmationDialogClose(); // Close the confirmation dialog

    // Show a confirmation dialog using the browser's built-in window.confirm
    const shouldRemoveAll = window.confirm("Are you sure you want to remove all students?");
    
    if (shouldRemoveAll) {
      try {
        // Make an API request to remove all students from the class
        const response = await axios.post(
          `http://localhost:5000/classes/${id}/remove`
        );

        // Check if the response status is OK (2xx)
        if (response.status === 200) {
          // Fetch the updated class data after removing all students
          await fetchClass();

          // Display a success message or perform any additional actions
          console.log('All students removed successfully');

          // Show alert
          alert('All students removed successfully');
        } else {
          // Handle unexpected response status
          console.error(
            'Error removing all students. Unexpected response:',
            response
          );
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error removing all students:', error);
      }
    }
  };

  return (
    <div>
    <div className='EditClassItem'>
    <div style={{ display: 'flex', columnGap: '5px', flexDirection: 'row', alignItems: 'center' }}>
        <Button onClick={() => navigate(-1)} variant="outlined" startIcon={<EditIcon />} color="info">
          Go Back
        </Button>

        <Button onClick={handleOpen} variant="outlined" startIcon={<EditIcon />} color="info">
          Edit Class
        </Button>

        <Button onClick={handleOpenDialog} variant="outlined" startIcon={<DeleteIcon />} color="error">
          Delete Class
        </Button>


      </div>

      <AssignStudentsModal
        open={assignModalOpen}
        onClose={handleAssignModalClose}
        students={students}
        onSave={handleSaveAssignModal}
      />
    </div>

      <div className='ShowClassData'>
        <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
          <Typography variant="h4">{classData.name}</Typography>
          <Divider style={{ margin: '15px 0' }} />
          <p>
            <AccessTimeIcon style={{ marginRight: '5px' }} />
            <strong>Day:</strong> {classData.day}
          </p>
          <Divider style={{ margin: '10px 0' }} />
          <p>
            <AccessTimeIcon style={{ marginRight: '5px' }} />
            <strong>Time:</strong> {classData.time}
          </p>
          <Divider style={{ margin: '10px 0' }} />
          <p>
            <LocationOnIcon style={{ marginRight: '5px' }} />
            <strong>Location:</strong> {classData.location}
          </p>
          <Divider style={{ margin: '10px 0' }} />
          <p>
            <PhoneIcon style={{ marginRight: '5px' }} />
            <strong>Contact Number:</strong> {classData.contactNumber}
          </p>
          <Divider style={{ margin: '10px 0' }} />
          <p>
            <GradeIcon style={{ marginRight: '5px' }} />
            <strong>Grade:</strong> {classData.grade}
          </p>
          <Divider style={{ margin: '10px 0' }} />
          <p>
            <LanguageIcon style={{ marginRight: '5px' }} />
            <strong>Medium:</strong> {classData.medium}
          </p>
          <Divider style={{ margin: '10px 0' }} />
          <p>
            <AttachMoneyIcon style={{ marginRight: '5px' }} />
            <strong>Fee:</strong> {classData.fee}
          </p>




          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
  <Button onClick={handleAssignModalOpen} variant="outlined" color="primary" style={{ marginRight: '10px' }}>
    Assign Students
  </Button>

  <Button
    onClick={handleRemoveAllStudents}
    variant="outlined"
    color="secondary"
  >
    Remove All Students
  </Button>
</div>


         

      <p>
        <strong>Current Students:</strong>{' '}
        {classData.assignedStudents.map((studentId) => {
          // Assuming you have the list of students available
          const student = students.find((s) => s._id === studentId);

          // Display the student name if found
          return <span key={studentId}>{student ? student.firstName : `Unknown Student (${studentId})`}, </span>;
        })}
      </p>
         

          <Divider style={{ margin: '15px 0' }} />
        </Paper>
      </div>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Class
          </Typography>



    <TextField
      label="Class Name"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.name}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, name: e.target.value }))}
    />

    <TextField
      label="Day"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.day}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, day: e.target.value }))}
    />

    <TextField
      label="Time"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.time}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, time: e.target.value }))}
    />

    <TextField
      label="Location"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.location}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, location: e.target.value }))}
    />

    <TextField
      label="Contact Number"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.contactNumber}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, contactNumber: e.target.value }))}
    />

    <TextField
      label="Grade"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.grade}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, grade: e.target.value }))}
    />

    <TextField
      label="Medium"
      variant="outlined"
      fullWidth
      margin="normal"
      value={editedClass.medium}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, medium: e.target.value }))}
    />

    <TextField
      label="Fee"
      variant="outlined"
      fullWidth
      margin="normal"
      type="number"
      value={editedClass.fee}
      onChange={(e) => setEditedClass((prev) => ({ ...prev, fee: e.target.value }))}
    />

    {/* Add other fields here */}

    <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>
      Save Changes
    </Button>
  </Box>
</Modal>




      {submitting && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <PulseLoader size={10} color={'#123abc'} loading={submitting} />
        </div>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success">Class updated successfully</Alert>
      </Snackbar>

      {error && (
        <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this class?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {submitting && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <PulseLoader size={10} color={'#123abc'} loading={submitting} />
        </div>
      )}

      <Snackbar
        open={deleteSuccess}
        autoHideDuration={5000}
        onClose={handleDeleteSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success">
          Class deleted successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ShowClass;
