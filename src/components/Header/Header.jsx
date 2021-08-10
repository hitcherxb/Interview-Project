
import React from "react";
import {
    Container,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./header.css"



//Replacing Sign In with a name for the profile dropdown
function Header() {
    let fullName = JSON.parse(localStorage.getItem("userInfo"))
    if (!fullName) {
        fullName = "Sign In"
    } else {
        fullName = fullName.fullName
    }


    const history = useHistory()

    return (
        <Navbar bg="primary" expand='lg' variant="dark">
            <Container id='container'>
                <Navbar.Brand id="title">
                    <Link to='/' >Project</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">


                    <Nav>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <NavDropdown title={fullName} id="basic-nav-dropdown">
                            <NavDropdown.Item href='/profile'>
                                My Profile
                            </NavDropdown.Item>

                            <NavDropdown.Divider />
                            <NavDropdown.Item
                                onClick={() => {
                                    localStorage.removeItem("userInfo");
                                    history.push("/")
                                }}>
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;