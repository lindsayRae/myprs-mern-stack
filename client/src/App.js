import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserContextProvider from './context/UserContext';
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import MovementList from './pages/MovementList';
import SingleMovement from './pages/SingleMovement';
import NotFound from './components/NotFound';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';
import './components/Modal.css';
import './Main.css';
import './Dash.css';
import './pages/MovementList.css';

const App = (props) => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className='App page'>
          {/* <Nav /> */}
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/dashboard' exact component={Dashboard} />
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
