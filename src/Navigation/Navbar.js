import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterByValue, loadExactPage } from '../redux/actions'
import firebase from 'firebase';

const Navbar = () => {
  const dispatch = useDispatch()
  const currentPage = useSelector(state => state.currentPage)
  let history = useHistory()

  const filterByInput = (event) => {
    let input = event.target.value.toLowerCase()
    if (!event.target.value) {
      dispatch(loadExactPage(currentPage))
    }
    dispatch(filterByValue({ value: input }))
  }
  let searchBar =
    <input
      class="input"
      aria-label="Search"
      type="text"
      placeholder="Search Title..."
      onChange={(e) => filterByInput(e)}
    />

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

  let loginButton =
    <Link to="/auth"> <button
      class="button is-success"
      onClick={onLoginHandler}
    > Login </button> </Link>

  let logoutButton =
    <Link to="/auth"><button
      class="button is-dark"
      onClick={onLogoutHandler}
    >Logout</button></Link>

  return (
    <nav class="navbar is-light pb-0 is-fixed-top ">
      <div class="navbar-brand">
        <strong class="navbar-item">{localStorage.firstName}</strong>
      </div>
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item pl-0" href="/">
            Home
        </a>
          <a class="navbar-item" href="/add-movie">
            Add New Movies
        </a>
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field is-grouped">
              {searchBar}
              <p class="control">
                {localStorage.isAuth ? logoutButton : loginButton}
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
