import React, { useState, useEffect } from 'react'
import './Login.css'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import useToken from '../../useToken'

const axios = require('axios')

const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [hasError, setHasError] = useState(false);
    const [error, setError] = useState("second")
    const navigate = useNavigate();
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    console.log('token is', userToken);
    if (userToken && userToken.user.role === 'user') navigate('/albums')
    if (userToken && userToken.user.role === 'artist') navigate('/tracks')
    // if(login) navigate to somewhere 
    //Handle submit will handle logging in and calling the settoken in app.js
    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth', {
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
        <Container className="login">
            <Form className="login-wrapper" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                {
                    hasError ?
                        <Alert style={{ margin: "5%" }} variant='danger'>
                            {error}
                        </Alert> : <></>
                }
            </Form>
        </Container>
    )
}

export default Login