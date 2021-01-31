import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import SignInCard from './SignInCard';

const Auth = (props) => {

let [isAuth, setIsAuth] = useState(false)
const [loading, setLoading] = useState(true)
let [authMovies, setAuthMovies] = useState()

useEffect(() => {
  load();
}, [])
const load = _ => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
    console.log(response.data)
    setAuthMovies(response.data.map((obj, index)=> ({ ...obj, ranked: index+1 })))
    setLoading(false)
  })
  .catch(error => console.log(error))
}
  
return (
  <div>
    <Navigation/>
    <SignInCard/>
   </div>
)}


export default Auth;