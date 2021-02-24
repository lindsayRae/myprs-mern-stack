import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Modal from '../components/Modal';
import EditMovement from '../components/EditMovement';

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
  const [formError, setFormError] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState('');
  const [editPR, setEditPR] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editComment, setEditComment] = useState('');
  const [unit, setUnit] = useState('unit');

  const [newPR, setNewPR] = useState('');

  const [newDate, setNewDate] = useState('');
  const [currentDate] = useState(new Date().toISOString().slice(0, 10));
  const [newComment, setNewComment] = useState('');

  const { user } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');

  useEffect(() => {
    if (!isAuthenticated) {
      history.push('/');
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      setLoading(false);
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
      const res = await fetch(`/api/prs/${user.user._id}`, {
        method: 'DELETE',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': user.jwt,
        },
      });
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
   * @description CREATES first pr for a movement
   *
   */
  const handleNewSubmit = async (event) => {
    event.preventDefault();

    if (!newPR) {
      setFormError('Must enter a PR');
      return;
    }
    if (unit === 'unit') {
      setFormError('Must select a unit');
      return;
    }
    if (!newDate) {
      setFormError('Must enter a date');
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
      unitType: unit,
    };

    const url = `/api/prs/${obj.type}`;

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
        setNewPR('');
        setNewDate('');
        setNewComment('');
        setUnit('unit');
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
      const url = `/api/prs/${user_ID}?movement=${type}`;

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
    return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`;
  };

  const modalRef = React.useRef();
  const openModal = () => {
    setError('');
    modalRef.current.openModal();
  };
  const closeModal = () => {
    setError('');
    modalRef.current.closeModal();
  };

  return (
    <div className='page-splash'>
      <header className='header header-fixed header-desktop'>
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
            src='../images/back.jpg'
            alt='cardio'
            className='img-responsive'
          />

          <div className='add-container'>
            <form className='' onSubmit={handleNewSubmit}>
              <div className='inline-form-group'>
                <div className='form-main inline-form'>
                  <input
                    id='new-pr-entry'
                    value={newPR}
                    type='text'
                    onChange={(event) => {
                      setError('');
                      setFormError('');
                      setNewPR(event.target.value);
                    }}
                    required
                  />
                  <label htmlFor='new-pr-entry' className='label-name'>
                    <span className='content-name'>PR</span>
                  </label>
                </div>
                <div className='form-main inline-form custom-select'>
                  <select
                    onChange={(event) => {
                      setError('');
                      setFormError('');
                      setUnit(event.target.value);
                      if (event.target.value !== 'unit') {
                        event.target.nextSibling.classList.add(
                          'custom-underline'
                        );
                      } else {
                        event.target.nextSibling.classList.remove(
                          'custom-underline'
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
              <div className='form-main '>
                <input
                  id='new-date'
                  value={newDate}
                  type='date'
                  onClick={(e) => {
                    e.target.value = currentDate;
                    setNewDate(e.target.value);
                  }}
                  onChange={(event) => {
                    setError('');
                    setFormError('');
                    setNewDate(event.target.value);
                  }}
                  required
                />
                <label htmlFor='new-date' className='label-name'>
                  <span className='content-name light'>Date</span>
                </label>
              </div>
              <div className='form-main'>
                <textarea
                  id='new-comment'
                  value={newComment}
                  onChange={(event) => {
                    setError('');
                    setFormError('');
                    setNewComment(event.target.value);
                  }}
                />
                <label htmlFor='new-comment' className='label-name'>
                  <span className='content-name'>Notes...</span>
                </label>
              </div>

              <div className='inline-form-submit'>
                {formError && (
                  <p className='error-msg' style={{ marginRight: '15px' }}>
                    {formError}
                  </p>
                )}
                <button type='submit' className='btn-text-icon'>
                  <MdAdd style={{ fontSize: '24px' }} />
                  <span>Add Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
      <div className='single-list-page list-desktop'>
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
                      <div
                        className='icon-container delete-container'
                        onClick={() => {
                          handleDelete(entry._id, entry.type);
                        }}
                      >
                        <MdCancel />
                      </div>
                      <div
                        className='icon-container edit-container'
                        onClick={() => {
                          setSelectedEntry(entry);
                          setEditPR(entry.personalRecord);
                          setUnit(entry.unitType);
                          setEditDate(entry.date);
                          setEditComment(entry.comment);
                          openModal();
                        }}
                        id={entry._id}
                      >
                        <MdModeEdit />
                      </div>
                      <span className='entry-container'>
                        <div>
                          <span className='pr'>{entry.personalRecord}</span>
                          <span className='unit'>{entry.unitType}</span>
                        </div>

                        <span>{formatDate(entry.date)}</span>
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
        <Modal ref={modalRef}>
          <EditMovement
            currentPR={editPR}
            unit={unit}
            currentDate={editDate}
            currentComment={editComment}
            selectedEntry={selectedEntry}
            getEntries={getEntries}
            closeModal={closeModal}
            formatDate={formatDate}
          />
        </Modal>
        {error && <p className='error-msg'>{error}</p>}
      </div>
    </div>
  );
};

export default SingleMovement;
