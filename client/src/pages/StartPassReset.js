import React, { useEffect, useState } from 'react';

const Reset = (props) => {
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    //! REMEBER dont leave out preventDefault()
    e.preventDefault();
    let body = {
      email: email,
    };

    //! Testing for sending email heroku
    let url = `http://localhost:1234/api/users/reset`;
    console.log('URL', url);

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
        setError(data.message);
        setSent(false);
        return;
      }
      setSent(true);
      localStorage.setItem('userData', JSON.stringify(data));
      setError('');
    } catch (error) {
      console.error(error);
      setError(error.message);
      setSent(false);
    }
  };

  return (
    <div className='page-splash'>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title capitalize'>Password Reset</h2>
          {!sent && (
            <>
              <p className='login-text'>
                Enter in your email to start password reset.
              </p>
              <div className='form-login'>
                <form onSubmit={handleSubmit}>
                  <div className='form-main'>
                    <input
                      type='text'
                      name='email'
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                      required
                      autoComplete='off'
                    />
                    <label htmlFor='username' className='label-name'>
                      <span className='content-name'>Email</span>
                    </label>
                  </div>
                  <div className='login-btn' style={{ marginTop: '30px' }}>
                    <button type='submit' className='btn btn-primary'>
                      Send Email
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
          {sent && (
            <p className='login-text'>
              Please check your email to complete password reset.
            </p>
          )}

          {error && <p className='error-msg'>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default Reset;
