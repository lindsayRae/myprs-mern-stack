import React from 'react';
import { NavLink } from 'react-router-dom';

const EmailSent = () => {
  return (
    <div className='page-splash'>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title capitalize'>Email Sent</h2>
          <p className='login-text'>
            Please check your email to confirm your account and complete
            registration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailSent;
