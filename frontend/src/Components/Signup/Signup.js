import React, { useState, useEffect } from 'react'
import './Signup.css'
import { Form, Button, Alert } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMusic } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
const Signup = () => {
  const [username, setUserName] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState("");
  const [isArtist, setIsArtist] = useState(false)
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const role = isArtist ? "artist" : "user";
    axios.post('http://localhost:5000/api/users', {
      email: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      role: role
    }).then(function (response) {
      if (response.status === 200) {
        setHasError(false)
        navigate("/signupSuccess");
      }
    }).catch(function (error) {
      console.log("Error in signingup in", error.response.data);
      setHasError(true);
      setErrors(error.response === null ? "Server error" : error.response.data.toString());
      return null;
    });

  }
  return (
    <>
      <h1 style={{ textAlign: "center", color: "white", padding: "5px" }}>Welcome to Husky Music! <FontAwesomeIcon icon={faMusic} /></h1>
      <Form className='signup-wrapper' onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control required type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Last Name" onChange={e => setLastName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control required type="email" placeholder="Enter email" onChange={e => setUserName(e.target.value)} />
          <Form.Text className="text-muted" >
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control required type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Check
          type="switch"
          id="custom-switch"
          label="Artist?"
          value={isArtist}
          onChange={(e) => {
            e.target.checked ? setIsArtist(true) : setIsArtist(false);
          }}
        />
        <Button variant="outline-success" type="submit">
          Signup
        </Button>
        {
          hasError ?
            <Alert variant='danger'>
              {errors}
            </Alert> : <></>
        }
      </Form>
    </>
  );
}

export default Signup