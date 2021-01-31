import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './Spinner/Spinner'
import Table from './Table';
import Navigation from './Navigation'
import { getMovies } from './redux/actions'
import './App.css';

const App = _ => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(getMovies())
  },[])
  
  return <>
        {loading ? <Spinner /> : <>
          <Navigation/>
          <Table/>
        </>}
      </>
}

export default App;