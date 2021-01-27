import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import {connect} from 'react-redux'
import Spinner from './Spinner/Spinner';

function TableData(props) {
    let [isAuth, setIsAuth] = useState(localStorage.isAuth)
    let checkBox = (
      <div class="form-check">
          <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={props.mov}  />
          <label class="form-check-label" for="exampleRadios1">
          Not Watched
          </label>
      </div>)
    const [moviesData, setMoviesData] = useState()
    const [tableData, setTableData] =useState(
      props.filtered.map((st, index) => {
        const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
        if(isAuth){return (
            <tr key={releaseDate}>
                <td >{ranked}</td>
                <td>{imdbRating}</td>
                <td>{originalTitle}</td>
                <td>{year}</td>
                <td>{watched ? <a onClick={() => onUndoHandler(index, ranked)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index, ranked)}>{checkBox}</a>}</td>
            </tr>
            
            )}
        else return (
            <tr key={releaseDate}>
                <td >{index + 1 }</td>
                <td>{imdbRating}</td>
                <td>{originalTitle}</td>
                <td>{year}</td>
            </tr>
            )
    })
    )
 
    
    useEffect(() => {
      setTableData(
        props.filtered.map((st, index) => {
          const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
          if(isAuth){return (
              <tr key={releaseDate}>
                  <td >{ranked}</td>
                  <td>{imdbRating}</td>
                  <td>{originalTitle}</td>
                  <td>{year}</td>
                  <td>{watched ? <a onClick={() => onUndoHandler(index, ranked)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index, ranked)}>{checkBox}</a>}</td>
              </tr>
              
              )}
          else return (
              <tr key={releaseDate}>
                  <td >{index + 1 }</td>
                  <td>{imdbRating}</td>
                  <td>{originalTitle}</td>
                  <td>{year}</td>
              </tr>
              )
      })
      )
    },[])

    var config = {
        apiKey: "apiKey",
        authDomain: "react-movies-database.firebaseapp.com",
        databaseURL: "https://react-movies-database-default-rtdb.firebaseio.com/",
        storageBucket: "bucket.appspot.com"
      };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(config);
      }
    if (props.loading) {
        return <Spinner/>
      }
   
    console.log(props.filtered)
    const onClickHandler = (index, ranked) => {
        console.log(index, ranked)
        props.setWatched(index, ranked)
        props.setDatabase()

     
    }
    const onUndoHandler= (index, ranked) => {
      
        props.setNotWatched(index, ranked)
        props.setDatabase()
    }

 
       return ( props.filtered.map((st, index) => {
        const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
        if(isAuth){return (
            <tr key={releaseDate}>
                <td >{ranked}</td>
                <td>{imdbRating}</td>
                <td>{originalTitle}</td>
                <td>{year}</td>
                <td>{watched ? <a onClick={() => onUndoHandler(index, ranked)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index, ranked)}>{checkBox}</a>}</td>
            </tr>
            
            )}
        else return (
            <tr key={releaseDate}>
                <td >{index + 1 }</td>
                <td>{imdbRating}</td>
                <td>{originalTitle}</td>
                <td>{year}</td>
            </tr>
            )
    })
    )
    }
 // else {
//     return props.filtered.map((st, index) => {
//         const { ranked, releaseDate, imdbRating, originalTitle, year, watched } = st
//         if(isAuth){return (
//             <tr key={releaseDate}>
//                 <td >{ranked}</td>
//                 <td>{imdbRating}</td>
//                 <td>{originalTitle}</td>
//                 <td>{year}</td>
//                 <td>{watched ? <a onClick={() => onUndoHandler(index, ranked)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index, ranked)}>{checkBox}</a>}</td>
//             </tr>
            
//             )}
     
//     })
//   }
// }
const mapStateToProps  = (state) => (
        {mov: state.movies,
        loading: state.loading,
        filtered: state.filteredMovies,
        searching: state.searching,
        state: state
        })

const mapDispatchToProps = dispatch => {
    return {
      setWatched: (index, ranked) => 
      dispatch({
         type: "WATCHED",
         payload: index,
         ranked: ranked
      }),
      setNotWatched: (index, ranked) => dispatch({
        type: "NOT_WATCHED",
        payload: index,
        ranked: ranked
      }),
    setDatabase: () => dispatch({
          type: 'DATABASE_SET'
       })
}
}



export default connect(mapStateToProps, mapDispatchToProps)(TableData); 