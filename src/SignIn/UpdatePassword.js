import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Navigation/Navbar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import qs from 'qs';


const UpdatePassword = () => {
    let history = useHistory()

    const [password, setPassword] = useState({
        password: ''
    })

    const passwordInputHandler = (event) => {
        setPassword(event.target.value)
    }

    const passwordUpdateHandler = () => {
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8000/api/users/' + localStorage.userId,
            data: qs.stringify({
                password: password,
            }),
            headers: {
              'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
          })
        .then(response=>{
            history.push('/auth')
            console.log(response)})
        .catch(error=>console.log(error))
    }

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
            <div style={{marginBottom: "5px"}}>Please Enter your password:</div>
            <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="outlined"
                onChange={passwordInputHandler}
                />
            <div style={{
                marginTop: "10px",
                paddingBottom: '35px',
                paddingLeft: '35px',
                paddingRight: '35px',
                }}>
           <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={passwordUpdateHandler}
            >Set Password</Button>
            </div>
            </div>
          </div>
       </div>
    )}

export default UpdatePassword;