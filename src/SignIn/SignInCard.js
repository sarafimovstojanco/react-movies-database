import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import './SignInCard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';
import { useDispatch } from 'react-redux'
import { getMovies, setDatabase } from '../redux/actions';

const SignInCard = () => {
  const dispatch = useDispatch()
  let [switchSignIn, setSwitchSignIn] = useState(true)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [firstName, setFirstName] = useState('')
  let [errors, setErrors] = useState({
    email: '',
    password: ''
  })
  let history = useHistory()
  useEffect(() => {
    dispatch(getMovies())
  }, [])

  const emailInputHandler = (event) => {
    setEmail(event.target.value)
  }
  const passwordInputHandler = (event) => {
    setPassword(event.target.value)
  }
  const firstNameInputHandler = (event) => {
    setFirstName(event.target.value)
  }

  const validateEmail = (email) => {
    let isValid = true;
    if (email) {
      setErrors({ email: "" })
    }
    if (typeof email !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(email)) {
        isValid = false;
        setErrors({ email: "Please enter a valid Email Address." })
      }
    }
    return isValid;
  }

  const validatePassword = (password) => {
    let isValid = true;
    if (password) {
      setErrors({ password: "" })
    }
    if (typeof password !== "undefined") {
      var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
      var test = reg.test(password)
      if (!test) {
        isValid = false;
        setErrors({ password: "Please enter a valid password" })
      }
      return isValid;
    }
  }
  const SwitchSignInHandler = () => {
    setSwitchSignIn(!switchSignIn)
  }

  const onSignUpHandler = (event) => {
    event.preventDefault()
    validateEmail(email) && validatePassword(password)
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      var user = firebase.auth().currentUser
      user.updateProfile({
        displayName: firstName})
      dispatch(getMovies())
      localStorage.setItem('userId', userCredential.user.uid)
      history.push('/auth')
      dispatch(setDatabase())
      setSwitchSignIn(true)
      firebase.auth().signOut()
      alert("You are signed up succesfully, please Login")
    })
      .catch((error) => {
        console.log(error)
      });
  }

  const onSignInHandler = (event) => {
    event.preventDefault()
    dispatch(getMovies())
    validateEmail(email) && validatePassword(password)
    var user = firebase.auth().currentUser;
    if (user) {
      console.log("user is already signed in")
      history.push('/home')
    } 
    else {
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          console.log(userCredential.user)
          localStorage.setItem('firstName', userCredential.user.displayName)
          localStorage.setItem('userId', userCredential.user.uid)
          localStorage.setItem('isAuth', true)
          history.push('/home')
        })
        .catch((error) => {
          console.log(error)
          alert(error)
        });
    }
  }

  let button = !switchSignIn ? (<button
    variant="primary"
    type="submit"
    onClick={onSignUpHandler}
  >
    Sign Up !
  </button>) :
    (
      <button
        variant="primary"
        type="submit"
        onClick={onSignInHandler}
      >
        Sign In !
      </button>)

  let signMessage = switchSignIn ? (
    <a>Please Sign In</a>
  ) :
    <a>Please Sign Up</a>

  let switchButton = (
    <button
      type="button"
      class="btn btn-success"
      onClick={SwitchSignInHandler}>Swtich to {!switchSignIn ? 'Sign In' : "Sign Up"}</button>
  )

  let signCard = (
    <div class='SignInWrapper'>
      <div>
        <div controlId="formBasicEmail">
          {signMessage}
          {!switchSignIn ?
            <div controlId="formBasicEmail">
              <input
                type="text"
                placeholder="First Name"
                onChange={firstNameInputHandler}
              />
            </div>
            : null}
          <div></div>
          <input
            type="email"
            placeholder="Enter email"
            onChange={emailInputHandler}
          />
          <div className="text-danger">{errors.email}</div>
        </div>
        <div controlId="formBasicPassword">
          <input
            type="password"
            placeholder="Password"
            onChange={passwordInputHandler}
          />
          <div className="text-danger">{errors.password}</div>
        </div>
        <div controlId="formBasicCheckbox">
          {switchSignIn ? <div type="checkbox" label="Remember Me" /> : null}
        </div>
        <div>{button}</div>
        <div>{switchButton}</div>
      </div>
    </div>
  )
  console.warn = console.error = () => { };
  return (
    localStorage.isAuth ? <Redirect to={'/table'} /> : signCard
  )
}

export default SignInCard;