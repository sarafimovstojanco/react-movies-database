import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navigation/Navbar';
import SignInCard from './SignInCard';
import Box from '@material-ui/core/Box';


const Auth = () => {
return (
  <div >
    <Navbar/>
    <div style={{
        textAlign: 'center',
        height: '100vh',
        margin: 'auto',
        width: '40%',
        marginTop: '10%',
        marginBottom: '20%',
        border: '2px solid grey',
        padding: '80px'
      }}>
        <SignInCard/>
   </div>
  </div>
)}


export default Auth;