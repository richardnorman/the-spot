import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AddSpot from './components/AddSpot/AddSpot';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';
import Spots from './components/Spots/Spots';

export default function App() {
    return (
      <Router>
          <Switch>
            <Route exact path='/the-spot'>
              <Spots />
            </Route>
            <Route path='/the-spot/add-spot'>
              <AddSpot />
            </Route>
            <Route path='/the-spot/update-spot'>
              <UpdateSpot />
            </Route>
            <Route path='/the-spot/sign-in'>
              <SignIn />
            </Route>
            <Route path='/the-spot/register'>
              <Register />
            </Route>
          </Switch>
      </Router>
    );
}