import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Navbar from './Navbar';
import Avatars from '../Spinner/Avatars';
import ThemeSelector from '../Spinner/ThemeSelector';
import { useSelector } from 'react-redux';
import Box from '@material-ui/core/Box';
import Carousel from '../Home/Carousel'
import { getMovies, getUser } from '../redux/actions'
import { useDispatch } from 'react-redux'

function ClippedDrawer() {
  
const firstName = useSelector(state=>state.firstName)
const lastName = useSelector(state=>state.lastName)
const themeColor = useSelector(state => state.themeColor)
const recent = useSelector(state=>state.recent)
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow: '1px npm #888888',
    border: themeColor==='red' ? '1px solid red ' : themeColor==='blue' ? '1px solid darkblue ' :  '1px solid green '
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
         <Navbar />
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List className={classes.root}>
            {/* {['Welcome', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
             <ListItem>
                <ListItemText>{firstName +' '+ lastName}</ListItemText>
             </ListItem>
             <ListItem >
                <Avatars />
             </ListItem>
             <Divider />
          </List>
          <ThemeSelector/>
          <ListItemText style={{marginTop: '25px' ,marginLeft: '10px'}}>Recently Watched Movies:</ListItemText>
          <Divider />
          
           {recent.map(r=>(
          <ListItemText style={{marginLeft: '10px'}}>✔️ {r.title +' (' + r.year + ')'}</ListItemText>
          ))}
          <ListItemText style={{marginTop: '30px', marginLeft: '10px'}}>You should watch:</ListItemText>
          <Divider />
          <ListItemText style={{marginLeft: '10px'}}><li>Leonardo DiCaprio</li></ListItemText>
          <ListItemText style={{marginLeft: '10px'}}><li>Robert De Niro</li></ListItemText>
          <ListItemText style={{marginLeft: '10px'}}><li>Morgan Freeman</li></ListItemText>
          <ListItemText style={{marginLeft: '10px'}}><li>Al Pacino</li></ListItemText>
          <ListItemText style={{marginLeft: '10px'}}><li>Brad Pitt</li></ListItemText>
        </div>
          {/* <Box mt = {1} ml={2} mr={5} boxShadow={5}>
            <ListItem>
              <Carousel />
            </ListItem>
          </Box> */}
      </Drawer>
    </div>
  );
}

export default ClippedDrawer