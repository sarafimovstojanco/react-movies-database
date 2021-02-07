import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom'
import TableHeader from '../Table/TableHeader'
import TableData from '../Table/TableData'
import Navbar from '../Navigation/Navbar'
import { useDispatch } from 'react-redux';
import { getMovies, setDatabase, newMovieAddition } from '../redux/actions'
import "bulma/css/bulma.min.css"


const AddMovie = () => {
    const dispatch = useDispatch()
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
        if (event.target.value === "Watched") {
            setNewMovie({
                ...newMovie,
                watched: true
            })
        }
        else {
            setNewMovie({
                ...newMovie,
                watched: false
            })
        }
    }
    const addNewMovie = () => {
        dispatch(newMovieAddition(newMovie))
        dispatch(setDatabase())
    }
    return (
        localStorage.isAuth ? <div>
            <Navbar />
            <div class="pt-6">
                <div class="pt-5">
                    <div class="columns is-desktop">
                        <div class="column is-offset-1 ">
                            <strong>Add Rating</strong>
                            <input class="input is-primary"
                                type="text" pattern="[0-9]*"
                                placeholder="IMDB Rating"
                                onChange={(event) => addMovieRating(event)}
                            />
                        </div>
                        <div class="column">
                            <strong>Add Title</strong>
                            <input
                                class="input is-primary"
                                type="text"
                                placeholder="Movie Title"
                                onChange={(event) => addMovieTitle(event)}
                            />
                        </div>
                        <div class="column">
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
                            <div>
                                <div class="select is-success">
                                    <select onChange={(event) => isWatched(event)}>
                                        <option>Not Watched</option>
                                        <option>Watched</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column is-offset-5">
                        <button
                            class="button is-success"
                            onClick={addNewMovie}
                        >Add Movie</button>
                    </div>
                </div>
            </div>
            <div class='box px-6'>
                <div class='px-6'>
                    <h3>Recently Added Movies</h3>
                    <table class={"table table-bordered text-center"}>
                        <thead class="thead-dark">
                            <TableHeader />
                        </thead>
                        <tbody>
                            <TableData />
                        </tbody>
                    </table>
                </div>
            </div>
        </div> : <Redirect to={'/auth'} />
    )
}

export default AddMovie;