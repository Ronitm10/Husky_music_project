import React, { useEffect, useState } from 'react'
import { Nav, Navbar, Container, Button, Form, Spinner } from 'react-bootstrap'
import { getToken } from '../helpers';
import { logout } from '../helpers';

import axios from 'axios'
import husky from '../assets/app-logo.svg.png'


function NVbar() {

    const userToken = getToken();

    if (!userToken)
        return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand style={{ fontFamily: "fantasy" }} href="/">
                        <img
                            alt=""
                            src={husky}
                            width="48"
                            height="48"
                            className="d-inline-block align-top"
                        />{' '}Husky Music</Navbar.Brand>
                    <Nav className="me-2">
                        <Nav.Link href="/signup">Signup</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    else if (userToken.role === 'user')
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{ fontFamily: "fantasy", alignContent: "left" }} href="/">
                    <img
                        alt=""
                        src={husky}
                        width="48"
                        height="48"
                        className="d-inline-block align-top"
                    />{' '}Husky Music</Navbar.Brand>
                {
                    userToken.premium ?
                        <div style={{ color: "green" }}>Premium</div> :
                        <div style={{ color: "red" }}>Free</div>
                }
                <Container>
                    <Nav className="m-auto">
                        <Nav.Link href="/albums">Albums</Nav.Link>
                        <Nav.Link href="/AllArtist">Artists</Nav.Link>
                        <Nav.Link href="/playlists">PlayList</Nav.Link>
                        <Nav.Link href="/likedTracks">Your Likes</Nav.Link>
                    </Nav>
                    {userToken.premium ?
                        <></> :
                        <form action={`http://localhost:4000/api/premium/checkout/${userToken._id}`} method="POST">
                            <button className='btn btn-success' type="submit">Go Premium</button>
                        </form>
                    }
                    <Nav style={{ padding: "2%" }} className='me-2'>
                        <div style={{ color: 'white', marginRight: "4%" }} >Welcome</div> <i style={{ color: 'white' }}>
                            {userToken.firstName + "," + userToken.lastName}</i>
                    </Nav>
                    <Nav className='me-2'>
                        <Nav.Link onClick={logout} href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    else if (userToken.role === 'artist')
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand style={{ fontFamily: "fantasy", alignContent: "left" }} href="/artistDash">
                    <img
                        alt=""
                        src={husky}
                        width="48"
                        height="48"
                        className="d-inline-block align-top"
                    />{' '}Husky Music</Navbar.Brand>
                <Container>
                    <Nav className="me-1">
                        <Nav.Link href="/artistDash">My Albums</Nav.Link>
                    </Nav>
                    <Nav className='me-2'>
                        <Nav.Link onClick={logout} href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
    else {
        console.log('wtf?');
        <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    }
}

export default NVbar
