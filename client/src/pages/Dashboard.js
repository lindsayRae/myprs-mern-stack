import React, { useContext, useEffect } from 'react';

import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { MdDirectionsRun, MdFitnessCenter, MdStar } from 'react-icons/md';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
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
          <div className='login header-page'>
            <div className='login-content'>
              <h2 className='login-title capitalize'>
                Hello {user.user.userName}
              </h2>
              <p className='login-text'>
                Choose your category to view or add personal records.
              </p>
              <div className='page-content'>
                <div className='list-container'>
                  <ul className=''>
                    <li key='cardio' className='dash-items btn btn-primary'>
                      <NavLink to='/cardios' exact>
                        <MdDirectionsRun />
                        <span>Cardio</span>
                      </NavLink>
                    </li>
                    <li key='lifts' className='dash-items btn btn-primary'>
                      <NavLink to='/lifts' exact>
                        <MdFitnessCenter />
                        <span>Lifts</span>
                      </NavLink>
                    </li>
                    <li key='skills' className='dash-items btn btn-primary'>
                      <NavLink to='/skills' exact>
                        <MdStar />
                        <span>Skills</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
