import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md';

const SignUp = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const { user, setUser } = useContext(UserContext);

  // useEffect(() => {
  //   console.log(user);
  //   if (user) {
  //     history.push('/login');
  //   } else {
  //     history.push('/signup');
  //   }
  // }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!userName) {
      setError('You must provide a username');
      return;
    } else if (!email) {
      setError('You must provide an email');
      return;
    } else if (!password) {
      setError('You must provide a password');
      return;
    } else if (!confirmPassword) {
      setError('You must confirm your password.');
      return;
    } else if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    try {
      const response = await fetch('http://localhost:1234/api/users/register', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.message) {
        setError(data.message);
        return;
      } else {
        setUser(data);
      }
    } catch (err) {
      setError('Something went wrong: ', err);
    }
  };

  const isDisabled = () => {
    if (
      userName.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
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
          <h2 className='login-title'>Create an account</h2>
          <p className='login-text'>Join for free!</p>
          <div className='login-form'>
            <form onSubmit={handleSubmit}>
              <div className='form-row'>
                <label htmlFor='userName'>User Name:</label>
                <input
                  type='string'
                  value={userName}
                  onChange={(event) => {
                    isDisabled();
                    setError('');
                    setUserName(event.target.value);
                  }}
                />
              </div>
              <div className='form-row'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  value={email}
                  onChange={(event) => {
                    isDisabled();
                    setError('');
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className='form-row'>
                <label htmlFor='password'>Password:</label>
                <input
                  type='password'
                  value={password}
                  onChange={(event) => {
                    isDisabled();
                    setError('');
                    setPassword(event.target.value);
                  }}
                />
              </div>
              <div className='form-row'>
                <label htmlFor='confirm-password'>Confirm Password:</label>
                <input
                  type='password'
                  value={confirmPassword}
                  onChange={(event) => {
                    isDisabled();
                    setError('');
                    setConfirmPassword(event.target.value);
                  }}
                />
              </div>
              <div className='login-btn'>
                <button
                  type='submit'
                  className='btn btn-primary'
                  disabled={disabled}
                >
                  Sign up
                </button>
              </div>
            </form>
            <p className='text-light'>
              Already have an account?
              <NavLink to='/login' exact>
                {' '}
                Login
              </NavLink>
            </p>

            {error && <p className='error-msg'>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
