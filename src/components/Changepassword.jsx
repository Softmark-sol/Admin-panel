import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_CONFIG from "../config/api";

const Changepassword = () => {
  const { apiKey } = API_CONFIG;

    const [newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const res = await axios.post(
          `${apiKey}/reset-password` ,
          { newPassword: newpassword }
        );
  
        console.log(res)
        
        if (newpassword!==confirmPassword) { 
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Invalid Password!',
          });
        } else {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Update Password Successfully!',
          });
          navigate('/login');
        }
      } catch (error) {
        console.error('Login Error:', error.message);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Something went wrong. Please try again later.',
        });
      }
    };

  return (
    <div>
      <div>
      <div className="form">
        <form className="form_main" onSubmit={handleSubmit}>
          <p className="heading"> New Password</p>

          <div className="inputContainer">
            <input
              type="password"
              className="inputField"
              id="password"
              placeholder="Enter new Password"
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="inputContainer">
            <input
              type="password"
              className="inputField"
              id="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" id="button">
            Submit
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default Changepassword
