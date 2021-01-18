import React, {useState} from 'react'
import FilterSelectorTest from './FilterSelectorTest'
import 'bootstrap/dist/css/bootstrap.min.css';

const TableHeader = (props) => {
   let [isAuth, setIsAuth] = useState(localStorage.isAuth)
   let header =  [
      {originalName: "Index", name: "Index"},
      {originalName: "imdbRating", name:"IMDB Rating"},
      {originalName: "originalTitle", name:"Title"},
      {originalName: "year", name: "Year"}];
   
   if(isAuth) {
      header =  [
         {originalName: "Index", name: "Index"},
         {originalName: "imdbRating", name:"IMDB Rating"},
         {originalName: "originalTitle", name:"Title"},
         {originalName: "year", name: "Year"},
         {watched: "watched", name: "Watched"}]
      }

   return header.map((item, index) => {
      return <th class="align-middle" key={index}>
         <span onClick={() => props.onHeaderClick(item.originalName)}>{item.name}</span>
         {/* {item.originalName === 'Watched' ? <FilterSelectorTest
                                 movies={props.movies}
                                 setMovies={props.setMovies}
         /> : null} */}
         </th>
   })
}

export default TableHeader;