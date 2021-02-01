import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { SidebarData } from './SidebarData';
import Modal from '../components/Modal';
import Verify from '../components/Verify';
import { MdMenu, MdExitToApp, MdDelete } from 'react-icons/md';
import * as AiIcons from 'react-icons/ai';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const { setUser } = useContext(UserContext);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setUser(null);
  };

  const handleDeleteUser = () => {};

  const modalRef = React.useRef();
  const openModal = () => {
    modalRef.current.openModal();
  };
  const closeModal = () => {
    modalRef.current.closeModal();
  };
  return (
    <>
      <IconContext.Provider value={{ color: '#52A9D9' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <MdMenu className='text-info' onClick={showSidebar} />
          </Link>
          <h3 className='capitalize page-title'>{props.title}</h3>
          <div style={{ width: '26px' }}> </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li key='logout' className='nav-text' onClick={handleLogout}>
              <Link to='/login'>
                <MdExitToApp />
                <span>Logout</span>
              </Link>
            </li>
          </ul>
          <ul className='del-account'>
            <li className='nav-text' onClick={openModal}>
              <Link to='#'>
                <MdDelete className='text-danger' />
                <span>Delete My Account</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
      <Modal ref={modalRef} className='modal-danger'>
        <Verify closeModal={closeModal} handleDeleteUser={handleDeleteUser} />
      </Modal>
    </>
  );
}

export default Navbar;
