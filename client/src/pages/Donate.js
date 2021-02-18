import React, { useState } from 'react';
import Navbar from '../components/Navbar';

import StripeContainer from '../components/StripeContainer';

const Donate = ({ history }) => {
  const [donate, setDonate] = useState(false);
  const [otherAmount, setOtherAmount] = useState(false);
  const [donateAmount, setDonateAmount] = useState('');
  const [showItem, setShowItem] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className='page-splash'>
      <header className='header header-fixed'>
        <div className='header-inner'>
          <Navbar />
        </div>
      </header>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title capitalize'>Donate</h2>
          {!donate && (
            <p className='login-text'>
              Coming soon... Please check back another time!
            </p>
          )}
          {/* {!donate ? (
            <p className='login-text'>
              Are you enjoying myPRs app? If you want to continue using this app
              long term please consider monthly donations to help keep this up
              and running!
            </p>
          ) : (
            <p className='login-text'>Please continue with Stripe</p>
          )} */}

          <div className='form-login'>
            {/* {donate && <StripeContainer />}
            {!donate && !otherAmount && (
              <div className='login-btn' style={{ marginTop: '30px' }}>
                <button
                  className='btn btn-primary'
                  onClick={() => {
                    setDonate(true);
                    setDonateAmount('1.00');
                  }}
                >
                  Donate $1.00
                </button>
                <button
                  className='btn '
                  onClick={() => {
                    setOtherAmount(true);
                  }}
                  style={{ marginTop: '20px' }}
                >
                  Donate other
                </button>
              </div>
            )} */}
            {!donate && otherAmount && (
              <>
                <form name='login'>
                  <div className='form-main'>
                    <input
                      type='number'
                      name='amount'
                      min='1.00'
                      step='.01'
                      value={donateAmount}
                      onChange={(event) => {
                        setError('');
                        setDonateAmount(event.target.value);
                      }}
                      required
                      autoComplete='off'
                    />
                    <label htmlFor='amount' className='label-name'>
                      <span className='content-name'>Other Amount</span>
                    </label>
                  </div>
                  <div className='login-btn' style={{ marginTop: '30px' }}>
                    <button
                      className='btn btn-primary'
                      onClick={() => {
                        setDonate(true);
                      }}
                    >
                      Donate Other
                    </button>
                  </div>
                </form>
                <div className='login-btn' style={{ marginTop: '20px' }}>
                  <button
                    className='btn btn-danger'
                    onClick={() => {
                      setOtherAmount(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className='page-splash'>
  //     <header className='header header-fixed' onClick={() => history.goBack()}>
  //       <div className='header-inner'>
  //         <MdKeyboardBackspace style={{ fontSize: 25 }} />
  //       </div>
  //     </header>
  //     <div className='login header-page'>
  //       <div className='login-content'>
  //         <h2 className='login-title capitalize'>Donate</h2>

  //         <p className='login-text'>
  //           Are you enjoying myPRs app? If you want to continue using this app
  //           long term please consider monthly donations to help keep this up and
  //           running!
  //         </p>

  //         <div className=''>
  //           {showItem ? (
  //             <StripeContainer />
  //           ) : (
  //             <>
  //               {' '}
  //               <h3>$10.00</h3>
  //               <button
  //                 className='btn btn-primary'
  //                 onClick={() => setShowItem(true)}
  //               >
  //                 Donate $10.00
  //               </button>
  //             </>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Donate;
