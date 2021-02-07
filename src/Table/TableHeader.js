import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch } from 'react-redux'
import { sortBy } from '../redux/actions'

const TableHeader = () => {
   const dispatch = useDispatch()
   const [order, setOrder] = useState(true)
   let header =  [
      {originalName: "imdbRating", name:"IMDB Rating"},
      {originalName: "originalTitle", name:"Title"},
      {originalName: "year", name: "Year"}];
     
     const sortByInput = (item) =>{
         dispatch(sortBy(item, order))
         setOrder(!order)
      }

   if(localStorage.isAuth) {
      header =  [
         {originalName: "imdbRating", name:"IMDB Rating"},
         {originalName: "originalTitle", name:"Title"},
         {originalName: "year", name: "Year"},
         {originalName: "watched", name: "Watched"},
         {originalName: "remove", name: "Remove"}]
      }

   return header.map((item, index) => {
      return <th class="align-middle" key={index}>
         <span onClick={() => sortByInput(item.originalName)}>{item.name}</span>
         </th>
   })
}


export default TableHeader