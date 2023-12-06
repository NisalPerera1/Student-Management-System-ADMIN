import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert, Button, Modal, Box, Typography, TextField, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { PulseLoader } from 'react-spinners';
import {
    
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
  } from '@mui/material';

const ShowStudent = () => {
  // Get student ID from URL params
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate for navigation in React Router v6
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    handleCloseDialog();
    await handleDelete();
  };

  const handleDeleteSnackbarClose = () => {
    setDeleteSuccess(false);
    // Navigate back to the previous page
    navigate(-1);
  };

  const handleDelete = async () => {
    try {
      setSubmitting(true);
      setError(null); // Clear any previous errors
      await axios.delete(`http://localhost:5000/students/${id}`);
      // Set deletion success state
      setDeleteSuccess(true);
    } catch (error) {
      console.error('Error deleting student:', error);
      setError('Failed to delete student. Please try again.'); // Set a user-friendly error message
    } finally {
      setSubmitting(false);
    }
  };

  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    // Navigate back to the previous page
    navigate(-1);
  };

  // States for managing student data, loading, and modal state
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Modal state and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // State for edited student data
  const [editedStudent, setEditedStudent] = useState({
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

  // States for submission loading and error handling
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/students/${id}`);
        setStudent(response.data);

        // Set initial state for edited student data
        setEditedStudent({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          address: response.data.address,
          contactNumber: response.data.contactNumber,
          school: response.data.school || '',
          grade: response.data.grade || '',
          gender: response.data.gender || '',
          medium: response.data.medium || '',
          image: response.data.image || '',
        });
      } catch (error) {
        console.error('Error fetching student:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, [id]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.put(`http://localhost:5000/students/${id}`, editedStudent);
      setSubmitting(false);

      setSuccess(true);
      setSnackbarOpen(true); // Show the success alert using Snackbar
      setTimeout(() => {
        setSuccess(false);
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error updating student:', error);
      setError('Failed to update student. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };



  // Loading state while fetching student data
  if (loading) {
    return <div>Loading...</div>;
  }

  // Display if student not found
  if (!student) {
    return <div>Student not found</div>;
  }

  // Render student details and action buttons
  return (
    <div>
      <div className='ShowStudentData'>
        {/* Display student details */}
        <h2>{`${student.firstName} ${student.lastName}`}</h2>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>Contact Number:</strong> {student.contactNumber}</p>

        {/* Additional Details */}
        <p><strong>School:</strong> {student.school || 'N/A'}</p>
        <p><strong>Grade:</strong> {student.grade || 'N/A'}</p>
        <p><strong>Gender:</strong> {student.gender || 'N/A'}</p>
        <p><strong>Medium:</strong> {student.medium || 'N/A'}</p>

        {student.image && (
          <div>
            <img src={student.image} alt={`${student.firstName} ${student.lastName}`} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
        )}
      </div>

      {/* Button to open edit modal */}
      <Button onClick={handleOpen} className="EditButton" variant="outlined" startIcon={<EditIcon />} color="info">
        Edit Student
      </Button>

      {/* Modal for editing student data */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', p: 4 }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Student
          </Typography>

          {/* Form fields for editing student data */}
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedStudent.firstName}
            onChange={(e) => setEditedStudent((prev) => ({ ...prev, firstName: e.target.value }))}
              />
    
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.lastName}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, lastName: e.target.value }))}
              />
    
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.address}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, address: e.target.value }))}
              />
    
              <TextField
                label="Contact Number"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.contactNumber}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, contactNumber: e.target.value }))}
              />
    
              <TextField
                label="School"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.school}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, school: e.target.value }))}
              />
    
              <TextField
                label="Grade"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.grade}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, grade: e.target.value }))}
              />
    
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.gender}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, gender: e.target.value }))}
              />
    
              <TextField
                label="Medium"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.medium}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, medium: e.target.value }))}
              />
    
              <TextField
                label="Image"
                variant="outlined"
                fullWidth
                margin="normal"
                value={editedStudent.image}
                onChange={(e) => setEditedStudent((prev) => ({ ...prev, image: e.target.value }))}
              />
    
              {/* Button to submit changes */}
              <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Save Changes
              </Button>
            </Box>
          </Modal>
    
           <Button
          onClick={handleOpenDialog}
          className="DeleteButton"
          variant="outlined"
          startIcon={<DeleteIcon />}
          color="error"
        >
          Delete Student
        </Button>

        {/* Loading spinner during form submission */}
        {/* ... (unchanged code) */}

        {/* Snackbar for success message */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert severity="success">Student updated successfully</Alert>
        </Snackbar>

        {/* Display error message if there is an error */}
        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>
        )}

        {/* Confirmation dialog for deletion */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this student?
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

      {/* Loading spinner during form submission */}
      {submitting && (
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <PulseLoader size={10} color={'#123abc'} loading={submitting} />
        </div>
      )}

      {/* Deletion success Snackbar */}
      <Snackbar
        open={deleteSuccess}
        autoHideDuration={5000}
        onClose={handleDeleteSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="success">
          Student deleted successfully
        </Alert>
      </Snackbar>

    
          {/* Loading spinner during form submission */}
          {submitting && (
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <PulseLoader size={10} color={'#123abc'} loading={submitting} />
            </div>
          )}
    
    <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Adjust the position as needed
      >
        <Alert severity="success">
          Student updated successfully
        </Alert>
      </Snackbar>



          {/* Display error message if there is an error */}
          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {error}
            </div>
          )}
        </div>
      );
    };
    
    export default ShowStudent;
    