import React, {useState, useEffect} from 'react'
import axios from 'axios';
import './App.css';

const SearchBar = (props) => {
  let [keyword, setKeyword] = useState("")
  let [newData, setNewData] = useState(props.movies)
  
  const load = _ => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/.json').then(response => {
      setNewData(response.data)
    })
  }
  useEffect(() => {
    load();
  }, [])

  const onChangeHandler = event => {
    setKeyword(event.target.value)
    props.setMovies(newData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))));
  }

  return (
  <div id='search'>
    <input 
          type="text"
          value={keyword}
          placeholder="Search Title..."
          onChange={onChangeHandler}
        ></input>
  </div>
  )
}

export default SearchBar;