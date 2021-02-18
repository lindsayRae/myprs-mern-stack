import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';

const Gear = (props) => {
  const isAuthenticated = localStorage.getItem('userData');

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='page-splash'>
      {isAuthenticated && (
        <>
          <header className='header header-fixed'>
            <div className='header-inner'>
              <Navbar />
            </div>
          </header>
          <div className='gear-container'>
            <h2 className='login-title'>Cool Gear</h2>
            <p className=''>
              Below is a list of product that I personally love using! These are
              affiliate links to help support the cost of running this site.
              None of these companies have paid me to add their product to this
              site.
            </p>
            <div className='gear-list'>
              <ul>
                <li>Jump Rope</li>
                <li>CBD lotion</li>
                <li>Rouge Rack</li>
                <li>Concept Rower</li>
                <li>Athleta Leggings</li>
                <li>Bands</li>
                <li>Lifters</li>
                <li>Nano9s</li>
                <li>Face Mask</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Gear;
