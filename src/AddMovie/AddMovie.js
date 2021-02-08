import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import TableHeader from '../Table/TableHeader'
import TableData from '../Table/TableData'
import { useDispatch } from 'react-redux';
import { getMovies, setDatabase, newMovieAddition } from '../redux/actions'
import "bulma/css/bulma.min.css"
import NavCool from '../Navigation/NavCool';
import AddInput from './AddInput'

const AddMovie = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies())
    }, [])

    return (
        localStorage.isAuth ? <div>
            <NavCool />
            <AddInput />
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