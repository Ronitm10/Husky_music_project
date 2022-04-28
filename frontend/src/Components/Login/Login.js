import React, { useState, useEffect } from 'react'
import './Login.css'
import { Container, Form, Button } from 'react-bootstrap'
import jwt from 'jwt-decode'
const axios = require('axios')

const Login = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    //Handle submit will handle logging in and calling the settoken in app.js
    const handleSubmit = async e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth', {
            email: username,
            password: password,
            name: "test"
        }).then(function (response) {
            const token = jwt(response.data.token);
            console.log('logged in: ', token.user)
            setToken(token.user);
        }).catch(function (error) {
            console.log("Error logging in", error.response);
            return null;
        });

    }
    return (
        <Container className="login-wrapper">
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
                    <Form.Text className="text-muted" >
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    )
}

export default Login