import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Message from '../components/Message';
import Modal from '../components/Modal';
import AddMovement from '../components/AddMovement';

const MovementList = (props) => {
  console.log(props);

  const [movements, setMovements] = useState([]);
  const [error, setError] = useState('');
  const [type, setType] = useState('');

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    let str = props.location.pathname;
    let currentType = str.substring(1, str.length - 1);
    setType(currentType);
    buildMovementMenu(currentType);
  }, []);

  /**
   * @description builds movement menu by getting default movements, user defined movements and concatenating together. Then removes duplicate moment names before displaying to user
   */
  const buildMovementMenu = async (currentType) => {
    const defaultMovements = await defaultMovementMenu(currentType);
    const userMovements = await userMovementMenu(currentType);
    const allMovements = defaultMovements.concat(userMovements);
    console.log('Setting sessionStorage');
    sessionStorage.setItem('All Movements', JSON.stringify(allMovements));

    let defaultMovementName = defaultMovements.map((movement) => {
      return movement.name;
    });

    if (userMovements && userMovements.length != 0) {
      //* use map() to get just the name
      let userDefinedMovementNames = userMovements.map((movement) => {
        return movement.name;
      });
      //* concat() the two arrays together
      let allMovements = userDefinedMovementNames.concat(defaultMovementName);

      //* new Set() removes duplicate values -> returns object
      let uniqueMenu = new Set(allMovements);

      //* ... spread puts back into array
      let usersMenu = [...uniqueMenu];

      setMovements(usersMenu.sort());
      return;
    } else {
      setMovements(defaultMovementName);
      return defaultMovementName;
    }
  };

  /**
   * @description gets the defaults movements setup in the DB
   */
  const defaultMovementMenu = async (currentType) => {
    try {
      const url = `http://localhost:1234/api/movements/${currentType}`;

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
  /**
   * @description gets the user defined movements
   */
  const userMovementMenu = async (currentType) => {
    const user_ID = localStorage.getItem('UserID');
    try {
      const url = `http://localhost:1234/api/prs/${user_ID}?movement=${currentType}`;

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
      }
      return data;
    } catch (err) {
      setError(err.message);
    }
  };
  const currentDate = () => {
    const today = new Date();
    const year = today.getFullYear().toString().substr(2, 2);
    return `${today.getMonth() + 1}/${today.getDate()}/${year}`;
  };
  /**
   * @description CREATE new movement name and pr entry
   * @param {*} entry
   */
  const addNewMovement = async (entry) => {
    let body = {
      user_id: localStorage.getItem('UserID'),
      name: entry.name.trim().toLowerCase(),
      type: entry.type,
      personalRecord: entry.personalRecord.trim(),
      comment: entry.comment ? entry.comment.trim() : '',
      date: currentDate(),
      preDefined: false,
    };

    try {
      const res = await fetch(`http://localhost:1234/api/prs/${entry.type}`, {
        method: 'POST',
        headers: {
          'x-auth-token': localStorage.getItem('jwt'),
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      console.log('addNewMovement', data);
      if (data.message) {
        setError(data.message);
        modalRef.current.closeModal();
        return;
      }
      buildMovementMenu(entry.type);

      //? modalRef.current give access to ref in Modal component
      modalRef.current.closeModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const modalRef = React.useRef();
  const openModal = () => {
    setError('');
    modalRef.current.openModal();
  };

  return (
    <div className='container'>
      {/* {message && <Message type={message} />} */}
      <h1 className='capitalize'>{type}</h1>
      <ul>
        {movements.map((movement) => {
          let slug = movement.replace(/ /g, '-');
          return (
            <Link key={slug} to={`/${type}s/${slug}`}>
              <li className='capitalize'>{movement}</li>
            </Link>
          );
        })}
      </ul>

      <p>
        <button className='linkLike capitalize' onClick={openModal}>
          Add New {type}
        </button>
      </p>

      <Modal ref={modalRef}>
        <AddMovement type={type} addNewMovement={addNewMovement} />
        <button
          className='linkLike'
          onClick={() => {
            modalRef.current.closeModal();
          }}
        >
          Close
        </button>
      </Modal>

      {error && <p>{error}</p>}
    </div>
  );
};

export default MovementList;
