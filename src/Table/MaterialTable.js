import React, { setState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
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
import { useDispatch, useSelector } from 'react-redux'
import { setWatched, setDatabase, removeMovie, loadExactPage } from '../redux/actions'

const MaterialTable = () => {
const dispatch = useDispatch()
const filtered = useSelector(state => (state.filteredMovies))
//const state = useSelector(state => (state))
const [state, setState] = React.useState({
    checkedG: true,
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

  const handleChange = (event) => {
      console.log(event)
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onClickHandler = (index, ranked) => {
      console.log(index, ranked)
    dispatch(setWatched(index, ranked))
    dispatch(setDatabase())
  }

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
const stole = (e) =>{
    console.log(e)
}
function Row(props) {
  const { row } = props;
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
          {row.originalTitle}
        </TableCell>
        <TableCell align="right">{row.year}</TableCell>
        <TableCell align="right" onClick={() => stole(row)}>{row.imdbRating}</TableCell>
        <TableCell align="right">
        <FormControlLabel
        control={<GreenCheckbox checked={row.watched}  onClick={(index, ranked) => onClickHandler(index, ranked)} onChange={handleChange} name="checkedG" />}
        label="Custom color"
      />
      </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Actors
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                  {row.actors}
                    {/* <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
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
    watched:PropTypes.bool.isRequired
  }).isRequired,
};

const rows = filtered
  return (
      <Box width="70%" m={+10} mx={+25}>
        <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Movie Title</TableCell>
                <TableCell align="right">Year</TableCell>
                <TableCell align="right">IMDB Rating&nbsp;</TableCell>
                <TableCell align="right">Watched&nbsp;</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {rows.map((st, index) => {
                const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
                return(
                <Row key={index} row={st} onClick={() => console.log(index)}/>
                )
            })}
            </TableBody>
        </Table>
        </TableContainer>
    </Box>
  );
}

export default MaterialTable;