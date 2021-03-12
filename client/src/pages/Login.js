import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');

  const { setUser } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

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


  return (
    <div className='page-splash'>     
      <div className='login'>
        <div className='login-content'>
          <h2 className='login-title'>Welcome Back</h2>
          <p className='login-text'>Login to your account</p>
          <div className='form-login'>
            <form name='login' onSubmit={handleSubmit}>
              <div className='form-main'>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(event) => {                    
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

              <div className='login-btn' style={{ marginTop: '30px' }}>
                <button
                  type='submit'                 
                  className='btn btn-primary'
                >
                  Login
                </button>
              </div>
            </form>

            <p className='login-link-text' style={{ marginBottom: '10px' }}>
              Don't have an account?
              <NavLink to='/signup' exact>
                {' '}
                Sign up
              </NavLink>
            </p>
            <p className='login-link-text' style={{ marginTop: '0px' }}>
              Forgot password?{' '}
              <NavLink to='/reset' exact>
                {' '}
                Reset
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
