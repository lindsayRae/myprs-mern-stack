import React, { useState } from 'react';

import Navbar from '../components/Navbar';
import PayPal from '../components/PayPal';
import { MdKeyboardBackspace } from 'react-icons/md';

const Donate = ({ history }) => {
  const [donate, setDonate] = useState(false);

  return (
    <div className='page-splash'>
      <header className='header header-fixed' onClick={() => history.goBack()}>
        <div className='header-inner'>
          <MdKeyboardBackspace style={{ fontSize: 25 }} />
        </div>
      </header>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title capitalize'>Donate</h2>
          <p className='login-text'>
            Are you enjoying myPRs app? If you want to continue using this app
            long term please consider monthly donations to help keep this up and
            running!
          </p>
          <div className='form-login'>
            <div className='login-btn'>
              {donate ? (
                <PayPal />
              ) : (
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setDonate(true);
                  }}
                >
                  Donate $1.00
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
