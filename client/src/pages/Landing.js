import React from 'react';
import { NavLink } from 'react-router-dom';

const Landing = ({ history }) => {
  console.log('history', history);

  return (
    <div className='page-splash'>
      <div className='splash'>
        <div className='splash-content'>
          <img
            src='./images/myPRs_white.png'
            alt='cardio'
            className='img-logo'
          />

          <div className='splash-logo'>MYPRS</div>
          <div className='splash-text'>
            <p>Personal Record Tracker</p>
            <p className='sm-txt'>Login or Sign Up to create a new account.</p>
          </div>

          <div className='splash-buttons'>
            <NavLink to='/login' exact>
              <button className='btn btn-primary'>Login</button>
            </NavLink>
            <NavLink to='/signup' exact>
              <button className='btn'>Sign up</button>
            </NavLink>
          </div>
          <div className='privacy'>
            We respect your privacy. Read our terms of service{' '}
            <NavLink to='/privacy' exact className='text-info'>
              here
            </NavLink>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
