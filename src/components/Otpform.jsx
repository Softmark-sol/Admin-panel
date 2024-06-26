import React, { useState } from 'react';
import '../css/Login.css';
import { useNavigate } from 'react-router-dom';
import OTPInput from './Otp';


const Otpform = () => {
  const navigate = useNavigate();


  return (
    <div>
      <div className="form">
        <form className="form_main">
          <p className="heading">Admin OTP</p>
          <div className="inputContainer">
            <OTPInput/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Otpform;



