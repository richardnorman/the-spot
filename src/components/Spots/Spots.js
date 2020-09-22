import React, { useEffect } from 'react';
import SpotCard from '../SpotCard/SpotCard';
import AddSpotButton from '../AddSpotButton/AddSpotButton';
import NavBar from '../NavBar/NavBar';
import { Link, useHistory } from 'react-router-dom';
import { setSpotList } from '../../actions';
import { useSelector, useDispatch } from 'react-redux';

const Spots = _ => {
    const spotList = useSelector(state => state.modifySpotList.spotList);
    const searchText = useSelector(state => state.changeSearch.searchText);
    const currentUser = useSelector(state => state.changeCurrentUser.currentUserEmail);
    const history = useHistory();
    const dispatch = useDispatch();
  
    useEffect(() => {
      if(!currentUser) {
        console.log('No current user detected, redirecting to sign in');
        if(history)
          history.push('/the-spot/sign-in');
      }
      if(currentUser) {
        fetch(`https://the-spot01.herokuapp.com/get-spots/${currentUser}`)
        .then(response => response.json())
        .then(data => {
          dispatch(setSpotList(data));
        })
        .catch(err => console.log(err))
      }
    })

    const DisplaySpots = props => {
        if (props.list.length === 0) {
            return <p style={{ textAlign: 'center', marginTop: '15%', fontSize: '1.5rem' }}>No spots found, <Link to='/the-spot/add-spot' style={{ color: 'black' }}><strong>add one now!</strong></Link></p>
        } else if (props.list.length > 0) {
            return props.list.map(spot => {
                return (
                    <SpotCard id={spot.id} title={spot.title} description={spot.description} image={spot.image} coords={spot.coords} dateCreated={spot.dateCreated} />
                );
            })
        } else {
            return null;
        }
    }

    return (
        <div>
            <NavBar />
            <p className='recent-spots'>Recently added</p>
            <div id='spots-grid' className={spotList.length === 0 ? '' : 'spots-grid'}>
                {(searchText === '' || searchText === undefined) ?
                    <DisplaySpots list={spotList} /> :
                    <DisplaySpots list={spotList.filter(spot => {
                        return (spot.title.toLowerCase().includes(searchText.toLowerCase()) || spot.description.toLowerCase().includes(searchText.toLowerCase()));
                    })} />}
            </div>
            <Link to='/the-spot/add-spot'><AddSpotButton /></Link>
        </div>
    );
}

export default Spots;