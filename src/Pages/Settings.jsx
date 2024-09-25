import React from 'react';
import { Button, Typography, Container, Grid, Box } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import API_CONFIG from '../config/api';

const Settings = () => {
    const { apiKey } = API_CONFIG;

  const handleDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This action will delete all your data and cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAllData();
      }
    });
  };

  const deleteAllData = async () => {
    try {
      const response = await axios.delete(
        `${apiKey}/delete-all-planes-data`)
      if (response.status === 200) {
        Swal.fire(
          'Deleted!',
          'All your data has been successfully deleted.',
          'success'
        );
      } else {
        Swal.fire(
          'Error!',
          'There was a problem deleting your data.',
          'error'
        );
      }    
    } catch (error) {        
      Swal.fire(
        'Error!',
        'Network error or server issue. Please try again.',
        'error'
      );
    }
  };

  return (
    <Container maxWidth="100%" sx={{ mt: 5 }}>
        <Typography variant="h3" gutterBottom align="center" fontWeight={"bold"}>
          Settings
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Typography variant="body1" gutterBottom>
                You can delete all your data from here. This action is irreversible.
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
              >
                Delete All Data
              </Button>
            </Box>
          </Grid>
        </Grid>
    </Container>
  );
};

export default Settings;
