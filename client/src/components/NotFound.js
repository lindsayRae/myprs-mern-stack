import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
 <article className='not-found container'>
  <h1>404!</h1>
  <p>
   Content not found.
   <Link to='/dashboard'>Return to Dashboard</Link>
  </p>
 </article>
);

export default NotFound;
