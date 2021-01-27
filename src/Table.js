import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TableData from './TableData';
import TableHeader from './TableHeader.js';
import Navigation from './Navigation.js'
import PerPageSelector from './PerPageSelector';
import Pagination from './Pagination';
import Spinner from './Spinner/Spinner';
import {connect} from 'react-redux';
import './Table.css'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';


const Table = (props) => {
  const [loading, setLoading] = useState(false)
  const [moviesData, setMoviesData] = useState(props.mov)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(10)
  const [ascending, setAscending] = useState(true)

  console.warn = console.error = () => {};
  var config = {
    apiKey: "apiKey",
    authDomain: "react-movies-database.firebaseapp.com",
    databaseURL: "https://react-movies-database-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
  
  if (props.loading) {
    return <Spinner/>
  }
    const indexOfLastPost = props.currentCount
    const indexOfFirstPost = indexOfLastPost - props.countPerPage

    return (     
        <div class='Wrapper'>
        {loading ? <Spinner /> : null} 
        <table class={"table table-bordered text-center"}>
          <thead class="thead-dark">
            <TableHeader
              movies={moviesData}
              setMovies={props.setMovies}
             />
          </thead>
           <tbody>
            <TableData
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            movies={moviesData}
            setMovies={setMoviesData}
            pageSize={postsPerPage}
            />
           </tbody>
        </table>
          <Pagination
          movies={moviesData}
          postsPerPage={postsPerPage}
          totalPosts={moviesData.length}
          />
          <PerPageSelector 
          postsPerPage={postsPerPage}
          setPostsPerPage={setPostsPerPage}
          movies={moviesData}
          setMovies={props.setMoviesData}
          />
     </div>
      )
}
const mapStateToProps = state => {
  return {
      state: state,
      mov:state.movies,
      loading: state.loading,
      filtered: state.filteredMovies,
      searching: state.searching,
      countPerPage: state.countPerPage,
      currentCount: state.currentCount,
      currentPage: state.currentPage,
      filteredPages: state.filteredPages,
      totalCount: state.totalCount,
      totalPages: state.totalPages,
  }
}

export default connect(mapStateToProps)(Table);