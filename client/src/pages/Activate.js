import React, { useEffect, useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import queryString from 'query-string';

const Activate = (props) => {
  const [error, setError] = useState('');
  const [isActivated, setIsActivated] = useState(false);
  const { user, setUser } = useContext(UserContext);

  let params = queryString.parse(props.location.search);

  console.log('user', user);
  useEffect(() => {
    console.log('in use effect');
    validateAccount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const validateAccount = async () => {
    const body = {
      email: params.email,
      GUID: params.guid,
    };
    let baseURL = process.env.web_url || 'http://localhost:1234';

    let url = `${baseURL}/api/activate`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        //! REMEMBER headers are required
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      console.log(data);

      if (data.message) {
        setError(data.message);
        setIsActivated(false);
        return;
      }
      setUser(data);
      setIsActivated(true);
      localStorage.setItem('userData', JSON.stringify(data));
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
      setIsActivated(false);
    }
  };

  return (
    <div className='page-splash'>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title capitalize'>
            {!isActivated ? 'Activating...' : 'Activated'}
          </h2>

          {isActivated && (
            <>
              <p className='login-text'>
                Thank you for validating your email at: {params.email}
              </p>
              <div className='form-login'>
                <NavLink to='/login' className='login-btn'>
                  <button className=' btn btn-primary'>Login</button>
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

export default Activate;
