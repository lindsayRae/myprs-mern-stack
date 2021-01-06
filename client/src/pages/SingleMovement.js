import React, { useState, useEffect } from 'react';

export default ({ match }) => {
 const { id } = match.params;
 const name = id.replace(/-/g, ' ');

 const [error, setError] = useState('');
 const [entries, setEntries] = useState([]);
 const [loading, setLoading] = useState(true);
 const [edit, setEdit] = useState(false);
 const [selectedEntry, setSelectedEntry] = useState('');

 console.log('selectedEntry', selectedEntry);

 const handleDelete = async () => {
  console.log('heard delete');
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
 const handleEditSubmit = (event) => {
  event.preventDefault();
  console.log('edit...');
 };
 useEffect(() => {
  const getEntries = async () => {
   let allRecords = await userMovementMenu();

   if (allRecords.length <= 0) {
    setEntries([]);
   } else {
    let selectedMovement = allRecords.filter((el) => el.name === name);
    console.log(selectedMovement);
    setEntries(selectedMovement);

    setLoading(false);
   }
  };
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
  } catch (err) {
   setError(err.message);
  }
 };

 // const modalRef = React.useRef()
 // const openModal = (cardio) => {
 //     console.log(cardio)

 //     movementPR(cardio)
 //     modalRef.current.openModal(cardio);
 // }

 return (
  <div>
   <h2 className='capitalize'>{name}</h2>
   <div>
    {loading && <p>Loading...</p>}
    {!loading && (
     <>
      {!entries.length && <p>No records yet for this movement, get moving!</p>}
      <ul>
       {entries.length > 0 &&
        entries.map((entry) => (
         <li key={entry._id} className='capitalize'>
          <p>
           PR: {entry.personalRecord}
           <span>Date: {entry.date}</span>
           <button onClick={handleDelete}>Delete</button>
           <button
            onClick={() => {
             setSelectedEntry(entry);
             // setEdit(true)
            }}
            id={entry._id}
           >
            Edit
           </button>
          </p>
          {selectedEntry._id === entry._id && (
           <form onSubmit={handleEditSubmit}>
            <input
             value={entry.personalRecord}
             onChange={(event) => {}}
             placeholder='New PR'
            />
            <input
             value={entry.date}
             onChange={(event) => {}}
             placeholder='New Date'
            />
            <button>Confirm</button>
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
