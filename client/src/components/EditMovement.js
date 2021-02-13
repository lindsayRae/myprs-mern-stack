import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const EditMovement = (props) => {
  console.log(props);
  const [error, setError] = useState('');
  const [editedPR, setEditedPR] = useState(props.currentPR);
  const [unit, setUnit] = useState(props.unit);
  const [editedDate, setEditedDate] = useState(props.currentDate);
  const [editedComment, setEditComment] = useState(props.currentComment);
  const { user } = useContext(UserContext);

  /**
   * @description UPDATE the single entry, PR and Date required in form
   */
  const handleEditMovement = async (event) => {
    event.preventDefault();
    if (!editedPR) {
      setError('Must enter a PR');
      return;
    }
    if (!unit) {
      setError('Must select a unit');
      return;
    }
    if (!editedDate) {
      setError('Must enter a date');
      return;
    }
    const body = {
      prID: props.selectedEntry._id,
      name: props.selectedEntry.name,
      personalRecord: editedPR,
      date: editedDate,
      comment: editedComment,
      type: props.selectedEntry.type,
      unitType: unit,
    };

    const url = `/api/prs/${user.user._id}`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.jwt,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.message) {
        setError(data.message);
        return;
      }
      props.getEntries();
      props.closeModal();
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <>
      <h2 className='capitalize modal-heading'>Edit</h2>
      <form
        className='modal-form-container'
        onSubmit={handleEditMovement}
        noValidate
      >
        <div className='inline-form-group'>
          <div className='form-main modal-form inline-form'>
            <input
              id='edit-pr'
              value={editedPR}
              type='text'
              onChange={(event) => {
                setError('');
                setEditedPR(event.target.value);
              }}
              required
            />
            <label htmlFor='edit-pr' className='label-name'>
              <span className='content-name'>PR</span>
            </label>
          </div>
          <div className='form-main inline-form custom-select'>
            <select
              value={unit}
              onChange={(event) => {
                // setFormError('');
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

            <label
              htmlFor=''
              className='label-name custom-modal-underline'
              id=''
            ></label>
          </div>
        </div>

        <div className='form-main modal-form'>
          <input
            id='edit-date'
            value={editedDate}
            //
            // value='2020-01-01'
            type='date'
            onChange={(event) => {
              setError('');
              setEditedDate(event.target.value);
            }}
            required
          />
          <label htmlFor='edit-date' className='label-name'>
            <span className='content-name'>Date</span>
          </label>
        </div>
        <div className='form-main modal-form'>
          <textarea
            id='edit-notes'
            value={editedComment}
            onChange={(event) => setEditComment(event.target.value)}
          />
          <label htmlFor='edit-notes' className='label-name'>
            <span className='content-name'>Notes...</span>
          </label>
        </div>
        {error && <p>{error}</p>}
        <div className='form-submit'>
          <button type='submit' className='btn-text-icon'>
            <span>Save</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default EditMovement;
