import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const ChangePassword = ({ history }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const { user } = useContext(UserContext);
  console.log(user);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!oldPassword) {
      setError('You must provide a your old password');
      return;
    } else if (!newPassword) {
      setError('You must add a new password.');
      return;
    } else if (!confirmPassword) {
      setError('You must confirm your password.');
      return;
    } else if (newPassword !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    try {
      const response = await fetch('/api/users/change-password', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email: user.user.email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message) {
        setError(data.message);
        return;
      } else {
        setPasswordChanged(true);
      }
    } catch (err) {
      setError('Something went wrong: ', err);
      setPasswordChanged(false);
    }
  };

  const isDisabled = () => {
    if (
      oldPassword.length !== 0 &&
      newPassword.length !== 0 &&
      confirmPassword.length !== 0
    ) {
      setDisabled(false);
    } else setDisabled(true);
  };

  return (
    <div className='page-splash'>
      <header className='header header-fixed' onClick={() => history.goBack()}>
        <div className='header-inner'>
          <MdKeyboardBackspace style={{ fontSize: 25 }} />
        </div>
      </header>
      <div className='login'>
        <div className='login-content'>
          {!passwordChanged && (
            <>
              <h2 className='login-title'>Change Password</h2>

              <div className='form-login'>
                <form onSubmit={handleSubmit}>
                  <div className='form-main'>
                    <input
                      type='password'
                      name='old-password'
                      value={oldPassword}
                      onChange={(event) => {
                        isDisabled();
                        setError('');
                        setOldPassword(event.target.value);
                      }}
                      required
                      autoComplete='off'
                    />
                    <label htmlFor='password' className='label-name'>
                      <span className='content-name'>Old Password</span>
                    </label>
                  </div>
                  <div className='form-main'>
                    <input
                      type='password'
                      name='new-password'
                      value={newPassword}
                      onChange={(event) => {
                        isDisabled();
                        setError('');
                        setNewPassword(event.target.value);
                      }}
                      required
                      autoComplete='off'
                    />
                    <label htmlFor='password' className='label-name'>
                      <span className='content-name'>New Password</span>
                    </label>
                  </div>
                  <div className='form-main'>
                    <input
                      type='password'
                      name='confirm-password'
                      value={confirmPassword}
                      onChange={(event) => {
                        isDisabled();
                        setError('');
                        setConfirmPassword(event.target.value);
                      }}
                      required
                      autoComplete='off'
                    />
                    <label htmlFor='confirm-password' className='label-name'>
                      <span className='content-name'>Confirm Password</span>
                    </label>
                  </div>
                  {error && <p className='error-msg'>{error}</p>}
                  <div className='login-btn' style={{ marginTop: '30px' }}>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={disabled}
                    >
                      Change
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {passwordChanged && (
            <>
              <h2 className='login-title'>Password has been changed</h2>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <NavLink to='/dashboard' exact>
                  <button className='btn btn-primary'>Back to Dashboard</button>
                </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
