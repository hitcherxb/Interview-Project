import React, { setState, useEffect } from "react";
import actions from "../api";
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

function Header() {

    const [user, setUser] = setState('')

    useEffect(() => {
        actions.getUser().then(res => {
            setUser(res.data.fullName)
        })

    }, [])

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
                        <Nav.Link href="/mynotes">Feed</Nav.Link>
                        <NavDropdown title={`${user}`} id="basic-nav-dropdown">
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