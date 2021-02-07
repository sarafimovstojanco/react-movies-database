import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from './Spinner/Spinner'
import Table from './Table/Table';
import { getMovies } from './redux/actions'
import './App.css';
import Navbar from './Navigation/Navbar';

const App = _ => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(getMovies())
  }, [])

  return <>
    {loading ? <Spinner /> : <>
      <Navbar />
      <Table />
    </>}
  </>
}

export default App;