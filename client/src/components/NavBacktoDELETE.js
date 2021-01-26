import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  console.log('user', user);
  const history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/');
      return;
    } else {
      history.push('/dashboard');
    }
  }, [user]);

  return (
    <>
      {user && (
        <header className='App-header'>
          <ul className='container'>
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
              <a
                onClick={(e) => {
                  console.log('hear logout');
                  e.preventDefault();
                  // localStorage.clear();
                  // setUser(null);
                }}
              >
                Logout
              </a>
            </li>
          </ul>
        </header>
      )}
    </>
  );
};

export default Nav;
