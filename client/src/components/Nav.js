import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line
export default () => {
  const [lastPage, setLastPage] = useState('/dashboard');
  const { user } = useContext(UserContext);
  console.log('**user: ', user);
  let history = useHistory();

  console.log('history', history);

  useEffect(() => {
    if (!user) {
      history.push('/login');
      return;
    }
    setLastPage(history.location.pathname);
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
              <NavLink to={`${lastPage}`} exact>
                Back to List
              </NavLink>
            </li>
            <li key='logout'>
              <NavLink to='/login' exact>
                Logout
              </NavLink>
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
