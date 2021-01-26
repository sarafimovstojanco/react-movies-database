import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from 'react-redux'

const TableHeader = (props) => {
   let [isAuth, setIsAuth] = useState(localStorage.isAuth)
   const [order, setOrder] = useState(true)
   let header =  [
      {originalName: "ranked", name: "Ranked"},
      {originalName: "imdbRating", name:"IMDB Rating"},
      {originalName: "originalTitle", name:"Title"},
      {originalName: "year", name: "Year"}];
     
     const sortByInput = (item) =>{
         props.sortBy(item, order)
         setOrder(!order)
      }

   if(isAuth) {
      header =  [
         {originalName: "ranked", name: "Ranked"},
         {originalName: "imdbRating", name:"IMDB Rating"},
         {originalName: "originalTitle", name:"Title"},
         {originalName: "year", name: "Year"},
         {originalName: "watched", name: "Watched"}]
      }

   return header.map((item, index) => {
      return <th class="align-middle" key={index}>
         <span onClick={() => sortByInput(item.originalName)}>{item.name}</span>
         {/* {item.originalName === 'Watched' ? <FilterSelectorTest
                                 movies={props.movies}
                                 setMovies={props.setMovies}
         /> : null} */}
         </th>
   })
}

const mapDispatchToProps = dispatch =>{
   return {
      sortBy: (item, order) =>{
      console.log(item, order)
      dispatch({
         type: 'SORT_BY',
         payload: item,
         order: order
      })}
   } 
}

export default connect(null, mapDispatchToProps)(TableHeader)