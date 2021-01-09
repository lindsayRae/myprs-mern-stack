import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line
export default () => {
  const { user } = useContext(UserContext);
  console.log('**user: ', user);
  let history = useHistory();

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]);

  return (
    <header className='App-header'>
      <ul className='container'>
        {user && (
          <>
            <li key='home'>
              <NavLink to='/dashboard' exact>
                MyPrs
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
