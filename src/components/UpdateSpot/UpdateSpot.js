import React from 'react';
import AddSpot from '../AddSpot/AddSpot';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import './UpdateSpot.css';

const UpdateSpot = () => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get('id') || '';
    const name = query.get('name') || '';
    const description = query.get('description') || '';
    const image = query.get('image') || '';
    const coords = query.get('coords') || '';
    const dateCreated = query.get('dateCreated') || '';

    return (
        <div>
            <AddSpot id={id} name={name} description={description} image={image} coords={coords} dateCreated={dateCreated} isUpdating={true}/>
        </div>
    );
}

export default UpdateSpot;