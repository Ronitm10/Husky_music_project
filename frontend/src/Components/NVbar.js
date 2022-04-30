import React from 'react'
import { Nav, Navbar, Container, Button, Form } from 'react-bootstrap'
import { getToken } from '../helpers';
import { logout } from '../helpers';
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
    else if (userToken.user.role === 'user')
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
                <Container>
                    <Nav className="m-auto">
                        <Nav.Link href="/albums">Albums</Nav.Link>
                        <Nav.Link href="/AllArtist">Artists</Nav.Link>
                        <Nav.Link href="/playlists">PlayList</Nav.Link>
                        <Nav.Link href="/likedTracks">Your Likes</Nav.Link>
                    </Nav>
                    <Nav className='me-2'>
                        <Nav.Link onClick={logout} href="/">Logout</Nav.Link>
                    </Nav>
                    <form action={`http://localhost:4000/api/premium/checkout/${userToken.user.id}`} method="POST">
                        <button className='btn btn-success' type="submit">Go Premium</button>
                    </form>
                </Container>
            </Navbar>
        )
    else if (userToken.user.role === 'artist')
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
}

export default NVbar
