import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import AddMovement from '../components/AddMovement';
import { MdSearch } from 'react-icons/md';

const MovementList = (props) => {
  const [movements, setMovements] = useState([]); // original data
  const [searchResults, setSearchResults] = useState([]); // filtered
  const [searchTerm, setSearchTerm] = useState('');

  const [error, setError] = useState('');
  const [type, setType] = useState('');

  const { user } = useContext(UserContext);
  const isAuthenticated = localStorage.getItem('userData');

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.push('/');
    } else {
      let str = props.location.pathname;
      let currentType = str.substring(1, str.length - 1);
      setType(currentType);
      buildMovementMenu(currentType);
    }
  }, [props.location.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const results = searchResults.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setMovements(results);
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * @description builds movement menu by getting default movements, user defined movements and concatenating together. Then removes duplicate moment names before displaying to user
   */
  const buildMovementMenu = async (currentType) => {
    const defaultMovements = await defaultMovementMenu(currentType);
    const userMovements = await userMovementMenu(currentType);
    const allMovements = defaultMovements.concat(userMovements);

    sessionStorage.setItem('All Movements', JSON.stringify(allMovements));

    let defaultMovementName = defaultMovements.map((movement) => {
      return movement.name;
    });

    if (userMovements && userMovements.length !== 0) {
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

      setSearchResults(usersMenu.sort());
      setMovements(usersMenu.sort());
      return;
    } else {
      setSearchResults(defaultMovementName.sort());
      setMovements(defaultMovementName.sort());
      return defaultMovementName;
    }
  };

  /**
   * @description gets the defaults movements setup in the DB
   */
  const defaultMovementMenu = async (currentType) => {
    try {
      const url = `/api/movements/${currentType}`;

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
    } catch (err) {
      setError(err.message);
    }
  };
  /**
   * @description gets the user defined movements
   */
  const userMovementMenu = async (currentType) => {
    const user_ID = user.user._id;
    try {
      const url = `/api/prs/${user_ID}?movement=${currentType}`;

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
      }
      return data;
    } catch (err) {
      setError(err.message);
    }
  };

  /**
   * @description CREATE new movement name and pr entry
   * @param {*} entry
   */
  const addNewMovement = async (entry, unit) => {
    let body = {
      user_id: user.user._id,
      name: entry.name.trim().toLowerCase(),
      type: entry.type,
      personalRecord: entry.personalRecord.trim(),
      comment: entry.comment ? entry.comment.trim() : '',
      date: new Date().toISOString().slice(0, 10),
      preDefined: false,
      unitType: unit,
    };

    try {
      const res = await fetch(`/api/prs/${entry.type}`, {
        method: 'POST',
        headers: {
          'x-auth-token': user.jwt,
          'Content-type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
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
    <div className='page-splash'>
      {isAuthenticated && (
        <>
          <header className='header header-fixed header-desktop'>
            <div className='header-inner'>
              <Navbar title={type} />
            </div>
            <div className='img-container'>
              {type === 'lift' && (
                <img
                  src='./images/lift.jpg'
                  alt='cardio'
                  className='img-responsive'
                />
              )}
              {type === 'cardio' && (
                <img
                  src='./images/cardio.jpg'
                  alt='cardio'
                  className='img-responsive'
                />
              )}
              {type === 'skill' && (
                <img
                  src='./images/skill.jpg'
                  alt='cardio'
                  className='img-responsive'
                />
              )}

              <div className='search-container'>
                <MdSearch className='text-info' />

                <div className='form-main search-form' id='searchForm'>
                  <input
                    type='text'
                    name='search'
                    className='search-input'
                    value={searchTerm}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor='search' className='label-name'>
                    <span className='content-name'>Search Movements</span>
                  </label>
                </div>
              </div>
            </div>
          </header>

          <div className='list-page list-desktop'>
            <div className='list'>
              <ul className='movements'>
                {movements.map((movement) => {
                  let slug = movement.replace(/ /g, '-');
                  return (
                    <Link key={slug} to={`/${type}s/${slug}`}>
                      <li className='capitalize'>{movement}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
          <button
            style={{ margin: '5px' }}
            className='btn btn-primary capitalize btn-desktop'
            onClick={openModal}
          >
            Add New {type}
          </button>

          <Modal ref={modalRef}>
            <AddMovement type={type} addNewMovement={addNewMovement} />
          </Modal>

          {error && <p>{error}</p>}
        </>
      )}
    </div>
  );
};

export default MovementList;
