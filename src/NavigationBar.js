import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NavigationBar = (props) => {
  let [keyword, setKeyword] = useState("")
  let [newData, setNewData] = useState(props.movies)
  let history = useHistory()

   const load = _ => {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/.json').then(response => {
      setNewData(response.data)
    })
  }
  useEffect(() => {
    load();
  }, [])
  const onLogoutHandler = () => {
    history.push('/')
    props.setIsAuth({
      token: '',
      userId: '',
      expiresIn: ''
    })
  }
 
  console.log(props.isAuth)

  const onChangeHandler = event => {
    setKeyword(event.target.value)
    props.setMovies(newData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))));
  }
  let searchBar = !props.isAuth ?  (<form class="form-inline my-2 my-lg-0">
  <input 
  class="form-control mr-sm-2" 
  aria-label="Search"
  type="text"
  value={keyword}
  placeholder="Search Title..."
  onChange={onChangeHandler}
  />
</form>) : null

  let table = !props.isAuth ? <li class="nav-item">
  <a class="nav-link" href="#">Table</a>
</li> : null

  let logoutButton = !props.isSignUp ? (
    <button 
    type="button" 
    class="btn btn-secondary"
    href="/"
    onClick={onLogoutHandler}
    >Logout</button>
  ) : null
  
  let saveTableButton = !props.isSignUp ? (
    <button 
    type="button"
    class="btn btn-success"
    href="/"
    onClick={onLogoutHandler}
    >Save</button>
  ) : null
  
return (
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      {table}
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
         {saveTableButton}
      </li>
      <li class="nav-item">
         {logoutButton}
      </li>
    </ul>
  {searchBar}
  </div>
</nav>
)}
export default NavigationBar