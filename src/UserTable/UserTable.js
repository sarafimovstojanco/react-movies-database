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


const Table = (props) => {
  const [userData, setUserData] = useState(props.movies)   
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(100)
  const [ascending, setAscending] = useState(true)
   

  console.warn = console.error = () => {};

  const loadTable = () => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' +localStorage.userId+ '.json')
          .then(response => {
            const fetchedData = [];
            for (let key in response.data) {
                fetchedData.push({
                    ...response.data[key],
                    id: key
                })
          }
          setUserData(fetchedData)
        })
          .catch(error => console.log(error))
          }
    console.log(loadData)

  const load = _ => {
      loadTable
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

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = movies.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber)
      return (     
        <div class='Wrapper'>
        {loading ? <Spinner /> : null} 
        <table class={"table table-bordered text-center"}>
          <thead class="thead-dark">
            <UserTableHeader
              onHeaderClick={onHeaderClick}
              movies={currentPosts}
              setMovies={setMovies}
             />
          </thead>
           <tbody>
            <UserTableData
            movies={movies}
            pageSize={postsPerPage}
            indexOfFirstPost={indexOfFirstPost}
            indexOfLastPost={indexOfLastPost}
            />
           </tbody>
        </table>
          {/* <Pagination
          postsPerPage={postsPerPage}
          totalPosts={movies.length}
          paginate={paginate}
          />
          <PerPageSelector 
          pageSize={postsPerPage}
          setPageSize={setPostsPerPage}
          movies={movies}
          setMovies={setMovies}
          /> */}
     </div>
      )
}

export default Table