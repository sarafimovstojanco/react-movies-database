import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Box from '@material-ui/core/Box';
import Select from '@material-ui/core/Select';
import { useDispatch} from 'react-redux';
import { addNewMovie } from '../redux/actions'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import axios from 'axios';
import qs from 'qs';

const AddInput = () => {
  const dispatch = useDispatch()

  let [newMovie, setNewMovie] = useState({
    actors: ['Stojanco Sarafimov', 'Stoci'],
    imdbRating: '',
    originalTitle: '',
    year: '',
   //watched: null
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
  const addFirstMainActor = (event) => {
    setNewMovie({
      ...newMovie,
      firstActor: event.target.value
    })
  }
  const addSecondMainActor = (event) => {
    setNewMovie({
      ...newMovie,
      secondActor: event.target.value
    })
  }
  const addThirdMainActor = (event) => {
    setNewMovie({
      ...newMovie,
      thirdActor: event.target.value
    })
  }
  const inputNewMovie = () => {
    const movie = {
      title: newMovie.originalTitle,
      imdbRating: newMovie.imdbRating,
      year: newMovie.year
  }
  // axios({
  //   method: 'post',
  //   url: 'http://127.0.0.1:8000/api/movies',
  //   data: qs.stringify({
  //     title: newMovie.originalTitle,
  //     imdbRating: newMovie.imdbRating,
  //     year: newMovie.year,
  //   }),
  //   headers: {
  //     'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  //   }
  // })
  axios.post('http://127.0.0.1:8000/api/movies', movie)
  .then(response=>{
    const id= response.data.id
      let actors = {
          actor: newMovie.firstActor,
          type: 'Movies',
          id: id
      }
     return axios.post('http://127.0.0.1:8000/api/actors', actors)
       .then(response=>{
         actors = {
          actor: newMovie.secondActor,
          type: 'Movies',
          id: id
      }
     return axios.post('http://127.0.0.1:8000/api/actors', actors)
       .then(response=>{
         actors = {
          actor: newMovie.thirdActor,
          type: 'Movies',
          id: id
      }
     return axios.post('http://127.0.0.1:8000/api/actors', actors)
        })
       })
     })
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
        <TextField id="outlined-basic" label="IMDB Rating..." variant="outlined" onChange={addMovieRating} />
        <TextField id="outlined-basic" label="Movie Title..." variant="outlined" onChange={addMovieTitle} />
        <TextField id="outlined-basic" label="Year..." variant="outlined" onChange={addMovieYear} />
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
        <TextField id="outlined-basic" label="Main Actors..." variant="outlined" onChange={addFirstMainActor} />
        <TextField id="outlined-basic" label="Main Actors..." variant="outlined" onChange={addSecondMainActor} />
        <TextField id="outlined-basic" label="Main Actors..." variant="outlined" onChange={addThirdMainActor} />
      </form>
      <Box mt={+2} >
        <Button variant="contained" onClick={inputNewMovie}>Add Movie</Button>
      </Box>
    </Box>
  );
 
}
AddInput.propTypes = {
  newMovie: PropTypes.shape({
    originalTitle: PropTypes.string.isRequired,
    imdbRating: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    watched: PropTypes.bool.isRequired
  }).isRequired,
}

export default AddInput