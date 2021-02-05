import React, { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterByValue, setPerPage } from '../redux/actions'
import firebase from 'firebase';
import "bulma/css/bulma.min.css"

const Navigation = () => {
  const dispatch = useDispatch()
  const searching = useSelector(state => state.searching)
  let history = useHistory()

  const filterByInput = (event) => {
    let input = event.target.value.toLowerCase()
    if(!event.target.value){
      dispatch(setPerPage())}
    dispatch(filterByValue({ value: input }))
  }

  let searchBar = 
    <form class="form-inline">
      <input
        class="form-control mr-sm-2"
        aria-label="Search"
        type="text"
        placeholder="Search Title..."
        onChange={(e) => filterByInput(e)}
      />
    </form>

  const onLoginHandler = () => {
    history.push('/auth')
  }

  const onLogoutHandler = () => {
    firebase.auth().signOut()
    localStorage.removeItem('userId')
    localStorage.removeItem('isAuth')
    localStorage.removeItem('firstName')
    history.push('/auth')
  }

  let loginButton = !localStorage.isAuth ?
  <Link to="/auth"> <button
      type="button"
      class="btn btn-outline-success"
      href="/auth"
      onClick={onLoginHandler}
    > Login </button> </Link> : null

  let logoutButton =
    <button
      type="button"
      class="button is-outlined"
      href="/"
      onClick={onLogoutHandler}
    >Logout</button>



  return (
    <nav class="navbar sticky-top navbar-expand navbar-light bg-light">
      <a class="navbar-brand" href="/">{localStorage.isAuth ? 'Hi ' + localStorage.firstName : 'RMD'}</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
          {localStorage.isAuth ?  <Link to="/add-movie"><button class="button is-info" href="/add-movie">Add New Movies</button></Link>: null}
          </li>
        </ul>
        <form class="form-inline my-2">
          {searchBar}
          {localStorage.isAuth ? logoutButton : loginButton}
        </form>
      </div>
    </nav>
  )
}

export default Navigation
