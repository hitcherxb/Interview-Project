import axios from "axios";
import React, { setState, useEffect } from "react";
import {
    Container,
    Form,
    FormControl,
    Nav,
    Navbar,
    NavDropdown,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./header.css"
import serverUrl from '../../api';



function Header() {
    let fullName = JSON.parse(localStorage.getItem("userInfo"))
    console.log(fullName)
    if (!fullName) {
        fullName = "Sign In"
    } else {
        fullName = fullName.fullName
    }

    const history = useHistory()

    return (
        <Navbar bg="primary" expand='lg' variant="dark">
            <Container>
                <Navbar.Brand id="title">
                    <Link to='/' >Project</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">


                    <Nav>
                        <Nav.Link href="/feed">Feed</Nav.Link>
                        <NavDropdown title={fullName} id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">
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