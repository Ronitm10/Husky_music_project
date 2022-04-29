import React from 'react'
import { Nav, Navbar, Container } from 'react-bootstrap'
import useToken from '../useToken'
import husky from '../assets/huskybrand.svg'
function NVbar() {
    const { token, setToken } = useToken();
    if (!token)
        return (
            <body>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand style={{ fontFamily: "fantasy" }} href="/">
                            <img
                                alt=""
                                src={husky}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}Husky Music</Navbar.Brand>
                        <Nav className="me-2">
                            <Nav.Link href="/signup">Signup</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </body>
        )
    else
        return (
            <body>
                <Navbar bg="dark" variant="dark">
                    <Container>
                        <Navbar.Brand style={{ fontFamily: "fantasy" }} href="/">
                            <img
                                alt=""
                                src={husky}
                                width="30"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}Husky Music</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Tracks</Nav.Link>
                            <Nav.Link href="#features">Features</Nav.Link>
                            <Nav.Link href="#premium">Premium</Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </body>
        )
}

export default NVbar
