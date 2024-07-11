
import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Changepassword = () => {
    const [newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        const res = await axios.post(
          // "https://4fd8-2400-adc1-1c7-5400-65c7-23f9-8a78-1df2.ngrok-free.app/reset-password",
          "https://d224-202-47-32-176.ngrok-free.app " ,
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
