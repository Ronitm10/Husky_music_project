import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { getToken } from '../helpers';
import { logout } from '../helpers';
import husky from '../assets/app-logo.svg.png'
//import './nav.css'
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
                            className="d-inline-block"
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
                <Container>
                    <Navbar.Brand style={{ fontFamily: "fantasy" }} href="/">
                        <img
                            alt=""
                            src={husky}
                            width="48"
                            height="48"
                            className="d-inline-block align-top"
                        />{' '}Husky Music</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/albums">Albums</Nav.Link>
                        <Nav.Link href="/playlists">PlayList</Nav.Link>
                        <Nav.Link href="/likedTracks">Your Likes</Nav.Link>
                    </Nav>
                    <Nav className='me-2'>
                        <Nav.Link onClick={logout} href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        )
}
export default NVbar
