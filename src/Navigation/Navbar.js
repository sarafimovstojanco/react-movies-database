import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { filterByValue, loadExactPage, getTheme} from '../redux/actions'
import firebase from 'firebase'

const Navbar = () => {
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const currentPage = useSelector(state => state.currentPage)
  const themeStyle = useSelector(state => state.themeStyle)
  let history = useHistory()
  useEffect(() => {
    dispatch(getTheme())
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      filterByInput(input)
    }, 200);
    return () => clearTimeout(timer);
  }, [input]);

  const filterByInput = (input) => {
    if (!input) {
      dispatch(loadExactPage(currentPage))
    }
    dispatch(filterByValue({ value: input }))
  }

  const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      padding: '10px',
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
      marginRight: theme.spacing(),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
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
      [theme.breakpoints.up('md')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }));

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const goToNewMovies = () => {
    history.push('/add-movie')
  }

  const goToHomeTable = () => {
    history.push('/')
  }

  const onLoginHandler = () => {
    history.push('/auth')
  }

  const onMyAccountHandler = () => {
    history.push('/user-page')
  }

  const onLogoutHandler = () => {
    firebase.auth().signOut()
    localStorage.removeItem('userId')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('firstName')
    history.push('/auth')
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClose={handleMenuClose}
        onClick={onMyAccountHandler}>My Account</MenuItem>
      <MenuItem onClose={handleMenuClose}
        onClick={onLogoutHandler}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );


  return (
    <div className={classes.grow} style={{marginBottom: '50px'}}>
      <AppBar style={themeStyle} position="fixed" >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.push('/')}
          >
           {localStorage.isAuth ? localStorage.firstName.toUpperCase() : "RMD"} 
              </IconButton>
          <Button color="inherit" edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={goToHomeTable}
          >
            Home
              </Button>
          {localStorage.isAuth ? <Button color="inherit" edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={goToNewMovies}
          >
            Add Movies
              </Button> : null}
          <div className={classes.grow} />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
               <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setInput(e.target.value.toLowerCase())}
            />
          </div>
          <div className={classes.sectionDesktop}>
            {localStorage.isAuth ? <div>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <div onClick={() => { history.push('/user-page') }}>
                  <AccountCircle size='large' />
                  <Button color="inherit">Profile</Button>
                </div>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <Button color="inherit" onClick={onLogoutHandler}>Logout</Button>
                </Badge>
              </IconButton>
            </div> :
              <IconButton color="inherit">
                <Badge badgeContent={0} color="secondary">
                  <Button color="inherit" onClick={onLoginHandler}>Login</Button>
                </Badge>
              </IconButton>
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              {!localStorage.isAuth ? <Button color="inherit" onClick={onLoginHandler}>Login</Button> : <Button color="inherit">Logout <EmojiPeopleIcon size='large' /></Button>}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );

}

export default Navbar;