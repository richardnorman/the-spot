import React, { Fragment, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import './AddSpot.css';
import App from '../../App';
import { Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import { addSpot, updateSpot, removeSpot } from '../../actions';
import {
    ADD_SPOT
} from '../../constants';

const useStyles = makeStyles({
    root: {
        maxWidth: '90%',
    },
    media: {
        height: 200,
    },
});

const AddSpot = ({isUpdating = false, id = '', name = '', description = '', image = '', coords = '', dateCreated = ''}) => {
    const spotList = useSelector(state => state.modifySpotList.spotList);
    const currentUser = useSelector(state => state.changeCurrentUser.currentUserEmail);
    const dispatch = useDispatch();
    const classes = useStyles();

    const [spotName, setSpotName] = useState(name);
    const [spotDescription, setSpotDescription] = useState(description);
    const [spotLocation, setSpotLocation] = useState(coords);
    const [useCurrentLocation, setUseCurrentLocation] = useState(false);
    const [spotImage, setSpotImage] = useState(image);

    const handleAddImageClicked = _ => {
        setSpotImage(prompt('Enter image URL:') || '');
    }

    const handleUseCurrentLocationChanged = _ => {
        if (useCurrentLocation) {
            //dont use current location and reset the current spot location
            setSpotLocation('');
            setUseCurrentLocation(false);
        } else {
            //use the users current location
            setUseCurrentLocation(true);
            getCurrentLocation();
        }
    }

    function getCurrentLocation() {
        navigator.geolocation.getCurrentPosition(locationFound, locationError);
    }

    function locationFound(position) {
        setSpotLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
    }

    function locationError(error) {
        alert('Location can not be found, try connecting to a network.' + error);
    }

    return (
        <div className='page'>
            <div className='editable-card'>
                <Card className={classes.root}>
                        <CardMedia
                            className={classes.media}
                            image={spotImage === '' ? 'https://bhmlib.org/wp-content/themes/cosimo-pro/images/no-image-box.png' : spotImage}
                        />
                        <CardContent>
                        <Button onClick={handleAddImageClicked} className='add-image-button' variant="contained">{ isUpdating ? 'Edit Image' : 'Add image'}</Button>
                            <TextField className='inputs' id='standard-basic' label='Name' onChange={(event => setSpotName(event.target.value))} value={spotName}/>
                            <TextField className='inputs' id='standard-basic' label='Description' onChange={(event => setSpotDescription(event.target.value))} value={spotDescription}/>
                            
                            { isUpdating ? null :
                                <Fragment>
                                <FormControlLabel
                                className='use-location-switch'
                                control={
                                    <Switch                                    
                                        name="checkedB"
                                        checked={useCurrentLocation}
                                        onChange={handleUseCurrentLocationChanged}
                                        color="primary"
                                    />
                                    }
                                    label="Use current location"
                                    />
                                    {useCurrentLocation ? 
                                        null :
                                        <TextField 
                                        className='inputs' 
                                        id='standard-basic' 
                                        label='Location' 
                                        onChange={event => setSpotLocation(event.target.value)}/>}
                                </Fragment>
                            }
                        </CardContent>
                </Card>
            </div>
            <Link to='/the-spot/' style={{ textDecoration: 'none' }}>
                <Fab disabled={(spotName === '' || spotLocation === '') ? true : false} onClick={() => {
                    if(isUpdating) {
                        fetch(`https://the-spot01.herokuapp.com/update-spot/${currentUser}`, {
                            method: 'put',    
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                id: id,
                                title: spotName,
                                description: spotDescription, 
                                image: spotImage === '' ? 'https://bhmlib.org/wp-content/themes/cosimo-pro/images/no-image-box.png' : spotImage, 
                                coords: spotLocation,
                                dateCreated: dateCreated
                            })
                        })
                        .then(response => response.json())
                        .catch(err => console.log(err))
                    } else {
                            // add spot to db
                            fetch(`https://the-spot01.herokuapp.com/add-spot/${currentUser}`, {
                                method: 'post',    
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    title: spotName, 
                                    description: spotDescription, 
                                    image: spotImage === '' ? 'https://bhmlib.org/wp-content/themes/cosimo-pro/images/no-image-box.png' : spotImage, 
                                    coords: spotLocation
                                })
                            })
                            .then(response => response.json())
                            .catch(err => console.log(err))
                        }
                    }
                    }
                     color='primary' className='done-button' variant="extended">
                Done
                </Fab>
            </Link>
            { isUpdating ?
                <Link to='/the-spot/' style={{ textDecoration: 'none' }}>
                    <Button className='remove-spot-button' onClick={() => {
                            fetch(`https://the-spot01.herokuapp.com/remove-spot/${currentUser}`, {
                                method: 'delete',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    id: id
                                })
                            })
                            .then(response => response.json())
                            .catch(err => console.log(err))
                            }
                        }
                        color='secondary'>
                    Remove Spot
                    </Button>
                </Link>
            : null }
        </div>
    );
}

export default AddSpot;