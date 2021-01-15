import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

const Landing = ({ history }) => {
  console.log('history', history);
  const [login, setLogin] = useState(false);
  const [signup, setSignup] = useState(false);

  return (
    <div>
      {!login && !signup && (
        <>
          <h1>hello</h1>
          <button
            className='linkLike'
            onClick={() => {
              setLogin(true);
              setSignup(false);
            }}
          >
            Login
          </button>
          <button
            className='linkLike'
            onClick={() => {
              setLogin(false);
              setSignup(true);
            }}
          >
            Signup
          </button>
        </>
      )}
      {login && !signup && (
        <>
          <button
            onClick={() => {
              setLogin(false);
              setSignup(false);
            }}
          >
            Logo..
          </button>
          <Login history={history} />
          <button
            onClick={() => {
              setLogin(false);
              setSignup(true);
            }}
          >
            Sign up
          </button>
        </>
      )}
      {!login && signup && (
        <>
          <button
            onClick={() => {
              setLogin(false);
              setSignup(false);
            }}
          >
            Logo..
          </button>
          <Signup history={history} />
          <button
            onClick={() => {
              setLogin(true);
              setSignup(false);
            }}
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default Landing;
