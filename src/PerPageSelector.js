import React from 'react'
import {connect} from 'react-redux';

const PerPageSelector = (props) => {
  let length = props.totalCount;
  if(length >= 10){
    return (
      <select value={props.countPerPage} onChange={event => props.setPerPage(event.target.value)} >
          {
            [10, 25, 50, 100, 122].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show: {pageSize}
              </option>
            ))
          }
        </select>
      )
      }
      else {
        return (
          <select value={props.countPerPage} onChange={event => props.setPerPage(event.target.value)} >
          {
              <option key={length} value={length}>
                Show: {length}
              </option>
          }
        </select>
        )
  }

}
const mapStateToProps = state => {
  return {
      mov:state.movies,
      countPerPage: state.countPerPage,
      currentCount: state.currentCount,
      currentPage: state.currentPage,
      filteredPages: state.filteredPages,
      totalCount: state.totalCount,
      totalPages: state.totalPages,
  }
}

const mapDispatchToProps = dispatch =>
{
  return{
    setPerPage: (event) => {
      console.log(event)
      dispatch({
        type: 'MOVIES_PER_PAGE',
        payload: event
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PerPageSelector)