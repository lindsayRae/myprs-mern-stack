// 'PostForm Component'
import React, { useState, useEffect, useRef } from 'react';
import { MdAdd } from 'react-icons/md';

const AddMovement = ({ movement: propsMovement, addNewMovement, type }) => {
  const [movement, setMovement] = useState({ ...propsMovement });
  const [unit, setUnit] = useState('unit');
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

    if (!movement.name) {
      setError('Must enter a movement name');
      return;
    }
    if (unit === 'unit') {
      setError('Must enter a movement unit');
      return;
    }
    if (!movement.personalRecord) {
      setError('Must enter a movement PR');
      return;
    }
    addNewMovement(movement, unit);
  };

  return (
    <>
      <h2 className='capitalize modal-heading'>Add New {type}</h2>
      <form className='modal-form-container' onSubmit={handleAddMovement}>
        <div className='form-main modal-form'>
          <input
            id='form-name'
            value={movement.name || ''}
            onChange={(event) => {
              setError('');
              let nameInput = event.target.value;
              setMovement({
                ...movement,
                name: nameInput.replace(/-/g, ''),
                type,
              });
            }}
            required
          />
          <label htmlFor='form-name' className='label-name'>
            <span className='content-name'>Movement Name</span>
          </label>
        </div>
        <div className='inline-form-group'>
          <div className='form-main modal-form inline-form'>
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
            <label htmlFor='search' className='label-name'>
              <span className='content-name'>PR</span>
            </label>
          </div>
          <div className='form-main inline-form custom-select'>
            <select
              value={unit}
              onChange={(event) => {
                setError('');
                console.log(event.target.value);
                setUnit(event.target.value);
                if (event.target.value !== 'unit') {
                  event.target.nextSibling.classList.add(
                    'custom-modal-underline'
                  );
                } else {
                  event.target.nextSibling.classList.remove(
                    'custom-modal-underline'
                  );
                }
              }}
              required
            >
              <option value='unit'>Units...</option>
              <option value='lbs'>lbs</option>
              <option value='kg'>kg</option>
              <option value='min:sec'>min:sec</option>
              <option value='reps'>reps</option>
            </select>

            <label htmlFor='' className='label-name ' id=''></label>
          </div>
        </div>

        <div className='form-main modal-form'>
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
          <label htmlFor='search' className='label-name'>
            <span className='content-name'>Notes...</span>
          </label>
        </div>

        {error && <p className='error-msg'>{error}</p>}
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
