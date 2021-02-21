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
                  <div className='splash-buttons'>
                    <NavLink to='/cardios' exact>
                      <button className='btn btn-primary'>
                        <MdDirectionsRun />
                        <span>Cardio</span>
                      </button>
                    </NavLink>
                    <NavLink to='/lifts' exact>
                      <button className='btn btn-primary'>
                        <MdFitnessCenter />
                        <span>Lifts</span>
                      </button>
                    </NavLink>
                    <NavLink to='/skills' exact>
                      <button className='btn btn-primary'>
                        <MdStar />
                        <span>Skills</span>
                      </button>
                    </NavLink>
                  </div>
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
