
import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';

const Changepassword = () => {
    const [newpassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const navigate = useNavigate();

    const handleSubmit=()=>{

    }

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
