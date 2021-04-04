

import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom'
import { warning, clearWarning, setUser, userBirthday, getUser } from '../redux/actions'
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

const ThemeSelector = () => {

const dispatch = useDispatch()
const themeStyle = useSelector(state => state.themeStyle)
const themeColor = useSelector(state => state.themeColor)
const darkMode = useSelector(state => state.darkMode)

const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

const redTheme = () => {
    dispatch(setUser({ background: '#dc004e', color: 'red' , dark_mode: darkMode}))
  };

  const blueTheme = () => {
    dispatch(setUser({ background: '#2E3B55', color: 'blue', dark_mode: darkMode }))
  };

  const greenTheme = () => {
    dispatch(setUser({ background: '#4caf50', color: 'green', dark_mode: darkMode}))
  };


  return (
  <div style={{display: 'flex', justifyContent: 'center', marginLeft: '5%'}}>
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
  </div>
  )
}

export default ThemeSelector;