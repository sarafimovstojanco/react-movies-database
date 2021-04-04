import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux'
import { warning, clearWarning, reloadMovies, sortBy, loadExactPage, setUnwatchedDatabase, setRatingDatabase, setWatchedDatabase, setRecent, getMovies, getUser, unsetRecent } from '../redux/actions'
import axios from 'axios';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Row = ({data, index}) => {
  const dispatch = useDispatch()
  const classes = useRowStyles();
  const searching = useSelector(state => state.searching)
  const filtered =useSelector(state => state.filteredMovies)
  const userId = useSelector(state => state.userId)
  const currentPage = useSelector(state=> state.currentPage)
  const perPage = useSelector(state=>state.countPerPage)
  const [rating, setRating] = useState(data.rating)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({checkedG: true})

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }
  const removeMovieFunction = (id, title) => {
    axios.delete('http://127.0.0.1:8000/api/movies/' + id).then(response=>{
      dispatch(reloadMovies(currentPage, perPage))
      dispatch(warning('delete', title))
      setTimeout(() => {
        dispatch(clearWarning())
      }, 2000)
      }
    )
  }
  const onWatchedHandler = (id, title) => {
    if (!data.watched){
      data.watched = true
      dispatch(setWatchedDatabase(id, title))
      setRating(null)
      dispatch(setRecent(id))
      dispatch(warning('watchedSuccess', title))
      setTimeout(() => {
        dispatch(clearWarning())
      }, 2000)
    }
    else {
      data.watched = false
      setRating(null)
      dispatch(setUnwatchedDatabase(id, title))
    }
  }

  const onRatingChange = (id, rating, title) => {
    if (data.watched){
      setRating(rating)
      dispatch(setRatingDatabase(id, rating, title))
      dispatch(warning('ratingChange', title))
      setTimeout(() => {
        dispatch(clearWarning())
      }, 2000)
    }
    else {
      dispatch(warning('warning', title))
      setTimeout(() => {
        dispatch(clearWarning(warning))
      }, 2000)
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <div style={{ fontSize: '20px' }}>
            {data.title}
          </div>
        </TableCell>
        <TableCell align="right">
          <div style={{ fontSize: '18px' }}>
            {data.year}</div>
        </TableCell>
        <TableCell align="right" >
          <div style={{ fontSize: '20px' }}>
            {data.imdbRating}</div>
        </TableCell>
       {localStorage.isAuth ? <TableCell align="right">
          <FormControlLabel
            control={<GreenCheckbox checked={data.watched} onClick={() => onWatchedHandler(data.id, data.title)} onChange={handleChange} name="checkedG" />}
            label="Watched"
          />
        </TableCell> : null}
        {localStorage.isAuth ? <TableCell align="right">
          <Rating
            value= {data.watched ? rating : null}
            onChange={(e, rating, title) => onRatingChange(data.id, rating, data.title)}
          />
        </TableCell> : null}
        {localStorage.isAuth ? <TableCell align="right">
          <IconButton aria-label="delete" onClick={() => removeMovieFunction(data.id, data.title)}>
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </TableCell>  : null}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <div style={{
                textAlign: 'left',
                fontSize: '20px',
                paddingLeft: '5%'
              }}>
                <Typography variant="h6" gutterBottom component="div">
                  Main Actors:
            </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      {data.actors.map((actor) =>
                        <li>{actor.name}</li>)
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  </TableBody>
                </Table>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const MaterialTable = () => {
  
  const dispatch = useDispatch()
  const themeStyle = useSelector(state => state.themeStyle)
  const searching = useSelector(state => state.searching)
  const currentPage = useSelector(state => state.currentPage)
  const [order, setOrder] = useState(true)
  const filtered =useSelector(state => state.filteredMovies)
  //const updateState = useSelector(state => (state)) //needed for rendering the table after input
  useEffect(()=>{
    dispatch(loadExactPage(currentPage))
  }, [])
  const useToolbarStyles = makeStyles((theme) => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      flex: '1 1 100%',
    },
  }));
  const classes = useToolbarStyles();

  const sortByInput = (item) => {
    dispatch(sortBy(item, order))
    setOrder(!order)
  }

  Row.propTypes = {
    row: PropTypes.shape({
      yourRating: PropTypes.number,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      originalTitle: PropTypes.string.isRequired,
      imdbRating: PropTypes.number.isRequired,
      year: PropTypes.number.isRequired,
      watched: PropTypes.bool.isRequired
    }).isRequired,
  };
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table size='small' aria-label="collapsible table">
          <TableHead style={themeStyle}>
            <TableRow>
              <TableCell />
              <TableCell>
                <Typography style={{ color: '#FFFFFF' }} className={classes.title} variant="h6" id="tableTitle" component="div"
                  onClick={() => sortByInput('title')}>Movie Title
                </Typography>
              </TableCell>
              <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('year')} align="right">Year</TableCell>
              <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('imdbRating')} align="right">IMDB Rating&nbsp;</TableCell>
              {localStorage.isAuth ? <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('watched')} align="right">Watched&nbsp;</TableCell> : null}
              {localStorage.isAuth ? <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('rating')} align="right">Your Rating&nbsp;</TableCell> : null}
              {localStorage.isAuth ? <TableCell style={{ color: '#FFFFFF' }} align="right">Remove&nbsp;</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered && filtered.length > 0 && filtered.map((st, index) => {
              return st.title && <Row key={index} data={st} index={index} /> 
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MaterialTable;