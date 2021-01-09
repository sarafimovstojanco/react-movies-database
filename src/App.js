import React, {useEffect, useState} from 'react'
import axios from 'axios'
import TableData from './TableData';
import TableHeader from './TableHeader.js';
import SearchBar from './SearchBar.js'
import PerPageSelector from './PerPageSelector';
import Pagination from './Pagination';
import Spinner from './Spinner/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


const App = () => {
  const [movies, setMovies] = useState([])   
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(100)
  const [ascending, setAscending] = useState(true)
   
  const load = _ => {
      setLoading(true)
      axios.get('https://react-movies-database-default-rtdb.firebaseio.com/.json').then(response => {
      setMovies(response.data)
      setLoading(false)
    })
  }
  useEffect(() => {
    load();
  }, [])
  
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
        <div>
        {loading ? <Spinner /> : null} 
        <h1 id='title'>React Movies Database</h1>
        <SearchBar 
        movies={movies}
        setMovies={setMovies}
        />
        <table id='movies'>
           <tbody>
           <tr>
             <TableHeader
              onHeaderClick={onHeaderClick}
              movies={currentPosts}
              setMovies={setMovies}
             />
            </tr>
            <TableData
            movies={movies}
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

export default App