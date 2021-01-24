import React, { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

import { MdKeyboardBackspace } from 'react-icons/md';

const Login = ({ history }) => {
  // console.log('history', history);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push('/dashboard');
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setError('You must provide an email and password.');
      return;
    }
    try {
      const response = await fetch('http://localhost:1234/api/auth', {
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

      if (data.message) {
        setError(data.message);
        return;
      }
      setUser(data);
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
          <div className='login-form'>
            <form name='login' onSubmit={handleSubmit}>
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
            <p className='text-light'>
              Don't have an account?
              <NavLink to='/signup' exact>
                {' '}
                Sign up
              </NavLink>
            </p>
            {error && <p className='error-msg'>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
