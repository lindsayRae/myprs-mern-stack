import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserContextProvider from './context/UserContext';

import Dashboard from './pages/Dashboard';
import Privacy from './pages/Privacy';
import Donate from './pages/Donate';
import MovementList from './pages/MovementList';
import SingleMovement from './pages/SingleMovement';
import NotFound from './components/NotFound';
import Landing from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import EmailSent from './pages/EmailSent';
import DeleteAccount from './pages/DeleteAccount';
import Activate from './pages/Activate';
import StartPassReset from './pages/StartPassReset';
import PassReset from './pages/PassReset';
import ChangePassword from './pages/ChangePassword';

import './App.css';
import './components/Forms.css';
import './components/Modal.css';
import './Main.css';
import './Dash.css';
import './pages/MovementList.css';

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <div className='App page'>
          <Switch>
            <Route path='/' exact component={Landing} />
            <Route path='/login' exact component={Login} />
            <Route path='/signup' exact component={SignUp} />
            <Route path='/emailsent' exact component={EmailSent} />
            <Route path='/privacy' exact component={Privacy} />
            <Route path='/donate' exact component={Donate} />
            <Route path='/delete-account' exact component={DeleteAccount} />
            <Route path='/activate' exact component={Activate} />
            <Route path='/reset' exact component={StartPassReset} />
            <Route path='/pass-reset' exact component={PassReset} />
            <Route path='/change-password' exact component={ChangePassword} />
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
