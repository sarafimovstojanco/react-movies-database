import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from '../Spinner/Spinner'
import { getMovies, getTheme } from '../redux/actions'
import './Home.css';
import Navbar from '../Navigation/Navbar';
import FullTable from '../Table/FullTable';


const Home = () => {

const dispatch = useDispatch()
const loading = useSelector(state => state.loading)

useEffect(() => {
    dispatch(getMovies())
    dispatch(getTheme())
}, [])

return (
    loading ? <Spinner /> : <>
        <Navbar />
        <FullTable />
    </>
)
}
export default Home