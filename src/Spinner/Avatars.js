import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      width: theme.spacing(7),
      height: theme.spacing(7),
      margin: theme.spacing(1),
    },
  },
}));

function Avatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Avatar alt="MilePanika" src="http://news24.vip/wp-content/uploads/2020/05/Mile-panika123.jpg"/>
      {/* <Avatar alt="Cacko" src="https://i.ytimg.com/vi/cmMvyMvcYO8/maxresdefault.jpg" />
      <Avatar alt="Thor" src="https://i.ytimg.com/vi/8x8wCJboeOc/maxresdefault.jpg" />
      <Avatar alt="TosoMalerot" src="https://balkan.mk/wp-content/uploads/2018/12/t1-7.png" />
      <Avatar alt="Zoran" src="https://i.ytimg.com/vi/9V0V-ORbSR0/maxresdefault.jpg" />
      <Avatar alt="Blazo" src="https://i.ytimg.com/vi/CWXdREvJOMA/maxresdefault.jpg" />
      <Avatar alt="Cajkan" src="https://i.ytimg.com/vi/YJzETMhhJFQ/maxresdefault.jpg" /> */}
    </div>
  );
}

export default Avatars;