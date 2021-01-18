import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TableData(props) {
    const [moviesData, setMoviesData]=useState([])
    
    let [isAuth, setIsAuth] = useState(localStorage.isAuth)
    useEffect(() => {
        setMoviesData(props.movies)
    }, [props.movies])

    // useEffect(() => {
    //     props.setMoviesDataset(moviesData)
    // }, [moviesData])


    // moviesData.push({userId: localStorage.userId})

    const onClickHandler = (index) => {
        setMoviesData( arr => ([...arr, arr[index].watched=true], arr.slice(0, moviesData.length)))
    }
    const onUndoHandler= (index) => {
        setMoviesData( arr => ([...arr, arr[index].watched=false], arr.slice(0, moviesData.length)))
    }

    const test= (index) => {
        const queryParams = '?auth=' + localStorage.token + '&orderBy="userId"&equalTo="' + localStorage.userId +'"'
        axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Test.json' + queryParams).then(
           response => console.log(['response'],response)
        )
    }

console.log(moviesData)
    let checkBox = (
    <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value={moviesData.watched}  />
        <label class="form-check-label" for="exampleRadios1">
        Not Watched
        </label>
    </div>
  )
   
    return moviesData.slice(props.indexOfFirstPost, props.indexOfLastPost).map((st, index) => {
        const { releaseDate, imdbRating, originalTitle, year, watched } = st
        if(isAuth){return (
            <tr key={releaseDate}>
                <td >{index + 1 }</td>
                <td>{imdbRating}</td>
                <td>{originalTitle}</td>
                <td>{year}</td>
                <td>{watched ? <a onClick={() => onUndoHandler(index)}> ✔️ Watched </a> : <a onClick={() => onClickHandler(index)}>{checkBox}</a>}</td>
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
}



export default TableData 