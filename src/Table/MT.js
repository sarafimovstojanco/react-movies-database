import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Collapse from '@material-ui/core/Collapse';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useDispatch, useSelector } from 'react-redux'
import { setWatched, setDatabase, sortBy, loadExactPage, yourRating, removeMovie } from '../redux/actions'

const MT = () => {
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
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

const dispatch = useDispatch()
  const filtered = useSelector(state => (state.filteredMovies))
  const themeStyle = useSelector(state => state.themeStyle)
  const classesRow = useRowStyles();
  const [rating, setRating] = useState(null)
  const [open, setOpen] = useState(false)
  const [state, setState] = useState({checkedG: true})
  const classes = useStyles();

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }

  const removeMovieFunction = (index, ranked) => {
    dispatch(removeMovie(index, ranked))
    dispatch(setDatabase())
  }

  const onClickHandler = (index, ranked) => {
    dispatch(setWatched(index, ranked))
    dispatch(setDatabase())
  }

  const onRatingChange = (rating, index, ranked) => {
    setRating(rating)
    dispatch(yourRating(rating, index, ranked ))
    dispatch(setDatabase())
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead style={themeStyle}>
          <TableRow>
            <TableCell />
            <TableCell>Movie Title</TableCell>
            <TableCell align="right">Year</TableCell>
            <TableCell align="right">IMDB Rating&nbsp;</TableCell>
            <TableCell align="right">Watched&nbsp;</TableCell>
            <TableCell align="right">Your Rating&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered && filtered.length > 0 && filtered.map((movie) => (
            <React.Fragment>
            <TableRow className={classesRow.root} key={movie.year}>
            <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
            </TableCell>
              <TableCell component="th" scope="row">
                {movie.originalTitle}
              </TableCell>
              <TableCell align="right">{movie.year}</TableCell>
              <TableCell align="right">{movie.imdbRating}</TableCell>
              <TableCell align="right">
          <FormControlLabel
            control={<GreenCheckbox checked={movie.watched} onClick={() => onClickHandler(movie.ranked)} onChange={handleChange} name="checkedG" />}
            label="Watched"
          />
        </TableCell>
              <TableCell align="right">{movie.yourRating}</TableCell>
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
                       Actors:
                 </Typography>
                     <Table size="small" aria-label="purchases">
                       <TableHead>
                         <TableRow>
                           {movie.actors.map(actor =>
                            <li>{actor}</li>
                           )}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MT