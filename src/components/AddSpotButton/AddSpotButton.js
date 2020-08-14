import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import './AddSpotButton.css';

const useStyles = makeStyles((theme) => ({
    extendedIcon: {
      marginRight: theme.spacing(1),
    }
  }));

const AddSpotButton = _ => {
    const classes = useStyles();
    return (
        <Fab className='floating-add-spot' variant="extended">
            <AddIcon className={classes.extendedIcon} />
        Add a Spot
        </Fab>
    );
}

export default AddSpotButton;