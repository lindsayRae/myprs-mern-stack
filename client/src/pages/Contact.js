import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';

const Dashboard = (props) => {
  const { user } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');
  const [error, setError] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [message, setMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) {
      setError('You must include a message');
      return;
    }

    let body = {
      name: user.user.userName,
      email: user.user.email,
      message: message,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.status !== 200) {
        setError(data.message);
        return;
      } else {
        setMessageSent(true);
      }
    } catch (err) {
      setError('Something went wrong: ', err);
      setMessageSent(false);
    }
  };

  return (
    <div className='page-splash'>
      {isAuthenticated && (
        <>
          <header className='header header-fixed'>
            <div className='header-inner'>
              <Navbar />
            </div>
          </header>
          <div className='login header-page'>
            <div className='login-content'>
              <h2 className='login-title capitalize'>Contact Us</h2>
              {!messageSent ? (
                <>
                  <p className='login-text'>
                    Have a question or feedback? Send us a message!
                  </p>
                  <div className='form-login'>
                    <form name='login' onSubmit={handleSubmit}>
                      <div className='message-container'>
                        <label htmlFor='message' className=''>
                          Start your message here:
                        </label>
                        <textarea
                          className='message'
                          type='text'
                          name='message'
                          rows='3'
                          id='message'
                          value={message}
                          onChange={(event) => {
                            setDisabled(false);
                            setError('');
                            setMessage(event.target.value);
                          }}
                          required
                          autoComplete='off'
                        />
                      </div>
                      {error && <p className='error-msg'>{error}</p>}

                      <div className='login-btn' style={{ marginTop: '30px' }}>
                        <button
                          type='submit'
                          disabled={disabled}
                          className='btn btn-primary'
                        >
                          Send
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                <p className='login-text'>Message sent. Thank you!</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
