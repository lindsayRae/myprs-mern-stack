import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';

const SingleMovement = ({ match }) => {
  const { id } = match.params;
  const name = id.replace(/-/g, ' ');

  const [error, setError] = useState('');
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState('');
  const [editPR, setEditPR] = useState('');
  const [newPR, setNewPR] = useState('');
  const [editDate, setEditDate] = useState('');
  const [newDate, setNewDate] = useState('');
  const [editComment, setEditComment] = useState('');
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    getEntries();
  }, []);
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

  return (
    <div>
      <h2 className='capitalize'>{name}</h2>
      <div>
        {loading && <p>Loading...</p>}
        {!loading && (
          <>
            {!entries.length && (
              <>
                <p>No records yet for this movement, get moving!</p>
              </>
            )}

            <ul>
              {entries.length > 0 &&
                entries.map((entry) => (
                  <li key={entry._id} className='capitalize'>
                    <p>
                      PR: {entry.personalRecord}
                      <span>Date: {entry.date}</span>
                      <button
                        className='linkLike'
                        onClick={() => {
                          handleDelete(entry._id, entry.type);
                        }}
                      >
                        Delete
                      </button>
                      {'  '}
                      <button
                        className='linkLike'
                        onClick={() => {
                          setSelectedEntry(entry);
                          setEditPR(entry.personalRecord);
                          setEditDate(entry.date);
                          setEdit(true);
                        }}
                        id={entry._id}
                      >
                        Edit
                      </button>
                    </p>
                    {edit && selectedEntry._id === entry._id && (
                      <form onSubmit={handleEditSubmit}>
                        <input
                          value={editPR}
                          onChange={(event) => {
                            setError('');
                            setEditPR(event.target.value);
                          }}
                          placeholder='New PR'
                          required
                        />
                        <input
                          value={editDate}
                          onChange={(event) => {
                            setError('');
                            setEditDate(event.target.value);
                          }}
                          placeholder='New Date'
                          required
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
            <form onSubmit={handleNewSubmit}>
              <input
                value={newPR}
                onChange={(event) => {
                  setError('');
                  setNewPR(event.target.value);
                }}
                placeholder='New PR'
              />
              <input
                value={newDate}
                onChange={(event) => {
                  setError('');
                  setNewDate(event.target.value);
                }}
                placeholder='New Date'
              />
              <textarea
                value={newComment}
                onChange={(event) => {
                  setError('');
                  setNewComment(event.target.value);
                }}
                placeholder='New Comment'
              />
              <button className='linkLike'>Add Entry</button>
            </form>
          </>
        )}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SingleMovement;
