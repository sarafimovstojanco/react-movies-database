import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getMovies, getDarkMode, getTheme } from '../redux/actions'
import "bulma/css/bulma.min.css"
import Navbar from '../Navigation/Navbar';
import AddInput from './AddInput'
import MaterialTable from '../Table/MaterialTable';
import Box from '@material-ui/core/Box';

const AddMovie = () => {
    const state = useSelector(state => state)// in order for re-rendering of the table to work
    const themeColor = useSelector(state => state.themeColor)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getMovies())
        dispatch(getDarkMode())
        dispatch((getTheme))
    }, [])

    return (
        localStorage.isAuth ?
            <div style={{ padding: "3%" }}>
                <Navbar />
                <div style={{
                    textAlign: 'center',
                    margin: 'auto',
                    width: '80%',
                    padding: '10px'
                }}>
                    <Box mt={+1}>
                        <AddInput />
                    </Box>
                    <Box mt={+8} >
                    <div style={{ border: themeColor.red ? '2px solid red ' : themeColor.blue ? '2px solid darkblue ' :  '2px solid green ' }}>
                            <MaterialTable />
                        </div>
                    </Box>
                </div> </div> : <Redirect to={'/auth'} />
    )
}

export default AddMovie;