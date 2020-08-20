import React from 'react';
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
import { useSelector } from 'react-redux';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

export default function App() {
  const spotList = useSelector(state => state.modifySpotList.spotList);
  const searchText = useSelector(state => state.changeSearch.searchText);

  const DisplaySpots = props => {
    if(props.list.length === 0) {
      return <p style={{textAlign: 'center', marginTop: '10%', fontSize: '1.5rem'}}>No spots found, <Link to='/the-spot/add-spot' style={{color: 'black'}}><strong>add one now!</strong></Link></p>
    } else if(props.list.length > 0) {
      return props.list.map(spot => {
        return <SpotCard title={spot.title} description={spot.description} image={spot.image} coords={spot.coords}/>
      })
    } else {
      return null;
    }
  }
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/the-spot'>
              <NavBar />
              {/* <h1 onClick={()=>alert(`Spots: ${spotList}\nSearch Text: ${searchText}`)}>Click for state</h1> */}
              <p className='recent-spots'>Recently added</p>
              {(searchText === '' || searchText === undefined) ? 
              <DisplaySpots list={spotList} /> : 
              <DisplaySpots list={spotList.filter(spot => {
                return (spot.title.toLowerCase().includes(searchText.toLowerCase()) || spot.description.toLowerCase().includes(searchText.toLowerCase()));
              })} />}
              <Link to='/the-spot/add-spot'><AddSpotButton /></Link>
            </Route>
            <Route path='/the-spot/add-spot'>
              <AddSpot />
            </Route>
            <Route path='/the-spot/sign-in'>
              <SignIn />
            </Route>
            <Route path='/the-spot/register'>
              <Register />
            </Route>
          </Switch>
        </div>
      </Router>
    );
}