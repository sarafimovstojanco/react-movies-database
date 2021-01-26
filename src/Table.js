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

  // const load = _ => {
  //     setMovies(currentPosts)
  // }
//   useEffect(() => {
//      setMoviesData(props.movies);
//  }, [props.movies])
// useEffect(() => {
//   if (props.searching){
//     setMoviesData(props.filtered)}
// }, [props.filtered])

//  useEffect(() => {
//   if (!props.searching){
//   setMoviesData(props.movies)};
// }, [props.movies])
  
  // useEffect(() => {
  //   setCurrentPage(1);
  // }, [postsPerPage])
  
  if (props.loading) {
    return <Spinner/>
  }
    // const onHeaderClick = headerName => {
    //   props.setMovies(sort(headerName))
    // }
  
    // const sort = param => {
    //   if(ascending){
    //     setAscending(false)
    //     return [].concat(props.movies)
    //     .sort((a, b) => a[param] < b[param] ? 1 : -1)
    //     .map((item, i) => 
    //         item
    //     );
    //   }
    //   else {
    //     setAscending(true)
    //     return [].concat(props.movies)
    //     .sort((a, b) => a[param] > b[param] ? 1 : -1)
    //     .map((item, i) => 
    //         item
    //     );
    //   }
    // }
    
    const indexOfLastPost = props.currentCount
    console.log(['moviesData'], props.currentPage)
    console.log(['moviesData'], indexOfLastPost)

    const indexOfFirstPost = indexOfLastPost - props.countPerPage
    console.log(['moviesData'], props.countPerPage)
    console.log(['moviesData'], props.currentCount)

    //const currentPosts = moviesData.slice(indexOfFirstPost, indexOfLastPost)
    // console.log(['moviesData'], indexOfLastPost)
    // console.log(['moviesData'], indexOfFirstPost)
    // console.log(['moviesData'], currentPosts)
    // const paginate = pageNumber => 
    // {
      //setCurrentPage(pageNumber)
      //setcurr(postsPerPage)
    //}
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
          //paginate={paginate}
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