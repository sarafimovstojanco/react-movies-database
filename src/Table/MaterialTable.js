import React, { useState } from 'react';
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
import { setWatched, setDatabase, sortBy, loadExactPage, yourRating, removeMovie } from '../redux/actions'

const MaterialTable = () => {
  const dispatch = useDispatch()
  const themeStyle = useSelector(state => state.themeStyle)
  const [order, setOrder] = useState(true)
  const filtered = useSelector(state => (state.filteredMovies))
  //const state = useSelector(state => (state))
  const [state, setState] = React.useState({
    checkedG: true,
  });

  const [rating, setRating] = useState(null)

  const youRatingHandler = (originalTitle) => {
    console.log(originalTitle)

  }


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
  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const removeMovieFunction = (index, ranked) => {
    dispatch(removeMovie(index, ranked))
    dispatch(setDatabase())
  }

  const onClickHandler = (index, ranked) => {
    dispatch(setWatched(index, ranked))
    dispatch(setDatabase())
  }

  const sortByInput = (item) => {
    dispatch(sortBy(item, order))
    setOrder(!order)
  }

  const useRowStyles = makeStyles({
    root: {
      '& > *': {
        borderBottom: 'unset',
      },
    },
  });

  function Row(props) {
    const { row, index } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();
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
              {row.originalTitle}
            </div>
          </TableCell>
          <TableCell align="right">
            <div style={{ fontSize: '18px' }}>
              {row.year}</div>
          </TableCell>
          <TableCell align="right" >
            <div style={{ fontSize: '20px' }}>
              {row.imdbRating}</div>
          </TableCell>
          <TableCell align="right">
            <FormControlLabel
              control={<GreenCheckbox checked={row.watched} onClick={() => onClickHandler(index, row.ranked)} onChange={handleChange} name="checkedG" />}
              label="Watched"
            />
          </TableCell>
          <TableCell align="right">
            <Rating
              name="simple-controlled"
              value={row.yourRating}
              onChange={() => console.log(index)}
            />
          </TableCell>
          <TableCell align="right">
            <IconButton aria-label="delete" onClick={() => removeMovieFunction(index, row.originalTitle)}>
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </TableCell>
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
                        {row.actors.map((actor) =>
                          <li>{actor}</li>)}
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

  Row.propTypes = {
    row: PropTypes.shape({
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
                  onClick={() => sortByInput('originalTitle')}>Movie Title
                </Typography>
              </TableCell>
              <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('year')} align="right">Year</TableCell>
              <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('imdbRating')} align="right">IMDB Rating&nbsp;</TableCell>
              <TableCell style={{ color: '#FFFFFF' }} onClick={() => sortByInput('watched')} align="right">Watched&nbsp;</TableCell>
              <TableCell style={{ color: '#FFFFFF' }} align="right">Your Rating&nbsp;</TableCell>
              <TableCell style={{ color: '#FFFFFF' }} align="right">Remove&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtered.map((st, index) => {
              return (
                (st.originalTitle !== "") ?
                  <Row key={index} row={st} index={index} /> : null
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MaterialTable;