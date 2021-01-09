import React from 'react'
import FilterSelectorTest from './FilterSelectorTest'

const TableHeader = (props) => {
   let header = [
      {originalName: "Index", name: "Index"},
      {originalName: "imdbRating", name:"IMDB Rating"},
      {originalName: "originalTitle", name:"Title"},
      {originalName: "year", name: "Year"},
      {originalName: "Watched", name: "Watched"}];

   return header.map((item, index) => {
      return <th key={index}>
         <span onClick={() => props.onHeaderClick(item.originalName)}>{item.name}</span>
         {item.originalName === 'Watched' ? <FilterSelectorTest
                                 movies={props.movies}
                                 setMovies={props.setMovies}
         /> : null}
         </th>
   })
}

export default TableHeader;