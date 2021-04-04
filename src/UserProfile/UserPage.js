import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom'
import { warning, clearWarning, setUser, getUser } from '../redux/actions'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import firebase from 'firebase';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors'
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import Warning from '../Spinner/Warning';
import Avatars from '../Spinner/Avatars';


const UserPage = () => {
  const dispatch = useDispatch()
  const themeStyle = useSelector(state => state.themeStyle)
  const themeColor = useSelector(state => state.themeColor)
  const darkMode = useSelector(state => state.darkMode)

  let history = useHistory()
  useEffect(() => {
    dispatch(getUser())
  }, [])

  const [dark, setDark] = useState(darkMode);

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const setNewEmailHandler = (event) => {
    setNewEmail(event.target.value)
  }

  const setNewPasswordHandler = (event) => {
    setNewPassword(event.target.value)
  }
  const updateEmail = () => {
    axios({
      method: 'put',
      url: 'http://127.0.0.1:8000/api/users/' + localStorage.userId,
      data: qs.stringify({
          email: newEmail,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
  .then(response=>{
    dispatch(warning('emailChanged'))
    setTimeout(() => {
      dispatch(clearWarning())
    }, 2000)
    console.log(response)})
  .catch(error=>console.log(error))
  }
  const updatePassword = () => {
    axios({
      method: 'put',
      url: 'http://127.0.0.1:8000/api/users/' + localStorage.userId,
      data: qs.stringify({
          password: newPassword,
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
      }
    })
  .then(response=>{
    dispatch(warning('passwordChanged'))
    setTimeout(() => {
      dispatch(clearWarning())
    }, 2000)
      console.log(response)})
  .catch(error=>console.log(error))
  }

  const redTheme = () => {
    dispatch(setUser({ background: '#dc004e', color: 'red' , dark_mode: darkMode}))
    localStorage.setItem('themeStyle', '#dc004e' )
  };

  const blueTheme = () => {
    dispatch(setUser({ background: '#2E3B55', color: 'blue', dark_mode: darkMode }))
    localStorage.setItem('themeStyle', '#2E3B55' )
  };

  const greenTheme = () => {
    dispatch(setUser({ background: '#4caf50', color: 'green', dark_mode: darkMode}))
    localStorage.setItem('themeStyle', '#4caf50')
  };

  const handleChange = (event) => {
    console.log(event.target.checked)
    setDark(event.target.checked)
    const background = themeStyle.background
    dispatch(setUser({background, color: themeColor, dark_mode: event.target.checked }))
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    button: {
      margin: theme.spacing(1),
    },
  }));

  const classes = useStyles();

  return (
   <div style={{paddingBottom: "80px"}}> <div className={classes.root} >
      <AppBar position="static" style={themeStyle}>
        <Toolbar variant="dense">
          <Box>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={()=>{history.push('./')}}>
              Home
          </IconButton></Box>
        </Toolbar>
      </AppBar>
    </div>
    <div style={{
      marginLeft: '7%',
      marginTop: '2%'
    }}>
      <Warning />
    </div>
      <div style={{
        textAlign: 'center',
        margin: 'auto',
        width: '60%',
        marginTop: '50px',
        border: '2px solid grey',
        padding: '10px',
      }}>
        <Box pt={3} width={1}>
          <Typography>Update Email/Password</Typography>
        </Box>
        <Box boxShadow={15} pt={2} pb={3} >
          <Typography>
            <TextField onChange={(event) => setNewEmailHandler(event)} id="standard-basic" label="User Name" />
            <Box mt={1} pt={1} justifyContent="center">
              <Button size="small" variant="contained" onClick={updateEmail}>Update</Button></Box></Typography>
          <Typography>
            <TextField onChange={(event) => setNewPasswordHandler(event)} id="standard-basic" label="Password" />
            <Box justifyContent="center" mt={1} pt={1} >
              <Button size="small" variant="contained" onClick={updatePassword}>Update</Button></Box></Typography></Box>
        <Box justifyContent="center" mt={5} mb={2}>
          <Box justifyContent="center" >
            <Typography >Appearance</Typography></Box>
          <Box justifyContent="center" boxShadow={15} >
            <a>Activate Dark Mode :</a><Switch
              checked={darkMode}
              onChange={handleChange}
              color="dark"
              name="darkMode"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            <Divider />
            <Box mt={3} mb={3}>
              <Box>
                <a>Select Theme: </a></Box>
              <FormControlLabel
                control={<Checkbox checked={themeColor==="red"} onChange={redTheme} name="checkedR" />}
                label="Red"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={themeColor==="blue"}
                    onChange={blueTheme}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Blue"
              />
              <FormControlLabel
                control={<GreenCheckbox checked={themeColor==="green"} onChange={greenTheme} name="checkedG" />}
                label="Green"
              />
            </Box>
            <Divider />
            <Box pt={3}>
              <a>Select your Avatar:</a>
            </Box>
            <div style={{
              textAlign: 'center',
              margin: 'auto',
              width: '80%',
              paddingBottom: "10px"
            }}>
              <Box boxShadow={3} mt={1} mb={5} pt={5} pb={5}>
                <Box>
                <div style={{
                  marginLeft: '10%'
                }}>
                  <Avatars/>
                </div>
                </Box>
              </Box></div>
          </Box>
        </Box>
      </div>
    </div> 
  )
}

export default UserPage;