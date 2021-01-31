import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterByValue } from './redux/actions'


const Navigation = () => {
  const dispatch = useDispatch()
  const firstName = useSelector(state => state.firstName)
  let history = useHistory()

  const filterByInput = (e) => {
    let input = e.target.value
    dispatch(filterByValue({ value: input }))
  }

  let searchBar = localStorage.isAuth ? (
    <form class="form-inline">
      <input
        class="form-control mr-sm-2"
        aria-label="Search"
        type="text"
        placeholder="Search Title..."
        onChange={(e) => filterByInput(e)}
      />
    </form>) : null

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
      <a class="navbar-brand" href="/">{localStorage.isAuth ? 'Hi ' + firstName : 'RMD'}</a>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
          </li>
        </ul>
        <form class="form-inline my-2">
          {localStorage.isAuth ? searchBar : null}
          {localStorage.isAuth ? logoutButton : loginButton}
        </form>
      </div>
    </nav>
  )
}

export default Navigation
