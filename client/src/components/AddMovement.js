// 'PostForm Component'
import React, { useState, useEffect, useRef } from 'react';
import { MdAdd } from 'react-icons/md';

const AddMovement = ({ movement: propsMovement, addNewMovement, type }) => {
  const [saved, setSaved] = useState(false);
  const [movement, setMovement] = useState({ ...propsMovement });
  const [error, setError] = useState('');

  const prevMovementRef = useRef();

  useEffect(() => {
    prevMovementRef.current = movement;
  }, [movement]);

  /**
   * @description calls addNewMovement() from /pages/MovementList.js
   *
   */
  const handleAddMovement = (event) => {
    event.preventDefault();

    if (movement.name && movement.personalRecord) {
      addNewMovement(movement);
      setSaved(true);
    } else {
      setError('Name and PR entry are required');
    }
  };

  return (
    <>
      <h2 className='capitalize modal-heading'>Add New {type}</h2>
      <form className='modal-form-container' onSubmit={handleAddMovement}>
        <div className='modal-form'>
          <input
            id='form-name'
            value={movement.name || ''}
            onChange={(event) => {
              setError('');
              setMovement({
                ...movement,
                name: event.target.value,
                type,
              });
            }}
            required
          />
          <label htmlFor='search' className='modal-label-name'>
            <span className='modal-content-name'>Movement Name</span>
          </label>
        </div>
        <div className='modal-form'>
          <input
            id='form-pr'
            value={movement.personalRecord || ''}
            onChange={(event) => {
              setError('');
              setMovement({
                ...movement,
                personalRecord: event.target.value,
                type,
              });
            }}
            required
          />
          <label htmlFor='search' className='modal-label-name'>
            <span className='modal-content-name'>PR:</span>
          </label>
        </div>
        <div className='modal-form'>
          <textarea
            id='form-notes'
            value={movement.comment || ''}
            onChange={(event) =>
              setMovement({
                ...movement,
                comment: event.target.value,
                type,
              })
            }
          />
          <label htmlFor='search' className='modal-label-name'>
            <span className='modal-content-name'>Notes...</span>
          </label>
        </div>

        {/* <h3 className='capitalize modal-heading'>Add New {type}</h3>
        <p>
          <label htmlFor='form-name'>New Movement:</label>
          <input
            id='form-name'
            value={movement.name || ''}
            placeholder='Movement Name'
            onChange={(event) => {
              setError('');
              setMovement({
                ...movement,
                name: event.target.value,
                type,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor='form-pr'>PR:</label>
          <input
            id='form-pr'
            placeholder='Personal Record'
            value={movement.personalRecord || ''}
            onChange={(event) => {
              setError('');
              setMovement({
                ...movement,
                personalRecord: event.target.value,
                type,
              });
            }}
          />
        </p>
        <p>
          <label htmlFor='form-notes'>Notes:</label>
          <textarea
            id='form-notes'
            placeholder='Notes...'
            value={movement.comment || ''}
            onChange={(event) =>
              setMovement({
                ...movement,
                comment: event.target.value,
                type,
              })
            }
          />
        </p>*/}
        {error && <p>{error}</p>}
        <div className='form-submit'>
          <button type='submit' className='btn-text-icon'>
            <MdAdd style={{ fontSize: '24px' }} />
            <span>Add</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default AddMovement;
