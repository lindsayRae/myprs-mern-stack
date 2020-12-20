import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import UserContext from './context/UserContext';
import Header from './components/Header'; 
import Login from './components/Login';
import Movements from './components/Movements';
import CardioList from './components/Cardios';
import Cardio from './components/Cardio';
import Nav from './components/Nav';
//import AddCardio from './components/AddCardio';
//import AddCardioEntry from './components/AddCardioEntry';

import NotFound from './components/NotFound';

import './App.css';

const App = (props) => {

  const [user, setUser] = useState({})


  const onLogin = (email, password) => {
    console.log(email, password)
    // reach out to API
    setUser({
      email: email,
      isAuthenticated: true
    })

  }

  const onLogout = () => {
    console.log('log me out')
    // on success ... 
    setUser({ isAuthenticated: false })

  }
  return (
    <Router>
      <UserContext.Provider value={{ user, onLogin, onLogout }}>      
        <div className='App'>
          <Header />
          
          <Switch>
            <Route
                exact
                path='/'
                render={() => 
                  user.isAuthenticated ? (
                    <Movements />
                  ) : (
                    <Redirect to='/login' />
                  )
                }
              >
            </Route>
            
            <Route
              exact
              path='/cardio'
              render={() => 
                user.isAuthenticated ? (
                  <CardioList />
                ) : (
                  <Redirect to='/login' />
                )
              }
            >
            </Route>

            {/* <Route
              exact
              path='/cardio/:cardioSlug'
              render={(props) => {              
                const cardio = cardios.find(
                  (cardio) => cardio.slug === props.match.params.cardioSlug
                ) 
                if(cardio){
                  if(user.isAuthenticated){
                    return <Cardio cardio={cardio} />;
                  } else {
                    <Redirect to='/login' /> 
                  }
                } else {
                  return <Redirect to="/" />
                }
                
              }}
            >
            </Route> */}
            <Route
              exact
              path='/login'
              render ={() => !user.isAuthenticated ? <Login /> : <Redirect to="/" /> }
            />
            {/* <Route 
              exact
              path='/new-cardio'
              render={() => 
                user.isAuthenticated ? (
                  <AddCardio addNewCardio={addNewCardio} cardio={{ id: 0, slug: '', title: '', entries: ''}} />
                ) : (<Redirect to='/login' /> 
                )                
              }           
            >
            </Route> */}
            {/* <Route 
              exact          
              path='/edit/:cardioSlug'
              render={(props) => {
                const cardio = cardios.find(
                  (cardio) => cardio.slug === props.match.params.cardioSlug
                  )
                  if (cardio) {
                    if(user.isAuthenticated) {
                      return <AddCardio updateCardio={updateCardio} cardio={cardio} />;
                    } else {
                      <Redirect to='/login' /> 
                    }                    
                  } else {
                    return <Redirect to="/cardio" />;
                  }
              }}           
            >
            </Route> */}
            {/* <Route 
              exact
              path='/new-cardio-entry'
              render={() => 
                user.isAuthenticated ? (
                  <AddCardioEntry addNewCardioEntry={addNewCardioEntry} />
                ) : (
                  <Redirect to='/login' /> 
                )                
              }           
            >
            </Route> */}
            <Route component={NotFound}></Route>

          </Switch>
          
          <Nav />
        </div>
      </UserContext.Provider>
    </Router>
  )
}
export default App;
