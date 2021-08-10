import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from "react-bootstrap";
import './LoginPage.css'
import axios from 'axios';
import Header from '../Header/Header'
import serverUrl from '../../server';



function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const history = useHistory();

    //Looking in localStorage and seeing in the user is logged in
    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            history.push("/profile")
        }
    }, [history])




    const submitHandler = async (e) => {
        e.preventDefault()

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        //Checking with backend if creds are correct
        const { data } = await axios.post(
            `${serverUrl}users/login`, {
            username,
            password
        }, config);

        localStorage.setItem('userInfo', JSON.stringify(data))
        history.push("/profile")
    }

    return (
        <div>
            <Header />
            <div className='loginContainer'>
                <div className='form-div'>
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                id='usernameInput'
                                type="text"
                                value={username}
                                placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                id='passwordInput'
                                type="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" >
                            Submit
                        </Button>
                    </Form>
                    <Row className="py-3">
                        <Col>
                            New Customer? <Link to='/register'>Register Here</Link>
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    );
}

export default LoginPage;