import React, { useState } from 'react';
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_CONFIG from "../config/api";
import { showErrorToast, showSuccessToast } from '../components/Toast/Toast';

const UpdatePasswordModal = () => {
  const { apiKey } = API_CONFIG;
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); 
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiKey}/forgot-password`, { email: userEmail });
      if (res.status === 200) {
        // Swal.fire({ icon: 'success', title: 'Success', text: 'Email sent successfully!' });
        showSuccessToast("Email sent successfully!")
        setStep(2); 
      } else {
        // Swal.fire({ icon: 'error', title: 'Error', text: 'Invalid Email!' });
        showErrorToast("Invalid Email")
      }
    } catch (error) {
      // Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong!' });
      showErrorToast("Something went wrong!")

    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiKey}/verify-reset-code`, { code: otp });
      if (res.status === 200) {
        setStep(3); 
      } else {
        // Swal.fire({ icon: 'error', title: 'Error', text: 'Invalid OTP!' });
        showErrorToast("Invalid OTP!")

      }
    } catch (error) {
      // Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong!' });
      showErrorToast("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      // Swal.fire({ icon: 'error', title: 'Error', text: 'Passwords do not match!' });
      showErrorToast("Passwords do not match!")

      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${apiKey}/reset-password`, { newPassword });
      if (res.status === 200) {
        // Swal.fire({ icon: 'success', title: 'Success', text: 'Password updated successfully!' });
        showSuccessToast("Password updated successfully!")

        handleClose(); 
      }
    } catch (error) {
      // Swal.fire({ icon: 'error', title: 'Error', text: 'Something went wrong!' });
      showErrorToast("Something went wrong!")

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        variant="outlined"
        style={{ color: "white", borderColor: "white", marginTop: "20px", width: "95%", marginLeft: "5px" }}
        onClick={handleOpen}
      >
        Update Password
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            bgcolor: 'background.paper',
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            margin: 'auto',
            mt: '15%',
          }}
        >
          {step === 1 && (
            <>
              <Typography variant="h6" component="h2">Enter your Email</Typography>
              <form onSubmit={handleEmailSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" disabled={loading} fullWidth>
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </form>
            </>
          )}
          {step === 2 && (
            <>
              <Typography variant="h6" component="h2">Enter OTP</Typography>
              <form onSubmit={handleOtpSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="OTP"
                  variant="outlined"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" disabled={loading} fullWidth>
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </form>
            </>
          )}
          {step === 3 && (
            <>
              <Typography variant="h6" component="h2">Create New Password</Typography>
              <form onSubmit={handlePasswordSubmit}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="New Password"
                  variant="outlined"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  variant="outlined"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button type="submit" variant="contained" disabled={loading} fullWidth>
                  {loading ? <CircularProgress size={24} /> : 'Submit'}
                </Button>
              </form>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UpdatePasswordModal;
