import React, { useEffect } from 'react';
import './App.css';
import SpotCard from './components/SpotCard/SpotCard';
import AddSpotButton from './components/AddSpotButton/AddSpotButton';
import NavBar from './components/NavBar/NavBar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';
import AddSpot from './components/AddSpot/AddSpot';
import { useSelector, useDispatch } from 'react-redux';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import UpdateSpot from './components/UpdateSpot/UpdateSpot';
import { setSpotList } from './actions';

export default function App() {
  const history = useHistory();
  const dispatch = useDispatch();
  const spotList = useSelector(state => state.modifySpotList.spotList);
  const searchText = useSelector(state => state.changeSearch.searchText);
  const currentUser = useSelector(state => state.changeCurrentUser.currentUserEmail);

  useEffect(() => {
    if(!currentUser) {
      history.push('/the-spot/sign-in')
      return;
    }
    fetch(`https://the-spot01.herokuapp.com/get-spots/${currentUser}`)
    .then(response => response.json())
    .then(data => {
      dispatch(setSpotList(data));
    })
    .catch(err => console.log(err))
  })

  const DisplaySpots = props => {
    if(props.list.length === 0) {
      return <p style={{textAlign: 'center', marginTop: '15%', fontSize: '1.5rem'}}>No spots found, <Link to='/the-spot/add-spot' style={{color: 'black'}}><strong>add one now!</strong></Link></p>
    } else if(props.list.length > 0) {
      return props.list.map(spot => {
        return (
            <SpotCard id={spot.id} title={spot.title} description={spot.description} image={spot.image} coords={spot.coords} dateCreated={spot.dateCreated}/>
        );
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
              {/* <h1 onClick={()=>alert(currentUser)}>Click for state</h1> */}
              <p className='recent-spots'>Recently added</p>
              <div id='spots-grid' className={spotList.length === 0 ? '' : 'spots-grid'}>                                                                                
                {(searchText === '' || searchText === undefined) ? 
                <DisplaySpots list={spotList} /> : 
                <DisplaySpots list={spotList.filter(spot => {
                  return (spot.title.toLowerCase().includes(searchText.toLowerCase()) || spot.description.toLowerCase().includes(searchText.toLowerCase()));
                })} />}
              </div>
              <Link to='/the-spot/add-spot'><AddSpotButton /></Link>
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
        </div>
      </Router>
    );
}