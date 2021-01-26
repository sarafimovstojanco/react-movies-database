import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from './Spinner/Spinner'
import Table from './Table';
import Navigation from './Navigation'
import {getMovies} from './redux/actions'
import './App.css';


const App = (props) => {

  const [movies, setMovies] = useState(props.mov)   
  const [loading, setLoading] = useState(props.loading)
  let [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    props.getMovies()
  },[])
  

    // useEffect(() => {
    //   if (typeof props.filtered !== "undefined"){
    //   setMovies(props.filtered)}
    // }, [props.filtered])
    // useEffect(() => {
    //   if (typeof props.filtered === "undefined"){
    //   setMovies(props.mov)}
    // }, [props.mov])
  // useEffect(() => {
  //   setMovies(props.mov)
  // }, [props.mov])
  // useEffect(() => {
  //   setMovies(props.filtered)
  // }, [props.filtered])
//   const load = _ => {
//     if(localStorage.isAuth){
//       axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '.json').then(response => {
//       console.log(response.data)
//       localStorage.setItem('firstName', response.data[122])
//       let movies=[...response.data]
//       setMovies(movies.slice(0,122))
//       setLoading(false)
//     })
//     .catch(error => console.log(error))
// }

// else {
//       axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
//       console.log(response.data)
//       setMovies(response.data)
//       setLoading(false)
//     })
//     .catch(error => console.log(error))
// }
//     }
if (props.loading) {
   return <Spinner/>
 }
console.warn = console.error = () => {};
      return (
      <div style={{ 
       // backgroundSize: 'cover',
        //backgroundImage: `url("https://i.pinimg.com/originals/29/b4/f3/29b4f3a261a2b212f7a831f31940f1ad.jpg")` 
      }}>
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

      const mapStateToProps  = (state) => (
        {mov: state.movies,
        loading: state.loading,
        filtered: state.filteredMovies,
        searching: state.searching
        })

export default connect(mapStateToProps, {getMovies})(App);