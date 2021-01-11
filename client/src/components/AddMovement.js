// 'PostForm Component'
import React, { useState, useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';

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
  if (saved === true) {
    return <Redirect to={`/${type}s`} />;
  }
  return (
    <form className='container' onSubmit={handleAddMovement}>
      <h1 className='capitalize'>Add New {type}</h1>
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
      </p>
      <p>
        <button type='submit' className='linkLike'>
          Add
        </button>
      </p>
      {error && <p>{error}</p>}
    </form>
  );
};

export default AddMovement;
