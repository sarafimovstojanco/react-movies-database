import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignInCard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';

const SignInCard = (props) => {

 let [switchSignIn, setSwitchSignIn] = useState(true) 
 let [email, setEmail] = useState('')
 let [password, setPassword] = useState('')
 let [country, setCountry] = useState('')
 let [firstName, setFirstName] = useState('')
 let [lastName, setLastName] = useState('')
 let [errors, setErrors] =useState({
  email:'',
  password:''
})
 
 let history = useHistory()
 const emailInputHandler = (event) => {
  setEmail(event.target.value)
 }
 const passwordInputHandler = (event) => {
   setPassword(event.target.value)
 }
 const countryInputHandler = (event) =>{
  setCountry(event.target.value)
 }
 const firstNameInputHandler = (event) =>{
  setFirstName(event.target.value)
 }
 const lastNameInputHandler = (event) =>{
  setLastName(event.target.value)
 }

 const validateEmail = (email) => {
  let isValid = true;
  if (email){
    setErrors({email: ""})
  }
  if (typeof email !== "undefined") {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    if (!pattern.test(email)) {
      isValid = false;
      setErrors({email: "Please enter a valid Email Address."})
    }
  }
  return isValid;
}

const validatePassword = (password) => {
  let isValid = true;
  if (password){
    setErrors({password: ""})
  }
  if (typeof password !== "undefined") {
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/
    var test = reg.test(password)
    if (!test) {
      isValid = false;
      setErrors({password: "Please enter a valid password"})
    }
    return isValid;
}
}

 var config = {
  apiKey: "apiKey",
  authDomain: "react-movies-database.firebaseapp.com",
  databaseURL: "https://react-movies-database-default-rtdb.firebaseio.com/",
  storageBucket: "bucket.appspot.com"
};
if (firebase.apps.length === 0) {
  firebase.initializeApp(config);
}

 let authData = {
   email: email,
   password: password,
   country: country,
   firstName: firstName,
   lastName: lastName,
   returnSecureToken: true
 }
 const SwitchSignInHandler = () => {
    setSwitchSignIn(!switchSignIn)
 }

 const onSignUpHandler = (event)=>{
     event.preventDefault()
     validateEmail(email) && validatePassword(password)
     axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPN1fwrEmYVC_N1rwmwN26Y3nLH10x9b8', authData)
          .then(response => {
            console.log(response)
            let path = response.data.localId
            props.movies.push(authData.firstName)
            firebase.database().ref(path +"/").set(props.movies)
            localStorage.setItem('userId', response.data.localId)
            history.push('/auth')
            setSwitchSignIn(true)
            alert("You are signed up succesfully, please Login")
          })
         .catch(err => console.log(['err'],err))
        }

 const onSignInHandler = (event) =>{
    event.preventDefault()
    validateEmail(email) && validatePassword(password)
    axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPN1fwrEmYVC_N1rwmwN26Y3nLH10x9b8', authData)
         .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn *1000)
                localStorage.setItem('expirationDate', expirationDate);
                localStorage.setItem('userId', response.data.localId)
                localStorage.setItem('token', response.data.idToken)
                localStorage.setItem('isAuth', true)
                history.push('/home')
       })
         .catch(err => console.log(['err'],err))
         props.setIsAuth(true)
        }
 let button = !switchSignIn ? (  <Button 
   variant="primary" 
   type="submit"
   onClick={onSignUpHandler}
   >
     Sign Up !
   </Button>) : 
   (
     <Button 
   variant="primary" 
   type="submit"
   onClick={onSignInHandler}
   >
     Sign In !
   </Button>)
 let signMessage =  switchSignIn ? (
    <Form.Label>Please Sign In</Form.Label>
 ) : 
    <Form.Label>Please Sign Up</Form.Label>

 let switchButton = (
     <button 
     type="button"
     class="btn btn-success"
     onClick={SwitchSignInHandler}>Swtich to {!switchSignIn ? 'Sign In' : "Sign Up"}</button>
 )

let signCard = (
  <div class='SignInWrapper'>
    <Form>
        <Form.Group controlId="formBasicEmail">
            {signMessage}
            {!switchSignIn ? 
          <Form.Group controlId="formBasicEmail">
          <Form.Control 
          type="text"
          placeholder="First Name" 
          onChange={firstNameInputHandler}
          />
      </Form.Group>
      : null }
       {!switchSignIn ? 
          <Form.Group controlId="formBasicEmail">
          <Form.Control 
          type="text"
          placeholder="Last Name" 
          onChange={lastNameInputHandler}
          />
      </Form.Group>
      : null }
            <Form.Text></Form.Text>
            <Form.Control 
            type="email"
            placeholder="Enter email" 
            onChange={emailInputHandler}
            />
            <div className="text-danger">{errors.email}</div>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control
            type="password" 
            placeholder="Password" 
            onChange={passwordInputHandler}
            />
        <div className="text-danger">{errors.password}</div>
        </Form.Group>
        {!switchSignIn ? 
          <Form.Group controlId="formBasicEmail">
          <Form.Control 
          type="text"
          placeholder="Enter Country" 
          onChange={countryInputHandler}
          />
          <Form.Text className="text-muted">
              We'll never share your information with anyone else.
          </Form.Text>
      </Form.Group>
      : null }
        <Form.Group controlId="formBasicCheckbox">
        {switchSignIn ?  <Form.Check type="checkbox" label="Remember Me" /> : null}
        </Form.Group>
        <Form.Group>{button}</Form.Group>
        <Form.Group>{switchButton}</Form.Group>
</Form>
</div>
)
console.warn = console.error = () => {};
return (
    localStorage.isAuth ? <Redirect to={'/table'}/> : signCard
)
}





export default SignInCard;