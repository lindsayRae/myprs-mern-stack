import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';


const Header = (props) => {
    const {user, onLogout} = useContext(UserContext);
    return (
        <header className='App-header'>
            <ul className='container'>
                <li key='home'>
                    <Link to='/'>MyPrs</Link>
                </li>
                {user.isAuthenticated ? (
                    // <li key='new-cardio'>
                    //     <Link to='/new-cardio'>New Cardio</Link>
                    // </li>
                    <button className='linkLike'
                        onClick={(event) => {
                            event.preventDefault();
                            onLogout();
                        }}
                        >Logout</button>
                ) : (
                    <li key='login'>
                    <Link to='/login'>Login</Link>
                </li> 
                )}
                
            </ul>
        </header> 
    )
}

export default Header;