import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import {UserContext} from '../context/UserContext';

// eslint-disable-next-line
export default () => {
    const {user} = useContext(UserContext);
    console.log('**user: ', user)
    return (
        <header className='App-header'>
            <ul className='container'>                
               {user &&  
               <>
                <li key='home'>
                    <NavLink to='/' exact>MyPrs</NavLink>
                </li>           
                <li key='logout'>
                    <NavLink to='/login' exact>Logout</NavLink>
                </li>               
               </>
              
               }
               {!user && 
                    <>
                        <li key='home'>
                            <NavLink to='/login' exact>MyPrs</NavLink>
                        </li>
                        <li key='login'>
                                <NavLink to='/login' exact>Login</NavLink>
                        </li><li key='signup'>
                                <NavLink to='/signup' exact>Signup</NavLink>
                        </li>                    
                    </>            
               }                
            </ul>
        </header> 
    )
}

