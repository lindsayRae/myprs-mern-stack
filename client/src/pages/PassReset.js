import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import queryString from 'query-string';

const PassReset = (props) => {
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [validResetLink, setValidResetLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  let params = queryString.parse(props.location.search);
  console.log('In PassReset Componenet');

  useEffect(() => {
    console.log('In PassReset Componenet UseEffect');
    validateAccount();
  }, []);

  const validateAccount = async () => {
    const body = {
      email: params.email,
      GUID: params.guid,
    };

    let baseURL = process.env.web_url;
    let url = `${baseURL}/api/activate`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log(data);
      if (data.message) {
        setLoading(false);
        setValidResetLink(false);
        setError(data.message);
        return;
      }

      setValidResetLink(true);
      setLoading(false);

      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    let body = {
      email: params.email,
      password: password,
    };
    try {
      const res = await fetch('/api/users/newpass', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      console.log(data);
      if (data.message) {
        setLoading(false);
        setValidResetLink(false);
        setError(data.message);
        return;
      }
      setError('');
      setLoading(false);
      setValidResetLink(false);
      setPasswordSuccess(true);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    console.log('here');
  };

  const isDisabled = () => {
    if (password.length !== 0 && confirmPassword.length !== 0) {
      setDisabled(false);
    } else setDisabled(true);
  };
  return (
    <div className='page-splash'>
      <div className='login header-page'>
        <div className='login-content'>
          {loading && (
            <>
              <h2 className='login-title capitalize'>Reset Password</h2>
              <p className='login-text'>Validating ...</p>
            </>
          )}
          {!loading && !passwordSuccess && validResetLink && (
            <>
              <h2 className='login-title capitalize'>Reset Password</h2>
              <p className='login-text'>Enter in a new password.</p>
              <div className='form-login'>
                <form onSubmit={handleSubmit}>
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

                  <div className='login-btn' style={{ marginTop: '30px' }}>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={disabled}
                    >
                      Set Password
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {!loading && passwordSuccess && (
            <>
              <h2 className='login-title capitalize'>
                Password reset was successful
              </h2>
              <p className='login-text'></p>

              <div className='splash-buttons' style={{ marginTop: '30px' }}>
                <NavLink to='/login' exact>
                  <button className='btn btn-primary'>Back to Login</button>
                </NavLink>
              </div>
            </>
          )}
          {error && <p className='error-msg'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default PassReset;
