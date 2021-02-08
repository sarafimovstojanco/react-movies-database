import React from 'react';
import { useHistory } from 'react-router-dom'
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { filterByValue, loadExactPage } from '../redux/actions'
import firebase from 'firebase'

const NavCool = () => {
    const dispatch = useDispatch()
    const currentPage = useSelector(state => state.currentPage)
    let history = useHistory()

    const filterByInput = (event) => {
        let input = event.target.value.toLowerCase()
        if(!event.target.value){
          dispatch(loadExactPage(currentPage))}
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
          <MenuItem onClose={handleMenuClose}>My Account</MenuItem>
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
          <MenuItem>
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <p>Messages</p>
          </MenuItem>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={11} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <p>Notifications</p>
          </MenuItem>
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
        <div className={classes.grow}>
          <AppBar style={{ background: '#2E3B55' }} position="static">
            <Toolbar>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                  RMD
              </IconButton>
              <Button color="inherit" edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={goToHomeTable}
                >
                Home
              </Button>
              <Button color="inherit" edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={goToNewMovies}
                >
                New Movies
              </Button>
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
                  onChange={(e) => filterByInput(e)}
                />
              </div>
              <div className={classes.sectionDesktop}>
               {localStorage.isAuth ? <div>
               <IconButton aria-label="show 4 new mails" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <MailIcon />
                  </Badge>
                </IconButton>
                <IconButton aria-label="show 17 new notifications" color="inherit">
                  <Badge badgeContent={0} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton> </div> : null}
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
              </div>
             {!localStorage.isAuth ? <Button color="inherit">Login</Button> : null} 
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
      );

}

export default NavCool;