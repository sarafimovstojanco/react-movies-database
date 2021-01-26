import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {filterByValue} from './redux/actions'


const Navigation = (props) => {
  let [keyword, setKeyword] = useState("")
  let [newData, setNewData] = useState(props.mov)
  let history = useHistory()
  let isSignUp = props.isAuth
  let [isAuth, setIsAuth] = useState(localStorage.isAuth)
  //  const load = _ => {
  //   if(localStorage.isAuth){
  //     axios.get('https://react-movies-database-default-rtdb.firebaseio.com/' + localStorage.userId + '.json').then(response => {
  //     setNewData(response.data)
  //   }).catch(error => console.log(error))
  // }
  // else {
  //   axios.get('https://react-movies-database-default-rtdb.firebaseio.com/Table.json').then(response => {
  //     setNewData(response.data)
  //   }).catch(error => console.log(error))
  // }
  //  }
  useEffect(() => {
    setNewData(props.movies);
  }, [keyword])

  const filterByInput = (e) =>{
    let input = e.target.value
    props.dispatch(filterByValue({value: input}))
  }
  //   setKeyword(event.target.value)
  //   props.setMovies(newData.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))));
  // }
  let searchBar = isAuth ?  (
  <form class="form-inline">
    <input 
    class="form-control mr-sm-2" 
    aria-label="Search"
    type="text"
    placeholder="Search Title..."
    onChange={(e) => filterByInput(e)}
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
    class="btn btn-outline-success"
    href="/auth"
    onClick={onLoginHandler}
    > Login </button> : null

  let logoutButton =
    <button 
    type="button" 
    class="btn btn-outline-secondary"
    href="/"
    onClick={onLogoutHandler}
    >Logout</button>

   

return (
<nav class="navbar sticky-top navbar-expand navbar-light bg-light">
  <a class="navbar-brand" href="/">{isAuth ? 'Hi ' + props.firstName : 'RMD'}</a>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item active">
      {table}
      </li>
    </ul>
    <form class="form-inline my-2">
    {isAuth ? searchBar : null}
    {isAuth ? logoutButton : loginButton}
    </form>
  </div>
</nav>
)}


const mapStateToProps  = (state) => ({
  mov: state.movies,
  firstName: state.firstName
})

export default connect(mapStateToProps)(Navigation)
