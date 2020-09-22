import React, {useState, Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import {useSelector, useDispatch} from 'react-redux';
import { changeSearch, changeCurrentUser } from '../../actions';
import { Link } from 'react-router-dom';
import { dispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '20ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

const NavBar = () => {
    const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const dispatch = useDispatch();
    
    const handleSearchChange = event => {
        dispatch(changeSearch(event.target.value));
    }

    return (
        <Fragment>
                <AppBar style={{background: 'white', color: 'black' }} position="sticky">
                <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => drawerOpen ? setDrawerOpen(false) : setDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    My Spots
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                    <SearchIcon />
                    </div>
                    <InputBase
                    placeholder="Search your spots"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={handleSearchChange}
                    />
                </div>
                </Toolbar>
            </AppBar>
            <Drawer anchor={"left"} open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Link onClick={() => { dispatch(changeCurrentUser('')) }} to='/the-spot/sign-in' style={{textDecoration: 'none', color: 'black'}}>
                    <h2 style={{paddingLeft: '15px', paddingRight: '60px', cursor: 'pointer'}}>Sign out</h2>
                </Link>
            </Drawer>
        </Fragment>
    );
}

export default NavBar;