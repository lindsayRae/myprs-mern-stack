import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { MdKeyboardBackspace } from 'react-icons/md';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);
  console.log('in login user:', user);
  // useEffect(() => {
  //   if (user) {
  //     history.push('/dashboard');
  //   }
  // }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('heard login...');
    if (!email || !password) {
      setError('You must provide an email and password.');
      return;
    }
    try {
      const response = await fetch(`/api/auth`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('data', data);
      if (data.message) {
        setError(data.message);
        return;
      }

      setUser(data);
      localStorage.setItem('userData', JSON.stringify(data));
      history.push('/dashboard');
    } catch (err) {
      setError(`Something went wrong: ${err}`);
    }
  };
  const isDisabled = () => {
    if (email.length !== 0 && password.length !== 0) {
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
          <h2 className='login-title'>Welcome back</h2>
          <p className='login-text'>Login to your account</p>
          <div className='form-login'>
            <form name='login' onSubmit={handleSubmit}>
              <div className='form-main'>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(event) => {
                    isDisabled();
                    setError('');
                    setEmail(event.target.value);
                  }}
                  required
                  autoComplete='off'
                />
                <label htmlFor='email' className='label-name'>
                  <span className='content-name'>Email</span>
                </label>
              </div>
              <div className='form-main'>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(event) => {
                    isDisabled();
                    setError('');
                    setPassword(event.target.value);
                  }}
                  required
                  autoComplete='off'
                />
                <label htmlFor='password' className='label-name'>
                  <span className='content-name'>Password</span>
                </label>
              </div>
              {error && <p className='error-msg'>{error}</p>}
              <p className='login-link-text'>
                Forgot password?{' '}
                <NavLink to='/reset' exact>
                  {' '}
                  Reset
                </NavLink>
              </p>
              <div className='login-btn'>
                <button
                  type='submit'
                  disabled={disabled}
                  className='btn btn-primary'
                >
                  Login
                </button>
              </div>
            </form>
            <p className='login-link-text'>
              Don't have an account?
              <NavLink to='/signup' exact>
                {' '}
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
