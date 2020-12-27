import React, { useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import UserContextProvider from './context/UserContext';
import Nav from './components/Nav'; 
import Login from './pages/Login';
import Signup from './pages/Signup.js'
import Movements from './pages/Movements';
//import Nav from './components/Nav';
import NotFound from './components/NotFound';

import './App.css';

const App = (props) => {

 
  return (
    <BrowserRouter>      
      <UserContextProvider > 
        <div className='App'>
          <Nav />          
          <Switch>           
            <Route path="/" exact component={Movements} />
            <Route path="/login" exact component={Login} />    
            <Route path="/signup" exact component={Signup} />        
            <Route component={NotFound}></Route>
          </Switch>          
         
        </div>
      </UserContextProvider>
    </BrowserRouter>
  )
}
export default App;
