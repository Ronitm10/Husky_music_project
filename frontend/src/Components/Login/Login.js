import React, { useState, useEffect } from 'react'
import './Login.css'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import useToken from '../../useToken'
import { getToken } from '../../helpers'
import husky from '../../assets/app-logo.svg.png'
import LoginHomePage from './LoginHomePage'

const axios = require('axios')

const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("second")
    const navigate = useNavigate();

    const userToken = getToken();
    console.log('token is', userToken);
    if (userToken && userToken.user.role === 'user') navigate('/albums')
    if (userToken && userToken.user.role === 'artist') navigate('/tracks')
    // if(login) navigate to somewhere 
    //Handle submit will handle logging in and calling the settoken in app.js
    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://localhost:4000/api/auth', {
            email: username,
            password: password
        }).then(function (response) {
            const token = jwt(response.data.token);
            console.log('logged in: ', token.user.role)
            setToken(token);
            setHasError(false);
            if (token.user.role === 'artist') navigate("/artistDash", { replace: true })
            else {
                console.log('navigating to albums')
                navigate("/albums", { replace: true })
            }
        }).catch(function (error) {
            console.log("Error logging in", error.response);
            setHasError(true)
            setError(error.response ? "Invalid Credentials" : "Server error");
        });

    }
    return (
        <div class="mainCon">

            <Container className="login">


                <div className="d-flex flex-row mb-3 justify-content-around">

                    <div className="p-2">
                        <figure>
                            <img class="logo" src={husky} alt=""></img>
                            <figcaption class="brand-name"> Husky Music</figcaption>
                        </figure>

                    </div>

                    <div className="p-2">
                        <div class="login-panel">
                            <Form className="login-wrapper" onSubmit={handleSubmit}>
                                <h1 style={{ padding: "20px" }}>Login</h1>
                                <Form.Group className="mb-3" style={{ width: "300px", marginLeft: "inherit", marginRight: "inherit" }} controlId="formBasicEmail">
                                    <Form.Label style={{ padding: "20px", textAlign: "center" }}>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3" style={{ width: "300px", marginLeft: "inherit", marginRight: "inherit" }} controlId="formBasicPassword">
                                    <Form.Label style={{ padding: "20px" }}>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>
                                <div style={{ padding: "40px" }}>
                                    <Button class="submit" variant="outline-success" type="submit">
                                        Log in
                                    </Button>
                                    {
                                        hasError ?
                                            <Alert style={{ margin: "5%" }} variant='danger'>
                                                {error}
                                            </Alert> : <></>
                                    }
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>

            </Container>
            <LoginHomePage />
        </div>
    )
}

export default Login