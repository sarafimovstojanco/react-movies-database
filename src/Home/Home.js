import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import Navbar from '../Navigation/Navbar';
import FullTable from '../Table/FullTable';
import { useDispatch } from 'react-redux'
import { getMovies, getDarkMode, getTheme, getThemeColor } from '../redux/actions'

const Home = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMovies())
        dispatch(getDarkMode())
        dispatch(getThemeColor())
    }, [])
    
return (
    <> 
    <div style={{padding: "3%"}}>
        <Navbar />
        <FullTable />
        </div>
    </>
)
}
export default Home