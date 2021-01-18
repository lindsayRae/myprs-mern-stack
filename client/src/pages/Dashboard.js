import React, { useEffect, useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import { MdDirectionsRun, MdFitnessCenter, MdStar } from 'react-icons/md';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  useEffect(() => {}, []);
  return (
    <div className='page-splash'>
      <header className='header header-fixed'>
        <div className='header-inner'>
          <Navbar />
        </div>
      </header>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title'>Hello {user.user.userName}</h2>
          <p className='login-text'>
            Choose your category to view or add personal records.
          </p>
          <div className='page-content'>
            <div className='list-container'>
              <ul className=''>
                <li key='cardio' className='dash-items btn-primary show'>
                  <NavLink to='/cardios' exact>
                    <MdDirectionsRun />
                    <span>Cardio</span>
                  </NavLink>
                </li>
                <li key='lifts' className='dash-items btn-primary show'>
                  <NavLink to='/lifts' exact>
                    <MdFitnessCenter />
                    <span>Lifts</span>
                  </NavLink>
                </li>
                <li key='skills' className='dash-items btn-primary show'>
                  <NavLink to='/skills' exact>
                    <MdStar />
                    <span>Skills</span>
                  </NavLink>
                </li>
                {/* <li key='wod'>
              <NavLink to='/wods' exact>
                WODs
              </NavLink>
            </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
