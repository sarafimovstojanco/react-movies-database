import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import TableHeader from '../Table/TableHeader'
import TableData from '../Table/TableData'
import { useSelector, useDispatch } from 'react-redux';
import { getMovies, setDatabase, newMovieAddition } from '../redux/actions'
import "bulma/css/bulma.min.css"


const AddMovie = () => {
    const dispatch = useDispatch()
    let movies = useSelector(state => state.movies)
    useEffect(() => {
        dispatch(getMovies())
    }, [])

    let [newMovie, setNewMovie] = useState({
        imdbRating: '',
        originalTitle: '',
        year: '',
        watched: false
    })

    const addMovieRating = (event) => {
        setNewMovie({
            ...newMovie,
            imdbRating: event.target.value
        })
    }
    const addMovieTitle = (event) => {
        setNewMovie({
            ...newMovie,
            originalTitle: event.target.value
        })
    }
    const addMovieYear = (event) => {
        setNewMovie({
            ...newMovie,
            year: event.target.value
        })
    }
    const isWatched = (event) => {
        if(event.target.value === "Watched")
        {setNewMovie({
            ...newMovie,
            watched: true
        })}
        else {
            setNewMovie({
                ...newMovie,
                watched: false
            })}
    }
    const addNewMovie = () => {
        // movies.unshift(newMovie)
        dispatch(newMovieAddition(newMovie))
        dispatch(setDatabase())
        console.log(movies)
    }
    return (
        <div>
            <div class="box">
                <div class="columns">
                    <div class="column is-3">
                        <strong>Add Rating</strong>
                        <input class="input is-primary"
                            type="text" pattern="[0-9]*"
                            placeholder="IMDB Rating"
                            onChange={(event) => addMovieRating(event)}
                        />
                    </div>
                    <div class="column is-3">
                        <strong>Add Title</strong>
                        <input
                            class="input is-primary"
                            type="text"
                            placeholder="Movie Title"
                            onChange={(event) => addMovieTitle(event)}
                        />
                    </div>
                    <div class="column is-3">
                        <strong>Add Year</strong>
                        <input
                            class="input is-primary"
                            type="text" pattern="[0-9]*"
                            placeholder="Year"
                            onChange={(event) => addMovieYear(event)}
                        />
                    </div>
                    <div class="column">
                        <strong>Watched?</strong>
                        <div class="select is-success">
                        <select onChange={(event) => isWatched(event)}>
                            <option>Not Watched</option>
                            <option>Watched</option>
                        </select>
                        </div>
                    </div>
                </div>
                <button
                    class="button is-warning is-pulled-right"
                    onClick={addNewMovie}
                >Add Movie
                </button>
               <Link to="/"> <button
                    type="button"
                    class="button is-success"
                >Full Table</button>
                </Link>
            </div>
            <div class='Wrapper'>
                <h3>Recently Added Movies</h3>
                <table class={"table table-bordered text-center"}>
                    <thead class="thead-dark">
                        <TableHeader
                        />
                    </thead>
                    <tbody>
                        <TableData
                        />
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AddMovie;