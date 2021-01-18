import React, { useState } from 'react';
import axios from 'axios';
import { Redirect, useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './SignInCard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase';

const SignInCard = (props) => {

 let [switchSignIn, setSwitchSignIn] = useState(false) 
 let [email, setEmail] = useState('')
 let [password, setPassword] = useState('')
 

 let history = useHistory()
 const emailInputHandler = (event) => {
   setEmail(event.target.value)
 }
 const passwordInputHandler = (event) => {
   setPassword(event.target.value)
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
   returnSecureToken: true
 }
 const SwitchSignInHandler = () => {
    setSwitchSignIn(!switchSignIn)
 }

 const onSignUpHandler = (event)=>{
     event.preventDefault()
     axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAPN1fwrEmYVC_N1rwmwN26Y3nLH10x9b8', authData)
          .then(response => {
            console.log(response.data.localId)
            let path = response.data.localId
            firebase.database().ref(path +"/").set(props.movies)
            localStorage.setItem('userId', response.data.localId)
            history.push('/auth')
          })
         .catch(err => console.log(['err'],err))
         alert("You are signed up succesfully, please Login")
        }

 const onSignInHandler = (event) =>{
    event.preventDefault()
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
return (
    !props.isSignIn ?
    <div class='SignInWrapper'>
    <Form>
        <Form.Group controlId="formBasicEmail">
            {signMessage}
            <Form.Text></Form.Text>
            <Form.Control 
            type="email"
            placeholder="Enter email" 
            onChange={emailInputHandler}
            />
            <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
            <Form.Control
            type="password" 
            placeholder="Password" 
            onChange={passwordInputHandler}
            />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Form.Group>{button}</Form.Group>
        <Form.Group>{switchButton}</Form.Group>
</Form>
</div>: <h1>Already authenticated !</h1>
)
}

export default SignInCard;