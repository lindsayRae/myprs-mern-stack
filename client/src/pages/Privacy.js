import React from 'react';

import Navbar from '../components/Navbar';

const Privacy = () => {
  return (
    <div className='page-splash'>
      <header className='header header-fixed'>
        <div className='header-inner'>
          <Navbar />
        </div>
      </header>
      <div className='login header-page'>
        <div className='login-content'>
          <h2 className='login-title capitalize'>Privacy Policy</h2>
          <p className='login-text'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            efficitur, diam quis semper suscipit, justo justo aliquet libero,
            quis mollis leo enim nec ipsum. Donec scelerisque justo sit amet
            mollis scelerisque. Cras efficitur molestie tincidunt. Etiam
            malesuada iaculis semper. Vestibulum cursus metus diam, ac viverra
            purus lacinia at. Cras vel neque nec purus elementum iaculis ut sit
            amet ante.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
