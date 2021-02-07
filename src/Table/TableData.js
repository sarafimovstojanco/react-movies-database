import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setWatched, setDatabase, removeMovie, loadExactPage } from '../redux/actions'

const TableData = () => {
 
  const dispatch = useDispatch()
  const filtered = useSelector(state => (state.filteredMovies))
  const state = useSelector(state => (state)) //filtered is not re-rendering without it

  const checkBox = (
    <div class="form-check">
      <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={filtered} />
      <label class="form-check-label" for="exampleRadios1">
        Not Watched
          </label>
    </div>)

  const onClickHandler = (index, ranked) => {
    dispatch(setWatched(index, ranked))
    dispatch(setDatabase())
  }

  const removeMovieFunction = (index, ranked) => {
    dispatch(removeMovie(index, ranked))
    dispatch(setDatabase())
  }

  return (
    filtered.map((st, index) => {
      const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
      if (localStorage.isAuth) {
        return (
          <tr key={releaseDate}>
            <td>{imdbRating}</td>
            <td>{originalTitle}</td>
            <td>{year}</td>
            <td>{watched ? <a onClick={() => onClickHandler(index, ranked)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index, ranked)}>{checkBox}</a>}</td>
            <td><button class="delete has-background-danger" onClick={() => removeMovieFunction(index, ranked)}></button></td>
          </tr>
  
        )
      }
      else return (
        <tr key={releaseDate}>
          <td>{imdbRating}</td>
          <td>{originalTitle}</td>
          <td>{year}</td>
        </tr>
      )
    })
  )
}

export default TableData 