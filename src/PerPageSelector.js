import React from 'react'

const PerPageSelector = (props) => {
  let length = props.movies.length;
  if(length >= 10){
    return (
      <select value={props.pageSize} onChange={event => props.setPageSize(event.target.value)} >
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
          <select value={props.pageSize} onChange={event => props.setPageSize(event.target.value)} >
          {
              <option key={length} value={length}>
                Show: {length}
              </option>
          }
        </select>
        )
  }

}

export default PerPageSelector;