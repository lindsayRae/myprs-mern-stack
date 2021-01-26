import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import {
  MdKeyboardBackspace,
  MdAdd,
  MdCancel,
  MdModeEdit,
} from 'react-icons/md';
import './SingleMovement.css';
const SingleMovement = ({ history, match }) => {
  const { id } = match.params;
  const name = id.replace(/-/g, ' ');

  const [error, setError] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState('');
  const [editPR, setEditPR] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editComment, setEditComment] = useState('');

  const [newPR, setNewPR] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().slice(0, 10));
  const [newComment, setNewComment] = useState('');

  console.log('newPR', newPR);
  console.log('newComment', newComment);
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    getEntries();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  /**
   * @description GET all of users records and match to the name user clicked on to display records or form for new entry
   */
  const getEntries = async () => {
    setError('');
    const type = getType();
    const allRecords = await userMovementMenu(type);

    if (allRecords.length <= 0) {
      setEntries([]);
      setEdit(true);
    } else {
      const selectedMovement = allRecords.filter((el) => el.name === name);
      setEntries(selectedMovement);
      setLoading(false);
    }
  };

  const getType = () => {
    const str = match.path;
    const type = str.substring(1).replace(/\/.*/, '').slice(0, -1);
    return type;
  };

  const handleDelete = async (id, type) => {
    const body = {
      prID: id,
      type: type,
    };

    try {
      const res = await fetch(
        `http://localhost:1234/api/prs/${user.user._id}`,
        {
          method: 'DELETE',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': user.jwt,
          },
        }
      );
      const data = await res.json();

      if (data.message) {
        setError(data.message);
        return;
      } else if (data.removed) {
        setEntries(
          entries.filter((obj) => {
            return obj._id !== id;
          })
        );
      }
    } catch (error) {
      setError(error);
    }
  };

  /**
   * @description UPDATE the single entry, PR and Date required in form
   */
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!editPR || !editDate) {
      setError('Must enter PR and date');
      return;
    }
    const body = {
      prID: selectedEntry._id,
      name: selectedEntry.name,
      personalRecord: editPR,
      date: editDate,
      comment: editComment,
      type: selectedEntry.type,
    };

    const url = `http://localhost:1234/api/prs/${user.user._id}`;

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
      setEdit(false);
      getEntries();
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  /**
   * @description CREATES first pr for a movement
   *
   */
  const handleNewSubmit = async (event) => {
    event.preventDefault();
    if (!newPR || !newDate) {
      setError('Must enter PR and date');
      return;
    }
    let obj = JSON.parse(sessionStorage.getItem('All Movements'));
    obj = obj.find((item) => item.name === name);

    const body = {
      user_id: user.user._id,
      name: name,
      preDefined: obj.preDefined,
      type: obj.type,
      personalRecord: newPR,
      comment: newComment,
      date: newDate,
    };

    const url = `http://localhost:1234/api/prs/${obj.type}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.jwt,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.message) setError(data.message);
      else {
        setEdit(false);
        setNewPR('');
        setNewDate('');
        setNewComment('');
        getEntries();
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };

  const userMovementMenu = async (type) => {
    const user_ID = user.user._id;
    try {
      const url = `http://localhost:1234/api/prs/${user_ID}?movement=${type}`;

      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': user.jwt,
      };
      const res = await fetch(url, {
        method: 'GET',
        headers: headers,
      });
      const data = await res.json();

      if (data.message) {
        setError(data.message);
        return;
      } else {
        return data;
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const formatDate = (date) => {
    let dateArr = date.split('-');
    return `${dateArr[1]}-${dateArr[2]}-${dateArr[0]}`;
  };
  return (
    <div className='page-splash'>
      <header className='header header-fixed'>
        <div className='header-inner' onClick={() => history.goBack()}>
          <div className='navbar'>
            <button className='menu-bars link-like'>
              <MdKeyboardBackspace className='text-info' />
            </button>
            <h3 className='capitalize page-title'>{name}</h3>
            <div style={{ width: '26px' }}> </div>
          </div>
        </div>
        <div className='img-container overlay'>
          <img
            src='../images/row.jpg'
            alt='cardio'
            className='img-responsive'
          />
          <div className='add-container'>
            <form className='' onSubmit={handleNewSubmit}>
              <div className='inline-form-group'>
                <div className='inline-form'>
                  <input
                    id='new-pr-entry'
                    value={newPR}
                    type='number'
                    onChange={(event) => {
                      console.log(event);
                      setError('');
                      setNewPR(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor='new-pr-entry' className='modal-label-name'>
                    <span className='modal-content-name'>PR:</span>
                  </label>
                </div>
                <div className='inline-form'>
                  <input
                    id='new-date'
                    value={newDate}
                    type='date'
                    onChange={(event) => {
                      console.log(event);
                      setError('');
                      setNewDate(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor='new-date' className='modal-label-name'>
                    <span className='modal-content-name light'></span>
                  </label>
                </div>
              </div>

              <div className='modal-form light'>
                <textarea
                  id='new-comment'
                  value={newComment}
                  onChange={(event) => {
                    setError('');
                    setNewComment(event.target.value);
                  }}
                />
                <label htmlFor='new-comment' className='modal-label-name'>
                  <span className='modal-content-name'>Notes...</span>
                </label>
              </div>
              <div className='inline-form-submit'>
                <button type='submit' className='btn-text-icon'>
                  <MdAdd style={{ fontSize: '24px' }} />
                  <span>Add Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
      <div className='list-page'>
        <div className='list'>
          {loading && <p>Loading...</p>}
          {!loading && (
            <>
              {!entries.length && (
                <>
                  <ul className='movements'>
                    <li>No records yet for this movement, get moving!</li>
                  </ul>
                </>
              )}

              <ul className='movements'>
                {entries.length > 0 &&
                  entries.map((entry) => (
                    <li key={entry._id} className='capitalize single-movement'>
                      <div className='icon-container delete-container'>
                        <MdCancel
                          onClick={() => {
                            handleDelete(entry._id, entry.type);
                          }}
                        />
                      </div>
                      <div className='icon-container edit-container'>
                        <MdModeEdit
                          onClick={() => {
                            setSelectedEntry(entry);
                            setEditPR(entry.personalRecord);
                            setEditDate(entry.date);
                            setEdit(true);
                          }}
                          id={entry._id}
                        />
                      </div>
                      <span className='entry-container'>
                        <span>PR: {entry.personalRecord}</span>
                        <span>{formatDate(entry.date)}</span>
                      </span>

                      {edit && selectedEntry._id === entry._id && (
                        <form onSubmit={handleEditSubmit}>
                          <input
                            value={editPR}
                            onChange={(event) => {
                              setError('');
                              setEditPR(event.target.value);
                            }}
                            placeholder='New PR'
                          />
                          <input
                            value={editDate}
                            onChange={(event) => {
                              setError('');
                              setEditDate(event.target.value);
                            }}
                            placeholder='New Date'
                          />
                          <textarea
                            value={editComment}
                            onChange={(event) => {
                              setError('');
                              setEditComment(event.target.value);
                            }}
                            placeholder='New Comment'
                          />
                          <button className='linkLike'>Save Change</button>
                        </form>
                      )}
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default SingleMovement;
