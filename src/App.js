import React, {useEffect, useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './Spinner/Spinner'
import Table from './Table';
import Navigation from './Navigation'
import './App.css';


const App = () => {

  const [movies, setMovies] = useState()   
  const [loading, setLoading] = useState(true)
  let [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    load();
  }, [])
  const load = _ => {
    if(localStorage.isAuth){
      axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '.json').then(response => {
      console.log(response.data)
      setMovies(response.data)
      setLoading(false)
    })
    .catch(error => console.log(error))
}
else {
      axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
      console.log(response.data)
      setMovies(response.data)
      setLoading(false)
    })
    .catch(error => console.log(error))
}
    }
    

console.warn = console.error = () => {};

if (loading) {
  return <Spinner/>
}
      return (
      <div>
          <Navigation
            movies={movies}
            setMovies={setMovies}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
          <Table 
            movies={movies}
            setMovies={setMovies}/>
      </div>
      )}

export default App