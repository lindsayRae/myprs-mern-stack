import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import Navbar from '../components/Navbar';

const DeleteConfirmation = () => {
  const [confirmDeleted, setConfirmDeleted] = useState(false);
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/users/deleteaccount/${user.user._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.jwt,
        },
      });
      const data = await res.json();

      if (data.removed) {
        setUser(null);
        localStorage.clear();
        setConfirmDeleted(true);
      }
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div className='page-splash'>
      <header className='header header-fixed'>
        <div className='header-inner'>{!confirmDeleted && <Navbar />}</div>
      </header>
      <div className='login header-page'>
        <div className='login-content'>
          {!confirmDeleted && (
            <>
              <h2 className='login-title capitalize'>Sorry to see you go!</h2>
              <p className='login-text'>
                Are you sure you want to delete this account? This will
                permanently delete the user and all of its data.
              </p>
              <div className='splash-buttons'>
                <button className='btn btn-danger' onClick={handleDeleteUser}>
                  Yes Delete!
                </button>
                <NavLink to='/dashboard' exact>
                  <button className='btn'>Cancel</button>
                </NavLink>
              </div>
            </>
          )}
          {confirmDeleted && (
            <>
              <h2 className='login-title capitalize'>Account is Deleted</h2>
              <p className='login-text'>
                I hope you keep on moving. Come back anytime!
              </p>
            </>
          )}
          {error && <p className='error-delete'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
