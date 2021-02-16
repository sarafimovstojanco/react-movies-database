import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navigation/Navbar';
import SignInCard from './SignInCard';

const Auth = () => {
return (
  <div style={{height: '100vh'}}>
    <Navbar/>
    <div style={{paddingTop: "100px"}}>
        <div style={{
        textAlign: 'center',
        margin: 'auto',
        width: '40%',
        marginBottom: '20%',
        paddingTop: "10%",
        border: '2px solid grey',
        padding: '80px'
      }}>
        <SignInCard/>
        </div>
      </div>
   </div>
)}


export default Auth;