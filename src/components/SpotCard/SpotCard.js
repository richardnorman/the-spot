import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import './SpotCard.css';

const useStyles = makeStyles({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: 150,
    },
});

const SpotCard = ({ id = '', title = '', description = '', image = '', coords, dateCreated = '' }) => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div onClick={() => {history.push(`/the-spot/update-spot?id=${id}&name=${title}&description=${description}&image=${image}&coords=${coords}&dateCreated=${dateCreated}`)}} className='card-container'>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={image}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button target='_blank' href={`https://www.google.com/maps/place/${coords}`} size="small" color="primary">
                        View Location
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default SpotCard;