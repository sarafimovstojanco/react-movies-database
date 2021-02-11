import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Spinner/Spinner'
import { getMovies, setDatabase, newMovieAddition } from '../redux/actions'
import "bulma/css/bulma.min.css"
import Navbar from '../Navigation/Navbar';
import AddInput from './AddInput'
import MaterialTable from '../Table/MaterialTable';
import Box from '@material-ui/core/Box';

const AddMovie = () => {
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies())
    }, [])

    return (
        loading ? <Spinner /> :
        localStorage.isAuth ? 
        <div>
        <Navbar />
        <div style={{
        textAlign: 'center',
        margin: 'auto',
        width: '80%',
        padding: '10px'
        }}>
            <Box mt={+5}>
                <AddInput />
            </Box>
            <Box mt={+8} >
                <MaterialTable/>
            </Box>
        </div> </div>: <Redirect to={'/auth'} />
    )
}

export default AddMovie;