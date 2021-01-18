import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TableData from './TableData';
import TableHeader from './TableHeader.js';
import Navigation from './Navigation.js'
import PerPageSelector from './PerPageSelector';
import Pagination from './Pagination';
import Spinner from './Spinner/Spinner';
import './Table.css'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';


const Table = (props) => {
  const [movies, setMovies] = useState(props.movies)   
  const [loading, setLoading] = useState(false)
  const [loadData, setLoadData] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(100)
  const [ascending, setAscending] = useState(true)
  console.log(movies)

  // const queryParams = '?auth=' + localStorage.token + '&orderBy="userId"&equalTo="' + localStorage.userId +'"'
  // axios.get('/orders.json' + queryParams)
  console.warn = console.error = () => {};
  var config = {
    apiKey: "apiKey",
    authDomain: "react-movies-database.firebaseapp.com",
    databaseURL: "https://react-movies-database-default-rtdb.firebaseio.com/",
    storageBucket: "bucket.appspot.com"
  };
  //firebase.initializeApp(config)

  if (firebase.apps.length === 0) {
    firebase.initializeApp(config);
  }
  
  const load = _ => {
      setMovies(props.movies)
  }
  useEffect(() => {
    load();
  }, [props.movies])
  
  useEffect(() => {
    setCurrentPage(1);
  }, [postsPerPage])

    const onHeaderClick = headerName => {
      setMovies(sort(headerName))
    }

  //   for(let element of movies){
  //     element.watched = false
  // }

    const sort = param => {
      if(ascending){
        setAscending(false)
        return [].concat(movies)
        .sort((a, b) => a[param] < b[param] ? 1 : -1)
        .map((item, i) => 
            item
        );
      }
      else {
        setAscending(true)
        return [].concat(movies)
        .sort((a, b) => a[param] > b[param] ? 1 : -1)
        .map((item, i) => 
            item
        );
      }
    }
    const saveTable = () => {
      // const newArray=[...movies, {userId: localStorage.userId}]
      // console.log(newArray)
      let path = localStorage.userId
      firebase.database().ref(path +"/").set(movies)
      // axios.post('https://react-movies-database-default-rtdb.firebaseio.com/.json?auth=' + localStorage.token, newArray)
      //        .then(response => {
      //            console.log(response)
      //    })
      //        .catch( error => {
      //            console.log(error)
      //        });
         }
        
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    return (     
        <div class='Wrapper'>
        {loading ? <Spinner /> : null} 
        {localStorage. isAuth ? <button class="btn btn-success"
          onClick={saveTable}
        >Save Table</button>: null}
        <table class={"table table-bordered text-center"}>
          <thead class="thead-dark">
            <TableHeader
              onHeaderClick={onHeaderClick}
              movies={currentPosts}
              setMovies={setMovies}
             />
          </thead>
           <tbody>
            <TableData
            movies={movies}
            setMovies={setMovies}
            pageSize={postsPerPage}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            />
           </tbody>
        </table>
          <Pagination
          postsPerPage={postsPerPage}
          totalPosts={movies.length}
          paginate={paginate}
          />
          <PerPageSelector 
          pageSize={postsPerPage}
          setPageSize={setPostsPerPage}
          movies={movies}
          setMovies={setMovies}
          />
     </div>
      )
}

export default Table