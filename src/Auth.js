import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import SignInCard from './SignInCard';

const Auth = (props) => {

let [isAuth, setIsAuth] = useState(false)
const [loading, setLoading] = useState(true)
let [authMovies, setAuthMovies] = useState()
console.log(authMovies)

useEffect(() => {
  load();
}, [])
const load = _ => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
    console.log(response.data)
    setAuthMovies(response.data)
    setLoading(false)
  })
  .catch(error => console.log(error))
}
  
return (
  <div>
    <Navigation 
    isAuth={isAuth}
    setIsAuth={setIsAuth}
    />
    <SignInCard 
    movies={authMovies}
    isAuth={isAuth}
    setIsAuth={setIsAuth}
    />
   </div>
)}

export default Auth;