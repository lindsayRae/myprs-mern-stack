import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Signup = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
    if (user) {
      history.push('/login');
    } else {
      history.push('/signup');
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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

  return (
    <div>
      <form className='container' onSubmit={handleSubmit}>
        Signup
        <p>
          <label htmlFor='userName'>User Name:</label>
          <input
            type='string'
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </p>
        <p>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </p>
        <p>
          <button type='submit' className='linkLike'>
            Signup
          </button>
        </p>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
