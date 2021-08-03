import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import Header from '../Header/Header';


function RegisterScreen() {

    const [username, setUsername] = useState("")
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState(false)
    const [message, setMessage] = useState(null)
    const history = useHistory();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            history.push("/profile")
        }
    }, [history])

    const submitHandler = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords Do Not Match");
        } else {
            setMessage(null)

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post(
                    "http://localhost:4000/api/users",
                    { fullName, username, email, password },
                    config
                )

                localStorage.setItem("userInfo", JSON.stringify(data));
                history.push("/profile")

            } catch (error) {
                setError(error.response.data.message)

            }
        }






    }




    return (
        <div>
            <Header />
            <div className='loginContainer'>
                <div className='form-div'>
                    {error && <ErrorMessage varient="danger">{error}</ErrorMessage>}
                    {message && <ErrorMessage varient="danger">{message}</ErrorMessage>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="fullName"
                                value={fullName}
                                placeholder="Enter name"
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="username"
                                value={username}
                                placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                placeholder="Enter Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="confirmPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={confirmPassword}
                                placeholder="Enter Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            Already have an account? <Link to='/login'>Sign In</Link>
                        </Col>
                    </Row>

                </div>
            </div>
        </div>

    );
}


export default RegisterScreen;