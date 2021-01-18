import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import Auth from './Auth'
import axios from 'axios';

const Navigation = (props) => {
  let [keyword, setKeyword] = useState("")
  let [newData, setNewData] = useState(props.movies)
  let history = useHistory()
  let isSignUp = props.isAuth
  let [isAuth, setIsAuth] = useState(localStorage.isAuth)
  console.log(props.isLoggedIn)
   const load = _ => {
    if(localStorage.isAuth){
      axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '.json').then(response => {
      setNewData(response.data)
    }).catch(error => console.log(error))
  }
  else {
    axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
      setNewData(response.data)
    }).catch(error => console.log(error))
  }
   }
  useEffect(() => {
    load();
  }, [keyword])

  // useEffect(() => {
  //   setIsAuth(localStorage.isAuth)
  // }, [localStorage])

  const onChangeHandler = event => {
    setKeyword(event.target.value)
    props.setMovies(newData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))));
  }

  let searchBar = isAuth ?  (
  <form class="form-inline my-0 pull-right my-lg-0">
    <input 
    class="form-control mr-sm-2" 
    aria-label="Search"
    type="text"
    value={keyword}
    placeholder="Search Title..."
    onChange={onChangeHandler}
    />
  </form>) : null

  let table = isAuth ? 
  (<li class="nav-item">
  <a class="nav-link" href="/table">Table</a>
  </li>) : null

  const onLoginHandler = () => {
    history.push('/auth')
  }

  const onLogoutHandler = () => {
    localStorage.removeItem('expirationDate') 
    localStorage.removeItem('userId') 
    localStorage.removeItem('token') 
    localStorage.removeItem('isAuth')
    history.push('/auth')
  }

  let loginButton = !localStorage.isAuth ?
    <button 
    type="button" 
    class="btn btn-success"
    href="/auth"
    onClick={onLoginHandler}
    > Login </button> : null

  let logoutButton =
    <button 
    type="button" 
    class="btn btn-secondary"
    href="/"
    onClick={onLogoutHandler}
    >Logout</button>

return (
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="#">RMD</a>
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
        {/* <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a> */}
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
         {isAuth ? searchBar : null}
      </li>
    </ul>
    {isAuth ? logoutButton : loginButton}
  </div>
</nav>
)}
export default Navigation;