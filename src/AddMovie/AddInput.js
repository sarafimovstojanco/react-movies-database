import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { positions } from '@material-ui/system';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import { useDispatch } from 'react-redux';
import { setDatabase, newMovieAddition } from '../redux/actions'
import Button from '@material-ui/core/Button';

const AddInput = () =>{
const dispatch = useDispatch()

let [newMovie, setNewMovie] = useState({
    actors: ['Stojanco Sarafimov', 'Stoci'],
    imdbRating: '',
    originalTitle: '',
    year: '',
    watched: null
})

const addMovieRating = (event) => {
    setNewMovie({
        ...newMovie,
        imdbRating: event.target.value
    })
}
const addMovieTitle = (event) => {
    setNewMovie({
        ...newMovie,
        originalTitle: event.target.value
    })
}
const addMovieYear = (event) => {
    setNewMovie({
        ...newMovie,
        year: event.target.value
    })
}

const addNewMovie = () => {
    dispatch(newMovieAddition(newMovie))
    dispatch(setDatabase())
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

    const handleChange = (event) => {
    if (event.target.value === "Watched") {
        setNewMovie({
            ...newMovie,
            watched: true
        })
    }
    else {
        setNewMovie({
            ...newMovie,
            watched: false
        })
    }
    }
  const classes = useStyles();

  return (
    <Box>
    <form className={classes.root} noValidate autoComplete="off">
      <TextField id="outlined-basic" label="IMDB Rating..." variant="outlined" onChange={addMovieRating}/>
      <TextField id="outlined-basic" label="Movie Title..." variant="outlined" onChange={addMovieTitle}/>
      <TextField id="outlined-basic" label="Year..." variant="outlined" onChange={addMovieYear}/>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Select Watched...</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={handleChange}
          label="Watched"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Watched"}>Watched</MenuItem>
          <MenuItem value={"Not Watched"}>Not Watched</MenuItem>
        </Select>
      </FormControl>
    </form>
    <Box mt={+2} >
    <Button variant="contained" onClick={addNewMovie}>Add Movie</Button>
    </Box>
    </Box>
  );
}
export default AddInput