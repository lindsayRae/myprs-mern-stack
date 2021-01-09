import React, { useState, useEffect } from 'react';

export default ({ match }) => {
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

  console.log('selectedEntry', selectedEntry);

  /**
   * @description GET all of users records and match to the name user clicked on to display records or form for new entry
   */
  const getEntries = async () => {
    let allRecords = await userMovementMenu();

    if (allRecords.length <= 0) {
      setEntries([]);
      setEdit(true);
    } else {
      let selectedMovement = allRecords.filter((el) => el.name === name);

      setEntries(selectedMovement);
      setLoading(false);
    }
  };

  const handleDelete = async (event) => {
    console.log('heard delete');
    event.preventDefault();
    // try {
    //     const body = {
    //         prID: dataID,
    //         type: dataType
    //     }
    //     const res = await fetch(`http://localhost:1234/api/prs/${localStorage.getItem('UserID')}`, {
    //         method: 'DELETE'
    //     })
    //     const data = await res.json()
    // } catch (error) {

    // }
  };

  /**
   * @description UPDATE the single entry, PR and Date required in form
   */
  const handleEditSubmit = async (event) => {
    event.preventDefault();

    let body = {
      prID: selectedEntry._id,
      name: selectedEntry.name,
      personalRecord: editPR,
      date: editDate,
      comment: editComment,
      type: selectedEntry.type,
    };

    let url = `http://localhost:1234/api/prs/${localStorage.getItem('UserID')}`;

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('jwt'),
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

    let body = {
      user_id: localStorage.getItem('UserID'),
      name: name,
      preDefined: obj.preDefined,
      type: obj.type,
      personalRecord: newPR,
      comment: newComment,
      date: newDate,
    };

    let url = `http://localhost:1234/api/prs/${obj.type}`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('jwt'),
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.message) setError(data.message);
      else {
        setEdit(false);
        getEntries();
      }
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  };
  useEffect(() => {
    getEntries();
  }, []);

  const userMovementMenu = async () => {
    console.log('** heard here');
    const user_ID = localStorage.getItem('UserID');
    try {
      const url = `http://localhost:1234/api/prs/${user_ID}?movement=cardio`;
      const headers = {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('jwt'),
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

  // const updateCardio = async (cardio) => {
  //   console.log('Updating cardio...', cardio);

  //   try {
  //     const d = cardio.results;
  //     let userID = localStorage.getItem('UserID');
  //     let body = {
  //       prID: d._id,
  //       name: d.name,
  //       personalRecord: d.personalRecord,
  //       date: d.date,
  //       comment: d.comment,
  //       type: d.type,
  //     };
  //     console.log(body);
  //     const res = await fetch(`http://localhost:1234/api/prs/${userID}`, {
  //       method: 'PUT',
  //       headers: {
  //         'x-auth-token': localStorage.getItem('jwt'),
  //         'Content-type': 'application/json',
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     const data = await res.json();
  //     console.log(data);
  //   } catch (error) {}
  // };

  // const deleteCardio = (cardio) => {
  //   if (window.confirm('Delete this post?')) {
  //     const updateCardio = cardios.filter((c) => c.id !== cardio.id);
  //     setCardios(updateCardio);
  //     setFlashMessage('deleted');
  //   }
  // };

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
                  <button className='linkLike'>Add</button>
                </form>
              </>
            )}

            <ul>
              {entries.length > 0 &&
                entries.map((entry) => (
                  <li key={entry._id} className='capitalize'>
                    <p>
                      PR: {entry.personalRecord}
                      <span>Date: {entry.date}</span>
                      <button className='linkLike' onClick={handleDelete}>
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
          </>
        )}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};
