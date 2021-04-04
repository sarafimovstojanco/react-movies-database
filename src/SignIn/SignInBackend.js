import React, { useState } from 'react';
import { Redirect, useHistory } from "react-router-dom";
import './SignInCard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch} from 'react-redux'
import axios from 'axios';

const SignInCard = () => {
    const dispatch = useDispatch()
    let [switchSignIn, setSwitchSignIn] = useState(true)
    const [registerData, setRegisterData]= useState({
        first_name: '',
        last_name: '',
        email: ''
        })
    const [signInData, setSignInData] = useState({
        email: '',
        password: ''
    })

    let [errors, setErrors] = useState({
    email: '',
    password: ''
    })
  let history = useHistory()

  const firstNameInputHandler = (event) => {
    setRegisterData({
        ...registerData,
        first_name: event.target.value})
  }
  const lastNameInputHandler = (event) => {
    setRegisterData({
        ...registerData,
        last_name: event.target.value})
  }
  const emailInputHandler = (event) => {
    setRegisterData({
        ...registerData,
        email: event.target.value})
    setSignInData({
        ...signInData,
        email: event.target.value})
  }

  const passwordInputHandler = (event) =>{
    setSignInData({
        ...signInData,
        password: event.target.value})
  }

  const SwitchSignInHandler = () => {
    setSwitchSignIn(!switchSignIn)
  }

  const onSignUpHandler = (event) => {
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/api/users', registerData)
    .then(response=>{
        localStorage.setItem('userId', response.data.id)
        console.log(response)})
    .catch(error =>console.log(error));
    history.push('/password')
  }

  const onSignInHandler = (event) => {
    event.preventDefault()
    axios.post('http://127.0.0.1:8000/api/login', signInData)
    .then(response=>{
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('isAuth', true)
        localStorage.setItem('userId', parseInt(response.data.id))
        console.log(response)
        history.push('/table')
    })
    .catch(error =>console.log(error));
  }

  let button = !switchSignIn ? (<Button
    variant="contained"
    color="primary"
    type="submit"
    onClick={onSignUpHandler}
  >
    Sign Up !
  </Button>) :
    (
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={onSignInHandler}
      >
        Sign In !
      </Button>)

  let signMessage = switchSignIn ? (
    <a>Please Sign In</a>
  ) :
    <a>Please Sign Up</a>

  let switchButton = (
    <div style={{padding: '10px'}}>
    <Button
    type="submit"
    color="#b71c1c"
    variant="contained"
    onClick={SwitchSignInHandler}>Swtich to {!switchSignIn ? 'Sign In' : "Sign Up"}</Button></div>
  )

  let signCard = (
    <div> 
      <div>
        <div>
          {signMessage}
          {!switchSignIn ?
            <div style={{padding:'10px'}}>
              <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={firstNameInputHandler}/>
              <div className="text-danger" style={{padding: '5px'}}>{errors.firstName}</div>
              <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={lastNameInputHandler}/>
              <div className="text-danger" style={{padding: '5px'}}>{errors.lastName}</div>
              <TextField id="outlined-basic" label="Enter email" variant="outlined" onChange={emailInputHandler}/>
              <div className="text-danger" style={{padding: '5px'}}>{errors.email}</div>
            </div>
            : <div>
             <TextField id="outlined-basic" label="Enter email" variant="outlined" onChange={emailInputHandler}/>
              <div className="text-danger" style={{padding: '5px'}}>{errors.email}</div>
              <div style={{padding:'5px'}}>
             <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={passwordInputHandler}/>
             <div className="text-danger">{errors.password}</div>
              </div>
             </div>
            }
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