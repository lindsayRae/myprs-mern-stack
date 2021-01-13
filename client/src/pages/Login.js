import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      history.push('/dashboard');
    }
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
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

  return (
    <div>
      <form className='container' name='login' onSubmit={handleSubmit}>
        <p>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(event) => {
              setError('');
              setEmail(event.target.value);
            }}
          />
        </p>
        <p>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            value={password}
            onChange={(event) => {
              setError('');
              setPassword(event.target.value);
            }}
          />
        </p>
        <p>
          <button
            type='submit'
            disabled={!email && !password}
            className='linkLike'
          >
            Login
          </button>
        </p>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
