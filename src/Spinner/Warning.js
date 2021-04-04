import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

const Alerts = () =>{
const alert = useSelector(state => state.warning)
const watchedMovie = useSelector(state => state.watchedMovie)

const useStyles = makeStyles((theme) => ({
    root: {
      position: 'fixed',
      width: '72%',
      marginLeft: '5%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));
const classes = useStyles();
console.log(alert)
return (
alert === 'watchedSuccess' ?
  <div className={classes.root}>
    <Alert variant="filled" severity="success">
      You watched {watchedMovie} !
    </Alert>
  </div> : 
alert === 'ratingChange' ?
  <div className={classes.root}>
    <Alert variant="filled" severity="info">
      You updated the rating of {watchedMovie} !
    </Alert>
</div> :
alert === 'warning' ?
<div className={classes.root}>
  <Alert variant="filled" severity="warning">
    You still have not watched {watchedMovie} !
  </Alert>
</div> :
alert === 'delete' ?
<div className={classes.root}>
  <Alert variant="filled" severity="error">
    You removed {watchedMovie} !
  </Alert>
</div> : 
alert === 'emailChanged' ?
<div className={classes.root}>
  <Alert variant="filled" severity="success">
    You successfully changed your login email !!!
  </Alert>
</div> : 
alert === 'passwordChanged' ?
<div className={classes.root}>
  <Alert variant="filled" severity="success">
    You successfully changed your login password !!!
  </Alert>
</div> : null
)
}

export default Alerts;