import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const EditMovement = (props) => {
  const [error, setError] = useState('');
  const [editedPR, setEditedPR] = useState(props.currentPR);
  const [editedDate, setEditedDate] = useState(props.currentDate);
  const [editedComment, setEditComment] = useState(props.currentComment);
  const { user } = useContext(UserContext);

  /**
   * @description UPDATE the single entry, PR and Date required in form
   */
  const handleEditMovement = async (event) => {
    event.preventDefault();
    if (!editedPR || !editedDate) {
      setError('Must enter PR and date');
      return;
    }
    const body = {
      prID: props.selectedEntry._id,
      name: props.selectedEntry.name,
      personalRecord: editedPR,
      date: editedDate,
      comment: editedComment,
      type: props.selectedEntry.type,
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
        <div className='form-main modal-form'>
          <input
            id='edit-pr'
            value={editedPR}
            type='number'
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
        <div className='form-main modal-form'>
          <input
            id='edit-date'
            value={editedDate}
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
