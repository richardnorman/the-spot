import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import SpotCard from './components/SpotCard/SpotCard';
import AddSpotButton from './components/AddSpotButton/AddSpotButton';
import NavBar from './components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import AddSpot from './components/AddSpot/AddSpot';
import { useSelector, useDispatch } from 'react-redux';
import { addSpot } from './actions';
// import { createStore } from 'redux';
import {
  ADD_SPOT
} from './constants';

const spots = [
  {
    title: '17th Ave',
    description: 'Very cool place would definitely go again to check out the ice cream shop. Also very friendly customer service.',
    image: 'https://17thave.ca/wp-content/uploads/2019/10/Traffic1.jpg',
    coords: '51.037794,-114.1505217'
  },
  {
    title: 'The Calgary Tower',
    description: 'Definitely have to go up to the top and stand on the glass door. Enjoyed the view.',
    image: 'https://i.ytimg.com/vi/7hnTQXKUyvw/maxresdefault.jpg',
    coords: '51.037794,-114.1505217'
  }
]

// const mapStateToProps = state => {
//   return {
//     spotList: state.modifySpotList.spotList
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     onAddSpot: (spot) => dispatch(addSpot(spot))
//   }
// }

// const initialSpotsList = [];

// function spotList(spotsList = initialSpotsList, action) {
//   switch(action.type) {
//     case 'ADD_SPOT':
//       return [...spotsList, action.payload];
//     default:
//       return spotsList;
//     }
// }

// let store = createStore(spotList);
  
// store.dispatch({ type: 'ADD_SPOT', payload:   {
//   title: 'The Calgary Tower',
//   description: 'Definitely have to go up to the top and stand on the glass door. Enjoyed the view.',
//   image: 'https://i.ytimg.com/vi/7hnTQXKUyvw/maxresdefault.jpg',
//   coords: '51.037794,-114.1505217'
// } })

// console.log(store.getState())

export default function App() {
  const spotList = useSelector(state => state.spotList);
  const dispatch = useDispatch();

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/'>
              <NavBar />
              <p className='recent-spots'>Recently added</p>
              {spotList !== undefined && spotList.map(spot => {
                return <SpotCard title={spot.title} description={spot.description} image={spot.image} coords={spot.coords}/>
              })}
              <Link to='/add-spot'><AddSpotButton /></Link>
            </Route>
            <Route path='/add-spot'>
              <AddSpot />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}

//export default connect(mapStateToProps, mapDispatchToProps)(App);
