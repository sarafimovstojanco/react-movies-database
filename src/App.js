import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './Spinner/Spinner'
import MaterialTable from './Table/MaterialTable';
import { getMovies } from './redux/actions'
import './App.css';
import NavCool from './Navigation/NavCool';

const App = _ => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(getMovies())
  },[])
  
  return <>
        {loading ? <Spinner /> : <>
          <NavCool/>
          <MaterialTable/>
        </>}
      </>
}

export default App;