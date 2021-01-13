import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }
  }, [user]);

  return (
    <header className='App-header'>
      <ul className='container'>
        {user && (
          <>
            <li key='home2'>
              <NavLink to='/dashboard' exact>
                MyPrs
              </NavLink>
            </li>
            <li key='home'>
              <NavLink to='/dashboard' exact>
                Dashboard
              </NavLink>
            </li>
            <li key='list'>
              <a onClick={() => history.goBack()}>Back</a>
            </li>
            <li key='logout'>
              <a onClick={() => setUser('')}>Logout</a>
            </li>
          </>
        )}
        {!user && (
          <>
            <li key='home'>
              <NavLink to='/login' exact>
                MyPrs
              </NavLink>
            </li>
            <li key='login'>
              <NavLink to='/login' exact>
                Login
              </NavLink>
            </li>
            <li key='signup'>
              <NavLink to='/signup' exact>
                Signup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Nav;
