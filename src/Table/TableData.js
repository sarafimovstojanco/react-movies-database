import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setWatched, setDatabase } from '../redux/actions'

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
 console.log(state)
  return (
    filtered.map((st, index) => {
      const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
      if (localStorage.isAuth) {
        return (
          <tr key={releaseDate}>
            {/* <td >{ranked}</td> */}
            <td>{imdbRating}</td>
            <td>{originalTitle}</td>
            <td>{year}</td>
            <td>{watched ? <a onClick={() => onClickHandler(index, ranked)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index, ranked)}>{checkBox}</a>}</td>
          </tr>
  
        )
      }
      else return (
        <tr key={releaseDate}>
          {/* <td >{ranked}</td> */}
          <td>{imdbRating}</td>
          <td>{originalTitle}</td>
          <td>{year}</td>
        </tr>
      )
    })
  )
}

export default TableData 