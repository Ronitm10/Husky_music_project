import React, { useState } from 'react'
import { Nav, Navbar, Container, InputGroup, FormControl, Button } from 'react-bootstrap'

function NVbar() {
    return (
        <body>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">HUSKY MUSIC PLAYER</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#premium">Premium</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </body>
    )
}

export default NVbar
