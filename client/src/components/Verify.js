// 'PostForm Component'
import React from 'react';

const Verify = (props) => {
  return (
    <>
      <h2 className='capitalize modal-heading'>Are You Sure?</h2>
      <p className='modal-message'>
        Deleting this account will permanently delete the user and all of its
        data.
      </p>
      <p className='modal-message'>Continue with the delete?</p>
      <div className='btn-container'>
        <button className='btn-text-icon' onClick={() => props.closeModal()}>
          <span>Cancel</span>
        </button>
        <button
          className='btn-text-icon'
          onClick={() => props.handleDeleteUser()}
        >
          <span>Yes Delete!</span>
        </button>
      </div>
    </>
  );
};

export default Verify;
