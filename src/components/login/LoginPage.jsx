import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { Form, Button, Row, Col } from "react-bootstrap";
import './LoginPage.css'
import axios from 'axios';
import ErrorMessage from '../ErrorMessage';
import Header from '../Header/Header'
import serverUrl from '../../api';



function LoginPage() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const history = useHistory();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo")
        if (userInfo) {
            history.push("/profile")
        }
    }, [history])




    const submitHandler = async (e) => {
        e.preventDefault()


        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }

            const { data } = await axios.post(
                `${serverUrl}users/login`, {
                username,
                password
            }, config);

            console.log(data)
            localStorage.setItem('userInfo', JSON.stringify(data))
            history.push("/profile")



        } catch (error) {
            setError(error.response.data.message);
        }
    }
    return (
        <div>
            <Header />
            <div className='loginContainer'>
                <div className='form-div'>
                    {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                    <Form onSubmit={submitHandler}>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                placeholder="Enter Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
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