import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserContextProvider from './context/UserContext';
import Nav from './components/Nav';
import Login from './pages/Login';
import Signup from './pages/Signup.js';
import MovementCategories from './pages/MovementCategories';
import MovementList from './pages/MovementList';
import SingleMovement from './pages/SingleMovement';
//import Nav from './components/Nav';
import NotFound from './components/NotFound';

import './App.css';

const App = (props) => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className='App'>
          <Nav />
          <Switch>
            <Route path='/dashboard' exact component={MovementCategories} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={Signup} />
            <Route path='/cardios' exact component={MovementList} />
            <Route path='/lifts' exact component={MovementList} />
            <Route path='/skills' exact component={MovementList} />
            <Route path='/cardios/:id' exact component={SingleMovement} />
            <Route path='/lifts/:id' exact component={SingleMovement} />
            <Route path='/skills/:id' exact component={SingleMovement} />
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </UserContextProvider>
    </BrowserRouter>
  );
};
export default App;
