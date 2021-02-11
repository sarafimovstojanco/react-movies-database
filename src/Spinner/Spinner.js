import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function LinearIndeterminate() {
  const classes = useStyles();

  return (
   <div style={{
       marginTop:'25%'
   }}>
    <div className={classes.root}>
      <LinearProgress />
      <LinearProgress color="secondary" />
    </div>
    </div>
  );
}