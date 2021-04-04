import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, setPerPage } from '../redux/actions'
import "bulma/css/bulma.min.css"

const PerPageSelector = () => {
  const countPerPage = useSelector(state => state.countPerPage)
  const currentPage = useSelector(state => state.currentPage)
  const totalCount = useSelector(state => state.totalCount)
  const filtered = useSelector(state => state.movies)
  const searching = useSelector(state =>state.searching)
  const dispatch = useDispatch()

  if(!searching){
    return (
      <div class="select mt-2 is-small">
      <select value={countPerPage} onChange={event => dispatch(getMovies(1, parseInt(event.target.value)))} >
          {
            [10, 25, 50, 100, totalCount].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show: {pageSize}
              </option>
            ))
          }
        </select>
      </div>
      )
      }
      else {
        return (
          <select value={filtered.length} onChange={event => dispatch(getMovies(1, parseInt(event.target.value)))} >
          {
              <option key={filtered.length} value={filtered.length}>
                Show: {filtered.length}
              </option>
          }
        </select>
        )
  }

}

export default PerPageSelector;